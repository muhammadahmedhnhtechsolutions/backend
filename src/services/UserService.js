import Service from './Service';
import jwt from 'jsonwebtoken';
import { adminSendNotification } from './../helpers/firrebase';
import geocoder from '../helpers/geocoder';
import moment from 'moment';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const from = process.env.PHONE_NUMBER;

const twilio = require('twilio')(accountSid, authToken);

class UserService extends Service {
  constructor(model) {
    super(model);
    this.login = this.login.bind(this);
  }

  async sendOtp(req) {
    try {
      const { phoneNumber, role = 'user' } = req.body;

      let data;
      let message;
      let statusCode;

      const oldUser = await this.model.findOne({ phoneNumber });

      if (oldUser?.deleted === true || oldUser?.userStatus === 'suspend') {
        return {
          error: true,
          message: `This Number: ${phoneNumber} is suspend from Plese reach to Admin`,
          statusCode: 400,
          data: null,
        };
      }

      if (oldUser) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expirationTime = moment().add(5, 'minutes').format();

        const payload = {
          isAccountVerifiedOtp: otp,
          otpExpirationTime: expirationTime,
          role,
        };

        message = `Your security code for Pootatos is ${otp}. This OTP is valid for 10 minutes.`;
        statusCode = 200;

        await twilio.messages.create({
          body: message,
          from: from,
          to: phoneNumber,
        });

        data = await this.model.findByIdAndUpdate(oldUser._id, payload, {
          new: true,
        });
      } else {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expirationTime = moment().add(5, 'minutes').format();

        const payload = {
          phoneNumber,
          isAccountVerifiedOtp: otp,
          otpExpirationTime: expirationTime,
          role,
        };

        message = `Your security code for Pootatos is ${otp}. This OTP is valid for 5 minutes.`;
        statusCode = 201;

        await twilio.messages.create({
          body: message,
          from: from,
          to: phoneNumber,
        });

        data = await this.model.create(payload);
      }

      return {
        error: false,
        message: `OTP sent to mobile ${phoneNumber} number`,
        statusCode: statusCode,
        data: data,
      };
    } catch (error) {
      return {
        error: true,
        message: `Error while signing up: ${error.message}`,
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


  async login(req) {
    try {
      const { phoneNumber, role = 'user', deviceToken = null } = req.body;
      var user = await this.model.findOne({ phoneNumber });
      if (!user) {
        const payload = {
          phoneNumber,
          role,
          isAccountVerified: true
        };
        user = await this.model.create(payload);
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isAccountVerified: user.isAccountVerified,
          address: user.address,
        },
        process.env.JWT_SECRET,
        { expiresIn: '730d' },
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
        data: user,
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

      // Create token
      // Expire token in seven days
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isAccountVerified: user.isAccountVerified,
          address: user.address,
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

  async signUp(req) {
    const { firstName, lastName, email } = req.body;
    const phoneNumber = req.user.phoneNumber;

    if (!firstName || !lastName) {
      return {
        error: true,
        message: `Missing required fields: ${!firstName ? 'firstName' : ''}${!firstName && !lastName ? ', ' : ''
          }${!lastName ? 'lastName' : ''}`,
        statusCode: 400,
        data: null,
      };
    }

    try {
      const updatedUser = await this.model.findOneAndUpdate(
        { phoneNumber },
        { firstName, lastName, email, isRegister: true },
        { new: true },
      );
      return {
        error: false,
        message: 'Successfully updated user profile',
        statusCode: 200,
        data: updatedUser,
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
  async updateAddress(req) {
    const JJ_HOSPITAL_ADDRESS = 'JJ Hospital, NH15, Tharad, Gujarat 385565';
    const MAX_DISTANCE_IN_METERS = 5000;
    console.log('update updateAddress');
    try {
      const { address, geoLocation = null } = req.body;
      const id = req.user.id;

      // if (!address) {
      //   return {
      //     error: true,
      //     message: 'Address or geolocation is required!',
      //     statusCode: 400,
      //     data: null,
      //   };
      // }

      // let loc;
      // if (geoLocation != null) {
      //   const { latitude, longitude } = geoLocation;
      //   const result = await geocoder.reverse({
      //     lat: latitude,
      //     lon: longitude,
      //   });

      //   loc = result[0];
      // } else {
      //   loc = await geocoder.geocode(address);
      //   loc = loc[0];
      // }

      // if (
      //   !loc?.longitude ||
      //   !loc?.latitude ||
      //   !loc?.formattedAddress ||
      //   !loc?.city
      // ) {
      //   // new comment code
      //   // return {
      //   //   error: true,
      //   //   message: 'Invalid address or geolocation.',
      //   //   statusCode: 400,
      //   //   data: null,
      //   // };
      // }

      // const distance = await getDistance(
      //   JJ_HOSPITAL_ADDRESS,
      //   loc.formattedAddress,
      // );
      //const distance = 3;

      // if (distance?.distance?.value >= MAX_DISTANCE_IN_METERS) {
      //   // new comment code
      //   // return {
      //   //   error: true,
      //   //   message: `Sorry, you must be within ${MAX_DISTANCE_IN_METERS} meters/ 5 KM of JJ Hospital to Register in This app.`,
      //   //   statusCode: 400,
      //   //   data: null,
      //   // };
      // }

      // const {
      //   longitude,
      //   latitude,
      //   formattedAddress,
      //   streetName,
      //   city,
      //   administrativeLevels: { level1long: state },
      //   zipcode,
      //   country,
      //   countryCode,
      // } = loc;

      const items = {
        address: address,
        // location: {
        //   type: 'Point',
        //   coordinates: [longitude, latitude],
        //   formattedAddress,
        //   street: streetName,
        //   city,
        //   state,
        //   zipcode,
        //   country,
        //   countryCode,
        // },
      };

      const data = await this.model.findByIdAndUpdate({ _id: id }, items, {
        new: true,
      });

      return {
        error: false,
        message: 'successfully updated',
        statusCode: 200,
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }
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
//     const distance = response.data.rows[0].elements[0];
//     console.log(
//       `Distance between ${origin} and ${destination}: ${distance?.distance?.text}`,
//     );
//     return distance;
//   } catch (error) {
//     console.error(error);
//   }
// }

export default UserService;
