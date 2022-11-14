import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUser } from "../../../store";

const SignUp = (props) => {
  const { addUser, user } = props;

  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (user.id) {
      history.push(`/user/${user.id}`)
    }
  }, [user])

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
      } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
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
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.singleUser.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addUser: (formInfo) => dispatch(addUser(formInfo)),
  };
};

export default connect(mapState, mapDispatch)(SignUp);