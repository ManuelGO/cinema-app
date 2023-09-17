import { items } from 'cypress/constants/cypress.constants';

describe('Dashboard', () => {
  it('Should display the number of Cinemas, Screeens, Movies and Bookings', () => {
    cy.visit('http://localhost:4200/dashboard');

    cy.get('[data-cy="dashboard-card"]').should('have.length', 4);
    items.forEach((item, index) => {
      cy.get('[data-cy="item-title"]').eq(index).should('contain', item);
      cy.get('[data-cy="total-items"]')
        .eq(index)
        .invoke('text')
        .should('match', /^[0-9]*$/);
    });
  });
});
