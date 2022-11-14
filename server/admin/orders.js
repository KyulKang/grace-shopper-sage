const router = require("express").Router();
const {
  models: { Order, OrderItem },
} = require("../db");
module.exports = router;
const requireToken = require("../requireToken");

// /admin/orders

router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.makeAdmin) {
      // retrieve all orders with associated order items
      const order = await Order.findAll({ include: OrderItem });

      res.status(201).send(order);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});
