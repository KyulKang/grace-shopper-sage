import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch,
} from "react-router-dom";
import { me } from "./store";
import Navbar from "./components/Navbar";
import { AllProducts } from "./components/Pages/AllProducts";
import Login from "./components/UserProfile/Login/Login";
import SignUp from "./components/UserProfile/SignUp/SignUp";
import Complete from "./components/Pages/Complete/Complete";
import Profile from "./components/UserProfile/Profile/Profile";
import OrderHistory from "./components/UserProfile/Profile/OrderHistory/OrderHistory";
import ViewCustomers from "./components/Admin/ViewCustomers";
import EditProfile from "./components/UserProfile/Profile/EditProfile";
import { ManageProducts } from "./components/Admin/";

const Routes = (props) => {
  const { loadInitialData } = props;
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const checkToken = async () => {
        const verified = await loadInitialData();
        verified ? setAuthorized(true) : setAuthorized(false);

      };
      checkToken();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Router>
      <div>
        <Navbar authorized={authorized} />
        <Switch>
          <Route exact path="/" component={AllProducts} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/checkout">
            {/* We should put a main "Checkout" component here (or potentially render children directly) */}
          </Route>
          <Route path="/complete">
            <Complete />
          </Route>
          <Route exact path="/user/:userId">
            <Profile />
          </Route>
          <Route exact path="/user/:userId/orders">
            <OrderHistory />
          </Route>
          <Route exact path="/user/:userId/edit">
            <EditProfile />
          </Route>
          <Route path="/admin/users">
            <ViewCustomers />
          </Route>
          <Route path="/admin/products">
            <ManageProducts />
          </Route>
          <Route path="*">
            <AllProducts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
