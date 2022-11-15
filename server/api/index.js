const router = require("express").Router();
module.exports = router;

// /api/admin
router.use("/admin", require("./admin"));

// /api/users
router.use("/users", require("./users"));

// /api/products
router.use("/products", require("./products"));

// /api/orders
router.use("/orders", require("./orders"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
