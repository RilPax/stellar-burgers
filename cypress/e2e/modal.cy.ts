describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  test('Открывается по клику и отображает данные', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';

    cy.get('[data-cy="ingredient-Биокотлета из марсианской Магнолии"]')
      .scrollIntoView()
      .contains(ingredientName)
      .click();

    cy.get('[data-cy="modal"]')
      .should('exist')
      .and('contain', ingredientName);
  });

  test('Закрывается по кнопке "закрыть"', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';

    cy.get('[data-cy="ingredient-Биокотлета из марсианской Магнолии"]')
      .contains(ingredientName)
      .click();

    cy.get('[data-cy="modal"]').should('exist');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');
  });

  test('Закрывается по клику на оверлей', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';

    cy.get('[data-cy="ingredient-Биокотлета из марсианской Магнолии"]')
      .contains(ingredientName)
      .click();

    cy.get('[data-cy="modal"]').should('exist');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.get('[data-cy="modal"]').should('not.exist');
  });

  test('Закрывается по клавише Escape', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';

    cy.get('[data-cy="ingredient-Биокотлета из марсианской Магнолии"]')
      .contains(ingredientName)
      .click();

    cy.get('[data-cy="modal"]').should('exist');

    cy.get('body').type('{esc}');

    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
