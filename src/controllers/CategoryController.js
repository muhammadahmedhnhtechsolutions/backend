import Controller from './Controller';
import Category from '../models/CategoryModel';
import CategoryService from '../services/CategoryService';

const categoryService = new CategoryService(new Category().getInstance());

class CategoryController extends Controller {
  constructor(service) {
    super(service);
    this.createCategory = this.createCategory.bind(this);
    this.getAllAdminCategory = this.getAllAdminCategory.bind(this);
    this.dataUpdate = this.dataUpdate.bind(this);
  }

  async createCategory(req, res) {
    const response = await this.service.createCategory(req, res);
    return res.status(response.statusCode).send(response);
  }
  async getAllAdminCategory(req, res) {
    const response = await this.service.getAllAdminCategory(req.query);
    return res.status(response.statusCode).send(response);
  }

  async dataUpdate(req, res) {
    const response = await this.service.dataUpdate();
    return res.status(response.statusCode).send(response);
  }
}
export default new CategoryController(categoryService);
