import Service from './Service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class AdminService extends Service {
  constructor(model) {
    super(model);
  }

  async login(item) {
    try {
      let user = await this.model.findOne({ email: item.email });

      if (!user) {
        return {
          error: true,
          message: `User is not found with this  ${item.email} address`,
          statusCode: 404,
          data: null,
        };
      }

      let isPasswordValid = await bcrypt.compareSync(
        item.password,
        user.password,
      );

      if (!isPasswordValid) {
        return {
          error: true,
          message: 'You entered the wrong email or password',
          statusCode: 401,
          data: null,
        };
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      );

      return {
        error: false,
        message: 'login successfully',
        statusCode: 200,
        token: token,
        data: user,
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

  async changePassword(req) {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.params;
    try {
      const user = await this.model.findById(id);
      if (!user) {
        return {
          error: true,
          message: 'User Not found',
          statusCode: 400,
          data: null,
        };
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!isPasswordValid) {
        return {
          error: true,
          message: 'You entered wrong currant password',
          statusCode: 400,
          data: null,
        };
      }

      const hash = await bcrypt.hash(newPassword, 10);
      const updatedUser = await this.model.findByIdAndUpdate(
        id,
        { password: hash },
        { new: true },
      );

      return {
        error: false,
        message: 'Password changed successfully',
        statusCode: 200,
        data: updatedUser,
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

export default AdminService;
