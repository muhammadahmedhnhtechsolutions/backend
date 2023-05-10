import Service from './Service';

class CommonEnumServices extends Service {
  constructor(model) {
    super(model);

    this.insertCommonEnum = this.insertCommonEnum.bind(this);
    this.deleteCommonEnum = this.deleteCommonEnum.bind(this);
    this.getAllEnums = this.getAllEnums.bind(this);
    this.updateCommonEnum = this.updateCommonEnum.bind(this);
  }

  async insertCommonEnum(req) {
    try {
      const $getcommonEnum = await this.model.findOne();
      let data = [];
      if (!$getcommonEnum) {
        data = await this.model.create(req.body);
      } else {
        const updatedValue = { $push: req.body };
        data = await this.model.updateOne(
          { _id: $getcommonEnum._id },
          updatedValue,
        );
      }

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

  async getAllEnums(req) {
    try {
      const { query } = req;

      let items;

      if (query.privacyPolicy) {
        items = await this.model.findOne().select(`privacyPolicy`);

        return {
          error: false,
          message: 'request successfullly',
          statusCode: 200,
          data: items,
        };
      }

      if (query.termsAndConditions) {
        items = await this.model.findOne().select(`termsAndConditions`);

        return {
          error: false,
          message: 'request successfullly',
          statusCode: 200,
          data: items,
        };
      }

      items = await this.model.find();

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

  async updateCommonEnum(req) {
    const { id } = req.params;
    const { privacyPolicy, termsAndConditions } = req.body;
    try {
      const data = await this.model.findByIdAndUpdate(
        id,
        { privacyPolicy, termsAndConditions },
        { new: true },
      );
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

  async deleteCommonEnum(req) {
    try {
      const { field, id } = req.body;

      const data = await this.model.updateOne({ name: field });

      return {
        error: false,
        message: `request successfully`,
        statusCode: 200,
        data: req.body,
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

export default CommonEnumServices;
