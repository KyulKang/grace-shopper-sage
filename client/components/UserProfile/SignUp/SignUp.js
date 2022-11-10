import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../../../store";

const SignUp = (props) => {
  const { addUser } = props;

  const [formInfo, setFormInfo] = useState({
    name: "",
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
      await addUser(formInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Name</label>
        <input
          name="name"
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

const mapDispatch = (dispatch) => {
  return {
    addUser: (formInfo) => dispatch(addUser(formInfo)),
  };
};

export default connect(null, mapDispatch)(SignUp);
