const { defineConfig } = require('cypress');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: require('./webpack.config'),
    },
    supportFile: 'cypress/support/component.js',
    indexHtmlFile: 'cypress/support/component-index.html', // Add this line to specify the index HTML file
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Add custom plugins if needed
      return config;
    },
    baseUrl: 'http://localhost:3000', // Adjust this to match your local development server URL
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
