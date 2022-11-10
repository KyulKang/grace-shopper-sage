const router = require("express").Router();
const {
  models: { User, CartItem },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
