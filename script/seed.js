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
      imageUrl: "https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/1400Wx1400H-422519-0320.jpg",
      price: 15,
      category: "Clothes",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }),
    Product.create({
      title: "Pants",
      price: 15,
      imageUrl: "https://cdn.shopify.com/s/files/1/0532/2725/8017/files/05_Straight_08785555-50ec-48b5-afc2-e352e451c269.jpg?v=1644619080",
      category: "Clothes",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }),
    Product.create({
      title: "Mug",
      price: 15,
      category: "Utensils",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }),
    Product.create({
      title: "Beer Stein",
      imageUrl: "https://www.amoca.org/wp-content/uploads/2021/07/BSL-Top-2.jpg",
      price: 15,
      category: "Utensils",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
    })
  ]
  );
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
