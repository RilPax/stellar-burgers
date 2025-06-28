import { ingredientName, ingredientSelector, modalCloseSelector, modalSelector } from "cypress/support/constants";

describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('Открывается по клику и отображает данные', () => {

    cy.get(ingredientSelector)
      .scrollIntoView()
      .contains(ingredientName)
      .click();

    cy.get(modalSelector)
      .should('exist')
      .and('contain', ingredientName);
  });

  it('Закрывается по кнопке "закрыть"', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';

    cy.get(ingredientSelector)
      .contains(ingredientName)
      .click();

    cy.get(modalSelector).should('exist');

    cy.get(modalCloseSelector).click();

    cy.get(modalSelector).should('not.exist');
  });

  it('Закрывается по клику на оверлей', () => {

    cy.get(ingredientSelector)
      .contains(ingredientName)
      .click();

    cy.get(modalSelector).should('exist');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.get(modalSelector).should('not.exist');
  });

  it('Закрывается по клавише Escape', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';

    cy.get(ingredientSelector)
      .contains(ingredientName)
      .click();

    cy.get(modalSelector).should('exist');

    cy.get('body').type('{esc}');

    cy.get(modalSelector).should('not.exist');
  });
});
