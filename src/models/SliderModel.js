import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class SliderModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        image: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        restaurant_id: {
          type: Schema.Types.ObjectId,
          ref: 'restaurents',
          default: null,
        },
      },
      {
        timestamps: true,
      },
    );
    schema.plugin(uniqueValidator);
    mongoose.model('sliders', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('sliders');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('sliders');
  }
}

export default SliderModel;
