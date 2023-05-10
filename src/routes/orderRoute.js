import OrderController from '../controllers/OrderController';
import auth from '../middleware/auth.middleware';
import deliveryBoyAuth from '../middleware/deliveryBoy.Auth.middleware';

export default (router) => {
  //Public Route
  router.post(
    `/api/admin/sendUserAnyNotification`,
    OrderController.sendAdminNotificationToAll,
  );
  router.post(`/api/order`, auth, OrderController.createOrder);
  router.post(
    `/api/order/:orderId/confirm`,
    auth,
    OrderController.confirmOrder,
  );
  router.get(
    `/api/deliveryboy/:deliveryBoyId/:orderId`,
    OrderController.getDeliverBoyAndOrderData,
  );
  router.post(`/api/order/:orderId/cancel`, auth, OrderController.cancelOrder);

  //for deliveryBoyAllOrder
  router.post(
    `/api/order/:orderId/accept`,
    deliveryBoyAuth,
    OrderController.acceptOrder,
  );
  router.post(
    `/api/order/:orderId/complete`,
    deliveryBoyAuth,
    OrderController.completeOrder,
  );
  /////////////////
  router.get(`/api/order`, auth, OrderController.getAllOrder);
  router.get(
    `/api/order/restaurant`,
    auth,
    OrderController.getAllOrderByRestaurantId,
  );
  router.get(
    `/api/order/todayRestaurantOrder/:restroId`,
    auth,
    OrderController.getAllTodayRestaurantOrder,
  );
  router.get(
    `/api/order/customer`,
    auth,
    OrderController.getAllOrderByCustomerId,
  );
  // dahsboard
  router.get(
    `/api/dashboard/restaurent`,
    auth,
    OrderController.getRestaurantDashboardData,
  );
  router.get(
    `/api/report/todayRestaurantReport`,
    auth,
    OrderController.todayRestaurantReport,
  );

  // router.get(`/api/todayRestro/:id`, auth, OrderController.getOrder);

  router.get(`/api/order/:id`, auth, OrderController.getOrder);
  router.put(`/api/order/:id`, auth, OrderController.update);
  router.delete(`/api/order/:id`, auth, OrderController.softDelete);

  // deliveryBoy route
  router.get(
    `/api/deliveryBoyAllOrder`,
    deliveryBoyAuth,
    OrderController.deliveryBoyAllOrder,
  );
  router.get(
    `/api/deliveryBoyOrderHistory`,
    deliveryBoyAuth,
    OrderController.deliveryBoyOrderHistory,
  );
  router.get(
    `/api/dashboard/deliveryBoyDashboardData`,
    deliveryBoyAuth,
    OrderController.deliveryBoyDashboardData,
  );
};
