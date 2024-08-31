const express = require("express");
require("dotenv").config({ path: "./config.env" });
const path = require("path");
const app = express();
const viewRouter = require("./routes/viewRoute");
const userRouter = require("./routes/userRoute");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const globalError = require("./controllers/errorController");
// Set Pug configuration
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// // to get body data
app.use(express.json({ limit: "10kb" }));
// using body-parser
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

mongoose.connect(process.env.dbConnectionString).then(() => {
  console.log("successful connected to data base");
});

// Routes
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);

// if any error occured
app.use(globalError);
