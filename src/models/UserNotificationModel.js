import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class UserNotificationModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        subTitle: {
          type: String,
          default: null,
        },
        title: {
          type: String,
          default: null,
        },
        body: {
          type: String,
          default: null,
        },
        notificationType: {
          type: String,
          default: 'order',
        },
        orderId: {
          type: String,
          default: null,
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          required: [true, 'userId required'],
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
    // Or by using the virtual method as following:

    mongoose.model('userNotification', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('userNotification');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('userNotification');
  }
}

export default UserNotificationModel;
