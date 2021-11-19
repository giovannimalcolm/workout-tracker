const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan")

const PORT = process.env.PORT || 3000;

const app = express();

const db = require("./models")

const Workout = require("./models/Workout")

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes

app.get("")


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
