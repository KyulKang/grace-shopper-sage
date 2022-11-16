import React from "react";
import { Link } from "react-router-dom";
function ProductCard(props) {
  return (
    <div className={"card product-card"} style={{ width: "18rem" }}>
      <Link to={`/product/${props.item.id}`}>
        <img className={"card-img-top product-card-image"} src={props.item.imageUrl} alt="Card cap" />
      </Link>
      <div className={"card-body"}>
        <h5 className={"card-title"}>{props.item.title}</h5>
        {/* <p className={"card-text"}>
          {props.item.description}
        </p> */}

        <Link to={`/product/${props.item.id}`}>
          <button className="btn btn-dark">
            Learn More
          </button>

        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
