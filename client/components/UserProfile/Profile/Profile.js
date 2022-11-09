import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../store";

const Profile = (props) => {
  const { user } = props;

  return (
    <div>
      <di>{user.imageUrl}</di>
      <di>{user.firstName}</di>
      <di>{user.lastName}</di>
      <di>{user.email}</di>
      <di>{user.username}</di>
      <Link path={`/user/${user.id}/orders`} >Order History</Link>
      <EditProfileButton />
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.users.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(fetchUser(id));
    },
  };
};

export default connect(mapState, mapDispatch)(Profile);
