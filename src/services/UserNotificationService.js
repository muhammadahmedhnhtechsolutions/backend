import Service from './Service';

class UserNotificationService extends Service {
  constructor(model) {
    super(model);
  }
  async getAllNotification(query, where, orderBy = null) {
    let { skip, limit } = query;
    skip = skip ? Number(skip) : 1;
    limit = limit ? Number(limit) : 10;
    skip = (skip - 1) * limit;
    delete query.skip;
    delete query.limit;

    try {
      if (!orderBy) {
        orderBy = ['createdAt', -1];
      }

      where.deleted = { $ne: true };

      const items = await this.model
        .find(where)
        .skip(skip)
        .limit(limit)
        .sort([orderBy]);

      const total = await this.model.countDocuments(where);

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

  async softDeleteAllNotification(where, item) {
    try {
      const data = await this.model.update(where, item, {
        new: true,
      });
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
}

export default UserNotificationService;
