import Controller from './Controller';
import Menu from '../models/MenuModel';
import MenuService from '../services/MenuService';

const menuService = new MenuService(new Menu().getModel());

class MenuController extends Controller {
  constructor(service) {
    super(service);
    this.createMenu = this.createMenu.bind(this);
    this.insertCsvData = this.insertCsvData.bind(this);
    this.getAllMenu = this.getAllMenu.bind(this);
    this.getAllAdminMenu = this.getAllAdminMenu.bind(this);
    this.getRestaurantMenu = this.getRestaurantMenu.bind(this);
    this.getSingleMenu = this.getSingleMenu.bind(this);
    this.addReview = this.addReview.bind(this);
    this.UpdateAllmenu = this.UpdateAllmenu.bind(this);
    this.getAdminRestaurantMenu = this.getAdminRestaurantMenu.bind(this);
    this.dataUpdate = this.dataUpdate.bind(this);
  }

  async dataUpdate(req, res) {
    const response = await this.service.dataUpdate();
    return res.status(response.statusCode).send(response);
  }

  async createMenu(req, res) {
    const response = await this.service.createMenu(req, res);
    return res.status(response.statusCode).send(response);
  }
  async insertCsvData(req, res) {
    let response = await this.service.insertCsvData(req);
    return res.status(response.statusCode).send(response);
  }

  async addReview(req, res) {
    const response = await this.service.addReview(req, res);
    return res.status(response.statusCode).send(response);
  }
  async getAllMenu(req, res) {
    console.log("v1")
    const response = await this.service.getAllMenu(req.query);
    return res.status(response.statusCode).send(response);
  }
  async getAllAdminMenu(req, res) {
    const response = await this.service.getAllAdminMenu2(req.query);
    return res.status(response.statusCode).send(response);
  }
  async getSingleMenu(req, res) {
    const { id } = req.params;
    const response = await this.service.getSingleMenu(id);
    return res.status(response.statusCode).send(response);
  }
  async getRestaurantMenu(req, res) {
    const response = await this.service.getRestaurantMenu(req.query, req.user);
    return res.status(response.statusCode).send(response);
  }
  async getAdminRestaurantMenu(req, res) {
    const { restaurantId } = req.params;
    const response = await this.service.getAdminRestaurantMenu(
      req.query,
      restaurantId,
    );
    return res.status(response.statusCode).send(response);
  }
  async UpdateAllmenu(req, res) {
    const response = await this.service.UpdateAllmenu(req);
    return res.status(response.statusCode).send(response);
  }
}
export default new MenuController(menuService);
