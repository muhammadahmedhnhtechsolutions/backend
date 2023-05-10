//Customer
import User from '../models/UserModel.js';
const UserModel = new User().getModel();

//Restaurant
import Restaurant from '../models/RestaurantModel.js';
const RestaurantModel = new Restaurant().getModel();

//Delivery
import DeliveryBoy from '../models/DeliveryBoyModel.js';
const DeliveryBoyModel = new DeliveryBoy().getModel();

//order
import Order from '../models/OrderModel.js';
const OrderModel = new Order().getModel();

export async function adminDashboard(req, res) {
  try {
    const totalCustomer = await UserModel.countDocuments({
      deleted: { $ne: true },
    });
    const totalRestaurant = await RestaurantModel.countDocuments({
      deleted: { $ne: true },
    });
    const totalDeliveryBoy = await DeliveryBoyModel.countDocuments({
      deleted: { $ne: true },
    });
    const totalOrder = await OrderModel.countDocuments({
      deleted: { $ne: true },
    });

    // const todayOrdersRevenue = await OrderModel.aggregate([
    //   {
    //     $match: {
    //       createdAt: {
    //         $gte: today.toDate(),
    //         $lte: moment().endOf('day').toDate(),
    //       },
    //       orderStatus: 'Completed',
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$orderRestaurant',
    //       totalAmount: {
    //         $sum: '$totalPriceAfterAdminCommission',
    //       },
    //     },
    //   },
    // ]);

    const allTimeOrdersRevenue = await OrderModel.aggregate([
      // Filter out deleted orders
      {
        $match: { deleted: { $ne: true } },
      },
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 },
          totalPrice: { $sum: '$totalPrice' },
          deliveryCharge: { $sum: '$deliveryCharge' },
          adminCommission: { $sum: '$adminCommission' },
        },
      },
      // Rename _id field to orderStatus
      {
        $project: {
          _id: 0,
          orderStatus: '$_id',
          count: 1,
          totalPrice: 1,
          deliveryCharge: 1,
          adminCommission: 1,
        },
      },
    ]);

    const allTimeTotal = allTimeOrdersRevenue.reduce(
      (acc, val) => {
        acc.count += val.count;
        acc.totalPrice += val.totalPrice;
        acc.deliveryCharge += val.deliveryCharge;
        acc.adminCommission += val.adminCommission;
        return acc;
      },
      { count: 0, totalPrice: 0, deliveryCharge: 0, adminCommission: 0 },
    );

    const dashBoardData = {
      totalCustomer,
      totalRestaurant,
      totalDeliveryBoy,
      totalOrder,
      allTimeOrdersRevenue,
      allTimeTotal,
    };

    const response = {
      error: false,
      message: 'request successfullly',
      statusCode: 200,
      data: {
        dashBoardData,
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    res.status(400).send({
      error: true,
      statusCode: 400,
      message: error.message,
      data: null,
    });
  }
}
