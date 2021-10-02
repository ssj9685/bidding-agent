const withPWA = require('next-pwa');
const Dotenv = require('dotenv-webpack');

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.WEBSOCKET_HOST,
  },
});
