// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");



// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;



//remote mongoose config mlab.com
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB remotely
mongoose
 .connect(db)
 .then(() => console.log('MongoDB Connected'))
 .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));


// Setup handlebars 
app.engine("handlebars", exphbs({
 defaultLayout: "main",
 layoutsDir: "public/layouts",
 partialsDir: "public/"
}));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, './public'));


// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
 extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
 type: "application/vnd.api+json"
}));

// Make public a static dir
app.use(express.static(path.join(__dirname, "public")));

// //local Database configuration with mongoose
// if (process.env.MONGODB_URI) {
//  mongoose.connect(process.env.MONGODB_URI, {
//   useMongoClient: true
//  });
// } else {
//  mongoose.connect("mongodb://localhost/news-scraper", {
//   useMongoClient: true
//  });
// }

// Mongoose configuration for Heroku
// mongoose.connect("mongodb://heroku_rwfrvw0t:ltn6des66npp2ljf477dtccps3@ds055626.mlab.com:55626/heroku_rwfrvw0t");


//local mongo config
// var db = mongoose.connection;

// // Show any mongoose errors
// db.on("error", function (error) {
//  console.log("Mongoose Error: ", error);
// });

// // Once logged in to the db through mongoose, log a success message
// db.once("open", function () {
//  console.log("Mongoose connection successful.");
// });


// Routes
// ======
var main = require('./controllers/main_controller.js');
app.use("/", main);


// Listen on port 3000
app.listen(PORT, function () {
 console.log(`App running on port ${PORT}!`);
});
