const path = require('path');
const { when } = require("@craco/craco");
module.exports = {
  // ...
  webpack: {
    alias: {
      '~': path.join(path.resolve(__dirname, './src/')),
    },
    eslint: {
      configure: {
        formatter: when(process.env.NODE_ENV === "CI", require("eslint-formatter-vso"))
      }
    }
  }
}