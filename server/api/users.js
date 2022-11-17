const router = require("express").Router();
const {
  models: { User, CartItem, Order, OrderItem, Product },
} = require("../db");
const requireToken = require("../requireToken.js");
module.exports = router;

// /api/users/:userId
//login user edits profile, returns new token (because password could be different now)
router.put("/:userId", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user;
    if (+req.params.userId === +id) {
      const updateUser = await User.findByPk(id);
      if (updateUser === null) {
        res.sendStatus(404);
      } else {
        const newUser = await updateUser.update(req.body);
        res.send({ user: newUser });
      }
    }
  } catch (error) {
    next(error);
  }
});

// /api/users/:userId/cartItems
// get user's cartitems
router.get("/:userId/cartItems", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user;
    if (+req.params.userId === +id) {
      const cartItems = await CartItem.findAll({
        where: { userId: id },
        include: { model: Product },
      });
      res.send(cartItems);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

// /api/users/:userId/cartItems
//login user add item to cart, returns cartItem object (should it find and return the entire cart?)
//if the redux store is holding an array of cartItems, we need to cut off the timestamps?
//cartitems have {userId, productId, quantity, price}
//currently just needs a req.body of {productId, quantity, price} as userId is coming from token
router.post("/:userId/cartItems", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user;
    if (+req.params.userId === +id) {
      const [updateCartItem, created] = await CartItem.findOrCreate({
        where: {
          userId: id,
          productId: req.body.productId,
        },
        defaults: {
          quantity: req.body.quantity,
          price: req.body.price,
        },
      });
      if (!created) {
        res.send(await updateCartItem.update(req.body));
      } else {
        res.send(updateCartItem);
        //return the updated array or the updated instance?
      }
    }
  } catch (error) {
    next(error);
  }
});

// /api/users/:userId/cartItems/:cartItemId
// delete a cartitem
router.delete(
  "/:userId/cartItems/:cartItemId",
  requireToken,
  async (req, res, next) => {
    try {
      const { id } = req.user;
      if (+req.params.userId === +id) {
        const cartItem = await CartItem.findByPk(req.params.cartItemId);
        if (cartItem === null || cartItem.userId !== id) {
          res.sendStatus(404);
        } else {
          await cartItem.destroy();
          res.send(req.params.cartItemId);
          //return the updated array or the deleted?
        }
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      next(error);
    }
  }
);

// /api/users/:userId/cartItems
//login user clears all cartItems (after order is made)
router.delete("/:userId/cartItems", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user;
    if (+req.params.userId === +id) {
      await CartItem.destroy({
        where: {
          userId: id,
        },
      });
      res.status(204).end();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

// /api/users/:userId/orders
//login user make order
//cartitems coming from database have {id, quantity, price, createdAt, updatedAt, productid, userid}
//we only want cartitems to have {quantity, price, productId}
//we dont' want order to have {userId}
router.post("/:userId/orders", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user;
    if (+req.params.userId === +id) {
      const order = await Order.create({
        ...req.body.order,
        userId: id,
      });
      const orderItems = await Promise.all(
        req.body.cart.map((elem) => OrderItem.create(elem))
      );
      await Promise.all(
        orderItems.map((item) => {
          order.addOrderItem(item);
        })
      );
      await CartItem.destroy({
        where: {
          userId: id,
        },
      });
      res.status(201).send(order);
    }
  } catch (error) {
    next(error);
  }
});

// /api/users/:userId/orders
//login user gets their order history
router.get("/:userId/orders", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user;
    if (+req.params.userId === +id) {
      const orders = await Order.findAll({
        where: { userId: id },
        include: { model: OrderItem, include: Product },
      });
      res.send(orders);
    }
  } catch (error) {
    next(error);
  }
});
