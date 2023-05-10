import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class RestaurantNotificationModel {
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
        restaurantId: {
          type: Schema.Types.ObjectId,
          ref: 'restaurents',
          required: true,
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

    mongoose.model('restaurantNotification', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('restaurantNotification');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('restaurantNotification');
  }
}

export default RestaurantNotificationModel;
