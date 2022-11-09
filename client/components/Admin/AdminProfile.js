import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../../store";
import Login from "../UserProfile/Login/Login";
import Profile from "../UserProfile/Profile/Profile";

const AdminProfile = (props) => {
  const { getUser, user } = props;

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        try {
          const user = await getUser(user.id);
          user.isAdmin ? setAdmin(true) : setAdmin(false);
        } catch (err) {
          console.log(err);
        }
      }
    };

    checkAdmin();
  }, []);

  if (admin) {
    return (
      <div>
        <div>{user.imageUrl}</div>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.email}</div>
        <div>{user.username}</div>
        <Link path={`/user/${user.id}/orders`}>Order History</Link>
        <EditProfileButton />
        <Link path={"/admin/users"} />
        <Link path={"/admin/products"} />
      </div>
    );
  } else if (!admin) {
    <Profile user={user} />;
  } else {
    return <Login />;
  }
};

const mapState = (state) => {
  return {
    user: state.users.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
  };
};

export default connect(mapState, mapDispatch)(AdminProfile);
