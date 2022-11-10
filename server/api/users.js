const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName'],

      // Kyle: Having email play the role of the username presents a
      // slight issue where openly displaying it causes privacy concerns.
      // While I replaced 'username' in line 13 with 'firstName',
      // actual implementation may use lastName, or the full name.
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
