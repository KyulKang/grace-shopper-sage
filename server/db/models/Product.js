const Sequelize  = require('sequelize')
const db = require("../db");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://imgprd19.hobbylobby.com/c/35/e9/c35e9fc8aca6d129546f4ca4175b651b142e735c/700Wx700H-1872373-1019-px.jpg",
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
