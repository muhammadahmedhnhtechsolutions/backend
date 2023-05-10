import Controller from './Controller';
import DeliveryBoyNotification from '../models/DeliveryBoyNotificationModel';
import DeliveryBoyNotificationService from '../services/DeliveryBoyNotificationService';
const deliveryBoyNotificationService = new DeliveryBoyNotificationService(
  new DeliveryBoyNotification().getInstance(),
);

class DeliveryBoyNotificationController extends Controller {
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
export default new DeliveryBoyNotificationController(
  deliveryBoyNotificationService,
);
