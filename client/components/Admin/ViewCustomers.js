import { useEffect, useState } from "react";
import { connect } from "react-redux";
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

    if (user.isAdmin) {
      allUsers();
    }
  }, []);

  return users.map((user) => {
    <div>
      <span>
        {user.firstName} {user.lastName}
      </span>
      <span>{user.email}</span>
      {authorized ? <Link to="`/user/${user.id}/orders`" /> : <Link to="/" />}
    </div>;
  });
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
