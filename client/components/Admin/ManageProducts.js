import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, fetchProducts, me } from "../../store/";
import BackToProfile from "../UserProfile/BackToProfile";

const ManageProducts = (props) => {
  const { addProduct, getProducts, loadInitialData, products, user } = props;

  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        await loadInitialData();
      } catch (err) {
        console.log(err);
      }
    };

    const loadProducts = async () => {
      try {
        await getProducts();
      } catch (err) {
        console.log(err);
      }
    };

    checkToken();

    if (user.makeAdmin) {
      loadProducts();
    }
  }, []);

  const onChangeHandler = (event) => {
    const target = event.target;
    const fieldName = target.name;
    const value = target.value;

    setProductInfo({
      ...productInfo,
      [fieldName]: value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await addProduct(productInfo);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <div>
        <BackToProfile id={user.id} />
      </div>
    );
  } else if (user.makeAdmin && products.length > 0) {
    return (
      <div>
        <BackToProfile id={user.id} />
        <div>
          {products.map((product) => {
            return (
              <div>
                <span>product.title</span>
                <span>product.price</span>
                <span>product.category</span>
                <Link
                  to={{
                    pathname: `/admin/products/${product.id}`,
                    state: { product },
                  }}
                >
                  Edit Product
                </Link>
              </div>
            );
          })}
        </div>
        <hr />
        <form onSubmit={onSubmitHandler}>
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={productInfo.title}
            onChange={onChangeHandler}
            required
          />
          <label>Price</label>
          <input
            name="price"
            type="text"
            value={productInfo.price}
            onChange={onChangeHandler}
            required
          />
          <label>Description</label>
          <input
            name="description"
            type="textarea"
            value={productInfo.description}
            onChange={onChangeHandler}
            required
          />
          <label>Image Link</label>
          <input
            name="description"
            type="text"
            value={productInfo.imageUrl}
            onChange={onChangeHandler}
            required
          />
          <label>Category</label>
          <input
            name="category"
            type="text"
            value={productInfo.category}
            onChange={onChangeHandler}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  } else if (user.makeAdmin && products.length === 0) {
    return (
      <div>
        <BackToProfile id={user.id} />
        <div>No products found. Add a product to get started.</div>
        <hr />
        <form onSubmit={onSubmitHandler}>
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={productInfo.title}
            onChange={onChangeHandler}
            required
          />
          <label>Price</label>
          <input
            name="price"
            type="text"
            value={productInfo.price}
            onChange={onChangeHandler}
            required
          />
          <label>Description</label>
          <input
            name="description"
            type="textarea"
            value={productInfo.description}
            onChange={onChangeHandler}
            required
          />
          <label>Image Link</label>
          <input
            name="description"
            type="text"
            value={productInfo.imageUrl}
            onChange={onChangeHandler}
            required
          />
          <label>Category</label>
          <input
            name="category"
            type="text"
            value={productInfo.category}
            onChange={onChangeHandler}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    user: state.auth.authUser,
    products: state.allProducts.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addProduct: (productInfo) => dispatch(addProduct(productInfo)),
    getProducts: () => dispatch(fetchProducts()),
    loadInitialData: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(ManageProducts);
