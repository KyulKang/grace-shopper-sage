import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { me } from "../../../store";

const Profile = (props) => {
  const { loadInitialData, user } = props;

  useEffect(() => {
    try {
      const checkToken = async () => {
        await loadInitialData();
      };
      checkToken();
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!user) {
    return <div>Please log in</div>;
  } else if (!user.makeAdmin) {
    return (
      <div className="profile-container">
        <div className="profile-field">{user.imageUrl}</div>
        <div className="profile-field">First Name: {user.firstName}</div>
        <div className="profile-field">Last Name: {user.lastName}</div>
        <div className="profile-field">Email: {user.email}</div>
        <div className="profile-field">
          <Link to={{ pathname: `/user/${user.id}/orders`, state: { user } }}>
            Order History
          </Link>
        </div>
        <div className="profile-field">
          <Link to={{ pathname: `/user/${user.id}/edit`, state: { user } }}>
            Edit Profile
          </Link>
        </div>
      </div>
    );
  } else if (user.makeAdmin) {
    return (
      <div className="profile-container">
        <div className="profile-field">{user.imageUrl}</div>
        <div className="profile-field">{user.firstName}</div>
        <div className="profile-field">{user.lastName}</div>
        <div className="profile-field">{user.email}</div>
        <div className="profile-field">
          <Link to={{ pathname: `/user/${user.id}/orders`, state: { user } }}>
            Order History
          </Link>
        </div>
        <div className="profile-field">
          <Link to={{ pathname: `/user/${user.id}/edit`, state: { user } }}>
            Edit Profile
          </Link>
        </div>
        <div className="profile-field">
          <Link
            to={{
              pathname: "/admin/users",
            }}
          >
            View All Customers
          </Link>
        </div>
        <div className="profile-field">
          <Link
            to={{
              pathname: "/admin/products",
            }}
          >
            View All Products
          </Link>
        </div>
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.auth.authUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Profile);
