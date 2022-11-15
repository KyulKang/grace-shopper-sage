const router = require("express").Router();
module.exports = router;

// api/admin/users
router.use("/users", require("./users"));

// api/admin/products
router.use("/products", require("./products"));

// api/admin/orders
router.use("/orders", require("./orders"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
