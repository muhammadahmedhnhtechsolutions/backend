// eslint-disable-next-line import/no-extraneous-dependencies
import { verify } from 'jsonwebtoken';

export default async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(403).send({
          error: true,
          statusCode: 403,
          message: 'Invalid Authorization token!',
        });
      }
    } else {
      return res.status(401).send({
        error: true,
        statusCode: 401,
        message: 'Required Authorization token!',
      });
    }
  } catch (e) {
    return res.status(401).send({
      error: true,
      statusCode: 401,
      message: 'Required Authorization token!',
    });
  }
};

//Grant acess to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return {
        error: error.message,
        statusCode: 403,
      };
    }
    next();
  };
};
