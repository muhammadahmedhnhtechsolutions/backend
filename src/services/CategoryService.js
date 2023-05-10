import Service from './Service';
import fs from 'fs';
// const fs = require("fs");
class MenuService extends Service {
  constructor(model) {
    super(model);
    this.createCategory = this.createCategory.bind(this);
  }

  async createCategory(req) {
    try {
      let image = null
      if (req.body.image) {
        const imageString = req.body.image;
        const base64Data = imageString.replace(/^data:image\/png;base64,/, "");
        const base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        const isBase64 = base64RegExp.test(base64Data)
        if (isBase64) {
          // Store Image into Server
          const d = new Date();
          const text = d.toString();
          const javaScriptRelease = Date.parse(d);
          const imageName = `images/category_${javaScriptRelease}_image.png`;
          const fs2 = fs
          fs2.chmod(imageName, 0o777, () => {
            fs2.writeFile(imageName, base64Data, 'base64', (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('coverted');
              }
            });
          })
          image = imageName;
        } else {
          image = req.image.replace(process.env.BASE_URL, "")
        }
      }
      const addData = { ...req.body, image: image };
      console.log('adddata', addData);
      const data = await this.model.create(addData);
      return {
        error: false,
        message: `sucess`,
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      console.log('createCategory', error);
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async getAllAdminCategory(query) {
    let { skip, limit } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    let id = query._id;
    if (id) {
      try {
        id = new mongoose.mongo.ObjectId(id);
      } catch (error) { }
    }

    query.deleted = { $ne: true };

    try {
      const items = await this.model
        .find(query)
        .select('-image')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      const total = await this.model.countDocuments();

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        total,
        data: items,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async dataUpdate() {

    try {
      const items = await this.model
        .find()
        .select(['-password'])
      //.sort({ createdAt: -1 });
      //let index = 0;
      for (let x of items) {
        // var x = items;
        //if (index == 0) {
        console.log(x);
        var imageString = x.image;
        var base64Data = imageString.replace(/^data:image\/png;base64,/, "");

        // Store Image into Server
        const imageName = `images/category_${x._id}_image.png`;
        console.log(imageName);
        fs.writeFile(imageName, base64Data, 'base64', async (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('coverted');
            await this.model.findByIdAndUpdate(x._id, { image: imageName });
          }
        });
      }

      //index++;
      //}
      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        // total,
        data: items,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async getAll(query) {
    let { skip, limit } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    let id = query._id;
    if (id) {
      try {
        id = new mongoose.mongo.ObjectId(id);
      } catch (error) { }
    }

    query.deleted = { $ne: true };

    try {
      const items = await this.model
        .find(query)
        // .select('name description')
        .select(['-password'])
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      const total = await this.model.countDocuments(query);
      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        total,
        data: items,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async update(id, item) {
    try {
      const req = item;
      let image = null
      if (item.image) {
        const imageString = item.image;
        const base64Data = imageString.replace(/^data:image\/png;base64,/, "");
        const base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        const isBase64 = base64RegExp.test(base64Data)
        if (isBase64) {
          // Store Image into Server
          const d = new Date();
          const text = d.toString();
          const javaScriptRelease = Date.parse(d);
          const imageName = `images/category_${javaScriptRelease}_image.png`;
          fs.chmod(imageName, 0o777, () => {
            fs.writeFile(imageName, base64Data, 'base64', (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('coverted');
              }
            });
          })
          image = imageName;
        } else {
          image = req.image.replace(`${process.env.BASE_URL}/`, "");
        }
      } else {
        image = req.image.replace(`${process.env.BASE_URL}/`, "");
      }


      const data = await this.model.findByIdAndUpdate(id, { ...item, image: image }, { new: true });
      return {
        error: false,
        message: 'successfully updated',
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      console.log('updateCategory', error);
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }
}
export default MenuService;
