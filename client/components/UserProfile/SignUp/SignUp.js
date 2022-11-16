import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUser, me } from "../../../store";

const SignUp = (props) => {
  const { addUser, authUser, loadInitialData, newUser } = props;

  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    const checkUser = async () => {
      if (authUser && authUser.id) {
        history.push(`/user/${authUser.id}`);
      }
    };

    checkUser();
  }, [authUser]);

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
      await addUser(formInfo);
      await loadInitialData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sign-up-page">
      <form onSubmit={onSubmitHandler} className="login-form">
        <label>First Name</label>
        <input
          name="firstName"
          type="text"
          value={formInfo.name}
          onChange={onChangeHandler}
          required
        />
        <label>Last Name</label>
        <input
          name="lastName"
          type="text"
          value={formInfo.name}
          onChange={onChangeHandler}
          required
        />
        <label>Email</label>
        <input
          name="email"
          type="text"
          value={formInfo.email}
          onChange={onChangeHandler}
          required
        />
        <label>password</label>
        <input
          name="password"
          type="password"
          value={formInfo.password}
          onChange={onChangeHandler}
          required
        />
        <button type="submit" className="btn btn-primary">submit</button>
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
   authUser: state.auth.authUser,
   newUser: state.singleUser.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    addUser: (formInfo) => dispatch(addUser(formInfo)),
    loadInitialData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(SignUp);
