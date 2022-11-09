const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  shippingFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingLastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingAddress1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingAddress2: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingCity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingState: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingZip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingLastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingAddress1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingAddress2: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingCity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingState: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingZip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
