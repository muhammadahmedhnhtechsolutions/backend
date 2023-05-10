import CommonEnumController from '../controllers/CommonEnumController';

export default (router) => {
  //Public Route
  router.post(`/api/commonEnum`, CommonEnumController.insertCommonEnum);
  router.get(`/api/commonEnum`, CommonEnumController.getAllEnums);
  router.get(`/api/commonEnum/:id`, CommonEnumController.get);
  router.put(`/api/commonEnum/:id`, CommonEnumController.updateCommonEnum);
  router.put(`/api/commonEnum/:id`, CommonEnumController.update);
  router.delete(`/api/commonEnum/:id`, CommonEnumController.deleteCommonEnum);
};
