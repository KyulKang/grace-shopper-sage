const { models } = require("./db");

const { User } = models;
const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    console.log("token found", req.user);
    next();
  } catch (err) {
    throw new Error("Bad credentials!");
  }
};

module.exports = requireToken;
