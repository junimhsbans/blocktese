const axios = require("axios");

const api = axios.create({
  baseURL: "https://api.leadflow.digital"
});

module.exports = api;
