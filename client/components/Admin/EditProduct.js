import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { deleteProduct, me, updateProduct } from "../../store/";

const EditProduct = (props) => {
  // This gets the state object from the Link state, and assigns the product value to a variable
  const product = useLocation().state.product;
  const { deleteProduct, loadInitialData, updateProduct, user } = props;

  const [authorized, setAuthorized] = useState(false);

  const [productInfo, setProductInfo] = useState({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl,
    category: product.category,
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const verified = await loadInitialData();
        verified ? setAuthorized(true) : setAuthorized(false);
      } catch (err) {
        console.log(err);
      }
    };

    checkToken();
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
      await updateProduct(productInfo);
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteHandler = async (event) => {
    event.preventDefault();
    try {
      alert("Delete this product?");
      await deleteProduct(productInfo.id);
      <Redirect to="/admin/products" />;
    } catch (err) {
      console.log(err);
    }
  };

  if (user.isAdmin) {
    return (
      <div>
        <Link
          to={{
            pathname: `/admin/product/products`,
          }}
        >
          Back to Products
        </Link>
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
        </form>
        <button onClick={(id) => onDeleteHandler(product.id)}>
          Delete Product
        </button>
      </div>
    );
  } else <Redirect to="/AllProducts" />;
};

const mapState = (state) => {
  return {
    user: state.auth.authUser
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteProduct: (productId) => dispatch(deleteProduct(productId)),
    loadInitialData: () => dispatch(me()),
    updateProduct: (productInfo) => dispatch(updateProduct(productInfo)),
  };
};

export default connect(mapState, mapDispatch)(EditProduct);
