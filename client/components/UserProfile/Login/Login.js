import React, { useState } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../../store";

const Login = (props) => {
  const { authenticate, user } = props;

  const [formInfo, setFormInfo] = useState({
    email: "",
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
      <Redirect to="`/user/${user.id}`" />;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input name="username" type="text" onChange={onChangeHandler} />
        <label>Password</label>
        <input name="password" type="password" onChange={onChangeHandler} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.auth.authUser,
  }
}

const mapDispatch = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
  };
};

export default connect(mapState, mapDispatch)(Login);
