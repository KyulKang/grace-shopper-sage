import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BackToProfile from "../UserProfile/BackToProfile";
import { fetchOrders, me } from "../../store";

const ViewCustomerOrders = (props) => {
  const { getOrders, loadInitialData, user, orders } = props;
  const id = props.match.params.userId;

  useEffect(() => {
    loadInitialData();
    getOrders(id);
  }, []);

  if (!user) {
    return <BackToProfile id={id} />;
  } else if (user.makeAdmin && orders.length > 0) {
    return (
      <div>
        <div>
          {orders
            .sort((a, b) => a.id - b.id)
            .map((order) => {
              let totalCost = 0;
              let purchaseTime = order.createdAt;
              return (
                <div key={order.id}>
                  {order.orderItems.map((item) => {
                    totalCost += Number(item.quantity) * Number(item.price);
                    console.log(item);
                    return (
                      <div key={item.id}>
                        <span>
                          Product Name:
                          {item.product ? item.product.title : item.id}
                        </span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: {item.price}</span>
                      </div>
                    );
                  })}
                  <br />
                  <p>Purchased at: {new Date(purchaseTime).toLocaleString()}</p>
                  <p>Total Cost: {totalCost}</p>
                  <hr />
                </div>
              );
            })}
        </div>
        <hr />
        <div>
          <BackToProfile id={user.id} />
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
    orders: state.orders.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOrders: (userId) => dispatch(fetchOrders(userId)),
    loadInitialData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(ViewCustomerOrders);
