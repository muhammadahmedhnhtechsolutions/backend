//order
// import Order from './models/OrderModel.js';
// const OrderModel = new Order().getModel();
// import { io } from './bin/www.js';

// export async function getAllOrder(socket) {
//   const allOrders = await OrderModel.find().limit(10);
//   console.log(allOrders);
//   socket.on('fetchOrder', async () => {
//     socket.emit('getOrderData', allOrders);
//   });
// }

// function socket() {
//   io.on('connection', (socket) => {
//     console.log('A client connected.');

//     socket.on('message', async (data) => {
//       console.log(data);
//       socket.emit('message', `You said: ${data}`);
//       const allOrders = await OrderModel.find().limit(10);

//       socket.emit('getOrderData', allOrders);
//     });

//     socket.on('disconnect', () => {
//       console.log('A client disconnected.');
//     });
//   });
// }

// module.exports = socket;
"use strict";