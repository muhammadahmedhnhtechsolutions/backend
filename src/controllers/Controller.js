class Controller {
  constructor(service) {
    this.service = service;
    this.insert = this.insert.bind(this);
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.getOne = this.getOne.bind(this);
    this.updateWhere = this.updateWhere.bind(this);
    this.deleteMany = this.deleteMany.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.softDelete = this.softDelete.bind(this);
    this.getAllV2 = this.getAllV2.bind(this);
  }

  async insert(req, res) {
    const response = await this.service.insert(req.body);
    return res.status(201).send(response);
  }

  async getAll(req, res) {
    const response = await this.service.getAll(req.query);
    return res.status(response.statusCode).send(response);
  }

  async getAllV2(req, res) {
    const response = await this.service.getAll2(req.query);
    console.log("v2");
    response.found = true;
    return res.status(response.statusCode).send(response);
  }

  async get(req, res) {
    const { id } = req.params;
    const response = await this.service.get(id);
    return res.status(response.statusCode).send(response);
  }

  async getOne(req, res) {
    const response = await this.service.getOne(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(200).send(response);
  }

  async update(req, res) {
    const { id } = req.params;
    const response = await this.service.update(id, req.body);
    return res.status(response.statusCode).send(response);
  }
  async updateWhere(req, res) {
    const { id } = req.params;
    const response = await this.service.updateWhere(id, req.body);
    return res.status(response.statusCode).send(response);
  }

  async delete(req, res) {
    const { id } = req.params;
    const response = await this.service.delete(id);
    return res.status(response.statusCode).send(response);
  }
  async softDelete(req, res) {
    const response = await this.service.softDelete(req);
    return res.status(response.statusCode).send(response);
  }

  async deleteMany(req, res) {
    const response = await this.service.deleteMany(req.params);
    return res.status(response.statusCode).send(response);
  }
}

export default Controller;
