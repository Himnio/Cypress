const { defineConfig } = require("cypress");
const { db } = require("./dbConfig");

module.exports = defineConfig({
  projectId: 'pcnwih',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on("task", {
        queryDatabase() {
          const query = "SELECT * FROM otp ORDER BY created_at DESC limit 1"; 
          return db.any(query);
        },
      });
    },
    specPattern: "cypress/e2e/test/*cy.js",
    defaultCommandTimeout: 8000,
  },
});
