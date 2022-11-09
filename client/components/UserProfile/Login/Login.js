import React, { useState } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../../store";

const Login = (props) => {
  const { authenticate } = props;

  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
  });

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
      await authenticate(formInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Username</label>
        <input name="username" type="text" onChange={onChangeHandler} />
        <label>Password</label>
        <input name="password" type="text" onChange={onChangeHandler} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
  };
};

export default connect(null, mapDispatch)(Login);
