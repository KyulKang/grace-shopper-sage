import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import orders from "./orders";
import singleUser from "./singleUser";
import users from "./allUsers";
import allProducts from "./allProducts";
import singleProduct from "./singleProduct";

const reducer = combineReducers({
  allProducts,
  auth,
  orders,
  singleProduct,
  singleUser,
  users,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./allProducts";
export * from "./allUsers";
export * from "./auth";
export * from "./orders";
export * from "./singleProduct";
export * from "./singleUser";
