import { saveRequestAssertions } from 'cypress/constants/cypress.constants';
import TableComponent from './table-component.po';
describe('Movies', () => {
  it('Should list all movies', () => {
    cy.visit('http://localhost:4200/movies');
    TableComponent.table.should('be.visible');
    TableComponent.rows.should('have.length.greaterThan', 2);
  });

  it('Should add new movies', () => {
    cy.visit('http://localhost:4200/movies');
    cy.get('[data-cy="add-movie-btn"]').should('be.visible').click();
    saveRequestAssertions(true);
  });
});
