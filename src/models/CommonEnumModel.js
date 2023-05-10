import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class CommonEnumModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        privacyPolicy: [
          {
            label: { type: String },
            value: { type: String },
          },
        ],
        termsAndConditions: [
          {
            label: { type: String },
            value: { type: String },
          },
        ],
      },
      {
        timestamps: true,
      },
    );
    schema.plugin(uniqueValidator);
    // Or by using the virtual method as following:

    mongoose.model('commonEnum', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('commonEnum');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('commonEnum');
  }
}

export default CommonEnumModel;
