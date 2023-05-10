import bcrypt from 'bcrypt';
import Controller from './Controller';
import { verify } from 'jsonwebtoken';
import Admin from '../models/AdminModel';
import AdminService from '../services/AdminService';

const adminService = new AdminService(new Admin().getInstance());

class AdminController extends Controller {
  constructor(service) {
    super(service);
    this.addAdmin = this.addAdmin.bind(this);
    this.getAdminProfile = this.getAdminProfile.bind(this);
    this.login = this.login.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async addAdmin(req, res) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    let adminData = req.body;
    adminData.password = hash;
    let response = await this.service.insert(adminData);
    return res.status(response.statusCode).send(response);
  }

  async getAdminProfile(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = verify(token, process.env.JWT_SECRET);
    const response = await this.service.get(id);
    return res.status(response.statusCode).send(response);
  }

  async login(req, res) {
    const response = await this.service.login(req.body);
    return res.status(response.statusCode).send(response);
  }

  async changePassword(req, res) {
    const response = await this.service.changePassword(req);
    return res.status(response.statusCode).send(response);
  }
}
export default new AdminController(adminService);
