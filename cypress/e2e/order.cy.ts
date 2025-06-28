import { bunName, ingredientName, ingredientsSelector, modalCloseSelector, modalSelector } from "cypress/support/constants";

describe('Создание заказа', () => {

  beforeEach(() => {
    cy.setCookie('accessToken', 'mock-access-token');
    cy.setCookie('refreshToken', 'mock-refresh-token');

    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      success: true,
      user: {
        email: 'it@example.com',
        name: 'Тестовый Пользователь'
      }
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      success: true,
      name: 'Фантастический бургер',
      order: {
        number: 123456
      }
    }).as('createOrder');

    cy.visit('/');
  });

  it('Полный сценарий создания заказа', () => {
    cy.contains(bunName)
      .scrollIntoView()
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains(ingredientName)
      .scrollIntoView()
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder');
    cy.get(modalSelector).should('exist');
    cy.get(modalSelector).should('contain', '123456');

    cy.get(modalCloseSelector).click();
    cy.get(modalSelector).should('not.exist');

    cy.get(`${ingredientsSelector} li`).should('have.length', 0);
    cy.get('[data-cy="bun"]').should('not.exist');
  });
});
