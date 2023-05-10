import Controller from './Controller';
import UserNotification from '../models/UserNotificationModel';
import UserNotificationService from '../services/UserNotificationService';
const userNotificationService = new UserNotificationService(
  new UserNotification().getInstance(),
);

class UserNotificationController extends Controller {
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
      { userId: id },
      orderBy,
    );
    return res.status(response.statusCode).send(response);
  }

  async softDeleteAllNotification(req, res) {
    const id = req.user.id;
    const where = { userId: id };
    const item = {
      deleted: true,
    };
    const response = await this.service.softDeleteAllNotification(where, item);
    return res.status(response.statusCode).send(response);
  }
}
export default new UserNotificationController(userNotificationService);
