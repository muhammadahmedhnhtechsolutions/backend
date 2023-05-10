import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class CategoryModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        name: {
          type: String,
          required: true,
          unique: true,
          minlength: [3, 'Too Short'],
          maxlength: [32, 'Too Long'],
        },
        description: {
          type: String,
          default: null,
        },
        image: {
          type: String,
          required: true,
          get: v => `${process.env.BASE_URL}/${v}`
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
    mongoose.model('categorys', schema);

    schema.set('toObject', { getters: true });
    schema.set('toJSON', { getters: true });
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('categorys');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('categorys');
  }
}

export default CategoryModel;
