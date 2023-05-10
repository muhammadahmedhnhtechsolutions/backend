import mongoose from 'mongoose';
require('dotenv').config();

class Connection {
  constructor() {
    const url = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/Pootatos`;
    console.log('Establish new connection with url', url);
    mongoose.set('strictQuery', true);

    mongoose.Promise = global.Promise;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  }
}

export default new Connection();
