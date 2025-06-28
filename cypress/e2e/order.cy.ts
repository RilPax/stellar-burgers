describe('Создание заказа', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'mock-access-token');
    cy.setCookie('refreshToken', 'mock-refresh-token');

    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      success: true,
      user: {
        email: 'test@example.com',
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

    cy.visit('http://localhost:4000');
  });

  test('Полный сценарий создания заказа', () => {
    cy.contains('Краторная булка N-200i')
      .scrollIntoView()
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Биокотлета из марсианской Магнолии')
      .scrollIntoView()
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').should('contain', '123456');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="ingredients"] li').should('have.length', 0);
    cy.get('[data-cy="bun"]').should('not.exist');
  });
});
