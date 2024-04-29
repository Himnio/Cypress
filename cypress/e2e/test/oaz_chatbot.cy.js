import oaz_chatbotPage from "../../support/page/oaz_chatbotPage";

describe("chatbot", () => {
  let data;
  before(() => {
    cy.fixture("devChatbot").then((chatbotData) => {
      data = chatbotData;
    });
  });

  it("chatbotautomation", function () {
    const oaz = new oaz_chatbotPage();
    if (!data) {
      throw new Error("Fixture data is not loaded");
    }
    const ramdomNumber =  Math.floor(100000 + Math.random() * 900000000);
    cy.visit(data.url);
    oaz.getMobileNumberField().type(ramdomNumber);
    oaz.getBtnLetsGetStarted().click();
    oaz.getProgramNameField().type(data.programName);
    cy.get(".p-autocomplete-item").each(($el, index, $list) => {
      if ($el.text() === "OAZisCare") {
        cy.wrap($el).click();
      } else {
        cy.log("OAZisCare not found");
      }
    });
    cy.contains(" Submit & Proceed ").click();
    cy.contains("Accept & Proceed").click();
    cy.task("queryDatabase").then((queryResponse) => {
      cy.log(queryResponse);
      console.log(queryResponse);
      const otp = queryResponse[0].otp;
      cy.log(`OTP: ${otp}`);
      oaz.getEnterOtpField().type(otp);
    });
    cy.contains("Verify OTP").click();
    cy.contains(" Upload Prescription Paper ").click();
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/image.png", { force: true })
      cy.wait(15000)
      cy.get('button[type="submit"]').click().then(() => {
        cy.get('input[placeholder="Enter your first name"]').type(data.firstName);
        cy.get('input[placeholder="Enter your middle name"]').type("dsdsdsd");
        cy.get('input[placeholder="Enter your last name"]').type("dsdsdsd");
        cy.get('input[placeholder="Enter Caregiver Name"]').type("dsdsdsd");
        cy.get('button[type="submit"]').click();
      });
  });
});
