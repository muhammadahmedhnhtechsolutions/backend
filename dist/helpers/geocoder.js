"use strict";

var NodeGeocoder = require('node-geocoder');
require('dotenv').config();
var options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  httpAdapter: 'https',
  formatter: null
};
var geocoder = NodeGeocoder(options);
module.exports = geocoder;