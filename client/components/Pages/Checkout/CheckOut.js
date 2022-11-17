import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  makeGuestOrder,
  makeUserOrder,
  fetchCart,
  _getCart,
  _clearCart,
} from "../../../store";
import { connect } from "react-redux";

const Checkout = (props) => {
  const { cart, makeGuestOrder, makeUserOrder, user, guestUpdateCart } = props;
  let history = useHistory();
  const [shipping, setShipping] = useState({
    FirstName: "",
    LastName: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Zip: "",
  });
  const [toggleAddress, setToggleAddress] = useState(false);
  const [billing, setBilling] = useState({
    FirstName: "",
    LastName: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Zip: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  console.log("shipping", shipping, "billing", billing)
  const onChangeHandler = (event) => {
    if (event.target.name === "addressToggle") {
      setBilling({
        ...shipping,
      })
      if (event.target.value == "off") {
        setToggleAddress(true);
        return;
      }
      setToggleAddress(false);
      return;
    } else
    {const target = event.target;
    setShipping({
      ...shipping,
      [target.name]: target.value,
    })
    if (!toggleAddress){setBilling({...billing, [target.name]: target.value})}
  }
  };
  const onChangeHandler2 = (event) => {
    // console.log("TARGET:", event, "NAME:", event.target.name);
    const target = event.target;
    setBilling({
      ...billing,
      [target.name]: target.value,
    });
  };
  const onChangeHandler3 = (event) => {
    setPhoneNumber(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const orderSubmission = {
      order: {
        shippingFirstName: shipping.FirstName,
        shippingLastName: shipping.LastName,
        shippingAddress1: shipping.Address1,
        shippingAddress2: shipping.Address2,
        shippingCity: shipping.City,
        shippingState: shipping.State,
        shippingZip: +shipping.Zip,
        phoneNumber: +phoneNumber,
        billingFirstName: billing.FirstName,
        billingLastName: billing.LastName,
        billingAddress1: billing.Address1,
        billingAddress2: billing.Address2,
        billingCity: billing.City,
        billingState: billing.State,
        billingZip: +billing.Zip,
      },
      cart: cart.map((item) => {
        return {
          productId: item.product.id,
          quantity: +item.quantity,
          price: item.product.price,
        };
      }),
    }


    try {
      if (user?.id) {
        makeUserOrder(orderSubmission, user.id);
      } else {
        makeGuestOrder(orderSubmission)
        localStorage.removeItem("cart")
        guestUpdateCart([])
      }
    } catch (error) {
      console.log(error);
    }
    history.push("/complete");
  };
  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <div>
          <h3>Shipping Address:</h3>
          <div className="checkout-row">
            <div className="checkout-field">
              <label className="checkout-label">First Name</label>
              <input
                type="text"
                name="FirstName"
                value={shipping.FirstName}
                required
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="checkout-field">
              <label className="checkout-label">Last Name</label>
              <input
                type="text"
                name="LastName"
                value={shipping.LastName}
                required
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="checkout-row">
            <div className="checkout-field">
              <label className="checkout-label">Address 1</label>
              <input
                type="text"
                name="Address1"
                value={shipping.Address1}
                required
                onChange={onChangeHandler}
              />
            </div>
            <div className="checkout-field">
              <label className="checkout-label">Address 2</label>
              <input
                type="text"
                name="Address2"
                value={shipping.Address2}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="checkout-row">
            <div className="checkout-field">
              <label className="checkout-label">City</label>
              <input
                type="text"
                name="City"
                value={shipping.City}
                required
                onChange={onChangeHandler}
              />
            </div>
            <div className="checkout-field">
              <label className="checkout-label">State</label>
              <input
                type="text"
                name="State"
                value={shipping.State}
                required
                onChange={onChangeHandler}
              />
            </div>
            <div className="checkout-field">
              <label className="checkout-label">Zip</label>
              <input
                type="text"
                name="Zip"
                value={shipping.Zip}
                required
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="checkout-row">
            <div className="checkout-field">
              <label className="checkout-label">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                required
                onChange={onChangeHandler3}
              />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              className="checkout-checkbox"
              id="sameAddress"
              name="addressToggle"
              value={toggleAddress ? "on" : "off"}
              onChange={onChangeHandler}
            />
            <label className="checkout-label" htmlFor="sameAddress">
              Use a different billing address
            </label>
          </div>
        </div>
        {toggleAddress ? (
          <div>
            <hr />
            <h3>Billing Address:</h3>
            <div className="checkout-row">
              <div className="checkout-field">
                <label className="checkout-label">First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  value={billing.FirstName}
                  required
                  onChange={onChangeHandler2}
                />
              </div>
              <div className="checkout-field">
                <label className="checkout-label">Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  value={billing.LastName}
                  required
                  onChange={onChangeHandler2}
                />
              </div>
            </div>
            <div className="checkout-row">
              <div className="checkout-field">
                <label className="checkout-label">Address 1</label>
                <input
                  type="text"
                  name="Address1"
                  value={billing.Address1}
                  required
                  onChange={onChangeHandler2}
                />
              </div>
              <div className="checkout-field">
                <label className="checkout-label">Address 2</label>
                <input
                  type="text"
                  name="Address2"
                  value={billing.Address2}
                  onChange={onChangeHandler2}
                />
              </div>
            </div>
            <div className="checkout-row">
              <div className="checkout-field">
                <label className="checkout-label">City</label>
                <input
                  type="text"
                  name="City"
                  value={billing.City}
                  required
                  onChange={onChangeHandler2}
                />
              </div>
              <div className="checkout-field">
                <label className="checkout-label">State</label>
                <input
                  type="text"
                  name="State"
                  value={billing.State}
                  required
                  onChange={onChangeHandler2}
                />
              </div>
              <div className="checkout-field">
                <label>Zip</label>
                <input
                  type="text"
                  name="Zip"
                  value={billing.Zip}
                  required
                  onChange={onChangeHandler2}
                />
              </div>
            </div>
          </div>
        ) : null}

        <button className="checkout-submit">Submit Order</button>
      </form>
    </div>
  );
};
const mapDispatch = (dispatch) => {
  return {
    makeGuestOrder: (order) => dispatch(makeGuestOrder(order)),
    makeUserOrder: (order, id) => dispatch(makeUserOrder(order, id)),
    guestUpdateCart: (item) => dispatch(_getCart(item))
  };
};
const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.auth.authUser,
  };
};

export default connect(mapState, mapDispatch)(Checkout);

/* const [toggleAddress, setToggleAddress] = useState(false);
const [billing, setBilling] = useState({
  billingFirstName: "",
  billingLastName: "",
  billingAddress1: "",
  billingAddress2: "",
  billingCity: "",
  billingState: "",
  billingZip: "",
});
const [phoneNumber, setPhoneNumber]=useState("")
const onChangeHandler = (event) => {
  if (event.target.name === "addressToggle") {
    if (event.target.value == "off") {
      setBilling({
        ...shipping,
      });
      setToggleAddress(true);
      return;
    }
    setToggleAddress(false);
    setBilling({
      billingFirstName: "",
      billingLastName: "",
      billingAddress1: "",
      billingAddress2: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
    });
    return; */
