class TableComponent {
  get table() {
    return cy.get('[data-cy="app-table"]');
  }

  get rows() {
    return cy.get('[data-cy="table-row"]');
  }

  get addScreenBtns() {
    return cy.get('[data-cy="add-screen-btn"]');
  }
}
export default new TableComponent();
