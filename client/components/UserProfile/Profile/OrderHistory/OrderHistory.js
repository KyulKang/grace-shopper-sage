import React, { useEffect } from "react";
import { connect } from "react-redux";
import BackToProfile from "../../BackToProfile";
import { fetchUserOrders, me } from "../../../../store";

const OrderHistory = (props) => {
  const { getUserOrders, loadInitialData, user, orders } = props;
  const id = props.match.params.userId;

  useEffect(() => {
    loadInitialData();
    getUserOrders(id);
  }, []);

  if (!user) {
    return <BackToProfile id={id} />;
  } else if (orders.length > 0) {
    return (
      <div>
        <div>
          <h3>
            Orders for {user.firstName} {user.lastName}:
          </h3>
          {orders
            .sort((a, b) => a.id - b.id)
            .map((order) => {
              let totalCost = 0;
              let purchaseTime = order.createdAt;
              return (
                <div key={order.id}>
                  {order.orderItems.map((item) => {
                    totalCost += Number(item.quantity) * Number(item.price);
                    return (
                      <p key={item.id}>
                        <span>
                          Item: {item.product ? item.product.title : item.id}
                        </span>
                        <br />
                        <span>Quantity: {item.quantity}</span>
                        <br />
                        <span>Price: {item.price}</span>
                      </p>
                    );
                  })}
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
        <p>No orders found</p>
        <BackToProfile id={user.id} />
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
    getUserOrders: (userId) => dispatch(fetchUserOrders(userId)),
    loadInitialData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);
