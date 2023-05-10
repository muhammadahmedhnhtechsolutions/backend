import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'csv');
  },
  filename: (req, file, cb) => {
    // console.log('file in multer', file);
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

// specify the file type
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'text/csv' ||
    file.mimetype === 'application/vnd.ms-excel'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var csvUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, //2 MB
  },
});

var singleCSVUpload = csvUpload.single('csvFile');

export default singleCSVUpload;
