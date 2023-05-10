import Service from './Service';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import geocoder from '../helpers/geocoder';
import dotenv from 'dotenv';
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const from = process.env.PHONE_NUMBER;
const twilio = require('twilio')(accountSid, authToken);

class DeliveryBoyService extends Service {
  constructor(model) {
    super(model);
  }

  async sendOtp(req) {
    try {
      const { phone, role = 'deliveryBoy' } = req.body;
      const user = await this.model.findOne({ phone });

      if (!user) {
        return {
          error: true,
          message: `Restaurant with phone number ${phone} does not exist.`,
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
        user?.phone == '+919999999999'
          ? 111111
          : Math.floor(100000 + Math.random() * 900000);

      const expirationTime = moment().add(5, 'minutes').format();
      const payload = {
        otp: otp,
        otpExpirationTime: expirationTime,
        role,
      };

      const message = `Your security code for Pootatos is ${otp}. This OTP is valid for 5 minutes.`;
      const statusCode = 200;

      await twilio.messages.create({
        body: message,
        from: from,
        to: phone,
      });

      const data = await this.model.findByIdAndUpdate(user._id, payload, {
        new: true,
      });

      return {
        error: false,
        message: `OTP sent to mobile ${phone} number`,
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

  async otpVerified(req) {
    const { phone, verifiedOtp, deviceToken = null } = req.body;

    // check if all input is provided
    const requiredFields = ['phone', 'verifiedOtp'];
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
      const user = await this.model.findOne({ phone });

      if (!user) {
        return {
          error: true,
          message: 'User not found',
          statusCode: 404,
          data: null,
        };
      }

      if (user.otp !== Number(verifiedOtp)) {
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
      user.otp = null;
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
          phone: user.phone,
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

  async updateDeliveryBoy(req) {
    try {
      const { phone, ...rest } = req.body;
      const { id } = req.params;

      if (!phone) {
        return {
          error: true,
          message: 'Missing required phone number.',
          statusCode: 400,
          data: null,
        };
      }

      const existingDeliveryBoy = await this.model.findOne({
        _id: { $ne: id },
        phone,
      });

      if (existingDeliveryBoy != null) {
        return {
          error: true,
          message: 'Phone Number Already Exists.',
          statusCode: 400,
          data: null,
        };
      }

      const loc = await geocoder.geocode(rest.address);

      if (
        !loc ||
        !loc[0] ||
        !loc[0].longitude ||
        !loc[0].latitude ||
        !loc[0].formattedAddress
      ) {
        return {
          error: true,
          message: 'Invalid address.',
          statusCode: 400,
          data: null,
        };
      }

      const items = {
        ...rest,
        phone,
        location: {
          type: 'Point',
          coordinates: [loc[0].longitude, loc[0].latitude],
          formattedAddress: loc[0].formattedAddress,
          street: loc[0].streetName,
          city: loc[0].city,
          state: loc[0].administrativeLevels.level1long,
          zipcode: loc[0].zipcode,
          country: loc[0].country,
          countryCode: loc[0].countryCode,
        },
      };

      const data = await this.model.findByIdAndUpdate(id, items, { new: true });
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
export default DeliveryBoyService;
