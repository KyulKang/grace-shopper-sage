import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../../store";
import ProductCard from "./ProductCard";
import MyCart from "../Cart/MyCart";
function AllProducts(props) {
  const { fetchProducts, products } = props;
  // const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState("All");
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
  }, []);

  function handleFilter(event) {
    setFilter(event.target.value);
  }
  return (
    <React.Fragment>
      <main role="main">
        <div className="jumbotron main-image">
          <div className="container main-image-text">
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
        <div className="filter">
          <button className={`btn ${filter === "All" ? "btn-primary" : "btn-secondary"}`} onClick={handleFilter} value="All">All</button>
          <button className={`btn ${filter === "Clothes" ? "btn-primary" : "btn-secondary"}`} onClick={handleFilter} value="Clothes">Clothes</button>
          <button className={`btn ${filter === "Utensils" ? "btn-primary" : "btn-secondary"}`} onClick={handleFilter} value="Utensils">Utensils</button>
        </div>

      </section>
      <section>
        <div className="productCardGrid d-flex flex-row flex-wrap">
          {products?.map((item, id) => {
            if (filter !== "All" && item.category !== filter) {
              return;
            }
            return <ProductCard item={item} key={id} />
          })}
        </div>
      </section>
      {/* <MyCart /> */}
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
