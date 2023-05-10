import Controller from './Controller';
import geocoder from '../helpers/geocoder';
import DeliveryBoy from '../models/DeliveryBoyModel';
import DeliveryBoyService from '../services/DeliveryBoyService';
const deliveryBoyService = new DeliveryBoyService(new DeliveryBoy().getModel());

class DeliveryBoyController extends Controller {
  constructor(service) {
    super(service);
    this.sendOtp = this.sendOtp.bind(this);
    this.otpVerified = this.otpVerified.bind(this);
    this.insertDeliveryBoy = this.insertDeliveryBoy.bind(this);
    this.updateDeliveryBoy = this.updateDeliveryBoy.bind(this);
  }

  async sendOtp(req, res) {
    let response = await this.service.sendOtp(req);
    return res.status(response.statusCode).send(response);
  }

  async otpVerified(req, res) {
    let response = await this.service.otpVerified(req);
    return res.status(response.statusCode).send(response);
  }

  async insertDeliveryBoy(req, res) {
    const { ...rest } = req.body;
    const user = await this.service.getOne({ phone: rest.phone });

    if (user.data != null) {
      const errorResponse = {
        error: true,
        message: `This Phone Number alrady has been taken`,
        statusCode: 400,
        data: null,
      };
      return res.status(errorResponse.statusCode).send(errorResponse);
    }

    const loc = await geocoder.geocode(rest.address);

    if (
      !loc ||
      !loc[0] ||
      !loc[0].longitude ||
      !loc[0].latitude ||
      !loc[0].formattedAddress
    ) {
      const errorResponse = {
        error: true,
        message: 'Invalid address.',
        statusCode: 400,
        data: null,
      };
      return res.status(errorResponse.statusCode).send(errorResponse);
    }
    rest.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].administrativeLevels.level1long,
      zipcode: loc[0].zipcode,
      country: loc[0].country,
      countryCode: loc[0].countryCode,
    };

    const response = await this.service.insert(rest);
    return res.status(response.statusCode).send(response);
  }

  async updateDeliveryBoy(req, res) {
    const response = await this.service.updateDeliveryBoy(req);
    return res.status(response.statusCode).send(response);
  }
}
export default new DeliveryBoyController(deliveryBoyService);
