import Service from './Service';
import csv from 'csv-parser';
import fs from 'fs';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
import axios from 'axios';
import { URLSearchParams } from 'url';
import geocoder from '../helpers/geocoder';
import dotenv from 'dotenv';
// const fs = require('fs').promises;
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const from = process.env.PHONE_NUMBER;

const twilio = require('twilio')(accountSid, authToken);

class RestaurantService extends Service {
  constructor(model) {
    super(model);
  }

  async sendOtp(req) {
    try {
      const { phoneNumber, role = 'restaurant' } = req.body;
      const user = await this.model.findOne({ phoneNumber });

      if (!user) {
        return {
          error: true,
          message: `Restaurant with phone number ${phoneNumber} does not exist.`,
          statusCode: 401,
          data: null,
        };
      }

      if (user?.deleted == true || user?.status == 'suspend') {
        return {
          error: true,
          message: `This Number: ${phoneNumber} is suspend from Plese reach to Admin`,
          statusCode: 400,
          data: null,
        };
      }

      let otp =
        user?.phoneNumber == '+919999999999'
          ? 111111
          : Math.floor(100000 + Math.random() * 900000);

      const expirationTime = moment().add(5, 'minutes').format();
      const payload = {
        isAccountVerifiedOtp: otp,
        otpExpirationTime: expirationTime,
        role,
      };

      const message = `Your security code for Pootatos is ${otp}. This OTP is valid for 5 minutes.`;
      const statusCode = 200;

      await twilio.messages.create({
        body: message,
        from: from,
        to: phoneNumber,
      });

      const data = await this.model.findByIdAndUpdate(user._id, payload, {
        new: true,
      });

      return {
        error: false,
        message: `OTP sent to mobile ${phoneNumber} number`,
        statusCode,
        data,
      };
    } catch (error) {
      return {
        error: true,
        message: `Error while sending OTP: ${error.message}`,
        statusCode: 400,
        data: null,
      };
    }
  }

  async reSendOtp(req) {
    try {
      const { phoneNumber } = req.body;

      if (!phoneNumber) {
        return {
          error: true,
          message: 'Phone number is required!',
          statusCode: 400,
          data: null,
        };
      }

      const user = await this.model.findOne({ phoneNumber });

      if (user === null) {
        return {
          error: true,
          message: 'User with this mobile number does not exist',
          statusCode: 401,
          data: null,
        };
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      const expirationTime = moment().add(5, 'minutes').format();

      user.isAccountVerifiedOtp = otp;
      user.otpExpirationTime = expirationTime;
      await user.save();

      const message = `Your Security code for Pootatos ${otp}, OTP is valid for 5 minutes`;
      const result = await twilio.messages.create({
        body: message,
        from: from,
        to: phoneNumber,
      });

      return {
        error: false,
        message: 'OTP sent to mobile number',
        statusCode: 200,
        data: `OTP has been sent to ${phoneNumber}`,
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

  async otpVerified(req) {
    const { phoneNumber, verifiedOtp, deviceToken = null } = req.body;

    // check if all input is provided
    const requiredFields = ['phoneNumber', 'verifiedOtp'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return {
        error: true,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        statusCode: 400,
        data: null,
      };
    }
    try {
      const user = await this.model.findOne({ phoneNumber });

      if (!user) {
        return {
          error: true,
          message: 'User not found',
          statusCode: 404,
          data: null,
        };
      }

      if (user.isAccountVerifiedOtp !== Number(verifiedOtp)) {
        return {
          error: true,
          message: 'Invalid OTP',
          statusCode: 401,
          data: null,
        };
      }

      const now = moment();
      const otpExpirationTime = moment(user.otpExpirationTime);

      if (now.isAfter(otpExpirationTime)) {
        return {
          error: true,
          message: 'OTP has expired',
          statusCode: 401,
          data: null,
        };
      }

      // Update user data if OTP is valid
      user.isAccountVerified = true;
      user.isAccountVerifiedOtp = null;
      user.otpExpirationTime = null;

      const updatedUserData = await this.model.findByIdAndUpdate(
        user._id,
        user,
        { new: true },
      );

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isAccountVerified: user.isAccountVerified,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      );

      if (deviceToken != null) {
        await this.model.findByIdAndUpdate(
          { _id: user._id },
          { $push: { deviceToken: deviceToken } },
        );
      }

      return {
        error: false,
        message: 'Your account has been successfully verified',
        statusCode: 200,
        token,
        data: updatedUserData,
      };
    } catch (error) {
      return {
        error: true,
        message: `Error while account verifying ${error.message}`,
        statusCode: 400,
        data: null,
      };
    }
  }

  async createRestaurant(req) {
    try {
      const {
        address,
        name,
        description,
        email,
        phoneNumber,
        images,
        category_id,
      } = req.body;
      let newImages = ['https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80']
      if (images) {
        const imagesData = images.map(item => {
          const imageString = item;
          const base64Data = imageString.replace(/^data:image\/png;base64,/, "");
          // Store Image into Server
          const d = new Date();
          const text = d.toString();
          const javaScriptRelease = Date.parse(d);
          const imageName = `images/restaurant_${javaScriptRelease}_image.png`;
          const fs2 = fs.promises
          fs2.chmod(imageName, 0o777, () => {
            fs2.writeFile(imageName, base64Data, 'base64', (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('coverted');
              }
            });
          })
          return imageName;
        })
        newImages = await Promise.all(imagesData);
      }
      // check if all input is provided
      const requiredFields = ['address', 'name', 'phoneNumber', 'category_id'];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return {
          error: true,
          message: `Missing required fields: ${missingFields.join(', ')}`,
          statusCode: 400,
          data: null,
        };
      }

      // Check if email or phone number already exist
      const existingRestaurant = await this.model.findOne({
        $or: [{ email }, { phoneNumber }],
      });

      if (existingRestaurant) {
        const message =
          existingRestaurant.email === email
            ? 'Email Already Exist'
            : 'Phone Number Already Exist';

        return {
          error: true,
          message,
          statusCode: 400,
          data: null,
        };
      }

      // const loc = await geocoder.geocode(address);

      // if (
      //   !loc ||
      //   !loc[0] ||
      //   !loc[0].longitude ||
      //   !loc[0].latitude ||
      //   !loc[0].formattedAddress
      // ) {
      //   return {
      //     error: true,
      //     message: 'Invalid address.',
      //     statusCode: 400,
      //     data: null,
      //   };
      // }

      // const location = {
      //   type: 'Point',
      //   coordinates: [loc[0].longitude, loc[0].latitude],
      //   formattedAddress: loc[0].formattedAddress,
      //   street: loc[0].streetName,
      //   city: loc[0].city,
      //   state: loc[0].administrativeLevels.level1long,
      //   zipcode: loc[0].zipcode,
      //   country: loc[0].country,
      //   countryCode: loc[0].countryCode,
      // };

      const perOrderCommission = [
        {
          minOrderAmount: 50,
          maxOrderAmount: 299,
          charge: 15,
        },
        {
          minOrderAmount: 300,
          maxOrderAmount: 50000,
          charge: 20,
        },
        {
          minOrderAmount: 500000,
          maxOrderAmount: 1000000000,
          charge: 25,
        },
      ];

      const deliveryCharges = [
        {
          minOrderAmount: 50,
          maxOrderAmount: 100,
          charge: 15,
        },
        {
          minOrderAmount: 101,
          maxOrderAmount: 500,
          charge: 15,
        },
        {
          minOrderAmount: 501,
          maxOrderAmount: 1000000000,
          charge: 15,
        },
      ];

      const payload = {
        address,
        name,
        description,
        email,
        phoneNumber,
        images: newImages,
        deliveryCharges,
        perOrderCommission,
        category_id,
        address,
        // location,
        customerSupport: {
          email,
          phoneNumber,
        },
      };

      const data = await this.model.create(payload);

      return {
        error: false,
        message: `sucess`,
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      console.log('createRestorent', error);
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }
  async updateRestaurant(req) {
    try {
      const {
        address,
        name,
        ownerName,
        description,
        email,
        phoneNumber,
        images,
        category_id,
        deliveryCharges,
        perOrderCommission,
      } = req.body;

      const { id } = req.params;

      // check if all input is provided
      const requiredFields = [
        'address',
        'name',
        'phoneNumber',
        'category_id',
        'perOrderCommission',
      ];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return {
          error: true,
          message: `Missing required fields: ${missingFields.join(', ')}`,
          statusCode: 400,
          data: null,
        };
      }

      // Check if email or phone number already exist
      const existingRestaurant = await this.model.findOne({
        _id: { $ne: id },
        $or: [{ email }, { phoneNumber }],
      });

      if (existingRestaurant) {
        const message =
          existingRestaurant.email === email
            ? 'Email Already Exist'
            : 'Phone Number Already Exist';

        return {
          error: true,
          message,
          statusCode: 400,
          data: null,
        };
      }

      // const loc = await geocoder.geocode(address);

      // if (
      //   !loc ||
      //   !loc[0] ||
      //   !loc[0].longitude ||
      //   !loc[0].latitude ||
      //   !loc[0].formattedAddress
      // ) {
      //   return {
      //     error: true,
      //     message: 'Invalid address.',
      //     statusCode: 400,
      //     data: null,
      //   };
      // }

      // const location = {
      //   type: 'Point',
      //   coordinates: [loc[0].longitude, loc[0].latitude],
      //   formattedAddress: loc[0].formattedAddress,
      //   street: loc[0].streetName,
      //   city: loc[0].city,
      //   state: loc[0].administrativeLevels.level1long,
      //   zipcode: loc[0].zipcode,
      //   country: loc[0].country,
      //   countryCode: loc[0].countryCode,
      // };
      const imagesData = images.map(item => {
        const imageString = item;
        const base64Data = imageString.replace(/^data:image\/png;base64,/, "");
        const base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        const isBase64 = base64RegExp.test(base64Data)
        if (isBase64) {
          // Store Image into Server
          const d = new Date();
          const text = d.toString();
          const javaScriptRelease = Date.parse(d);
          const imageName = `images/restaurant_${javaScriptRelease}_image.png`;
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
          return imageName;
        } else {
          return item.replace(`${process.env.BASE_URL}/`, "");
        }
      })
      const newImages = await Promise.all(imagesData);


      const payload = {
        address,
        name,
        ownerName,
        description,
        email,
        phoneNumber,
        images: newImages,
        deliveryCharges,
        perOrderCommission,
        category_id,
        address,
        //location: location,
        customerSupport: {
          email,
          phoneNumber,
        },
      };

      const data = await this.model.findByIdAndUpdate(id, payload, {
        new: true,
      });

      return {
        error: false,
        message: `sucess`,
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      console.log('updateRestorent', error);
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
          const perOrderCommission = [
            {
              minOrderAmount: 50,
              maxOrderAmount: 100,
              charge: 10,
            },
            {
              minOrderAmount: 101,
              maxOrderAmount: 500,
              charge: 15,
            },
            {
              minOrderAmount: 501,
              maxOrderAmount: 1000000000,
              charge: 20,
            },
          ];
          element.perOrderCommission = perOrderCommission;
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
  async getAllRestaurant(query, user) {
    try {
      const { skip = 1, limit = 10, search = '' } = query;
      const offset = (skip - 1) * limit;

      const { ...restQuery } = query;

      //if (user?.address) {
      const UserAddress = user?.address
        ? user.address
        : `Anand Nagar, Tharad, Gujarat 385565`;

      let restaurantQuery = {
        ...restQuery,
        status: { $ne: 'suspend' },
        deleted: { $ne: true },
      };

      if (search) {
        const searchRegex = new RegExp(search, 'i');
        restaurantQuery = {
          ...restaurantQuery,
          $or: [
            { name: searchRegex },
            { description: searchRegex },
            { 'location.state': searchRegex },
            { 'location.city': searchRegex },
            { 'location.country': searchRegex },
            { 'location.zip': searchRegex },
            { address: searchRegex },
          ],
        };
      }


      const restaurants = await this.model
        .find(restaurantQuery)
        .select('-password')
        .populate('category_id', '-image')
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await this.model.countDocuments(restaurantQuery);

      const distancePromises = restaurants.map(async (restaurant) => {
        // const distanceInKm = await getDistance(UserAddress, restaurant.address);
        const distanceInKm = 3;
        return { ...restaurant.toObject(), distanceInKm };
      });

      const restaurantsWithDistance = await Promise.all(distancePromises);

      return {
        error: false,
        message: 'Request successful',
        statusCode: 200,
        total,
        data: restaurantsWithDistance,
      };

      // } else {
      //   return {
      //     error: true,
      //     message: `please add your address to get restaurant data `,
      //     statusCode: 400,
      //     data: null,
      //   };
      // }

    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }

  }

  async getAllRestaurant2(query, user) {
    try {
      const { start = 1, end = 10, search = '' } = query;

      const limit = (Number(end)) - (start - 1);

      const { ...restQuery } = query;

      //if (user?.address) {
      const UserAddress = user?.address
        ? user.address
        : `Anand Nagar, Tharad, Gujarat 385565`;

      let restaurantQuery = {
        ...restQuery,
        status: { $ne: 'suspend' },
        deleted: { $ne: true },
      };

      if (search) {
        const searchRegex = new RegExp(search, 'i');
        restaurantQuery = {
          ...restaurantQuery,
          $or: [
            { name: searchRegex },
            { description: searchRegex },
            { 'location.state': searchRegex },
            { 'location.city': searchRegex },
            { 'location.country': searchRegex },
            { 'location.zip': searchRegex },
            { address: searchRegex },
          ],
        };
      }


      const restaurants = await this.model
        .find(restaurantQuery)
        .select('-password')
        .populate('category_id', '-image')
        .skip(start - 1)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await this.model.countDocuments(restaurantQuery);

      const distancePromises = restaurants.map(async (restaurant) => {
        // const distanceInKm = await getDistance(UserAddress, restaurant.address);
        const distanceInKm = 3;
        return { ...restaurant.toObject(), distanceInKm };
      });

      const restaurantsWithDistance = await Promise.all(distancePromises);

      return {
        error: false,
        message: 'Request successful',
        statusCode: 200,
        total,
        data: restaurantsWithDistance,
      };

      // } else {
      //   return {
      //     error: true,
      //     message: `please add your address to get restaurant data `,
      //     statusCode: 400,
      //     data: null,
      //   };
      // }

    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async getAllAdminRestaurant(query) {
    let { skip, limit } = query;
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

    query.deleted = { $ne: true };

    try {
      const items = await this.model
        .find(query)
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

  async getSingleRestaurantAndThereMenu(id) {
    try {
      const items = await this.model
        .findById(id)
        .populate('category_id', '-image');
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
  async getRestaurantProfile(req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = verify(token, process.env.JWT_SECRET);
    try {
      const items = await this.model
        .findById(id)
        .populate('category_id', '-image');

      if (!items) {
        return {
          error: true,
          message: `request not found`,
          statusCode: 404,
          data: null,
        };
      }

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

  async getAllCategoryRestaurant(req) {
    const { id } = req.params;
    try {
      const items = await this.model
        .find({ category_id: { $in: id }, deleted: { $ne: true } })
        .populate('category_id', '-image');
      return {
        error: false,
        message: 'request successful',
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

  async getPerOrderCommission(req) {
    try {
      const items = await this.model.find(req.params, {
        perOrderCommission: 1,
      });

      if (!items) {
        return {
          error: true,
          message: `request not found`,
          statusCode: 404,
          data: null,
        };
      }

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        data: items,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 400,
        message: error.message,
        data: null,
      };
    }
  }

  async changeRestaurantStatus(req) {
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      const { id } = verify(token, process.env.JWT_SECRET);

      const userData = await this.model.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true },
      );

      if (userData === null) {
        return {
          error: true,
          message: `this ${id} id is not found  `,
          statusCode: 400,
          data: null,
        };
      }

      return {
        error: false,
        message: `availability updated successfullly`,
        statusCode: 200,
        data: userData,
      };
    } catch (error) {
      return {
        error: true,
        message: `Error while changing user availability ${error.message}`,
        statusCode: 400,
        data: null,
      };
    }
  }
  async changeAllRestaurantStatus(req) {
    try {
      const userData = await this.model.update({}, req.body, {
        new: true,
      });

      if (userData === null) {
        return {
          error: true,
          message: `this ${id} id is not found`,
          statusCode: 400,
          data: null,
        };
      }

      return {
        error: false,
        message: `All availability updated successfullly`,
        statusCode: 200,
        data: userData,
      };
    } catch (error) {
      return {
        error: true,
        message: `Error while changing restaurant availability ${error.message}`,
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
        const images = x.images.map(async (image) => {
          var imageString = image;
          var base64Data = imageString.replace(/^data:image\/png;base64,/, "");
          const str = base64Data
          var base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

          // const base64RegExp = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
          const isBase64 = base64RegExp.test(str)
          console.log('isBase64', isBase64);
          if (isBase64) {
            const imageName = `images/restaurant_${x._id}_image.png`;
            console.log(imageName);
            const newImage = await fs.writeFile(imageName, base64Data, 'base64');
            return imageName;
          } else {
            return image;
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





// async function getDistance(origin, destination) {
//   const params = new URLSearchParams({
//     origins: origin,
//     destinations: destination,
//     key: process.env.GEOCODER_API_KEY,
//   });

//   try {
//     const response = await axios.get(
//       'https://maps.googleapis.com/maps/api/distancematrix/json?' + params,
//     );
//     const distance = response.data.rows[0].elements[0].distance.text;
//     // console.log(`Distance between ${origin} and ${destination}: ${distance}`);
//     return distance;
//   } catch (error) {
//     console.error(error);
//   }
// }

export default RestaurantService;
