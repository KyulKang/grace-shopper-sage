import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../../store";
import ProductCard from "./ProductCard";

function AllProducts(props) {
  const { fetchProducts, products } = props;
  // const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        await fetchProducts();
      }
      catch (error) {
        console.log(error)
      }
    }
    getProducts();
  }, [])
  return (
    <React.Fragment>
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Hello, world!</h1>
            <p>
              This is a template for a simple marketing or informational
              website. It includes a large callout called a jumbotron and three
              supporting pieces of content. Use it as a starting point to create
              something more unique.
            </p>
            <p>
              <a className="btn btn-primary btn-lg" href="#" role="button">
                Learn more &raquo;
              </a>
            </p>
          </div>
        </div>
      </main>
      <section>
        <div className="productCardGrid">
          {products?.map((item) => {
            console.log(item);
            return <ProductCard {...item} />
          })}
          {products.length > 0 && "There are products"}
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </div>
      </section>
    </React.Fragment>
  );
}
const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}
const mapState = (state) => {
  return {
    products: state.allProducts.products,
  }
}
// export default AllProducts;
export default connect(mapState, mapDispatch)(AllProducts);
