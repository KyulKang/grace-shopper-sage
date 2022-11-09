//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

//Product associations

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

//User associations

User.hasMany(CartItem);
CartItem.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

//Order association

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem,
    Order,
    OrderItem,
  },
};
