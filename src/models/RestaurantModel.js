import mongoose, { Schema } from 'mongoose';
import geocoder from '../helpers/geocoder';
import uniqueValidator from 'mongoose-unique-validator';

class RestaurantModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        name: {
          type: String,
          required: [true, 'please add a name'],
        },
        ownerName: {
          type: String,
          default: null,
        },
        images: {
          type: [String],
          default:
            'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          get: v => v.map(item => {
            if (item != 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80') {
              return `${process.env.BASE_URL}/${item}`
            } else {
              return item;
            }
          })

        },
        description: {
          type: String,
          required: [true, 'please add a description'],
          maxlength: [500, 'description can not be more then 500 characters'],
        },
        email: {
          type: String,
        },
        phoneNumber: {
          type: String,
          required: [true, 'please add a phone Number'],
        },
        address: {
          type: String,
          required: [true, 'Please add an address'],
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
        deliveryCharges: [
          {
            minOrderAmount: {
              type: Number,
            },
            maxOrderAmount: {
              type: Number,
            },
            charge: {
              type: Number,
            },
          },
        ],
        perOrderCommission: [
          {
            minOrderAmount: {
              type: Number,
            },
            maxOrderAmount: {
              type: Number,
            },
            charge: {
              type: Number,
            },
          },
        ],
        category_id: [
          {
            type: Schema.Types.ObjectId,
            ref: 'categorys',
            default: null,
          },
        ],
        customerSupport: {
          email: { type: String, default: 'admin@example.com' },
          phoneNumber: { type: String, default: 'xxx-xxx-xxxx' },
        },
        averageRating: {
          type: Number,
          // min: [1, 'Rating must be at leaset 1'],
          // max: [5, 'Rating must can not be more then 5'],
        },
        restaurantStatus: {
          type: Boolean,
          default: true,
        },
        openingHours: [
          {
            dayOfWeek: Number, // 0 for Sunday, 1 for Monday, and so on
            openTime: String,
            closeTime: String,
          },
        ],
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
        status: {
          type: String,
          enum: ['availableNow', 'suspend'],
          default: 'availableNow',
        },
        deviceToken: {
          type: [String],
        },
        role: {
          type: String,
          default: 'restaurant',
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

    // define pre and save methods here
    schema.pre('save', function (next) {
      this.averageRating = 4;
      next();
    });
    // schema.set('toObject', { getters: true });
    // schema.set('toJSON', { getters: true });
    // define virtuals here
    // schema.virtual('outlet', {
    //   ref: 'outlets',
    //   localField: '_id',
    //   foreignField: 'restaurant_id',
    //   count: true,
    // });

    schema.plugin(uniqueValidator);
    mongoose.model('restaurents', schema);

    schema.set('toObject', { virtuals: true, getters: true });
    schema.set('toJSON', { virtuals: true, getters: true });
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('restaurents');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('restaurents');
  }
}

export default RestaurantModel;
