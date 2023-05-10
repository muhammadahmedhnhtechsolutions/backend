import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class UserModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        firstName: {
          type: String,
          default: null,
          trim: true,
        },
        lastName: {
          type: String,
          default: null,
          trim: true,
        },
        email: {
          type: String,
          lowercase: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        address: {
          type: String,
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
        profileImage: {
          type: String,
          default: null,
        },
        isRegister: {
          type: Boolean,
          default: false,
        },
        isAccountVerified: {
          type: Boolean,
          default: false,
        },
        isAccountVerifiedOtp: {
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
        wishlist: [
          { type: Schema.Types.ObjectId, ref: 'menus', default: null },
        ],
        role: {
          type: String,
          default: 'user',
        },
        userStatus: {
          type: String,
          enum: ['availableNow', 'suspend'],
          default: 'availableNow',
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
    mongoose.model('users', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('users');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('users');
  }
}

export default UserModel;
