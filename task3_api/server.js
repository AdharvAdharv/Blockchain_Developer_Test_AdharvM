require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const campaignsRoutes = require("./routes/campaingnRoute");

const app = express();
app.use(bodyParser.json());
app.use(campaignsRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
