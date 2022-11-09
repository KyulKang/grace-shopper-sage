export function MyCart() {
    return (
        <section id="cart">
            <div className="cart-left">
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <span>3 items</span>
                </div>
                <div className="cart-item-list">
                    <hr />
                    <CartItem />
                    <hr />
                    <a>Back to Shop</a>
                </div>
            </div>
            <div className="cart-right">
                <h3>Summary</h3>
                <hr />
                <h5>ITEMS 3 <span>$132.00</span></h5>
                <h5>TOTAL PRICE $137.00</h5>
                <button type="button" class="btn btn-primary btn-lg">Large button</button>
            </div>
        </section>
    );
}
function CartItem() {
    return (
        <div className="cart-item">
            <img src="." alt="images" className="cart-item-image" />
            <div className="item-description">
                <p>Shirt</p>
                <b>Cotton T-shirt</b>
            </div>
            <input type="number" />
            <h5>$44.00</h5>
        </div>
    );
}
function CartSummary(){

}