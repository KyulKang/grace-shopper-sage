import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { authenticate, me } from "../../../store";

const Login = (props) => {
  const { authenticate, loadInitialData, user } = props;

  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });

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

  const onChangeHandler = (event) => {
    const target = event.target;
    const fieldName = target.name;
    const value = target.value;

    setFormInfo({
      ...formInfo,
      [fieldName]: value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await authenticate(formInfo.email, formInfo.password, "login");
    } catch (err) {
      console.log(err);
    }
  };

  if (user && user.id) {
    return <Redirect to={{ pathname: `/` }} />;
  } else if (user && !user.id) {
    return (
      <div>
        <h3>Login failed. Please try again.</h3>
        <form onSubmit={onSubmitHandler}>
          <label>Email</label>
          <input name="email" type="text" onChange={onChangeHandler} />
          <label>Password</label>
          <input name="password" type="password" onChange={onChangeHandler} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={onSubmitHandler}>
          <label>Email</label>
          <input name="email" type="text" onChange={onChangeHandler} />
          <label>Password</label>
          <input name="password" type="password" onChange={onChangeHandler} />
          <button type="submit">Login</button>
        </form>
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
    authenticate: (email, password, method) =>
      dispatch(authenticate(email, password, method)),
    loadInitialData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Login);
