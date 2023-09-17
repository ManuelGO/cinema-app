class FormModal {
  get formContainer() {
    return cy.get('[data-cy="form-container"]');
  }

  get saveBtn() {
    return cy.get('[data-cy="save-btn"]');
  }

  get cancelBtn() {
    return cy.get('[data-cy="cancel-btn"]');
  }

  get nameInput() {
    return cy.get('[data-cy="name-input"]');
  }
}
export default new FormModal();
