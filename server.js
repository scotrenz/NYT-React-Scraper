const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const articleController = require("./controllers/articlesController");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("client/build"));
app.use(articleController);

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://heroku_6zmvwtkm:bfjqftl6qrq8pnli0brmrg32tp@ds239128.mlab.com:39128/heroku_6zmvwtkm",
  {
    useMongoClient: true
  }
);

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
