import Controller from './Controller';
import User from '../models/UserModel';
import { verify } from 'jsonwebtoken';
import UserService from '../services/UserService';

const userService = new UserService(new User().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.sendOtp = this.sendOtp.bind(this);
    this.reSendOtp = this.reSendOtp.bind(this);
    this.otpVerified = this.otpVerified.bind(this);
    this.signUp = this.signUp.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
    this.login = this.login.bind(this);
  }
  async login(req, res) {
    console.log('send otp');
    let response = await this.service.login(req);
    return res.status(response.statusCode).send(response);
  }

  async sendOtp(req, res) {
    console.log('send otp');
    let response = await this.service.sendOtp(req);
    return res.status(response.statusCode).send(response);
  }
  async reSendOtp(req, res) {
    let response = await this.service.reSendOtp(req);
    return res.status(response.statusCode).send(response);
  }
  async otpVerified(req, res) {
    let response = await this.service.otpVerified(req);
    return res.status(response.statusCode).send(response);
  }
  async signUp(req, res) {
    console.log('sign updata');
    let response = await this.service.signUp(req);
    return res.status(response.statusCode).send(response);
  }
  async updateAddress(req, res) {
    let response = await this.service.updateAddress(req);
    return res.status(response.statusCode).send(response);
  }

  async getUserProfile(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = verify(token, process.env.JWT_SECRET);
    let response = await this.service.get(id);
    return res.status(response.statusCode).send(response);
  }
  async updateUserProfile(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = verify(token, process.env.JWT_SECRET);

    const { phoneNumber } = req.body;

    const checkPhoneNumber = await this.service.getOne({
      _id: { $ne: id },
      phoneNumber,
    });

    if (checkPhoneNumber.data != null) {
      const errorResponse = {
        error: true,
        message: 'Phone Number Already Exist.',
        statusCode: 400,
        data: null,
      };
      return res.status(errorResponse.statusCode).send(errorResponse);
    }

    let response = await this.service.update(id, req.body);
    return res.status(response.statusCode).send(response);
  }
}

export default new UserController(userService);
