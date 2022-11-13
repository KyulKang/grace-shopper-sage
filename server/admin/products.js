const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;
const requireToken = require("../requireToken");

// /admin/products

router.post("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.makeAdmin) {
      const product = await Product.create(req.body);
      res.send(product);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.makeAdmin) {
      const product = await Product.findByPk(req.params.productId);
      if (!product) {
        res.sendStatus(404);
      } else {
        await product.update(req.body);
        res.send(product);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.makeAdmin) {
      const product = await Product.findByPk(req.params.productId);
      if (!product) {
        res.sendStatus(404);
      } else {
        await product.destroy();
        res.sendStatus(204);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});
