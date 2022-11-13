import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BackToProfile from "../UserProfile/BackToProfile";
import { fetchUsers, me } from "../../store";

const ViewCustomers = (props) => {
  const { getUsers, loadInitialData, user, users } = props;

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const verified = await loadInitialData();
        verified ? setAuthorized(true) : setAuthorized(false);
      } catch (err) {
        console.log(err);
      }
    };

    const allUsers = async () => {
      try {
        await getUsers();
      } catch (err) {
        console.log(err);
      }
    };

    checkToken();

    if (user.makeAdmin) {
      allUsers();
    }
  }, []);

  if (!user) {
    return <BackToProfile />;
  } else if (user.makeAdmin && users.length > 0) {
    return (
      <div>
        <div>
          <BackToProfile id={user.id} />
          No orders found. Buy something!
        </div>
        <div>
          {users.map((user) => {
            return (
              <div>
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <span>{user.email}</span>
                {authorized ? (
                  <Link to="`/user/${user.id}/orders`" />
                ) : (
                  <Link to="/" />
                )}
              </div>
            );
          })}
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
