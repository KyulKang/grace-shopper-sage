import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BackToProfile from "../UserProfile/BackToProfile";
import { fetchUsers, me } from "../../store";

const ViewCustomers = (props) => {
  const { getUsers, loadInitialData, user, users } = props;

  useEffect(() => {
    loadInitialData();
    getUsers();
  }, []);

  if (!user) {
    return <BackToProfile />;
  } else if (user.makeAdmin && users.length > 0) {
    return (
      <div>
        <div>
          {users
            .sort((a, b) => a.id - b.id)
            .map((user) => {
              console.log(user);
              return (
                <div key={user.id}>
                  <span>
                    {"#" + user.id + "."} {user.firstName} {user.lastName}
                  </span>
                  <br />

                  <Link to={`/admin/users/${user.id}/orders`}>
                    <span>{user.email}</span>
                  </Link>
                  <br />
                  <br />
                </div>
              );
            })}
        </div>
        <hr />
        <div>
          <BackToProfile id={user.id} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <BackToProfile id={user.id} />
        No users found
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.auth.authUser,
    users: state.users.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    loadInitialData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(ViewCustomers);
