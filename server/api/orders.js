const router = require("express").Router();
const {
  models: { Order, OrderItem },
} = require("../db");
module.exports = router;

// /api/orders

router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body.order);
    const orderItems = await Promise.all(
      req.body.cart.map((elem) => OrderItem.create(elem))
    );

    // For front-end: Add price to objects in req.body.cart (referenced in line 13).
    // This is to make sure the order history has static prices in case of price change.

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

// use below JSON for postman post requests!

// {
//     "order": {
//         "shippingFirstName": "Cuban",
//         "shippingLastName": "Pete",
//         "shippingAddress1": "321 Funland Ave",
//         "shippingAddress2": "input optional",
//         "shippingCity": "El Dorado",
//         "shippingState": "West Dakota",
//         "shippingZip": "98765",
//         "phoneNumber": "(123) 456-7890",
//         "billingFirstName": "Jim",
//         "billingLastName": "Carrey",
//         "billingAddress1": "123 Address Street",
//         "billingAddress2": "input optional",
//         "billingCity": "Townsville",
//         "billingState": "East Carolina",
//         "billingZip": "76543"
//     },
//     "cart": [{
//         "productId": 1,
//         "quantity": 1,
//         "price": 50
//     }]
// }

/*
req.body ->
    order -> order info (shipping, billing)
    cart -> [{productId, Qty, price}] <- price added manually from front-end
*/
