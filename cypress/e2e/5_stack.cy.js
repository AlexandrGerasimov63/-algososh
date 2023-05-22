import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { CIRCLE, CIRCLE_BOX } from "../constant/constant";

describe("Страница Стек работает корректно", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.get("[href='/stack']").click();
    cy.location('pathname').should('eq','/stack')
  });
  it("Кнопки выкл при пустом инпуте", function () {
    cy.get("input").should("have.value", "");
    cy.get("button").eq(1).should("be.disabled");
    cy.get("button").eq(2).should("be.disabled");
    cy.get("button").eq(3).should("be.disabled");
  });
  it("Добавление эл-та происходит корректно", function () {
    cy.get("input").type(1);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get(CIRCLE_BOX).as("circles");
    cy.get("@circles").find(CIRCLE).as("circle");
    cy.get("@circle")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(1);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circle")
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains(1);
  });
  it("Удаление эл-та происходит корректно", function () {
    cy.get("input").type(1);
    cy.get("button").eq(1).should("be.enabled").click();

    cy.get("input").type(2);
    cy.get("button").eq(1).should("be.enabled").click();

    cy.get(CIRCLE_BOX).should("have.length", 2).as("circles");
    cy.get("@circles").find(CIRCLE).as("circle");
    cy.get("button").eq(2).should("be.enabled").click();
    cy.get("@circle")
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(2);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_BOX).should("have.length", 1);
    cy.get("button").eq(2).should("be.enabled");
  });
  it("Очистка эл-тов происходит корректно", function () {
    cy.get("input").type(1);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get("input").type(2);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get("button").eq(3).should("be.enabled").click();
    cy.get(CIRCLE_BOX).should("not.exist");
    cy.get("button").eq(1).should("be.disabled");
    cy.get("button").eq(2).should("be.disabled");
    cy.get("button").eq(3).should("be.disabled");
  });
});
