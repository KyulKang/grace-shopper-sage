const router = require('express').Router();
const {
  models: { Order, OrderItem },
} = require('../db');
module.exports = router;

// /api/orders

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body.order);
    const orderItems = await Promise.all(
      req.body.cart.map((elem) => OrderItem.create(elem))
    );

    //front end has to include price to req.body.cart (referenced in line 13)

    await Promise.all(
      orderItems.map((item) => {
        order.addOrderItem(item);
      })
    );

    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});
// {
// 	"order": {"shippingFirstName": "test","shippingLastName": "test","shippingAddress1": "test","shippingAddress2": "test","shippingCity": "test","shippingState": "test","shippingZip": "test","phoneNumber": "test","billingFirstName": "test","billingLastName": "test","billingAddress1": "test","billingAddress2": "test","billingCity": "test","billingState": "test","billingZip": "test"},
//  "cart": [{"productId":1, "quantity":1, "price":50}]
// }

/*
req.body ->
    order -> order info (shipping, billing)
    cart -> [{productId, Qty, price}] <- price added manually from front-end
*/
