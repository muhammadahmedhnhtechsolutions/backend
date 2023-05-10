import SliderController from '../controllers/SliderController';

export default (router) => {
  //Public Route
  router.post(`/api/slider`, SliderController.insert);
  router.get(`/api/slider`, SliderController.getAll);
  router.get(`/api/slider/:id`, SliderController.get);
  router.put(`/api/slider/:id`, SliderController.update);
  router.delete(`/api/slider/:id`, SliderController.delete);
};
