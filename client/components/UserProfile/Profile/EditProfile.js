import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateUser } from "../../../store";
import BackToProfile from "../BackToProfile";
import swal from 'sweetalert'

const EditProfile = (props) => {
  const { editUser } = props;

  const user = useLocation().state.user;

  const [userInfo, setUserInfo] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
  });

  const onChangeHandler = (event) => {
    const target = event.target;
    const fieldName = target.name;
    const value = target.value;

    setUserInfo({
      ...userInfo,
      [fieldName]: value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!userInfo.password) {
        await editUser({
          id: userInfo.id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
        });
        swal("", "Update complete", "success")
      } else {
        await editUser({
          id: userInfo.id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          password: userInfo.password,
        });
        swal("", "Update complete", "success")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <BackToProfile id={user.id} />
      <form onSubmit={onSubmitHandler} className="profile-container">
        <span className="profile-field">
          <label>First Name: </label>
          <input
            name="firstName"
            type="text"
            value={userInfo.firstName}
            onChange={onChangeHandler}
            required
          />
        </span>
        <span className="profile-field">
          <label>Last Name: </label>
          <input
            name="lastName"
            type="text"
            value={userInfo.lastName}
            onChange={onChangeHandler}
            required
          />
        </span>
        <div className="product-field">
          <label>Email: </label>
          <input
            name="email"
            type="text"
            value={userInfo.email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="product-field">
          <label>password</label>
          <input
            name="password"
            type="password"
            value={userInfo.password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="product-field">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    editUser: (info) => dispatch(updateUser(info)),
  };
};

export default connect(null, mapDispatch)(EditProfile);
