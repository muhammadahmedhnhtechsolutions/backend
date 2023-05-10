import Controller from './Controller';
import Restaurant from '../models/RestaurantModel';
import RestaurantService from '../services/RestaurantService';
const restaurantService = new RestaurantService(new Restaurant().getInstance());

import Menu from '../models/MenuModel';
import MenuService from '../services/MenuService';
const menuService = new MenuService(new Menu().getInstance());

import User from '../models/UserModel';
import UserService from '../services/UserService';
const userService = new UserService(new User().getModel());

import Order from '../models/OrderModel';
import OrderService from '../services/OrderService';
const orderService = new OrderService(new Order().getInstance());

class RestaurantController extends Controller {
  constructor(service, menuService, userService, orderService) {
    super(service);
    this.menuService = menuService;
    this.userService = userService;
    this.orderService = orderService;
    this.sendOtp = this.sendOtp.bind(this);
    this.reSendOtp = this.reSendOtp.bind(this);
    this.otpVerified = this.otpVerified.bind(this);
    this.createRestaurant = this.createRestaurant.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    this.deleteUserAndRestaurant = this.deleteUserAndRestaurant.bind(this);
    this.insertCsvData = this.insertCsvData.bind(this);
    this.getAllRestaurant = this.getAllRestaurant.bind(this);
    this.getAllAdminRestaurant = this.getAllAdminRestaurant.bind(this);
    this.getAllCategoryRestaurant = this.getAllCategoryRestaurant.bind(this);
    this.getRestaurantProfile = this.getRestaurantProfile.bind(this);
    this.getSingleRestaurant = this.getSingleRestaurant.bind(this);
    this.getPerOrderCommission = this.getPerOrderCommission.bind(this);
    this.changeRestaurantStatus = this.changeRestaurantStatus.bind(this);
    this.changeAllRestaurantStatus = this.changeAllRestaurantStatus.bind(this);
    this.adminChangeRestaurantStatus =
      this.adminChangeRestaurantStatus.bind(this);
    this.getSingleRestaurantAndThereMenu =
      this.getSingleRestaurantAndThereMenu.bind(this);

    this.dataUpdate = this.dataUpdate.bind(this);
    this.getAllRestaurant2 = this.getAllRestaurant2.bind(this);
  }

  async sendOtp(req, res) {
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

  async createRestaurant(req, res) {
    const response = await this.service.createRestaurant(req);
    return res.status(response.statusCode).send(response);
  }
  async updateRestaurant(req, res) {
    const response = await this.service.updateRestaurant(req);
    return res.status(response.statusCode).send(response);
  }
  async deleteRestaurant(req, res) {
    const { id } = req.params;
    const response = await this.service.update(id, { deleted: true });

    if (response.statusCode === 200) {
      const $menu = await this.menuService.updateWhere(
        {
          restaurant_id: id,
        },
        { deleted: true },
      );
    }
    return res.status(response.statusCode).send(response);
  }

  async deleteUserAndRestaurant(req, res) {
    const { id } = req.user;
    let response;
    if (req.user.role === 'user') {
      response = await this.userService.updateWhere(
        {
          _id: id,
        },
        { deleted: true },
      );
    } else if (req.user.role === 'restaurant') {
      response = await this.service.updateWhere(
        {
          _id: id,
        },
        { deleted: true },
      );
    } else {
      console.log(`BAD REQUEST`);
    }

    return res.status(response.statusCode).send(response);
  }

  async insertCsvData(req, res) {
    let response = await this.service.insertCsvData(req);
    return res.status(response.statusCode).send(response);
  }

  async getAllRestaurant(req, res) {
    const id = req.user.id;
    const user = await this.userService.get(id);

    const response = await this.service.getAllRestaurant(req.query, user.data);
    return res.status(response.statusCode).send(response);
  }


  async getAllRestaurant2(req, res) {
    const id = req.user.id;
    const user = await this.userService.get(id);

    const response = await this.service.getAllRestaurant2(req.query, user.data);
    return res.status(response.statusCode).send(response);
  }


  async getAllAdminRestaurant(req, res) {
    const response = await this.service.getAllAdminRestaurant(req.query);
    return res.status(response.statusCode).send(response);
  }
  async getAllCategoryRestaurant(req, res) {
    const response = await this.service.getAllCategoryRestaurant(req);
    return res.status(response.statusCode).send(response);
  }
  async getRestaurantProfile(req, res) {
    const response = await this.service.getRestaurantProfile(req);
    return res.status(response.statusCode).send(response);
  }
  async getSingleRestaurant(req, res) {
    const { id } = req.params;
    let response = await this.service.get(id);
    if (response.statusCode === 200) {
      const singleRestaurantDeshboardData =
        await orderService.getSingleRestaurantDeshboardData(id);
      response.singleRestaurantDeshboardData = {
        ...singleRestaurantDeshboardData,
      };
    }
    return res.status(response.statusCode).send(response);
  }

  async changeRestaurantStatus(req, res) {
    const response = await this.service.changeRestaurantStatus(req);
    return res.status(response.statusCode).send(response);
  }
  async changeAllRestaurantStatus(req, res) {
    const response = await this.service.changeAllRestaurantStatus(req);
    return res.status(response.statusCode).send(response);
  }
  async adminChangeRestaurantStatus(req, res) {
    const { id } = req.params;
    const item = req.body;
    const response = await this.service.update(id, item);
    return res.status(response.statusCode).send(response);
  }
  async getPerOrderCommission(req, res) {
    const response = await this.service.getPerOrderCommission(req);
    return res.status(response.statusCode).send(response);
  }
  async getSingleRestaurantAndThereMenu(req, res) {
    const { id } = req.params;
    const $getSingleRestaurant =
      await this.service.getSingleRestaurantAndThereMenu(id);

    const $menu = await this.menuService.getAllRestaurantMenu({
      restaurant_id: id,
      deleted: { $ne: true },
    });
    const data = {
      restaurant: $getSingleRestaurant.data,
      menu: $menu.data,
    };

    const response = {
      error: $getSingleRestaurant.error,
      message: $getSingleRestaurant.message,
      statusCode: $getSingleRestaurant.statusCode,
      data,
    };

    return res.status(response.statusCode).send(response);
  }


  async dataUpdate(req, res) {
    const response = await this.service.dataUpdate();
    return res.status(response.statusCode).send(response);
  }
}
export default new RestaurantController(
  restaurantService,
  menuService,
  userService,
  orderService,
);
