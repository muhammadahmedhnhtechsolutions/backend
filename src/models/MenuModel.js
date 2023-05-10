import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class MenuModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        title: {
          type: String,
          required: true,
        },
        images: {
          type: [String],
          default:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
          get: v => v.map(item => {

            if (item != 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80') {
              // const base64Data = item.replace(/^data:image\/png;base64,/, "");
              // const base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
              // const isBase64 = base64RegExp.test(base64Data)
              // if (isBase64) {
              //   return item;
              // } else {
              return `${process.env.BASE_URL}/${item}`
              // }
            } else {
              return item;
            }
          })
        },
        isSize: {
          type: Boolean,
          default: false,
        },
        sizes: [
          {
            name: {
              type: String,
              enum: [null, 'regular', 'medium', 'large'],
              default: null,
            },
            price: {
              type: Number,
              default: null,
            },
          },
        ],
        description: {
          type: String,
          default: null,
        },
        price: {
          type: Number,
          trim: true,
          required: true,
        },
        availability: {
          type: Boolean,
          default: true,
        },
        delivery: {
          type: Boolean,
          default: true,
        },
        category_id: {
          type: Schema.Types.ObjectId,
          ref: 'categorys',
        },
        reviews: [
          {
            customer: {
              type: Schema.Types.ObjectId,
              ref: 'users',
              default: null,
            },
            stars: {
              type: Number,
              default: 0,
            },
          },
        ],
        averageRating: {
          type: Number,
          default: 0,
        },
        restaurant_id: {
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
    mongoose.model('menus', schema);

    schema.set('toObject', { getters: true });
    schema.set('toJSON', { getters: true });
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('menus');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('menus');
  }
}

export default MenuModel;
