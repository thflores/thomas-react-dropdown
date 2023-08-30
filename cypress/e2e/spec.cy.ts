import cypress from "cypress";

describe('Test ComponentDemo page', () => {
  it('Search bar appears on color dropdown when open and it closes after toggle-button is clicked', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="toggle-button"]:first').click();
    cy.get('[data-testid="search-box"]').should('exist');
    cy.get('[data-testid="toggle-button"]:first').click();
    cy.get('[data-testid="search-box"]').should('not.exist');
  })

  it('Search bar does not appears on size dropdown when open and it closes after toggle-button is clicked', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="toggle-button"]').eq(1).click();
    cy.get('[data-testid="search-box"]').should('not.exist');
    cy.get('button').should('have.length', 5);
    cy.get('[data-testid="toggle-button"]').eq(1).click();
    cy.get('button').should('have.length', 2);
  })
})