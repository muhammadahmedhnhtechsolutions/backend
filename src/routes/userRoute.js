import UserController from '../controllers/UserController';
import auth from '../middleware/auth.middleware';
import adminAuth from '../middleware/adminAuth.middleware';

export default (router) => {
  router.post(`/api/auth/sendOtp`, UserController.sendOtp);
  router.post(`/api/auth/reSendOtp`, UserController.reSendOtp);
  router.post(`/api/auth/otpVerified`, UserController.otpVerified);
  router.put(`/api/auth/address`, auth, UserController.updateAddress);
  router.put(`/api/auth/signUp`, auth, UserController.signUp);
  router.get(`/api/user/profile`, auth, UserController.getUserProfile);
  router.put(`/api/user/profile`, auth, UserController.updateUserProfile);
  router.get(`/api/user`, adminAuth, UserController.getAll);
  router.get(`/api/user/:id`, adminAuth, UserController.get);
  router.put(`/api/user/:id`, adminAuth, UserController.update);
  router.delete(`/api/user/:id`, auth, UserController.softDelete);

  router.post(`/api/v2/auth/login`, UserController.login);
};
