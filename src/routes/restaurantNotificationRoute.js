import RestaurantNotificationController from '../controllers/RestaurantNotificationController';
import auth from '../middleware/auth.middleware';

export default (router) => {
  router.get(
    `/api/restaurant/notification`,
    auth,
    RestaurantNotificationController.getAllNotification,
  );

  router.delete(
    `/api/restaurant/notification`,
    auth,
    RestaurantNotificationController.softDeleteAllNotification,
  );
};
