import Controller from './Controller';
import RestaurantNotification from '../models/RestaurantNotificationModel';
import RestaurantNotificationService from '../services/RestaurantNotificationService';
const restaurantNotificationService = new RestaurantNotificationService(
  new RestaurantNotification().getInstance(),
);

class RestaurantNotificationController extends Controller {
  constructor(service) {
    super(service);
    this.getAllNotification = this.getAllNotification.bind(this);
    this.softDeleteAllNotification = this.softDeleteAllNotification.bind(this);
  }

  async getAllNotification(req, res) {
    const id = req.user.id;
    var orderBy = ['createdAt', -1];
    const response = await this.service.getAllNotification(
      req.query,
      { restaurantId: id },
      orderBy,
    );
    return res.status(response.statusCode).send(response);
  }

  async softDeleteAllNotification(req, res) {
    const id = req.user.id;
    const where = { restaurantId: id };
    const item = {
      deleted: true,
    };
    const response = await this.service.softDeleteAllNotification(where, item);
    return res.status(response.statusCode).send(response);
  }
}
export default new RestaurantNotificationController(
  restaurantNotificationService,
);
