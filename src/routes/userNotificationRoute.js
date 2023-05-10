import UserNotificationController from '../controllers/UserNotificationController';
import auth from '../middleware/auth.middleware';

export default (router) => {
  //Public Route
  //   router.post(
  //     `/api/customer/notification`,
  //     auth,
  //     UserNotificationController.insert,
  //   );
  router.get(
    `/api/customer/notification`,
    auth,
    UserNotificationController.getAllNotification,
  );
  //   router.get(
  //     `/api/customer/notification/:id`,
  //     auth,
  //     UserNotificationController.get,
  //   );
  //   router.put(
  //     `/api/customer/notification/:id`,
  //     auth,
  //     UserNotificationController.update,
  //   );
  //   router.delete(
  //     `/api/customer/notification/:id`,
  //     auth,
  //     UserNotificationController.delete,
  //   );
  router.delete(
    `/api/customer/notification`,
    auth,
    UserNotificationController.softDeleteAllNotification,
  );
};
