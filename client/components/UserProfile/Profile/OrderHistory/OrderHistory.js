import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import BackToProfile from "../../BackToProfile";
import { fetchOrders } from "../../../../store/";

const OrderHistory = (props) => {
  const { fetchOrders, orders } = props;

  const user = useLocation().state.user;
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const userOrders = await fetchOrders(user.id);
        if (userOrders) {
          setUserOrders(orders);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getOrders();
  }, []);

  if (!orders) {
    return (
      <div>
        <BackToProfile id={user.id} />
        No orders found. Buy something!
      </div>
    );
  } else if (orders) {
    return (
      <div>
        <BackToProfile id={user.id} />

        {/* {userOrders.map((order) => {
          return (
            <div>
              <span>{order.orderId}</span>
              <span>{order.date}</span>
            </div>
          );
        })} */}
      </div>
    );
  }
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
