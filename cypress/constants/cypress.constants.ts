import FormModal from '../e2e/form-modal.po';
export const items = ['bookings', 'cinemas', 'movies', 'screens'];
export const saveRequestAssertions = (isMovie: boolean = false) => {
  cy.intercept('PUT', '**//ultraplex/api/v1/**', {
    statusCode: 201,
    body: {},
  }).as('saveRequest');
  FormModal.formContainer.should('be.visible');
  FormModal.saveBtn.should('have.attr', 'disabled');
  FormModal.nameInput.click().type('new_object');
  if (isMovie) {
    FormModal.runtimeInput.click().type('1');
  }
  FormModal.saveBtn.should('not.have.attr', 'disabled');
  FormModal.saveBtn.click();
  cy.wait('@saveRequest');
  FormModal.cancelBtn.click();
};
