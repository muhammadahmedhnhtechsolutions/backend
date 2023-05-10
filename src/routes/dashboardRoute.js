import { adminDashboard } from '../controllers/DashboardController';
import auth from '../middleware/auth.middleware';

export default (router) => {
  //Public Route
  router.get(`/api/adminDashboard`, adminDashboard);
};
