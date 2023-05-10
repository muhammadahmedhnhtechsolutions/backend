import CategoryController from '../controllers/CategoryController';
import adminAuth from '../middleware/adminAuth.middleware';
import auth from '../middleware/auth.middleware';

export default (router) => {
  //Public Route
  router.post(`/api/category`, adminAuth, CategoryController.createCategory);
  router.get(`/api/category`, auth, CategoryController.getAll);
  router.get(
    `/api/adminCategory/category`,
    adminAuth,
    CategoryController.getAllAdminCategory,
  );
  router.get(`/api/category/:id`, adminAuth, CategoryController.get);
  router.put(`/api/category/:id`, adminAuth, CategoryController.update);
  router.delete(`/api/category/:id`, adminAuth, CategoryController.softDelete);

  // router.get(`/api/category/data/update`, CategoryController.dataUpdate);

  router.get(`/api/v2/category`, auth, CategoryController.getAllV2);
};
