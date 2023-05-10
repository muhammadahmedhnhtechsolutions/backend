import { verify } from 'jsonwebtoken';
import Controller from './Controller';

import Order from '../models/OrderModel';
import OrderService from '../services/OrderService';
const orderService = new OrderService(new Order().getModel());

import User from '../models/UserModel';
import UserService from '../services/UserService';
const userService = new UserService(new User().getModel());

import Restaurant from '../models/RestaurantModel';
import RestaurantService from '../services/RestaurantService';
const restaurantService = new RestaurantService(new Restaurant().getModel());

import DeliveryBoy from '../models/DeliveryBoyModel';
import DeliveryBoyService from '../services/DeliveryBoyService';
const deliveryBoyService = new DeliveryBoyService(
  new DeliveryBoy().getInstance(),
);

import UserNotification from '../models/UserNotificationModel';
import UserNotificationService from '../services/UserNotificationService';
const userNotificationService = new UserNotificationService(
  new UserNotification().getModel(),
);

import RestaurantNotification from '../models/RestaurantNotificationModel';
import RestaurantNotificationService from '../services/RestaurantNotificationService';
const restaurantNotificationService = new RestaurantNotificationService(
  new RestaurantNotification().getModel(),
);

import dotenv from 'dotenv';
import { adminSendNotification } from './../helpers/firrebase';

dotenv.config();
// import { io } from '../bin/www.js';
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const from = process.env.PHONE_NUMBER;

// const twilio = require('twilio')(accountSid, authToken);

const sendNotificationToRestaurant = async (
  subTitle,
  body,
  title,
  token,
  orderId,
) => {
  try {
    const msg = await adminSendNotification.messaging().send({
      token: token,
      data: {
        orderId: orderId,
        subTitle: subTitle,
      },
      android: {
        notification: {
          body: body,
          title: title,
          color: '#fff566',
          priority: 'high',
          sound: 'default',
          vibrateTimingsMillis: [200, 500, 800],
        },
      },
    });

    console.log(msg);
  } catch (error) {
    if (
      error?.errorInfo?.code === 'messaging/registration-token-not-registered'
    ) {
      const deletedToken = await restaurantService.update(
        { _id: id },
        { $pull: { deviceToken: token } },
      );
      console.log(deletedToken);
    }
    console.error('Error sending notification:', error);
  }
};

const sendNotificationToUser = async (
  subTitle,
  body,
  title,
  token,
  orderId,
) => {
  try {
    const msg = await adminSendNotification.messaging().send({
      token: token,
      data: {
        orderId: orderId,
        subTitle: subTitle,
      },
      android: {
        notification: {
          body: body,
          title: title,
          color: '#fff566',
          priority: 'high',
          sound: 'default',
          vibrateTimingsMillis: [200, 500, 800],
        },
      },
    });

    console.log(msg);
  } catch (error) {
    if (
      error?.errorInfo?.code === 'messaging/registration-token-not-registered'
    ) {
      const deletedToken = await userService.update(
        { _id: id },
        { $pull: { deviceToken: token } },
      );
      console.log(deletedToken);
    }
    console.error('Error sending notification:', error);
  }
};

const sendAdminNotificationToAll = async (
  subTitle,
  body,
  title,
  token,
  id,
  notificationType = null,
) => {
  try {
    const msg = await adminSendNotification.messaging().send({
      token: token,
      data: {
        subTitle: subTitle,
      },
      android: {
        notification: {
          body: body,
          title: title,
          color: '#fff566',
          priority: 'high',
          sound: 'default',
          vibrateTimingsMillis: [200, 500, 800],
        },
      },
    });

    console.log(msg);
  } catch (error) {
    if (
      error?.errorInfo?.code === 'messaging/registration-token-not-registered'
    ) {
      if (notificationType === 'users') {
        await userService.update(
          { _id: id },
          { $pull: { deviceToken: token } },
        );
      } else if (notificationType === 'restaurants') {
        await restaurantService.update(
          { _id: id },
          { $pull: { deviceToken: token } },
        );
      } else if (notificationType === 'deliveryboys') {
        await deliveryBoyService.update(
          { _id: id },
          { $pull: { deviceToken: token } },
        );
      } else {
        console.log(`not geting right notificatioin type`);
      }
      // Handle the case when the registration token is no longer valid.
      console.error('Registration token is not valid:', error);
      // You can also remove the invalid token from the database, if necessary.
    } else {
      console.error('Error sending notification:', error);
    }
  }
};

class OrderController extends Controller {
  constructor(
    service,
    userService,
    restaurantService,
    deliveryBoyService,
    userNotificationService,
    restaurantNotificationService,
  ) {
    super(service);
    this.userService = userService;
    this.restaurantService = restaurantService;
    this.deliveryBoyService = deliveryBoyService;
    this.userNotificationService = userNotificationService;
    this.restaurantNotificationService = restaurantNotificationService;
    this.createOrder = this.createOrder.bind(this);
    this.getAllOrder = this.getAllOrder.bind(this);
    this.getAllOrderByRestaurantId = this.getAllOrderByRestaurantId.bind(this);
    this.getAllTodayRestaurantOrder =
      this.getAllTodayRestaurantOrder.bind(this);
    this.getAllOrderByCustomerId = this.getAllOrderByCustomerId.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.acceptOrder = this.acceptOrder.bind(this);
    this.completeOrder = this.completeOrder.bind(this);
    this.getDeliverBoyAndOrderData = this.getDeliverBoyAndOrderData.bind(this);
    this.deliveryBoyAllOrder = this.deliveryBoyAllOrder.bind(this);
    this.deliveryBoyOrderHistory = this.deliveryBoyOrderHistory.bind(this);
    this.deliveryBoyDashboardData = this.deliveryBoyDashboardData.bind(this);
    this.todayRestaurantReport = this.todayRestaurantReport.bind(this);
    this.getRestaurantDashboardData =
      this.getRestaurantDashboardData.bind(this);
    this.sendAdminNotificationToAll =
      this.sendAdminNotificationToAll.bind(this);
  }

  async sendAdminNotificationToAll(req, res) {
    const { subTitle, title, body, notificationType } = req.body;

    req.query = { limit: 5000 };

    const notificationPayload = {
      subTitle: subTitle,
      title: title,
      body: body,
    };
    if (notificationType === 'users') {
      const userResponse = await this.userService.getAll(req.query);
      const { data } = userResponse;
      data?.forEach((user) => {
        if (user) {
          user?.deviceToken?.forEach((token) => {
            sendAdminNotificationToAll(
              notificationPayload.subTitle,
              notificationPayload.body,
              notificationPayload.title,
              token,
              user._id,
              notificationType,
            );
          });
        }
      });
    } else if (notificationType === 'restaurants') {
      const restaurantResponse = await this.restaurantService.getAll(req.query);
      const { data } = restaurantResponse;
      data?.forEach((user) => {
        if (user) {
          user?.deviceToken?.forEach((token) => {
            sendAdminNotificationToAll(
              notificationPayload.subTitle,
              notificationPayload.body,
              notificationPayload.title,
              token,
              user._id,
              notificationType,
            );
          });
        }
      });
    } else if (notificationType === 'deliveryboys') {
      const deliveryBoyResponse = await this.deliveryBoyService.getAll(
        req.query,
      );
      const { data } = deliveryBoyResponse;
      data?.forEach((user) => {
        if (user) {
          user?.deviceToken?.forEach((token) => {
            sendAdminNotificationToAll(
              notificationPayload.subTitle,
              notificationPayload.body,
              notificationPayload.title,
              token,
              user._id,
              notificationType,
            );
          });
        }
      });
    } else {
      console.log(`not geting right notificatioin type`);
    }

    let response = {
      error: false,
      message: 'send notificaton successfullly',
      statusCode: 200,
      data: `send notificatioin successfullly`,
    };

    return res.status(response.statusCode).send(response);
  }

  async createOrder(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id: userId } = verify(token, process.env.JWT_SECRET);
    const { item: cartItems } = req.body;

    let restaurantId = getRestaurantId(cartItems);

    function getRestaurantId(cartItems) {
      for (let index = 0; index < cartItems.length; index++) {
        const element = cartItems[index];
        return element.restaurant_id._id;
      }
    }

    const { data: userData } = await userService.get(userId);
    const restaurantData = await restaurantService.get(restaurantId);

    const response = await this.service.createOrder(
      req,
      userData,
      restaurantData,
    );

    // if (response.statusCode === 200) {
    //   res.query = { skip: 1, limit: 50 };
    //   const allOrders = await this.service.getAll(res.query);
    //   console.log(allOrders.length);
    //   io.emit('getOrderData', allOrders);
    // }
    if (response.statusCode === 200) {
      const userPayload = {
        subTitle: restaurantData.data.name,
        title: `Your Order is Confirmed #${response.data.orderId}`,
        body: `Thanks for your order! Our restaurant is working hard to prepare it for you`,
        orderId: response.data.orderId,
        userId: userData._id,
      };

      const restaurantPayload = {
        subTitle: `User phone Number: ${userData.phoneNumber}`,
        title: `Order Alert!`,
        body: `A customer has placed an order - start cooking!`,
        sound: 'default',
        orderId: response.data.orderId,
        restaurantId: restaurantData.data._id,
      };

      userData?.deviceToken?.forEach((token) => {
        sendNotificationToUser(
          userPayload.subTitle,
          userPayload.body,
          userPayload.title,
          token,
          userPayload.orderId,
          userPayload.userId,
        );
      });
      restaurantData?.data?.deviceToken?.forEach((token) => {
        sendNotificationToRestaurant(
          restaurantPayload.subTitle,
          restaurantPayload.body,
          restaurantPayload.title,
          token,
          restaurantPayload.orderId,
          restaurantPayload.userId,
        );
      });

      await this.userNotificationService.insert(userPayload);
      await this.restaurantNotificationService.insert(restaurantPayload);
    }
    return res.status(response.statusCode).send(response);
  }

  async getAllOrder(req, res) {
    const response = await this.service.getAllOrder2(req.query);
    return res.status(response.statusCode).send(response);
  }
  async todayRestaurantReport(req, res) {
    const response = await this.service.todayRestaurantReport(req.query);
    return res.status(response.statusCode).send(response);
  }
  async getDeliverBoyAndOrderData(req, res) {
    const response = await this.service.getDeliverBoyAndOrderData(req);
    return res.status(response.statusCode).send(response);
  }
  async getAllOrderByRestaurantId(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id: restaurantId } = verify(token, process.env.JWT_SECRET);
    const response = await this.service.getAllOrderByRestaurantId(
      req.query,
      restaurantId,
    );
    return res.status(response.statusCode).send(response);
  }
  async getAllTodayRestaurantOrder(req, res) {
    const response = await this.service.getAllTodayRestaurantOrder(req);
    return res.status(response.statusCode).send(response);
  }
  async getAllOrderByCustomerId(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id: userId } = verify(token, process.env.JWT_SECRET);
    const response = await this.service.getAllOrderByCustomerId(
      req.query,
      userId,
    );
    return res.status(response.statusCode).send(response);
  }

  async getOrder(req, res) {
    const { id } = req.params;
    const response = await this.service.getOrder(id);
    return res.status(response.statusCode).send(response);
  }
  async confirmOrder(req, res) {
    const { orderId: id } = req.params;
    const response = await this.service.confirmOrder(req);

    if (response.statusCode === 200) {
      const { orderdBy, orderRestaurant } = response?.data;

      const { data: userData } = await userService.get(orderdBy);
      const { data: restaurantData } = await restaurantService.get(
        orderRestaurant,
      );
      const userPayload = {
        subTitle: restaurantData.name,
        title: `Your Order #${response.data.orderId} is confirmed`,
        body: `Thanks for your order! Our restaurant is working hard to prepare it for you.`,
        orderId: response.data.orderId,
        userId: userData._id,
      };

      userData?.deviceToken?.forEach((token) => {
        sendNotificationToUser(
          userPayload.subTitle,
          userPayload.body,
          userPayload.title,
          token,
          userPayload.orderId,
          userPayload.userId,
        );
      });

      await this.userNotificationService.insert(userPayload);
    }

    req.query = { limit: 50 };
    const deliveryBoyResponse = await this.deliveryBoyService.getAll(req.query);

    // if (deliveryBoyResponse.statusCode === 200) {
    //   const deliveryBoys = deliveryBoyResponse.data;
    //   for (let i = 0; i < deliveryBoys.length; i++) {
    //     const deliveryBoy = deliveryBoys[i];
    //     const message = `Dear delivery boy, We are pleased to inform you that you have a new order to deliver. Please accept the order as soon as possible to ensure timely delivery. Thank you for your cooperation. Best regards, Pootatos Link: https://admin.pootatos.com/deliveryboy/${deliveryBoy._id}/${id}`;
    //     await twilio.messages.create({
    //       body: message,
    //       from: from,
    //       to: deliveryBoy.phone,
    //     });
    //   }
    // }

    return res.status(response.statusCode).send(response);
  }
  async cancelOrder(req, res) {
    const response = await this.service.cancelOrder(req);
    return res.status(response.statusCode).send(response);
  }
  async acceptOrder(req, res) {
    const { id } = req.user;
    const deliveryBoyResponse = await this.deliveryBoyService.get(id);
    const response = await this.service.acceptOrder(req, id);

    if (response.statusCode === 200) {
      const { orderdBy, orderRestaurant } = response?.data;

      const { data: userData } = await userService.get(orderdBy);
      const { data: restaurantData } = await restaurantService.get(
        orderRestaurant,
      );

      const userPayload = {
        subTitle: restaurantData.name,
        title: `Delivery Agent Assigned`,
        body: `Your order is on its way!`,
        orderId: response.data.orderId,
        userId: userData._id,
      };

      const restaurantPayload = {
        subTitle: `Delivery Boy phone Number: ${deliveryBoyResponse?.data?.phone}`,
        title: `Delivery Boy phone Number: ${deliveryBoyResponse?.data?.phone}`,
        body: `Order Alert: A Delivery has Assigned For this order #${response.data.orderId} `,
        sound: 'default',
        orderId: response.data.orderId,
        restaurantId: restaurantData._id,
      };

      userData?.deviceToken?.forEach((token) => {
        sendNotificationToUser(
          userPayload.subTitle,
          userPayload.body,
          userPayload.title,
          token,
          userPayload.orderId,
          userPayload.userId,
        );
      });
      restaurantData?.deviceToken?.forEach((token) => {
        sendNotificationToRestaurant(
          restaurantPayload.subTitle,
          restaurantPayload.body,
          restaurantPayload.title,
          token,
          restaurantPayload.orderId,
          restaurantPayload.userId,
        );
      });

      await this.userNotificationService.insert(userPayload);
      await this.restaurantNotificationService.insert(restaurantPayload);
    }

    // if (deliveryBoyResponse.statusCode === 200) {
    //   const deliveryBoy = deliveryBoyResponse.data;
    //   await twilio.messages.create({
    //     body: `You Successfully Accepted Order`,
    //     from: from,
    //     to: deliveryBoy.phone,
    //   });
    // }
    return res.status(response.statusCode).send(response);
  }
  async completeOrder(req, res) {
    const { deliveryBoy } = req.body;

    const response = await this.service.completeOrder(req, deliveryBoy);

    if (response.statusCode === 200) {
      const { orderdBy, orderRestaurant } = response?.data;

      const { data: userData } = await userService.get(orderdBy);
      const { data: restaurantData } = await restaurantService.get(
        orderRestaurant,
      );

      const userPayload = {
        subTitle: restaurantData.name,
        title: `Your delivery has been completed.`,
        body: `Thank you for placing your order with us!`,
        orderId: response.data.orderId,
        userId: userData._id,
      };

      const restaurantPayload = {
        subTitle: `Your order is being delivered by our agent.`,
        title: `Delivery Alert: Your order is being delivered.`,
        body: `Order Delivered: Your delivery has been completed.`,
        sound: 'default',
        orderId: response.data.orderId,
        restaurantId: restaurantData._id,
      };

      userData?.deviceToken?.forEach((token) => {
        sendNotificationToUser(
          userPayload.subTitle,
          userPayload.body,
          userPayload.title,
          token,
          userPayload.orderId,
          userPayload.userId,
        );
      });
      restaurantData?.deviceToken?.forEach((token) => {
        sendNotificationToRestaurant(
          restaurantPayload.subTitle,
          restaurantPayload.body,
          restaurantPayload.title,
          token,
          restaurantPayload.orderId,
          restaurantPayload.userId,
        );
      });

      await this.userNotificationService.insert(userPayload);
      await this.restaurantNotificationService.insert(restaurantPayload);
    }

    const deliveryBoyResponse = await this.deliveryBoyService.get(
      response?.data?.deliveryBoy,
    );

    // if (deliveryBoyResponse.statusCode === 200) {
    //   const deliveryBoy = deliveryBoyResponse.data;
    //   await twilio.messages.create({
    //     body: `You Successfully Deliver the order`,
    //     from: from,
    //     to: deliveryBoy.phone,
    //   });
    // }

    return res.status(response.statusCode).send(response);
  }
  async getRestaurantDashboardData(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = verify(token, process.env.JWT_SECRET);
    const RestroStatus = await this.restaurantService.getOne({ _id: id });
    const response = await this.service.getRestaurantDashboardData(
      id,
      RestroStatus.data,
    );
    return res.status(response.statusCode).send(response);
  }

  async deliveryBoyAllOrder(req, res) {
    const id = req.user;
    const response = await this.service.deliveryBoyAllOrder(req.query, id);
    return res.status(response.statusCode).send(response);
  }
  async deliveryBoyOrderHistory(req, res) {
    const id = req.user;
    const response = await this.service.deliveryBoyOrderHistory(req.query, id);
    return res.status(response.statusCode).send(response);
  }
  async deliveryBoyDashboardData(req, res) {
    const response = await this.service.deliveryBoyDashboardData(req);
    return res.status(response.statusCode).send(response);
  }
}
export default new OrderController(
  orderService,
  userService,
  restaurantService,
  deliveryBoyService,
  userNotificationService,
  restaurantNotificationService,
);
