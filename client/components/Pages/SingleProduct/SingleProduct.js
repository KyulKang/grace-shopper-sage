import React from "react";
function SingleProduct(props) {
    return (
        <div className={"card"} style={{ width: "18rem" }}>
            <img className={"card-img-top"} src="./logo512.png" alt="Card cap" />
            <div className={"card-body"}>
                <h5 className={"card-title"}>{props?.item?.title}</h5>
                <p className={"card-text"}>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </p>
                <button>Add to Cart</button>
            </div>
        </div>
    );
}

export default SingleProduct;
