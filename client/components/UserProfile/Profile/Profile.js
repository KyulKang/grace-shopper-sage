import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../store";
import AdminProfile from "../../Admin/AdminProfile";
import Login from "../Login/Login";

const Profile = (props) => {
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

  if (!admin) {
    return (
      <div>
        <div>{user.imageUrl}</div>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.email}</div>
        <div>{user.username}</div>
        <Link path={`/user/${user.id}/orders`}>Order History</Link>
        <EditProfileButton />
      </div>
    );
  } else if (admin) {
    return <AdminProfile user={user} />;
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
    getUser: (id) => {
      dispatch(fetchUser(id));
    },
  };
};

export default connect(mapState, mapDispatch)(Profile);
