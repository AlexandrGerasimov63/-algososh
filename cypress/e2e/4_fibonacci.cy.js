import { CIRCLE_BOX } from "../constant/constant";

describe("Страница Фибоначчи работает корректно", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.get("[href='/fibonacci']").click();
    cy.location('pathname').should('eq','/fibonacci')
  });
  it("Кнопка выкл при пустом инпуте", function () {
    cy.get("input").should("have.value", "");
    cy.get("button").eq(1).should("be.disabled");
  });
  it("Элементы Фибоначчи разворачиваются корректно", function () {
    cy.get("input").type(6);
    cy.get("button").eq(1).click();
    cy.get(CIRCLE_BOX).as("circles").should("have.length", 7);
    cy.get("@circles").eq(0).contains("1");
    cy.get("@circles").eq(1).contains("1");
    cy.get("@circles").eq(2).contains("2");
    cy.get("@circles").eq(3).contains("3");
    cy.get("@circles").eq(4).contains("5");
    cy.get("@circles").eq(5).contains("8");
    cy.get("@circles").eq(6).contains("13");
  });
});
