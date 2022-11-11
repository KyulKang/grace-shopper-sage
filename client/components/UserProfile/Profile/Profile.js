import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { me } from "../../../store";

const Profile = (props) => {
  const { loadInitialData, user } = props;

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const checkToken = async () => {
        const verified = await loadInitialData();
        verified ? setAuthorized(true) : setAuthorized(false);

        checkToken();
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!authorized) {
    <Redirect to="/login" />;
  } else if (!user.isAdmin) {
    return (
      <div>
        <div>{user.imageUrl}</div>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.email}</div>
        <Link path={`/user/${user.id}/orders`}>Order History</Link>
        <EditProfileButton />
      </div>
    );
  } else if (user.isAdmin) {
    return (
      <div>
        <div>{user.imageUrl}</div>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.email}</div>

        <div>
          <Link to={`/user/${user.id}/orders`}>Order History</Link>
          <EditProfileButton />
          <Link
            to={{
              pathname: "/admin/users",
              state: { user },
            }}
          >
            View All Customers
          </Link>
          <Link
            to={{
              pathname: "/admin/products",
              state: { user },
            }}
          >
            View All Products
          </Link>
        </div>
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.auth.authUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Profile);
