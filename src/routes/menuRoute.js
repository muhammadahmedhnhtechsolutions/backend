import MenuController from '../controllers/MenuController';
import auth from '../middleware/auth.middleware';
import adminAuth from '../middleware/adminAuth.middleware';
import singleCSVUpload from '../middleware/uploadCsv.middlevare';

export default (router) => {
  //App Route
  router.get(`/api/menu`, auth, MenuController.getAllMenu);
  router.get(
    `/api/getRestaurant/allMenu`,
    auth,
    MenuController.getRestaurantMenu,
  );
  router.get(`/api/menu/:id`, auth, MenuController.getSingleMenu);
  router.put(`/api/menu/review/:id`, auth, MenuController.addReview);

  //Admin Route
  router.post(`/api/menu`, auth, MenuController.createMenu);
  router.post(
    `/api/menu/csvUpload`,
    auth,
    singleCSVUpload,
    MenuController.insertCsvData,
  );
  router.get(`/api/adminMenu/menu`, auth, MenuController.getAllAdminMenu);
  router.get(
    `/api/getRestaurantMenu/:restaurantId`,
    adminAuth,
    MenuController.getAdminRestaurantMenu,
  );

  router.put(`/api/menu/:id`, auth, MenuController.update);
  router.put(`/api/UpdateAllmenu`, auth, MenuController.UpdateAllmenu);
  router.delete(`/api/menu/:id`, auth, MenuController.softDelete);

  // router.get(`/api/menu/data/update`, MenuController.dataUpdate);

  router.get(`/api/v2/menu`, auth, MenuController.getAllV2);
};
