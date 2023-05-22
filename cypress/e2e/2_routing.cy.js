// import { TEST_URL } from "../constant/constant";

describe("Проверка маршрутизации", function () {
  beforeEach(function () {
    cy.visit('/');
  });
  it('Строка доступно', function(){
    cy.get("[href='/recursion']").click();
    cy.location('pathname').should('eq','/recursion')
    cy.contains("Строка");
    cy.contains("К оглавлению").click();
    cy.location('pathname').should('eq', '/')
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам")
  })
  it('Фибоначи доступно', function(){
    cy.get("[href='/fibonacci']").click();
    cy.location('pathname').should('eq','/fibonacci')
    cy.contains("Последовательность Фибоначчи");
    cy.contains("К оглавлению").click();
    cy.location('pathname').should('eq', '/')
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам")
  })
  it('Сортировка массива доступно', function(){
    cy.get("[href='/sorting']").click();
    cy.location('pathname').should('eq','/sorting')
    cy.contains("Сортировка массива");
    cy.contains("К оглавлению").click();
    cy.location('pathname').should('eq', '/')
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам")
  })
  it('Стек доступен', function(){
    cy.get("[href='/stack']").click();
    cy.location('pathname').should('eq','/stack')
    cy.contains("Стек");
    cy.contains("К оглавлению").click();
    cy.location('pathname').should('eq', '/')
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам")
  })
  it('Очередь доступна', function(){
    cy.get("[href='/queue']").click();
    cy.location('pathname').should('eq','/queue')
    cy.contains("Очередь");
    cy.contains("К оглавлению").click();
    cy.location('pathname').should('eq', '/')
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам")
  })
  it('Связный список доступен', function(){
    cy.get("[href='/list']").click();
    cy.location('pathname').should('eq','/list')
    cy.contains("Связный список");
    cy.contains("К оглавлению").click();
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам")
    cy.location('pathname').should('eq', '/')
  })
});
