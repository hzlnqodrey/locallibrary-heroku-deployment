require('dotenv').config()
const createError                   = require('http-errors')
const express                       = require('express')
const path                          = require('path')
const cookieParser                  = require('cookie-parser')
const logger                        = require('morgan')
const { body, validationResult }    = require('express-validator')

// Import Route
const indexRouter                   = require('./routes/index')
const usersRouter                   = require('./routes/users')
const wikiRouter                    = require('./routes/wiki')
const catalogRouter                 = require('./routes/catalog')

// HTTPS-Client Compression for reducing time rendering/load
const compression                   = require('compression');
// Helmet for Network Traffic Security
const helmet                        = require('helmet')

const app = express()

// MONGO CLIENT
// const MongoClient = require('mongodb').MongoClient

// Mongoose Connection Setup
  // DB Variable
  const mongoDB = process.env.MONGODB_URI || process.env.MONGODB_URI_CLIENT
  // Import Connection
  const mongoose = require('mongoose')
  mongoose.connect(mongoDB , {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, "MongoDB connection error"))

  // // USE MONGO CLIENT
  // MongoClient.connect(mongoDB, function(err, client) {
  //   if (err) console.log(err);
  //   const db = client.db(mongoDB);
  //   client.close();
  // });

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// reference use: https://www.npmjs.com/package/morgan
app.use(logger('dev')) // A tiny node debugging utility modeled after node core's debugging technique.

// Data sending from FORM
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// reference use: https://www.npmjs.com/package/cookie-parser
app.use(cookieParser()) // Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.

app.use(helmet())
app.use(compression()); //Compress all routes

// express.static middleware, which makes Express serve all the static files in the /public directory in the project root.
app.use(express.static(path.join(__dirname, 'public')))

// Use Route
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/wiki', wikiRouter)
app.use('/catalog', catalogRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
