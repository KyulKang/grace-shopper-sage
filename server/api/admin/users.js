const router = require("express").Router();
const {
  models: { User, Order, OrderItem, Product },
} = require("../../db");
module.exports = router;
const requireToken = require("../../requireToken");

// api/admin/users

router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.makeAdmin) {
      // get attributes for id and email for all users
      const users = await User.findAll({
        attributes: ["id", "email", "firstName", "lastName"],
      });
      res.send(users);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    if (req.user.makeAdmin) {
      // get all orders with associated order items for a single user
      const userOrders = await Order.findAll({
        where: { userId: req.params.userId },
        include: { model: OrderItem, include: Product },
      });
      const user = await User.findByPk(req.params.userId);

      res.send({ userOrders, user });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});
