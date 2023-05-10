import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class DeliveryBoyNotificationModel {
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
        deliveryBoyId: {
          type: Schema.Types.ObjectId,
          ref: 'deliveryBoys',
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

    mongoose.model('deliveryBoyNotification', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('deliveryBoyNotification');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('deliveryBoyNotification');
  }
}

export default DeliveryBoyNotificationModel;
