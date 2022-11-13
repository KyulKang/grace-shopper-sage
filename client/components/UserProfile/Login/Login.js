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

  const history = useHistory();

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
      history.push(`/user/${user.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
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
  } else {
    return <Redirect to={`/user/${user.id}`} />;
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
