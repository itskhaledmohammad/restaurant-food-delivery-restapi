const express = require('express');
const bodyParser = require('body-parser');

// const winston = require('winston');
const morgan = require('morgan');

morgan('combined');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport);

// Setting up Knex
const { Model } = require('objection');
const Knex = require('knex');
const apiRoutesV1 = require('@api/index');
const knexSettings = require('./knexfile');

const knex = Knex(knexSettings.development);
Model.knex(knex);

// Initializing our app 🎉
const app = express();

// Logging with Morgan 📝
app.use(morgan('tiny'));

// Some Security Headers. 👀
app.use(helmet());

// Enabling CORS for all routes. 🛩
app.use(cors());

// Parsing the body. 💪
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parsing the Cookies. 🍪
app.use(cookieParser());

// Passport for Authentication. 🛂
app.use(passport.initialize());

// At last 😌, We are trying the match any routes.
app.use('/api/v1/', apiRoutesV1);

module.exports = app;
