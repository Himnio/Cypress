class oaz_chatbotPage {
  getMobileNumberField() {
    return cy.get("#phoneNumber");
  }
  getBtnLetsGetStarted() {
    return cy.get(".btn");
  }
  getProgramNameField(){
    return cy.get('#searchdrug');
  }
  getEnterOtpField(){
    return cy.get('.form-group > .form-control');
  }
}

export default oaz_chatbotPage;
