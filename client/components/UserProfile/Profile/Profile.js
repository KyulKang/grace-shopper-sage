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
        <div>{user.username}</div>
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
        <div>{user.username}</div>
        <Link path={`/user/${user.id}/orders`}>Order History</Link>
        <EditProfileButton />
        <Link path={"/admin/users"}>View All Customers</Link>
        <Link path={"/admin/products"}>View All Products</Link>
      </div>
    );
  }
};

export default Profile;
