"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminSendNotification = void 0;
var admin = require('firebase-admin');
var serviceAccount = require("../pootatos-af7b1-firebase-adminsdk-1j7xd-a626e90fa9.json");

// Initialize the Firebase Admin SDK
var adminSendNotification = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
exports.adminSendNotification = adminSendNotification;