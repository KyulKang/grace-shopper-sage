import React from "react";
import { useEffect, useState } from "react";
import { fetchCart, _getCart, _clearCart } from "../../../store";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export function MyCart(props) {
  const [toggleCart, setToggleCart] = useState(false);
  const { fetchCart, cart, user, guestUpdateCart, clearCart } = props;

  console.log("MyCart props", props);
  useEffect(() => {
    const token = window.localStorage.getItem("token") || null;
    if (token && user) {
      console.log("user", user);
      const getCart = async () => {
        try {
          console.log("mount logged in fetch");
          await fetchCart(user.id);
        } catch (error) {
          console.log(error);
        }
      };
      getCart();
    } else {
      console.log("unlogged in fetch");
      let currentCart = {};
      if (localStorage.getItem("cart")) {
        currentCart = JSON.parse(localStorage.getItem("cart"));
        guestUpdateCart(Object.values(currentCart));
      }
    }
  }, [user]);
  function handleToggleCart(event) {
    console.log("click");
    setToggleCart(!toggleCart);
  }
  return (
    <React.Fragment>
      <button
        id="toggleCart"
        className={`btn ${toggleCart ? "btn-secondary" : "btn-warning"}`}
        onClick={handleToggleCart}
      >
        Cart
      </button>
      {toggleCart && (
        <React.Fragment>
          <section id="cart" className="d-flex fix-cart">
            <div className="cart-left">
              <div className="cart-header d-flex flex-row align-items-center">
                <h2 className="mr-md-5">Shopping Cart</h2>
              </div>
              <div className="cart-item-list">
                <hr />
                {cart
                  .sort((a, b) =>
                    a.product.title.localeCompare(b.product.title)
                  )
                  .map((item, index) => {
                    return (
                      <CartItem
                        item={item}
                        key={index}
                        itemQuantity={item.quantity}
                      />
                    );
                  })}
                <hr />
              </div>
            </div>
            <div className="cart-right">
              <h3>Summary</h3>
              <hr />
              <h5>
                ITEMS:
                {cart.reduce((prev, curr) => {
                  return prev + +curr.quantity;
                }, 0)}
                {cart
                  .sort((a, b) =>
                  a.product.title.localeCompare(b.product.title)
                )
                  .map((item, index) => {
                    return (
                      <div key={index}>
                        <span>
                          {item.quantity} X ${item.product.price}
                        </span>
                      </div>
                    );
                  })}
              </h5>
              <h5>
                TOTAL PRICE $
                {cart.reduce((prev, curr) => {
                  return prev + +curr.quantity * curr.product.price;
                }, 0)}
              </h5>
              <Link to={"/checkout"}>
                <button type="button" className="btn btn-primary btn-lg">
                  Checkout
                </button>
              </Link>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
const mapDispatch = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
    guestUpdateCart: (item) => dispatch(_getCart(item)),
    clearCart: () => dispatch(_clearCart()),
  };
};
const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.auth.authUser,
  };
};

export default connect(mapState, mapDispatch)(MyCart);
