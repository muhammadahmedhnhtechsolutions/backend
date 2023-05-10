import DeliveryBoyController from '../controllers/DeliveryBoyController';
import auth from '../middleware/auth.middleware';
import adminAuth from '../middleware/adminAuth.middleware';

export default (router) => {
  //Public Route
  // deliveryBoy route
  router.post(`/api/deliveryBoy/auth/sendOtp`, DeliveryBoyController.sendOtp);
  router.post(
    `/api/deliveryBoy/auth/otpVerified`,
    DeliveryBoyController.otpVerified,
  );
  router.post(
    `/api/deliveryBoy`,
    adminAuth,
    DeliveryBoyController.insertDeliveryBoy,
  );
  router.get(`/api/deliveryBoy`, auth, DeliveryBoyController.getAll);
  router.get(`/api/deliveryBoy/:id`, auth, DeliveryBoyController.get);
  router.put(
    `/api/deliveryBoy/:id`,
    auth,
    DeliveryBoyController.updateDeliveryBoy,
  );
  router.delete(`/api/deliveryBoy/:id`, auth, DeliveryBoyController.softDelete);
};
