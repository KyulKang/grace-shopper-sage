import React from "react";
import { Link } from "react-router-dom";
function ProductCard(props) {
  return (
    <div className={"card"} style={{ width: "18rem" }}>
      <Link to={`/product/${props.item.id}`}>
        <img className={"card-img-top"} src={props.item.imageUrl} alt="Card cap" />
      </Link>
      <div className={"card-body"}>
        <h5 className={"card-title"}>{props.item.title}</h5>
        <p className={"card-text"}>
          {props.item.description}
        </p>

        <Link to={`/product/${props.item.id}`} >Buy Now</Link>
      </div>
    </div>
  );
}

export default ProductCard;
