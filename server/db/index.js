//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const CartItem = require('./models/CartItem')
const Order = require('./models/Order')
const OrderItem = require('./models/OrderItem')

//associations could go here!


module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem,
    Order,
    OrderItem
  },
}
