import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class AdminModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        email: {
          type: String,
          required: [true, 'Please add a email address'],
          unique: true,
          match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
          ],
        },
        role: {
          type: String,
          default: 'admin',
        },
        password: {
          type: String,
          required: [true, 'Please add a Password'],
        },
        deleted: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
      },
    );
    schema.plugin(uniqueValidator);
    mongoose.model('admins', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('admins');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('admins');
  }
}

export default AdminModel;
