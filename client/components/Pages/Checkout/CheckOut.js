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
  const { cart, makeGuestOrder, makeUserOrder, user } = props;
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
        FirstName: "",
        LastName: "",
        Address1: "",
        Address2: "",
        City: "",
        State: "",
        Zip: "",
      });
      return;
    }
    const target = event.target;
    setShipping({
      ...shipping,
      [target.name]: target.value,
    });
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
    };
    try {
      if (user?.id) {
        makeUserOrder(orderSubmission, user.id)
      } else {
        makeGuestOrder(orderSubmission);
      }
    } catch (error) {
      console.log(error);
    }
    history.push("/complete");
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <div>Shipping Address:</div>
          <label>First Name</label>
          <input
            type="text"
            name="FirstName"
            value={shipping.FirstName}
            required
            onChange={(event) => onChangeHandler(event)}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="LastName"
            value={shipping.LastName}
            required
            onChange={onChangeHandler}
          />
          <label>Address 1</label>
          <input
            type="text"
            name="Address1"
            value={shipping.Address1}
            required
            onChange={onChangeHandler}
          />
          <label>Address 2</label>
          <input
            type="text"
            name="Address2"
            value={shipping.Address2}
            onChange={onChangeHandler}
          />
          <label>City</label>
          <input
            type="text"
            name="City"
            value={shipping.City}
            required
            onChange={onChangeHandler}
          />
          <label>State</label>
          <input
            type="text"
            name="State"
            value={shipping.State}
            required
            onChange={onChangeHandler}
          />
          <label>Zip</label>
          <input
            type="text"
            name="Zip"
            value={shipping.Zip}
            required
            onChange={onChangeHandler}
          />
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            required
            onChange={onChangeHandler3}
          />
        </div>
        <div>
          <div>Billing Address:</div>
          <label>First Name</label>
          <input
            type="text"
            name="FirstName"
            value={billing.FirstName}
            required
            onChange={onChangeHandler2}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="LastName"
            value={billing.LastName}
            required
            onChange={onChangeHandler2}
          />
          <label>Address 1</label>
          <input
            type="text"
            name="Address1"
            value={billing.Address1}
            required
            onChange={onChangeHandler2}
          />
          <label>Address 2</label>
          <input
            type="text"
            name="Address2"
            value={billing.Address2}
            onChange={onChangeHandler2}
          />
          <label>City</label>
          <input
            type="text"
            name="City"
            value={billing.City}
            required
            onChange={onChangeHandler2}
          />
          <label>State</label>
          <input
            type="text"
            name="State"
            value={billing.State}
            required
            onChange={onChangeHandler2}
          />
          <label>Zip</label>
          <input
            type="text"
            name="Zip"
            value={billing.Zip}
            required
            onChange={onChangeHandler2}
          />

          <div>
            <input
              type="checkbox"
              id="sameAddress"

              name="addressToggle"
              value={toggleAddress ? "on" : "off"}
              onChange={onChangeHandler}
            />
            <label htmlFor="sameAddress"> Same as Shipping Address</label>
          </div>
        </div>

        <button>Submit Order</button>
      </form>
    </div>

  );
};

const mapDispatch = (dispatch) => {
  return {
    makeGuestOrder: (order) => dispatch(makeGuestOrder(order)),
    makeUserOrder: (order, id) => dispatch(makeUserOrder(order, id))
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

// function CheckOut() {
//     return (
//         <div className={"container"}>
//             <div className={"py-5 text-center"}>
//                 <img className={"d-block mx-auto mb-4"} src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
//                     <h2>Checkout form</h2>
//                     <p className={"lead"}>Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
//             </div>

//             <div className={"row"}>
//                 <div className={"col-md-4 order-md-2 mb-4"}>
//                     <h4 className={"d-flex justify-content-between align-items-center mb-3"}>
//                         <span className={"text-muted"}>Your cart</span>
//                         <span className={"badge badge-secondary badge-pill"}>3</span>
//                     </h4>
//                     <ul className={"list-group mb-3"}>
//                         <li className={"list-group-item d-flex justify-content-between lh-condensed"}>
//                             <div>
//                                 <h6 className={"my-0"}>Product name</h6>
//                                 <small className={"text-muted"}>Brief description</small>
//                             </div>
//                             <span className={"text-muted"}>$12</span>
//                         </li>
//                         <li className={"list-group-item d-flex justify-content-between lh-condensed"}>
//                             <div>
//                                 <h6 className={"my-0"}>Second product</h6>
//                                 <small className={"text-muted"}>Brief description</small>
//                             </div>
//                             <span className={"text-muted"}>$8</span>
//                         </li>
//                         <li className={"list-group-item d-flex justify-content-between lh-condensed"}>
//                             <div>
//                                 <h6 className={"my-0"}>Third item</h6>
//                                 <small className={"text-muted"}>Brief description</small>
//                             </div>
//                             <span className={"text-muted"}>$5</span>
//                         </li>
//                         <li className={"list-group-item d-flex justify-content-between bg-light"}>
//                             <div className={"text-success"}>
//                                 <h6 className={"my-0"}>Promo code</h6>
//                                 <small>EXAMPLECODE</small>
//                             </div>
//                             <span className={"text-success"}>-$5</span>
//                         </li>
//                         <li className={"list-group-item d-flex justify-content-between"}>
//                             <span>Total (USD)</span>
//                             <strong>$20</strong>
//                         </li>
//                     </ul>

//                     <form className={"card p-2"}>
//                         <div className={"input-group"}>
//                             <input type="text" className={"form-control"} placeholder="Promo code" />
//                                 <div className={"input-group-append"}>
//                                     <button type="submit" className={"btn btn-secondary"}>Redeem</button>
//                                 </div>
//                         </div>
//                     </form>
//                 </div>
//                 <div className={"col-md-8 order-md-1"}>
//                     <h4 className={"mb-3"}>Billing address</h4>
//                     <form className={"needs-validation"} novalidate>
//                         <div class="row">
//                             <div class="col-md-6 mb-3">
//                                 <label for="firstName">First name</label>
//                                 <input type="text" className={"form-control"} id="firstName" placeholder="" value="" required />
//                                     <div class="invalid-feedback">
//                                         Valid first name is required.
//                                     </div>
//                             </div>
//                             <div className={"col-md-6 mb-3"}>
//                                 <label for="lastName">Last name</label>
//                                 <input type="text" className={"form-control"} id="lastName" placeholder="" value="" required />
//                                     <div className={"invalid-feedback"}>
//                                         Valid last name is required.
//                                     </div>
//                             </div>
//                         </div>

//                         <div className={"mb-3"}>
//                             <label for="username">Username</label>
//                             <div className={"input-group"}>
//                                 <div className={"input-group-prepend"}>
//                                     <span className={"input-group-text"}>@</span>
//                                 </div>
//                                 <input type="text" class="form-control" id="username" placeholder="Username" required />
//                                     <div className={"invalid-feedback"} style="width: 100%;">
//                                         Your username is required.
//                                     </div>
//                             </div>
//                         </div>

//                         <div className={"mb-3"}>
//                             <label for="email">Email <span class="text-muted">(Optional)</span></label>
//                             <input type="email" className={"form-control"} id="email" placeholder="you@example.com" />
//                                 <div className={"invalid-feedback"}>
//                                     Please enter a valid email address for shipping updates.
//                                 </div>
//                         </div>

//                         <div class="mb-3">
//                             <label for="address">Address</label>
//                             <input type="text" className={"form-control"} id="address" placeholder="1234 Main St" required>
//                                 <div className={"invalid-feedback"}>
//                                     Please enter your shipping address.
//                                 </div>
//                         </div>

//                         <div class="mb-3">
//                             <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
//                             <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
//                         </div>

//                         <div class="row">
//                             <div class="col-md-5 mb-3">
//                                 <label for="country">Country</label>
//                                 <select class="custom-select d-block w-100" id="country" required>
//                                     <option value="">Choose...</option>
//                                     <option>United States</option>
//                                 </select>
//                                 <div class="invalid-feedback">
//                                     Please select a valid country.
//                                 </div>
//                             </div>
//                             <div class="col-md-4 mb-3">
//                                 <label for="state">State</label>
//                                 <select class="custom-select d-block w-100" id="state" required>
//                                     <option value="">Choose...</option>
//                                     <option>California</option>
//                                 </select>
//                                 <div class="invalid-feedback">
//                                     Please provide a valid state.
//                                 </div>
//                             </div>
//                             <div class="col-md-3 mb-3">
//                                 <label for="zip">Zip</label>
//                                 <input type="text" class="form-control" id="zip" placeholder="" required>
//                                     <div class="invalid-feedback">
//                                         Zip code required.
//                                     </div>
//                             </div>
//                         </div>
//                         <hr class="mb-4">
//                             <div class="custom-control custom-checkbox">
//                                 <input type="checkbox" class="custom-control-input" id="same-address">
//                                     <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
//                             </div>
//                             <div class="custom-control custom-checkbox">
//                                 <input type="checkbox" class="custom-control-input" id="save-info">
//                                     <label class="custom-control-label" for="save-info">Save this information for next time</label>
//                             </div>
//                             <hr class="mb-4">

//                                 <h4 class="mb-3">Payment</h4>

//                                 <div class="d-block my-3">
//                                     <div class="custom-control custom-radio">
//                                         <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
//                                             <label class="custom-control-label" for="credit">Credit card</label>
//                                     </div>
//                                     <div class="custom-control custom-radio">
//                                         <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
//                                             <label class="custom-control-label" for="debit">Debit card</label>
//                                     </div>
//                                     <div class="custom-control custom-radio">
//                                         <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
//                                             <label class="custom-control-label" for="paypal">Paypal</label>
//                                     </div>
//                                 </div>
//                                 <div class="row">
//                                     <div class="col-md-6 mb-3">
//                                         <label for="cc-name">Name on card</label>
//                                         <input type="text" class="form-control" id="cc-name" placeholder="" required>
//                                             <small class="text-muted">Full name as displayed on card</small>
//                                             <div class="invalid-feedback">
//                                                 Name on card is required
//                                             </div>
//                                     </div>
//                                     <div class="col-md-6 mb-3">
//                                         <label for="cc-number">Credit card number</label>
//                                         <input type="text" class="form-control" id="cc-number" placeholder="" required>
//                                             <div class="invalid-feedback">
//                                                 Credit card number is required
//                                             </div>
//                                     </div>
//                                 </div>
//                                 <div class="row">
//                                     <div class="col-md-3 mb-3">
//                                         <label for="cc-expiration">Expiration</label>
//                                         <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
//                                             <div class="invalid-feedback">
//                                                 Expiration date required
//                                             </div>
//                                     </div>
//                                     <div class="col-md-3 mb-3">
//                                         <label for="cc-expiration">CVV</label>
//                                         <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
//                                             <div class="invalid-feedback">
//                                                 Security code required
//                                             </div>
//                                     </div>
//                                 </div>
//                                 <hr class="mb-4">
//                                     <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
//                                 </form>
//                             </div>
//                         </div>

//                         <footer class="my-5 pt-5 text-muted text-center text-small">
//                             <p class="mb-1">&copy; 2017-2018 Company Name</p>
//                             <ul class="list-inline">
//                                 <li class="list-inline-item"><a href="#">Privacy</a></li>
//                                 <li class="list-inline-item"><a href="#">Terms</a></li>
//                                 <li class="list-inline-item"><a href="#">Support</a></li>
//                             </ul>
//                         </footer>
//                 </div>
//                 );
// }
