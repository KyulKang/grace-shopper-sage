import { Redirect } from "react-router-dom";

const Profile = (props) => {
  const { user } = props;

  if (!user) {
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
              pathname: "/admina/products",
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

export default Profile;
