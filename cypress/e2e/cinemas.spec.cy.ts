import { saveRequestAssertions } from 'cypress/constants/cypress.constants';
import TableComponent from './table-component.po';

describe('Cinemas', () => {
  it('Should list all cinemas', () => {
    cy.visit('http://localhost:4200/cinemas');
    TableComponent.table.should('be.visible');
    TableComponent.rows.should('have.length.greaterThan', 2);
  });

  it('Should add new cinemas', () => {
    cy.visit('http://localhost:4200/cinemas');
    cy.get('[data-cy="add-cinema-btn"]').should('be.visible').click();
    saveRequestAssertions();
  });

  it('Should add screen for a cinema', () => {
    cy.visit('http://localhost:4200/cinemas');
    TableComponent.addScreenBtns.eq(1).click();
    saveRequestAssertions();
  });
});
