import RestaurantController from '../controllers/RestaurantController';
import adminAuth from '../middleware/adminAuth.middleware';
import auth from '../middleware/auth.middleware';
import singleCSVUpload from '../middleware/uploadCsv.middlevare';

export default (router) => {
  // resttaurant Auth
  router.post(`/api/restaurant/auth/sendOtp`, RestaurantController.sendOtp);
  router.post(`/api/restaurant/auth/reSendOtp`, RestaurantController.reSendOtp);
  router.post(
    `/api/restaurant/auth/otpVerified`,
    RestaurantController.otpVerified,
  );

  //for App
  router.get(`/api/restaurant`, auth, RestaurantController.getAllRestaurant);
  router.get(
    `/api/restaurantProfile`,
    auth,
    RestaurantController.getRestaurantProfile,
  );
  //restaurant and there menu
  router.get(
    `/api/restaurant/:id`,
    auth,
    RestaurantController.getSingleRestaurantAndThereMenu,
  );
  router.put(
    `/api/changeRestaurantStatus`,
    auth,
    RestaurantController.changeRestaurantStatus,
  );

  //for admin
  router.post(
    `/api/restaurant`,
    adminAuth,
    RestaurantController.createRestaurant,
  );
  router.post(
    `/api/restaurant/csvUpload`,
    adminAuth,
    singleCSVUpload,
    RestaurantController.insertCsvData,
  );
  router.get(
    `/api/adminRestaurant/restaurant`,
    adminAuth,
    RestaurantController.getAllAdminRestaurant,
  );
  router.get(
    `/api/restaurant/commission/:id`,
    adminAuth,
    RestaurantController.getPerOrderCommission,
  );
  router.put(
    `/api/restaurant/commission/:id`,
    adminAuth,
    RestaurantController.getPerOrderCommission,
  );
  router.get(
    `/api/singleRestaurant/:id`,
    adminAuth,
    RestaurantController.getSingleRestaurant,
  );
  router.get(
    `/api/restaurant/category/:id`,
    auth,
    RestaurantController.getAllCategoryRestaurant,
  );
  router.put(
    `/api/restaurant/:id`,
    auth,
    RestaurantController.updateRestaurant,
  );

  router.put(
    `/api/admin/changeRestaurantStatus`,
    auth,
    RestaurantController.changeRestaurantStatus,
  );
  router.put(
    `/api/admin/changeAllRestaurantStatus`,
    adminAuth,
    RestaurantController.changeAllRestaurantStatus,
  );
  router.put(
    `/api/changeRestaurantStatus/:id`,
    adminAuth,
    RestaurantController.adminChangeRestaurantStatus,
  );

  router.put(`/api/statusRestaurant/:id`, auth, RestaurantController.update);
  router.delete(
    `/api/restaurant/:id`,
    auth,
    RestaurantController.deleteRestaurant,
  );
  router.delete(
    `/api/deleteUser`,
    auth,
    RestaurantController.deleteUserAndRestaurant,
  );


  //router.get(`/api/restaurant/data/update`, RestaurantController.dataUpdate);

  router.get(`/api/v2/restaurant`, auth, RestaurantController.getAllRestaurant2);
};
