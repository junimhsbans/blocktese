const axios = require("axios");

const teste = axios.create({
  baseURL: "https://api.leadflow.digital"
});

module.exports = teste;
