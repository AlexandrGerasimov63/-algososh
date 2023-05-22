import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { CIRCLE, CIRCLE_BOX } from "../constant/constant";

describe("Страница очередь работает корректно", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.get("[href='/queue']").click();
    cy.location("pathname").should("eq", "/queue");
  });
  it("Кнопки выкл при пустом инпуте", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").should("have.value", "");
    cy.get("button").eq(1).should("be.disabled");
    cy.get("button").eq(2).should("be.disabled");
    cy.get("button").eq(3).should("be.disabled");
  });
  it("Добавление эл-та работает корректно", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type(1);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get(CIRCLE_BOX).as("circles");
    cy.get("@circles").find(CIRCLE).as("circle");
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(0).contains("tail");
    cy.get("@circle")
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(1);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circle")
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains(1);
    cy.get("input").type(2);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(1).contains("tail");
    cy.get("@circle")
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(2);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circle")
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains(2);
  });
  it("Удаление эл-та работает корректно", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type(1);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get("input").type(2);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get(CIRCLE_BOX).as("circles");
    cy.get("@circles").find(CIRCLE).as("circle");
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(1).contains("tail");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("button").eq(2).should("be.enabled").click();
    cy.get("@circle")
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(1);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circle")
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .and("have.value", "");
    cy.get("@circles").eq(1).contains("head");
    cy.get("button").eq(2).should("be.enabled");
  });
  it("Очистка очереди работает корректно", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type(1);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get("input").type(2);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get("input").type(3);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get("input").type(4);
    cy.get("button").eq(1).should("be.enabled").click();
    cy.get(CIRCLE_BOX).as("circles");
    cy.get("button").eq(3).should("be.enabled").click();
    cy.get("@circles").children().next().should("have.value", "");
    cy.get("button").eq(3).should("be.disabled");
    cy.get("button").eq(1).should("be.disabled");
    cy.get("button").eq(2).should("be.disabled");
  });
});
