const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Import Environment variables to store information not in the repo.
require("dotenv").config({ path: "variables.env" });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running...");
});
