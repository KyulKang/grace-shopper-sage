import React from "react";
import { useEffect, useState } from "react";
import { fetchCart } from "../../../store";
import { connect } from "react-redux";

export function MyCart(props) {
    const { fetchCart, cart } = props;

    console.log("MyCart props", props);
    useEffect(() => {
        console.log(fetchCart);
        const getCart = async () => {
            try {
                await fetchCart();
            }
            catch (error) {
                console.log(error)
            }
        }
        getCart();
    }, [])
    return (
        <section id="cart" className="d-flex flex-row">
            <div className="cart-left mr-md-5 ">
                <div className="cart-header d-flex flex-row align-items-center">
                    <h2 className="mr-md-5">Shopping Cart</h2>
                    <span>3 items</span>
                </div>
                <div className="cart-item-list">
                    <hr />
                    <CartItem />
                    <hr />
                </div>
            </div>
            <div className="cart-right">
                <h3>Summary</h3>
                <hr />
                <h5>ITEMS 3 <span>$132.00</span></h5>
                <h5>TOTAL PRICE $137.00</h5>
                <button type="button" className="btn btn-primary btn-lg">Large button</button>
            </div>
        </section>
    );
}
const mapDispatch = (dispatch) => {
    return {
        fetchCart: () => dispatch(fetchCart())
    }
}
const mapState = (state) => {
    return {
        cart: state.cart,
    }
}

export default connect(mapState, mapDispatch)(MyCart);

function CartItem() {
    return (
        <div className="cart-item d-flex flex-row align-items-center">
            <img src="." alt="images" className="cart-item-image" />
            <div className="item-description">
                <p>Shirt</p>
                <b>Cotton T-shirt</b>
            </div>
            <input type="number" placeholder="1" min="1"/>
            <h5>$44.00</h5>
            <button>Remove Item</button>
        </div>
    );
}
function CartSummary(){

}