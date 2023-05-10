import express from 'express';
import userRoutes from './userRoute';
import userNotificationRoute from './userNotificationRoute';
import restaurantNotificationRoute from './restaurantNotificationRoute';
import adminRoute from './adminRoute';
import restaurantRoute from './restaurantRoute';
import menuRoute from './menuRoute';
import categoryRoute from './categoryRoute';
import sliderRoute from './sliderRoute';
import orderRoute from './orderRoute';
import deliveryBoyRoute from './deliveryBoyRoute';
import dashboardRoute from './dashboardRoute';
import commonEnumRoute from './commonEnumRoute';

const router = express.Router();

userRoutes(router);
userNotificationRoute(router);
restaurantNotificationRoute(router);
adminRoute(router);
restaurantRoute(router);
menuRoute(router);
categoryRoute(router);
sliderRoute(router);
orderRoute(router);
deliveryBoyRoute(router);
dashboardRoute(router);
commonEnumRoute(router);

export default router;
