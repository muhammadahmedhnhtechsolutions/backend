import AdminController from '../controllers/AdminController';
import adminAuth from '../middleware/adminAuth.middleware';

export default (router) => {
  //Public Route
  router.post(`/api/auth/admin`, AdminController.addAdmin);
  router.post(`/api/auth/admin/login`, AdminController.login);
  router.post(
    `/api/auth/admin/changePassword/:id`,
    adminAuth,
    AdminController.changePassword,
  );
  router.get(`/api/auth/admin`, adminAuth, AdminController.getAdminProfile);
  router.get(`/api/auth/admin/:id`, adminAuth, AdminController.get);
  router.put(`/api/auth/admin/:id`, adminAuth, AdminController.update);
  router.delete(`/api/auth/admin/:id`, adminAuth, AdminController.softDelete);
};
