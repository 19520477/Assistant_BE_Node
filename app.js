const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

dotenv.config();
//connect DB
mongoose.connect(
  `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.wvink.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(morgan("common"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.listen(8000, () => {
  console.log("Server is running.....");
});
