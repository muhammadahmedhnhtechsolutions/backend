import Service from './Service';
import mongoose from 'mongoose';
import axios from 'axios';
import moment from 'moment';
require('dotenv').config();
import { URLSearchParams } from 'url';

// const origin = 'JJ Hospital, NH15, Tharad, Gujarat 385565';
// const destination = `Anand Nagar, Tharad, Gujarat 385565`;

// const params = new URLSearchParams({
//   origins: origin,
//   destinations: destination,
//   key: process.env.GEOCODER_API_KEY,
// });

// async function getDist() {
//   await axios
//     .get('https://maps.googleapis.com/maps/api/distancematrix/json?' + params)
//     .then((response) => {
//       const distance = response.data.rows[0].elements[0].distance.text;
//       console.log(distance);
//       console.log(`Distance between ${origin} and ${destination}: ${distance}`);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// getDist();

const JJ_HOSPITAL_ADDRESS = 'JJ Hospital, NH15, Tharad, Gujarat 385565';
const MAX_DISTANCE_IN_KM = 5000;

class OrderService extends Service {
  constructor(model) {
    super(model);
  }

  async todayRestaurantReport(query) {
    //get yesterday report
    // const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
    // const today = new Date();
    // const startOfYesterday = new Date(today.getTime() - oneDay);
    // startOfYesterday.setHours(0, 0, 0, 0); // Set to 00:00:00:000

    // const endOfYesterday = new Date(today.getTime() - oneDay);
    // endOfYesterday.setHours(23, 59, 59, 999); // Set to 23:59:59:999

    // Get start and end of today
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    try {
      // Aggregate orders for today
      const items = await this.model.aggregate([
        {
          $match: {
            deleted: { $ne: true },
            createdAt: {
              $gte: startOfToday,
              $lt: endOfToday,
            },
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalOrders: { $sum: 1 },
            totalPriceAfterAdminCommission: {
              $sum: '$totalPriceAfterAdminCommission',
            },
            totalAdminCommission: { $sum: '$adminCommission' },
            totalDeliveryCharge: { $sum: '$deliveryCharge' },
            todaysTotal: {
              $sum: {
                $add: [
                  '$totalPriceAfterAdminCommission',
                  '$totalAdminCommission',
                  '$totalDeliveryCharge',
                ],
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            orderRestaurant: '$_id',
            totalPriceAfterAdminCommission: 1,
            totalOrders: 1,
            totalAdminCommission: 1,
            totalDeliveryCharge: 1,
            todaysTotal: {
              $sum: {
                $add: [
                  '$totalPriceAfterAdminCommission',
                  '$totalAdminCommission',
                  '$totalDeliveryCharge',
                ],
              },
            },
          },
        },
        {
          $sort: { totalOrders: -1 },
        },
      ]);

      // Populate restaurant data
      await this.model.populate(items, {
        path: 'orderRestaurant',
        select: {
          _id: 1,
          name: 1,
          ownerName: 1,
          description: 1,
          phoneNumber: 1,
          address: 1,
          role: 1,
        },
      });

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

  async createOrder(req, userData, restaurantData) {
    try {
      // Get the latitude and longitude of JJ Hospital using the Google Maps Geocoding API
      // const jjHospital = await getCoordinates(JJ_HOSPITAL_ADDRESS);

      // Get the latitude and longitude of the customer's address using the Google Maps Geocoding API
      // const customerLocation = await getCoordinates(userData.address);

      // console.log(customerLocation, 'customerLocation');

      // Calculate the distance between JJ Hospital and the customer's location using the Haversine formula

      const distance = 3;
      // const distance = await getDistance(JJ_HOSPITAL_ADDRESS, userData.address);
      const {
        deliveryCharge,
        deliveryInstructions,
        item: cartItems,
        deliveryPhone = null,
      } = req.body;

      if (restaurantData.error === true) {
        return {
          error: true,
          message: `restaurant is not found can't place order`,
          statusCode: 400,
          data: null,
        };
      }

      // Check if all required fields are provided in user profile
      const requiredFields = [
        'firstName',
        'lastName',
        'phoneNumber',
        'address',
      ];
      const missingFields = requiredFields.filter((field) => !userData[field]);

      if (missingFields.length > 0) {
        return {
          error: true,
          message: `Missing required fields In User Profile: ${missingFields.join(
            ', ',
          )}`,
          statusCode: 400,
          data: null,
        };
      }

      // Check if all items in the cart belong to the same restaurant
      const restaurantIds = new Set(
        cartItems.map((item) => item.restaurant_id._id),
      );

      if (restaurantIds.size !== 1) {
        return {
          error: true,
          message: 'All items in the order must be from the same restaurant',
          statusCode: 400,
          data: null,
        };
      }

      // const RestaurantDistance = await getDistance(
      //   restaurantData.data?.address,
      //   userData.address,
      // );
      const RestaurantDistance = 3;

      // Get restaurant ID from cart items
      let restaurantId = getRestaurantId(cartItems);

      function getRestaurantId(cartItems) {
        for (let index = 0; index < cartItems.length; index++) {
          const element = cartItems[index];
          return element.restaurant_id._id;
        }
      }

      // Calculate total quantity and price of items in the cart

      const totalQuantity = cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.qty,
        0,
      );
      const totalPrice = cartItems.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.qty,
        0,
      );

      // Calculate admin commission based on total price
      const perOrderCommission = restaurantData?.data.perOrderCommission;
      let adminCommission = 0;

      for (let i = 0; i < perOrderCommission.length; i++) {
        const { minOrderAmount, maxOrderAmount, charge } =
          perOrderCommission[i];
        if (totalPrice >= minOrderAmount && totalPrice <= maxOrderAmount) {
          adminCommission = charge;
          break;
        }
      }

      // Calculate total price after admin commission and with delivery charge

      const totalPriceAfterAdminCommission = totalPrice - adminCommission;
      const totalPriceWithDeliveryCharge = deliveryCharge + totalPrice;
      const orderId = (await this.model.countDocuments()) + 1;

      const payload = {
        items: cartItems,
        totalQuantity,
        totalPrice,
        deliveryCharge,
        adminCommission,
        totalPriceAfterAdminCommission,
        totalPriceWithDeliveryCharge,
        deliveryInstructions,
        deliveryAddress: userData.location,
        deliveryPhone,
        deliveryTime: new Date(Date.now() + 30 * 60000),
        orderId,
        orderRestaurant: restaurantId,
        paymentMethod: 'COD',
        orderdBy: userData._id,
        orderDate: new Date(),
        distance: RestaurantDistance,
      };

      const data = await this.model.create(payload);
      return {
        error: false,
        message: `Order placed successfully`,
        statusCode: 200,
        data: data,
      };

      // if (distance?.distance?.value <= MAX_DISTANCE_IN_KM) {

      // } else {
      //   return {
      //     error: true,
      //     message: `Sorry, you must be within ${MAX_DISTANCE_IN_KM} meters/ 5 KM of JJ Hospital to place an order.`,
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

  async getAllOrder2(query) {
    console.log(query);
    let { skip, limit, start, length, search = '' } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    let id = query._id;
    if (id) {
      try {
        id = new mongoose.mongo.ObjectId(id);
      } catch (error) {
        // console.log('not able to generate mongoose id with content', id);
      }
    }
    const where = { deleted: { $ne: true } };

    // if (search) {
    //   where['$or'] = [
    //     // { title: { $regex: new RegExp(search, 'i') } },
    //     // { description: { $regex: new RegExp(search, 'i') } },
    //     {
    //       'orderRestaurant.name': { $regex: new RegExp(search, 'i') },
    //     },
    //     {
    //       'orderdBy.firstName': { $regex: new RegExp(search, 'i') },
    //     },
    //     {
    //       'orderdBy.lastName': { $regex: new RegExp(search, 'i') },
    //     },
    //     {
    //       'deliveryBoy.firstName': { $regex: new RegExp(search, 'i') },
    //     },
    //     {
    //       'deliveryBoy.lastName': { $regex: new RegExp(search, 'i') },
    //     },
    //   ];
    // }

    try {
      const items = await this.model
        .find(where)
        .select('-items')
        .populate('orderRestaurant', '-images')
        .populate('orderdBy', '-profileImage')
        .populate('deliveryBoy')
        .skip(start)
        .limit(length)
        .sort({ createdAt: -1 });
      const total = await this.model.countDocuments(where);

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        total,
        recordsTotal: total,
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

  async getAllOrder(query) {
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
      } catch (error) {
        // console.log('not able to generate mongoose id with content', id);
      }
    }

    query.deleted = { $ne: true };

    try {
      const items = await this.model
        .find(query)
        .select('-items')
        .populate('orderRestaurant', '-images')
        .populate('orderdBy', '-profileImage')
        .populate('deliveryBoy')
        .skip(skip)
        .limit(limit)
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
        // draw: req.query.draw,
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

  async getDeliverBoyAndOrderData(req) {
    const { orderId } = req.params;
    try {
      const items = await this.model
        .findById(orderId)
        .populate('orderRestaurant', '-image')
        .populate('orderdBy')
        .populate('deliveryBoy')
        .exec();

      // test

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

  async getAllOrderByRestaurantId(query, restaurantId) {
    let { skip, limit } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    if (restaurantId) {
      try {
        query.orderRestaurant = mongoose.Types.ObjectId(restaurantId);
      } catch (error) {
        console.error(`Failed to create an object ID from ${query.userId}`);
      }
    }

    query.deleted = { $ne: true };

    try {
      const items = await this.model
        .find(query)
        .populate('orderRestaurant', '-image')
        .populate('orderdBy')
        .populate('deliveryBoy')
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

  async getAllTodayRestaurantOrder(req) {
    const { restroId } = req.params;
    const today = moment().startOf('day');
    let query = {
      orderRestaurant: restroId,
      createdAt: {
        $gte: today.toDate(),
        $lt: moment(today).endOf('day').toDate(),
      },
      deleted: { $ne: true },
    };

    try {
      const items = await this.model
        .find(query)
        .populate('orderRestaurant', '-image')
        .populate('orderdBy')
        .populate('deliveryBoy')
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

  async getAllOrderByCustomerId(query, userId = null) {
    let { skip, limit } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    if (userId) {
      try {
        query.orderdBy = mongoose.Types.ObjectId(userId);
      } catch (error) {
        console.error(`Failed to create an object ID from ${query.userId}`);
      }
    }

    query.deleted = { $ne: true };

    try {
      const items = await this.model
        .find(query)
        .populate('orderRestaurant', '-image')
        .populate('orderdBy')
        .populate('deliveryBoy')
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

  async getOrder(id) {
    try {
      const items = await this.model
        .findById(id)
        .populate('orderRestaurant', '-image')
        .populate('orderdBy')
        .populate('deliveryBoy')
        .select(['-password']);

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

  async confirmOrder(req) {
    const { orderId: id } = req.params;
    const item = {
      orderStatus: 'Confirmed',
    };
    try {
      const data = await this.model.findByIdAndUpdate(id, item, { new: true });
      return {
        error: false,
        message: 'Order Confirm successfully',
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

  async cancelOrder(req) {
    try {
      const { orderId: id } = req.params;
      const item = {
        orderStatus: 'Cancelled',
      };
      const data = await this.model.findByIdAndUpdate(id, item, { new: true });
      return {
        error: false,
        message: 'Order Cancelled',
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

  async acceptOrder(req, deliveryBoy) {
    const { orderId: id } = req.params;
    const item = {
      deliveryBoy: deliveryBoy,
      isdeliveryBoyAccept: true,
    };

    try {
      const data = await this.model.findByIdAndUpdate(id, item, { new: true });
      return {
        error: false,
        message: 'successfullly Deliver the order',
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
  async completeOrder(req, deliveryBoy) {
    const { orderId: id } = req.params;
    const item = {
      orderStatus: 'Completed',
      deliveryBoy,
    };
    try {
      const data = await this.model.findByIdAndUpdate(id, item, { new: true });
      return {
        error: false,
        message: 'successfullly Deliver the order',
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

  async getRestaurantDashboardData(id, RestroStatus) {
    try {
      const today = moment().startOf('day');
      const thisWeek = moment().startOf('week');
      const thisMonth = moment().startOf('month');

      const todayOrdersRevenue = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: today.toDate(),
              $lte: moment().endOf('day').toDate(),
            },
            orderStatus: 'Completed',
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: {
              $sum: '$totalPriceAfterAdminCommission',
            },
          },
        },
      ]);

      const thisWeekOrdersRevenue = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisWeek.toDate(),
              $lte: moment().endOf('week').toDate(),
            },
            orderStatus: 'Completed',
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$totalPriceAfterAdminCommission' },
          },
        },
      ]);
      const thisMonthOrdersRevenue = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisMonth.toDate(),
              $lte: moment().endOf('month').toDate(),
            },
            orderStatus: 'Completed',
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$totalPriceAfterAdminCommission' },
          },
        },
      ]);

      const dashBoardData = {
        todayOrdersRevenue:
          todayOrdersRevenue.length >= 1
            ? todayOrdersRevenue[0].totalAmount
            : 0,
        thisWeekOrdersRevenue:
          thisWeekOrdersRevenue.length >= 1
            ? thisWeekOrdersRevenue[0].totalAmount
            : 0,
        thisMonthOrdersRevenue:
          thisMonthOrdersRevenue.length >= 1
            ? thisMonthOrdersRevenue[0].totalAmount
            : 0,
        restroStatus: RestroStatus.restaurantStatus,
      };

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        data: dashBoardData,
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

  async getSingleRestaurantDeshboardData(id) {
    try {
      const today = moment().startOf('day');
      const thisWeek = moment().startOf('week');
      const thisMonth = moment().startOf('month');

      // Total Revenu
      const todayOrdersRevenue = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: today.toDate(),
              $lte: moment().endOf('day').toDate(),
            },
            deleted: { $ne: true },
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: {
              $sum: '$totalPriceAfterAdminCommission',
            },
          },
        },
      ]);

      const thisWeekOrdersRevenue = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisWeek.toDate(),
              $lte: moment().endOf('week').toDate(),
            },
            deleted: { $ne: true },
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$totalPriceAfterAdminCommission' },
          },
        },
      ]);
      const thisMonthOrdersRevenue = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisMonth.toDate(),
              $lte: moment().endOf('month').toDate(),
            },
            deleted: { $ne: true },
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$totalPriceAfterAdminCommission' },
          },
        },
      ]);

      //Total Order
      const todayOrderCount = await this.model.countDocuments({
        createdAt: {
          $gte: today.toDate(),
          $lte: moment().endOf('day').toDate(),
        },
        deleted: { $ne: true },
        orderRestaurant: id,
      });
      const weekOrderCount = await this.model.countDocuments({
        createdAt: {
          $gte: thisWeek.toDate(),
          $lte: moment().endOf('week').toDate(),
        },
        deleted: { $ne: true },
        orderRestaurant: id,
      });
      const monthOrderCount = await this.model.countDocuments({
        createdAt: {
          $gte: thisMonth.toDate(),
          $lte: moment().endOf('month').toDate(),
        },
        deleted: { $ne: true },
        orderRestaurant: id,
      });

      //Total Delivery Charge
      const todayDeliveryCharge = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisWeek.toDate(),
              $lte: moment().endOf('week').toDate(),
            },
            deleted: { $ne: true },
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$deliveryCharge' },
          },
        },
      ]);
      const thisWeekDeliveryCharge = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisWeek.toDate(),
              $lte: moment().endOf('week').toDate(),
            },
            deleted: { $ne: true },
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$deliveryCharge' },
          },
        },
      ]);
      const thisMonthDeliveryCharge = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisMonth.toDate(),
              $lte: moment().endOf('month').toDate(),
            },
            deleted: { $ne: true },
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$deliveryCharge' },
          },
        },
      ]);

      //admin Commission

      const todayAdminCommission = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisWeek.toDate(),
              $lte: moment().endOf('week').toDate(),
            },
            deleted: { $ne: true },
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$adminCommission' },
          },
        },
      ]);
      const thisWeekadminCommission = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisWeek.toDate(),
              $lte: moment().endOf('week').toDate(),
            },
            deleted: { $ne: true },
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$adminCommission' },
          },
        },
      ]);
      const thisMonthadminCommission = await this.model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: thisMonth.toDate(),
              $lte: moment().endOf('month').toDate(),
            },
            deleted: { $ne: true },
            orderRestaurant: mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$orderRestaurant',
            totalAmount: { $sum: '$adminCommission' },
          },
        },
      ]);

      // total order revenue
      const totalOrderRevenue = {
        todayOrdersRevenue:
          todayOrdersRevenue.length >= 1
            ? todayOrdersRevenue[0].totalAmount
            : 0,
        thisWeekOrdersRevenue:
          thisWeekOrdersRevenue.length >= 1
            ? thisWeekOrdersRevenue[0].totalAmount
            : 0,
        thisMonthOrdersRevenue:
          thisMonthOrdersRevenue.length >= 1
            ? thisMonthOrdersRevenue[0].totalAmount
            : 0,
      };

      //total order
      const totalOrder = {
        todayOrderCount,
        weekOrderCount,
        monthOrderCount,
      };

      //total Delivery Charge
      const totalDeliveryCharge = {
        todayDeliveryCharge:
          todayDeliveryCharge.length >= 1
            ? todayDeliveryCharge[0].totalAmount
            : 0,
        thisWeekDeliveryCharge:
          thisWeekDeliveryCharge.length >= 1
            ? thisWeekDeliveryCharge[0].totalAmount
            : 0,
        thisMonthDeliveryCharge:
          thisMonthDeliveryCharge.length >= 1
            ? thisMonthDeliveryCharge[0].totalAmount
            : 0,
      };

      // total Admin Commission
      const totalAdminCommission = {
        todayAdminCommission:
          todayAdminCommission.length >= 1
            ? todayAdminCommission[0].totalAmount
            : 0,
        thisWeekadminCommission:
          thisWeekadminCommission.length >= 1
            ? thisWeekadminCommission[0].totalAmount
            : 0,
        thisMonthadminCommission:
          thisMonthadminCommission.length >= 1
            ? thisMonthadminCommission[0].totalAmount
            : 0,
      };

      const data = {
        totalOrderRevenue,
        totalOrder,
        totalDeliveryCharge,
        totalAdminCommission,
      };
      return {
        error: false,
        message: 'request successfullly',
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

  async deliveryBoyAllOrder(query, id) {
    let { skip, limit, orderStatus = null, isdeliveryBoyAccept = null } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    const today = moment().startOf('day');

    query = {
      createdAt: {
        $gte: today.toDate(),
        $lt: moment(today).endOf('day').toDate(),
      },
      deleted: { $ne: true },
    };

    if (orderStatus === 'Confirmed' && isdeliveryBoyAccept === 'false') {
      query.orderStatus = 'Confirmed';
      query.isdeliveryBoyAccept = false;
    }

    if (
      (orderStatus === 'Confirmed' && isdeliveryBoyAccept === 'true') ||
      (orderStatus === 'Completed' && isdeliveryBoyAccept === 'true')
    ) {
      query.$and = [
        { deliveryBoy: mongoose.mongo.ObjectId(id) },
        { isdeliveryBoyAccept: true },
        { orderStatus: orderStatus },
      ];
    }

    try {
      const items = await this.model
        .find(query)
        .populate('orderRestaurant', '-image')
        .populate('orderdBy')
        .populate('deliveryBoy')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();
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

  async deliveryBoyOrderHistory(query, id) {
    let { skip, limit } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    query = {
      deliveryBoy: mongoose.mongo.ObjectId(id),
      orderStatus: 'Completed',
      isdeliveryBoyAccept: true,
      deleted: { $ne: true },
    };

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

  async deliveryBoyDashboardData(req) {
    const { id } = req.user;

    const today = moment().startOf('day');
    const thisWeek = moment().startOf('week');
    const thisMonth = moment().startOf('month');

    const filters = {
      orderStatus: 'Completed',
      isdeliveryBoyAccept: true,
      deleted: { $ne: true },
      deliveryBoy: mongoose.Types.ObjectId(id),
    };

    const getOrdersRevenue = async (startDate, endDate) => {
      const ordersRevenue = await this.model.find({
        createdAt: {
          $gte: startDate.toDate(),
          $lte: endDate.toDate(),
        },
        ...filters,
      });
      return ordersRevenue;
    };

    try {
      const [
        todayOrdersRevenue,
        thisWeekOrdersRevenue,
        thisMonthOrdersRevenue,
      ] = await Promise.all([
        getOrdersRevenue(today, moment().endOf('day')),
        getOrdersRevenue(thisWeek, moment().endOf('week')),
        getOrdersRevenue(thisMonth, moment().endOf('month')),
      ]);

      const dashBoardData = {
        today: {
          orders: todayOrdersRevenue.length,
          revenue: todayOrdersRevenue.reduce(
            (total, order) => total + order.deliveryCharge,
            0,
          ),
        },
        thisWeek: {
          orders: thisWeekOrdersRevenue.length,
          revenue: thisWeekOrdersRevenue.reduce(
            (total, order) => total + order.deliveryCharge,
            0,
          ),
        },
        thisMonth: {
          orders: thisMonthOrdersRevenue.length,
          revenue: thisMonthOrdersRevenue.reduce(
            (total, order) => total + order.deliveryCharge,
            0,
          ),
        },
      };

      return {
        error: false,
        message: 'Request successful',
        statusCode: 200,
        data: dashBoardData,
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

  // async sandUserAnyNotification(req) {
  //   try {
  //     const users = await this.model.find();

  //     const userPayload = {
  //       subTitle: `આશ્ચર્યજનક સમાચાર!`,
  //       title: `આશ્ચર્યજનક સમાચાર!`,
  //       body: `અમારા સન્ડે સ્પેશિયલ સાથે તમારા સપ્તાહની શરૂઆત કરો! હમણાં જ ઓર્ડર કરો અને સ્વાદિષ્ટ ભોજન સાથે તમારા રવિવારનો આનંદ માણો.`,
  //     };

  //     users?.forEach((user) => {
  //       if (user) {
  //         user?.deviceToken?.forEach((token) => {
  //           sendNotificationToUser(
  //             userPayload.subTitle,
  //             userPayload.body,
  //             userPayload.title,
  //             token,
  //             user._id,
  //           );
  //         });
  //       }
  //     });

  //     return {
  //       error: false,
  //       message: 'send notificaton successfullly',
  //       statusCode: 200,
  //       data: `send notificatioin successfullly`,
  //     };
  //   } catch (error) {
  //     return {
  //       error: true,
  //       message: error.message,
  //       statusCode: 400,
  //       data: null,
  //     };
  //   }
  // }
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
//     // console.log(
//     //   `Distance between ${origin} and ${destination}: ${distance?.distance?.text}`,
//     // );
//     return distance;
//   } catch (error) {
//     console.error(error);
//   }
// }

export default OrderService;
