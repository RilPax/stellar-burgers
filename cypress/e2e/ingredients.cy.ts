// cypress/e2e/ingredient-add.cy.ts

describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  test('добавляет булку и отображает её в конструкторе', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Краторная булка N-200i (верх)').should('exist');

    cy.contains('Краторная булка N-200i (низ)').should('exist');
  });

  test('добавляет начинку и отображает её в списке', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';
    cy.get('[data-cy="ingredient-Биокотлета из марсианской Магнолии"]')
      .contains(ingredientName)
      .parents('[data-cy="ingredient-Биокотлета из марсианской Магнолии"]')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy="ingredients"]')
      .should('contain', 'Биокотлета из марсианской Магнолии');

  });
});
