import { useState } from "react";
import { updateUser } from "../../../store";

const EditProfile = (props) => {
  const { editUser, user } = props;

  const [userInfo, setUserInfo] = useState({
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
    editUser: (userInfo) => dispatch(updateUser(userInfo)),
  };
};

export default EditProfile;
