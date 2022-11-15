"use strict";

const {
  db,
  models: { User, Product, Order, OrderItem },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: "cody@mail.com",
      firstName: "cody",
      lastName: "johnston",
      password: "123",
      makeAdmin: true,
    }),
    User.create({
      email: "jeanluc@mail.com",
      firstName: "jean-luc",
      lastName: "picard",
      password: "123",
      makeAdmin: true,
    }),
    User.create({
      email: "frank@mail.com",
      firstName: "frank",
      lastName: "sinatra",
      password: "123",
    }),
    User.create({
      email: "lucy@mail.com",
      firstName: "lucy",
      lastName: "liu",
      password: "123",
    }),
    User.create({
      email: "saul@mail.com",
      firstName: "saul",
      lastName: "goodman",
      password: "123",
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      title: "Shirt",
      price: 15,
      category: "Clothes",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    }),
    Product.create({
      title: "Pants",
      price: 15,
      category: "Clothes",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    }),
    Product.create({
      title: "Mug",
      price: 15,
      category: "Utensils",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    }),
    Product.create({
      title: "Beer Stein",
      price: 15,
      category: "Utensils",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    }),
  ]);
  const orders = await Promise.all([
    Order.create({
      userId: 1,
      shippingFirstName: "cody",
      shippingLastName: "johnston",
      shippingAddress1: "123 Street",
      shippingAddress2: "13th Ave",
      shippingCity: "Hamilton",
      shippingState: "New York",
      shippingZip: "04780",
      phoneNumber: "123-456-7890",
      billingFirstName: "cody",
      billingLastName: "johnston",
      billingAddress1: "123 Street",
      billingAddress2: "13th Ave",
      billingCity: "Hamilton",
      billingState: "New York",
      billingZip: "04780",
    }),
    Order.create({
      userId: 1,
      shippingFirstName: "cody",
      shippingLastName: "johnston",
      shippingAddress1: "123 Street",
      shippingAddress2: "13th Ave",
      shippingCity: "Shakespeare",
      shippingState: "New York",
      shippingZip: "04780",
      phoneNumber: "123-456-7890",
      billingFirstName: "bill",
      billingLastName: "johnston",
      billingAddress1: "550 Street",
      billingAddress2: "20th Ave",
      billingCity: "London",
      billingState: "New York",
      billingZip: "04780",
    }),
    Order.create({
      userId: 1,
      shippingFirstName: "cody",
      shippingLastName: "johnston",
      shippingAddress1: "123 Street",
      shippingAddress2: "13th Ave",
      shippingCity: "Richtown",
      shippingState: "Pennsylvania",
      shippingZip: "04780",
      phoneNumber: "123-456-7890",
      billingFirstName: "cody",
      billingLastName: "johnston",
      billingAddress1: "123 Street",
      billingAddress2: "13th Ave",
      billingCity: "Ice Creak",
      billingState: "Pennsylvania",
      billingZip: "04780",
    }),
    Order.create({
      userId: 2,
      shippingFirstName: "jean-luc",
      shippingLastName: "picard",
      shippingAddress1: "123 Street",
      shippingAddress2: "13th Ave",
      shippingCity: "Philadelphia",
      shippingState: "PA",
      shippingZip: "19122",
      phoneNumber: "123-456-7890",
      billingFirstName: "jean-luc",
      billingLastName: "picard",
      billingAddress1: "123 Street",
      billingAddress2: "13th Ave",
      billingCity: "Not Philadelphia",
      billingState: "Pennsylvania",
      billingZip: "19122",
    }),
    Order.create({
      userId: 2,
      shippingFirstName: "jean-luc",
      shippingLastName: "picard",
      shippingAddress1: "123 Street",
      shippingAddress2: "13th Ave",
      shippingCity: "Philadelphia",
      shippingState: "PA",
      shippingZip: "19122",
      phoneNumber: "123-456-7890",
      billingFirstName: "jean-luc",
      billingLastName: "picard",
      billingAddress1: "123 Street",
      billingAddress2: "13th Ave",
      billingCity: "Not Philadelphia",
      billingState: "Pennsylvania",
      billingZip: "19122",
    }),
    Order.create({
      userId: 2,
      shippingFirstName: "jean-luc",
      shippingLastName: "picard",
      shippingAddress1: "123 Street",
      shippingAddress2: "13th Ave",
      shippingCity: "Philadelphia",
      shippingState: "PA",
      shippingZip: "19122",
      phoneNumber: "123-456-7890",
      billingFirstName: "jean-luc",
      billingLastName: "picard",
      billingAddress1: "123 Street",
      billingAddress2: "13th Ave",
      billingCity: "Not Philadelphia",
      billingState: "Pennsylvania",
      billingZip: "19122",
    }),
    Order.create({
      userId: 3,
      shippingFirstName: "lucy",
      shippingLastName: "liu",
      shippingAddress1: "123 Street",
      shippingAddress2: "99th Drive",
      shippingCity: "Lynn",
      shippingState: "MA",
      shippingZip: "01920",
      phoneNumber: "123-456-7890",
      billingFirstName: "lucy",
      billingLastName: "liu",
      billingAddress1: "ABC AVE",
      billingAddress2: "",
      billingCity: "Not Lynn",
      billingState: "MA",
      billingZip: "01920",
    }),
    Order.create({
      userId: 3,
      shippingFirstName: "lucy",
      shippingLastName: "liu",
      shippingAddress1: "123 Street",
      shippingAddress2: "99th Drive",
      shippingCity: "Lynn",
      shippingState: "MA",
      shippingZip: "01920",
      phoneNumber: "123-456-7890",
      billingFirstName: "lucy",
      billingLastName: "liu",
      billingAddress1: "ABC AVE",
      billingAddress2: "",
      billingCity: "Not Lynn",
      billingState: "MA",
      billingZip: "01920",
    }),
    Order.create({
      userId: 3,
      shippingFirstName: "lucy",
      shippingLastName: "liu",
      shippingAddress1: "123 Street",
      shippingAddress2: "99th Drive",
      shippingCity: "Lynn",
      shippingState: "MA",
      shippingZip: "01920",
      phoneNumber: "123-456-7890",
      billingFirstName: "lucy",
      billingLastName: "liu",
      billingAddress1: "ABC AVE",
      billingAddress2: "",
      billingCity: "Not Lynn",
      billingState: "MA",
      billingZip: "01920",
    }),
    Order.create({
      userId: 4,
      shippingFirstName: "frank",
      shippingLastName: "sinatra",
      shippingAddress1: "Frank Sinatra Blvd",
      shippingAddress2: "Apt 999",
      shippingCity: "Hoboken",
      shippingState: "NJ",
      shippingZip: "07654",
      phoneNumber: "123-456-7890",
      billingFirstName: "frank",
      billingLastName: "sinatra",
      billingAddress1: "123 Blue Eyes Way",
      billingAddress2: "",
      billingCity: "Hoboken",
      billingState: "NJ",
      billingZip: "07654",
    }),
    Order.create({
      userId: 4,
      shippingFirstName: "frank",
      shippingLastName: "sinatra",
      shippingAddress1: "Frank Sinatra Blvd",
      shippingAddress2: "Apt 999",
      shippingCity: "Hoboken",
      shippingState: "NJ",
      shippingZip: "07654",
      phoneNumber: "123-456-7890",
      billingFirstName: "frank",
      billingLastName: "sinatra",
      billingAddress1: "123 Blue Eyes Way",
      billingAddress2: "",
      billingCity: "Hoboken",
      billingState: "NJ",
      billingZip: "07654",
    }),
    Order.create({
      userId: 4,
      shippingFirstName: "frank",
      shippingLastName: "sinatra",
      shippingAddress1: "Frank Sinatra Blvd",
      shippingAddress2: "Apt 999",
      shippingCity: "Hoboken",
      shippingState: "NJ",
      shippingZip: "07654",
      phoneNumber: "123-456-7890",
      billingFirstName: "frank",
      billingLastName: "sinatra",
      billingAddress1: "123 Blue Eyes Way",
      billingAddress2: "",
      billingCity: "Hoboken",
      billingState: "NJ",
      billingZip: "07654",
    }),
  ]);
  const orderItems = await Promise.all([
    OrderItem.create({
      orderId: 1,
      productId: 1,
      quantity: 2,
      price: 50,
    }),
    OrderItem.create({
      orderId: 1,
      productId: 2,
      quantity: 1,
      price: 30,
    }),
    OrderItem.create({
      orderId: 1,
      productId: 3,
      quantity: 4,
      price: 12,
    }),
    OrderItem.create({
      orderId: 2,
      productId: 1,
      quantity: 2,
      price: 50,
    }),
    OrderItem.create({
      orderId: 2,
      productId: 2,
      quantity: 1,
      price: 30,
    }),
    OrderItem.create({
      orderId: 2,
      productId: 3,
      quantity: 4,
      price: 12,
    }),
    OrderItem.create({
      orderId: 3,
      productId: 1,
      quantity: 2,
      price: 50,
    }),
    OrderItem.create({
      orderId: 3,
      productId: 2,
      quantity: 1,
      price: 30,
    }),
    OrderItem.create({
      orderId: 3,
      productId: 3,
      quantity: 4,
      price: 12,
    }),
    OrderItem.create({
      orderId: 4,
      productId: 1,
      quantity: 2,
      price: 50,
    }),
    OrderItem.create({
      orderId: 4,
      productId: 2,
      quantity: 1,
      price: 30,
    }),
    OrderItem.create({
      orderId: 4,
      productId: 3,
      quantity: 4,
      price: 12,
    }),
    OrderItem.create({
      orderId: 5,
      productId: 1,
      quantity: 2,
      price: 50,
    }),
    OrderItem.create({
      orderId: 5,
      productId: 2,
      quantity: 1,
      price: 30,
    }),
    OrderItem.create({
      orderId: 6,
      productId: 3,
      quantity: 4,
      price: 12,
    }),
    OrderItem.create({
      orderId: 7,
      productId: 2,
      quantity: 1,
      price: 30,
    }),
    OrderItem.create({
      orderId: 8,
      productId: 3,
      quantity: 4,
      price: 12,
    }),
    OrderItem.create({
      orderId: 8,
      productId: 1,
      quantity: 2,
      price: 50,
    }),
    OrderItem.create({
      orderId: 9,
      productId: 2,
      quantity: 1,
      price: 30,
    }),
    OrderItem.create({
      orderId: 9,
      productId: 3,
      quantity: 4,
      price: 12,
    }),
    OrderItem.create({
      orderId: 10,
      productId: 1,
      quantity: 2,
      price: 50,
    }),
    OrderItem.create({
      orderId: 10,
      productId: 2,
      quantity: 1,
      price: 30,
    }),
    OrderItem.create({
      orderId: 11,
      productId: 3,
      quantity: 4,
      price: 12,
    }),
    OrderItem.create({
      orderId: 12,
      productId: 1,
      quantity: 2,
      price: 50,
    }),
    OrderItem.create({
      orderId: 12,
      productId: 2,
      quantity: 1,
      price: 30,
    }),
  ]);
  console.log(`seeded ${users.length} users and ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
