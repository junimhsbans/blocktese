const axios = require("axios");

const api = axios.create({
  baseURL: "https://eu70.chat-api.com/instance72026/"
});

module.exports = api;
