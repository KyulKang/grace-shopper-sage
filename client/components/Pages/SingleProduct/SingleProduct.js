import React, { useState, useEffect } from 'react'
import { getProduct } from "../../../store";
import { connect } from "react-redux"

function SingleProduct(props) {

    const { getProduct, product } = props

    useEffect(()=>{
        const getSingleProduct = async() => {
            try {
              await getProduct(this.props.match.params.productId)
            } catch (error) {
               console.log(error)
            }
        }
        getSingleProduct()
    }, [])

    return (
        <div className={"card"} style={{ width: "18rem" }}>
            <img className={"card-img-top"} src="./logo512.png" alt="Card cap" />
            <div className={"card-body"}>

                <h5 className={"card-title"}>{product.title}</h5>

                <p className={"card-text"}>
                    {product.description}
                </p>
                <button>Add to Cart</button>
            </div>
        </div>
    );
}

const mapDispatch = (dispatch) => {
    return {
      getProduct: (id) => dispatch(getProduct(id))
    }
  }
  const mapState = (state) => {
    return {
      product: state.singleProduct,
      ///LOOK AT THIS
    }
  }
  // export default AllProducts;
  export default connect(mapState, mapDispatch)(SingleProduct);

