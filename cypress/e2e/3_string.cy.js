import { CIRCLE_CHANGING,CIRCLE_DEFAULT,CIRCLE_MODIFIED, CIRCLE_BOX } from "../constant/constant";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Страница 'Строка' отображается корректно", function () {
  beforeEach(function () {
   cy.visit('/')
   cy.get("[href='/recursion']").click();
   cy.location('pathname').should('eq','/recursion')
  });
  it("Кнопка выкл при пустом инпуте", function(){
    cy.get('input').should("have.value", '')
    cy.get('button').eq(1).should("be.disabled")
  })
  it("Строка разворачивается корректно", function(){
    cy.get('input').type(1234)
    cy.get('button').eq(1).click()
    cy.get(CIRCLE_BOX).as('circles').should("have.length",4)
    cy.get('@circles').each((el,index)=>{
      cy.wrap((el) => expect(el).contains(index + 1));
      if(index===0 || index===3){
        cy.wrap(el).get(CIRCLE_CHANGING).contains(index+1)
      } else {
        cy.wrap(el).get(CIRCLE_DEFAULT).contains(index+1)
      }
      
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('@circles').each((el,index)=>{
      cy.wrap(el).contains(4 - index);
      cy.wrap(el).get(CIRCLE_MODIFIED);
    })
  })
});
