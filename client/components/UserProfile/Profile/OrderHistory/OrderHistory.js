import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../../../store/";

const OrderHistory = (props) => {
  const { fetchOrders, match, orders } = props;

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        await fetchOrders(match.params.userId);
        setUserOrders(orders);
      } catch (err) {
        console.log(err);
      }
    };

    getOrders();
  }, []);

  return (
    <div>
      {userOrders.map((order) => {
        return (
          <div>
            <span>{order.orderId}</span>
            <span>{order.date}</span>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrders: (id) => dispatch(fetchOrders(id)),
  };
};

const mapState = (state) => {
  return {
    orders: state.orders.orders,
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);
