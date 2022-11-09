const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

// /api/products

router.get('/', async (_req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      res.sendStatus(404);
    } else {
      res.send(product);
    }
  } catch (err) {
    next(err);
  }
});

//create, read, update, delete
//post, get, put, delete
