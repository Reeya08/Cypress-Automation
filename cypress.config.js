// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false, // ✅ disables support file check
    baseUrl: 'http://51.21.180.48:8080', // ✅ optional: set your base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
