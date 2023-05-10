import Service from './Service';
import mongoose from 'mongoose';
import csv from 'csv-parser';
import fs from 'fs';
//const fs = require('fs').promises;

class MenuService extends Service {
  constructor(model) {
    super(model);
    this.createMenu = this.createMenu.bind(this);
    this.getAllMenu = this.getAllMenu.bind(this);
    this.getSingleMenu = this.getSingleMenu.bind(this);
    this.addReview = this.addReview.bind(this);
    this.getRestaurantMenu = this.getRestaurantMenu.bind(this);
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
        const images = x.images.map(async (image) => {
          const imageString = image;
          const base64Data = imageString.replace(/^data:image\/png;base64,/, "");
          const str = base64Data
          const base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

          // const base64RegExp = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
          const isBase64 = base64RegExp.test(str)
          console.log('isBase64', isBase64);
          if (isBase64) {
            const imageName = `images/menu_${x._id}_image.png`;
            console.log(imageName);
            const newImage = await fs.writeFile(imageName, base64Data, 'base64');
            return imageName;
          } else {
            return image.replace("https://api.pootatos.com/", "");
            //return image;
          }
        })
        const data = await Promise.all(images)
        //console.log('data', data);
        await this.model.findByIdAndUpdate(x._id, { images: data });

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

  async createMenu(req) {
    try {
      const { images, isSize, ...rest } = req.body;

      if (isSize === false) {
        rest.sizes = null;
      }

      const imagesData = images.map(item => {
        const imageString = item;
        const base64Data = imageString.replace(/^data:image\/png;base64,/, "");
        // Store Image into Server
        const d = new Date();
        const text = d.toString();
        const javaScriptRelease = Date.parse(d);
        const imageName = `images/xxxxmenu_${javaScriptRelease}_image.png`;
        fs.chmod(imageName, 0o777, () => {
          fs.writeFile(imageName, base64Data, 'base64', (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('coverted');
            }
          });
        })
        return imageName;
      })

      rest.images = await Promise.all(imagesData);

      rest.availability = true;
      rest.delivery = true;

      const data = await this.model.create(rest);
      return {
        error: false,
        message: `sucess`,
        statusCode: 200,
        data: data,
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

  async insertCsvData(req) {
    try {
      const results = await parseCsvData(req.file.path);

      const data = await Promise.all(
        results.map(async (element) => {
          element.isSize = false;
          return await this.model.create(element);
        }),
      );

      return {
        error: false,
        message: 'Successfully inserted data',
        statusCode: 201,
        data: data,
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

  async addReview(req) {
    const { id } = req.params;
    const item = req.body;
    const customerId = item.customer;

    try {
      const existingReview = await this.model.findOne({
        _id: id,
        'reviews.customer': customerId,
      });

      if (existingReview) {
        return {
          error: true,
          message: 'You have already submitted a review for this item.',
          statusCode: 400,
          data: null,
        };
      }

      const data = await this.model.findByIdAndUpdate(
        id,
        { $push: { reviews: item } },
        { new: true },
      );

      // Calculate the average rating
      const averageRating = calculateAverageRating(data.reviews);

      data.averageRating = averageRating.toFixed(1);
      await this.model.findByIdAndUpdate(
        id,
        { averageRating: data.averageRating },
        { new: true },
      );

      return {
        error: false,
        message: 'successfully updated',
        statusCode: 200,
        data: data,
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

  async getAllMenu(query) {

    console.log("calling function==>")
    let { skip, limit } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    query.deleted = { $ne: true };

    try {
      const items = await this.model
        .find(query)
        .populate('category_id', '-image')
        .populate('restaurant_id')
        .select(['-reviews'])
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

  async getAllAdminMenu2(query) {
    let { skip, limit, start, length, search = '' } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    let where = { deleted: { $ne: true } };

    if (search) {
      where['$or'] = [
        { title: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
      ];
    }

    try {
      const items = await this.model
        .find(where)
        .select('-images')
        .populate('category_id', '-image')
        .populate('restaurant_id')
        .select(['-reviews'])
        .skip(start)
        .limit(length);
      const total = await this.model.countDocuments(where);

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        total,
        recordsTotal: total, // total number of records
        recordsFiltered: total,
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

  async getAllAdminMenu(query) {
    let { skip, limit, search = '' } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    query.deleted = { $ne: true };

    if (search) {
      query['$or'] = [
        { title: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
      ];
    }

    console.log(query);

    try {
      const items = await this.model
        .find(query)
        .select('-images')
        .populate('category_id', '-image')
        .populate('restaurant_id')
        .select(['-reviews'])
        .skip(skip)
        .limit(limit);
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

  async getSingleMenu(id) {
    try {
      const items = await this.model
        .findById(id)
        .populate('category_id', '-image')
        .populate('restaurant_id')
        .select(['-reviews']);

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
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

  async getAllRestaurantMenu(id) {
    try {
      const items = await this.model
        .find(id)
        .populate('category_id', '-image')
        .populate('restaurant_id', '-image');
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

  //get restro menu based on auth id
  async getRestaurantMenu(query, user = null) {
    let { skip, limit } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 200;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    let id = query._id;
    if (id) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        id = new mongoose.mongo.ObjectId(id);
      } catch (error) {
        // console.log('not able to generate mongoose id with content', id);
      }
    }

    if (user != null) {
      query.restaurant_id = user.id;
    }

    query.deleted = { $ne: true };
    try {
      const items = await this.model
        .find(query)
        // .populate('category_id', '-image')
        // .populate('restaurant_id', '-images')
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
  async getAdminRestaurantMenu(query, restaurantId) {
    let { skip, limit, start, length, search = '' } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    let id = query._id;
    if (id) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        id = new mongoose.mongo.ObjectId(id);
      } catch (error) {
        // console.log('not able to generate mongoose id with content', id);
      }
    }
    query.restaurant_id = restaurantId;

    query.deleted = { $ne: true };

    if (search) {
      query['$or'] = [
        { title: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
      ];
    }

    try {
      const items = await this.model
        .find(query)
        .populate('category_id', '-image')
        .populate('restaurant_id', '-images')
        .skip(start)
        .limit(length)
        .sort({ createdAt: -1 });
      const total = await this.model.countDocuments(query);

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        total,
        recordsTotal: total, // total number of records
        recordsFiltered: total,
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

  async UpdateAllmenu(req) {
    const item = {
      availability: false,
      delivery: true,
    };
    try {
      const data = await this.model.update({}, item, {
        multi: true,
      });
      return {
        error: false,
        message: 'successfully updated',
        statusCode: 200,
        data: data,
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
      const imagesData = item.images.map(item => {
        const imageString = item;
        const base64Data = imageString.replace(/^data:image\/png;base64,/, "");
        const base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        const isBase64 = base64RegExp.test(base64Data)
        if (isBase64) {
          // Store Image into Server
          const d = new Date();
          const text = d.toString();
          const javaScriptRelease = Date.parse(d);
          const imageName = `images/menu_${javaScriptRelease}_image.png`;
          fs.chmod(imageName, 0o777, () => {
            fs.writeFile(imageName, base64Data, 'base64', (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('coverted');
              }
            });
          })
          return imageName;
        } else {
          return item.replace(`${process.env.BASE_URL}/`, "");
        }
      })
      item.images = await Promise.all(imagesData);


      const data = await this.model.findByIdAndUpdate(id, item, { new: true });
      return {
        error: false,
        message: 'successfully updated',
        statusCode: 200,
        data: data,
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
}

function parseCsvData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

function calculateAverageRating(reviews) {
  let totalStars = 0;
  let totalReviews = reviews.length;

  for (let i = 0; i < totalReviews; i++) {
    totalStars += reviews[i].stars;
  }

  return totalReviews > 0 ? totalStars / totalReviews : 0;
}

export default MenuService;
