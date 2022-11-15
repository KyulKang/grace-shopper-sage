import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateUser } from "../../../store";
import BackToProfile from "../BackToProfile";

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
      await editUser(userInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <BackToProfile id={user.id} />
      <form onSubmit={onSubmitHandler}>
        <label>First Name</label>
        <input
          name="firstName"
          type="text"
          value={userInfo.firstName}
          onChange={onChangeHandler}
          required
        />
        <label>Last Name</label>
        <input
          name="lastName"
          type="text"
          value={userInfo.lastName}
          onChange={onChangeHandler}
          required
        />
        <label>Email</label>
        <input
          name="email"
          type="text"
          value={userInfo.email}
          onChange={onChangeHandler}
          required
        />
        <label>password</label>
        <input
          name="password"
          type="password"
          value={userInfo.password}
          onChange={onChangeHandler}
        />
        <button type="submit">submit</button>
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
