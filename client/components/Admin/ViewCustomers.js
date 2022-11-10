import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../store";

const ViewCustomers = (props) => {
  const { getUsers, users } = props;

  useEffect(() => {
    const allUsers = async () => {
      try {
        await getUsers();
      } catch (err) {
        console.log(err);
      }
    };
  }, [])

  return (
    users.map((user) => {
        <div>
            <span>{user.firstName} {user.lastName}</span>
        </div>
    })
  )
};


const mapState = (state) => {
  return {
    users: state.users.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(ViewCustomers);
