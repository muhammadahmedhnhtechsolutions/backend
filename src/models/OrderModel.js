import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class OrderModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        items: Array,
        totalQuantity: {
          type: Number,
          default: 0,
          required: true,
        },
        totalPrice: {
          type: Number,
          default: null,
        },
        deliveryCharge: {
          type: Number,
          default: null,
        },
        totalPriceWithDeliveryCharge: {
          type: Number,
          default: null,
        },
        adminCommission: {
          type: Number,
          default: null,
        },
        totalPriceAfterAdminCommission: {
          type: Number,
          default: null,
        },
        deliveryAddress: {
          //GeoJson poit
          type: {
            type: String,
            enum: ['Point'],
          },
          coordinates: {
            type: [Number],
            index: '2dsphere',
          },
          formattedAddress: String,
          street: String,
          city: String,
          state: String,
          zipcode: String,
          country: String,
          countryCode: String,
        },
        deliveryPhone: {
          type: String,
          default: null,
        },
        deliveryInstructions: {
          type: String,
          default: null,
        },
        orderId: {
          type: String,
          default: null,
        },
        deliveryTime: {
          type: Date,
        },
        paymentMethod: {
          type: String,
          default: null,
        },
        orderStatus: {
          type: String,
          default: 'Pending',
          enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        },
        orderRestaurant: {
          type: Schema.Types.ObjectId,
          ref: 'restaurents',
          default: null,
        },
        deliveryBoy: {
          type: Schema.Types.ObjectId,
          ref: 'deliveryBoys',
          default: null,
        },
        distance: {
          type: Object,
          default: null,
        },
        isdeliveryBoyAccept: {
          type: Boolean,
          default: false,
        },
        orderdBy: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null,
        },
        orderDate: {
          type: Date,
          default: Date.now,
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

    schema.virtual('adminTotalCommission').get(function () {
      return this.deliveryCharge + this.adminCommission;
    });

    schema.plugin(uniqueValidator);
    mongoose.model('orders', schema);

    schema.set('toObject', { virtuals: true });
    schema.set('toJSON', { virtuals: true });
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('orders');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('orders');
  }
}

export default OrderModel;
