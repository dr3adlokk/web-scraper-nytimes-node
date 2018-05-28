const createError = require('http-errors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require("morgan");
const cheerio = require("cheerio");
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

var app = express();
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.get('/scrape', function (req, res) {
  request('https://news.ycombinator.com/newest', function (error, response, html) {
    var $ = cheerio.load(html);
    $('.title').each(function (i, element) {
      var title = $(this).children('a').text();
      var link = $(this).children('a').attr('href');
      if (title && link) {
        db.scrapeData.save({
            title: title,
            link: link
          },
          function (err, saved) {
            if (err) {
              console.log(err);

            } else {
              console.log(saved);

            }
          });
      }
    });
  });
  res.send('Scrape Complete');

});

// app.use(express.static('public'));
app.get('/all', function (req, res) {
  db.scrapedData.find({}, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});







//routes using the router function (same thing.)
var scrapeRouter = require('./routes/web-scrape.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRender = require('./public/js/renderArticles');
var app = express();
//remote DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
