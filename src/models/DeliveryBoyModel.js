import mongoose, { Schema } from 'mongoose';
import geocoder from '../helpers/geocoder';
import uniqueValidator from 'mongoose-unique-validator';

class DeliveryBoyModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        firstName: {
          type: String,
          required: true,
          trim: true,
        },
        lastName: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
          type: String,
          unique: true,
        },
        dateOfBirth: {
          type: Date,
          default: null,
        },
        phone: {
          type: String,
          unique: true,
          required: true,
        },
        altrenatePhone: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        location: {
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
        isAccountVerified: {
          type: Boolean,
          default: false,
        },
        otp: {
          type: Number,
          default: null,
          minlength: 6,
        },
        otpExpirationTime: {
          type: String,
          default: null,
        },
        deviceToken: {
          type: [String],
        },
        role: {
          type: String,
          default: 'deliveryBoy',
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
    mongoose.model('deliveryBoys', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('deliveryBoys');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('deliveryBoys');
  }
}

export default DeliveryBoyModel;
