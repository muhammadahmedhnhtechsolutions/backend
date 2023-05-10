"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'csv');
  },
  filename: function filename(req, file, cb) {
    // console.log('file in multer', file);
    cb(null, file.fieldname + '-' + Date.now() + _path["default"].extname(file.originalname));
  }
});

// specify the file type
var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var csvUpload = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2 //2 MB
  }
});

var singleCSVUpload = csvUpload.single('csvFile');
var _default = singleCSVUpload;
exports["default"] = _default;