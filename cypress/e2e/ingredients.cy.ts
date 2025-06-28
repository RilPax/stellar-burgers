// cypress/e2e/ingredient-add.cy.ts

import { bunName, ingredientSelector, ingredientName, ingredientsSelector } from "cypress/support/constants";

describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет булку и отображает её в конструкторе', () => {
    cy.contains(bunName)
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains(`${bunName} (верх)`).should('exist');

    cy.contains(`${bunName} (низ)`).should('exist');
  });

  it('добавляет начинку и отображает её в списке', () => {
    cy.get(ingredientSelector)
      .contains(ingredientName)
      .parents(ingredientSelector)
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get(ingredientsSelector)
      .should('contain', ingredientName);

  });
});
