//require("dotenv").config();
var fs = require("fs");



var express = require("express");
var sequelize = require("sequelize");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// These lines added to address CORS errors when map client site is calling our API's remotely
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// Requiring our models for syncing
var db = require("./models");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

// Uncomment the below line if you need to recreate the sequelize tables
// WARNING it will delete both the tables and the data
// *********** db.sequelize.sync({force: true}).then(function() {
// The next 1 line will run sequelize for new tables only, it will skip tables that EXIST
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});
