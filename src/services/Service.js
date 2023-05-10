import mongoose from 'mongoose';

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.getOne = this.getOne.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.updateWhere = this.updateWhere.bind(this);
    this.delete = this.delete.bind(this);
    this.softDelete = this.softDelete.bind(this);
    this.deleteMany = this.deleteMany.bind(this);
  }

  async getAll2(query) {
    let { start = 1, end = 10 } = query;

    const limit = (Number(end)) - (start - 1);
    console.log('limit ==> ', limit);
    try {
      const items = await this.model
        .find(query)
        .populate('category_id', '-image')
        .populate('restaurant_id')
        .select(['-password'])
        .skip(start - 1)
        .limit(limit)
        .sort({ createdAt: -1 });
      const total = await this.model.countDocuments(query);

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        total,
        data: items,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async getAll(query) {
    let { skip, limit } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;

    delete query.skip;
    delete query.limit;

    let id = query._id;
    if (id) {
      try {
        id = new mongoose.mongo.ObjectId(id);
      } catch (error) { }
    }

    query.deleted = { $ne: true };

    try {
      const items = await this.model
        .find(query)
        .select(['-password'])
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      const total = await this.model.countDocuments(query);

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        total,
        data: items,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async get(id) {
    try {
      const items = await this.model.findById(id).select(['-password']);

      if (!items) {
        return {
          error: true,
          message: `request not found`,
          statusCode: 404,
          data: null,
        };
      }
      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        data: items,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async getOne(where) {
    try {
      const items = await this.model.findOne(where).select(['-password']);
      if (!items) {
        return {
          error: true,
          message: `request not found`,
          statusCode: 404,
          data: null,
        };
      }

      return {
        error: false,
        message: 'request successfullly',
        statusCode: 200,
        data: items,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 400,
        message: error.message,
        data: null,
      };
    }
  }

  async insert(item) {
    try {
      const data = await this.model.create(item);
      return {
        error: false,
        message: 'successfully inserted',
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async update(id, item) {
    try {
      const data = await this.model.findByIdAndUpdate(id, item, { new: true });
      return {
        error: false,
        message: 'successfully updated',
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async updateWhere(where, item) {
    try {
      const data = await this.model.updateMany(where, item);
      return {
        error: false,
        message: 'successfully updated',
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 400,
        message: error.message,
        data: null,
      };
    }
  }

  async delete(id) {
    try {
      const item = await this.model.findByIdAndDelete(id);
      if (!item)
        return {
          error: true,
          message: 'item not found',
          statusCode: 404,
          data: null,
        };

      return {
        error: false,
        message: 'record delete successfullly!',
        statusCode: 200,
        data: item,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async softDelete(req) {
    const { id } = req.params;
    const item = { deleted: true };
    try {
      const data = await this.model.findByIdAndUpdate(id, item, { new: true });
      return {
        error: false,
        message: 'successfully updated',
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

  async deleteMany(where) {
    try {
      const item = await this.model.deleteMany(where);
      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: 'item not found',
          data: null,
        };

      return {
        error: false,
        deleted: true,
        statusCode: 200,
        message: 'record delete successfullly!',
        data: item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 400,
        message: error.message,
        data: null,
      };
    }
  }
}

export default Service;
