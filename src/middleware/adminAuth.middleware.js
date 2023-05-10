// eslint-disable-next-line import/no-extraneous-dependencies
import { verify } from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (decoded.role == 'admin') {
          next();
        } else {
          return res.status(401).send({
            error: true,
            statusCode: 401,
            message: 'Unauthorized access!',
          });
        }
      } catch (err) {
        return res.status(401).send({
          error: true,
          statusCode: 401,
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
