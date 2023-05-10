import Controller from '../controllers/Controller';
import CommonEnum from '../models/CommonEnumModel';
import CommonEnumServices from '../services/CommonEnumServices';

const commonEnumServices = new CommonEnumServices(
  new CommonEnum().getInstance(),
);

class CommonEnumController extends Controller {
  constructor(service) {
    super(service);
    this.insertCommonEnum = this.insertCommonEnum.bind(this);
    this.deleteCommonEnum = this.deleteCommonEnum.bind(this);
    this.getAllEnums = this.getAllEnums.bind(this);
    this.updateCommonEnum = this.updateCommonEnum.bind(this);
  }

  async insertCommonEnum(req, res) {
    const response = await this.service.insertCommonEnum(req);
    return res.status(response.statusCode).send(response);
  }
  async deleteCommonEnum(req, res) {
    const response = await this.service.deleteCommonEnum(req);
    return res.status(response.statusCode).send(response);
  }
  async getAllEnums(req, res) {
    const response = await this.service.getAllEnums(req);
    return res.status(response.statusCode).send(response);
  }
  async updateCommonEnum(req, res) {
    const response = await this.service.updateCommonEnum(req);
    return res.status(response.statusCode).send(response);
  }
}
export default new CommonEnumController(commonEnumServices);
