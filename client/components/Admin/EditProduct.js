import { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { deleteProduct, updateProduct } from "../../store/singleProduct";

const EditProduct = (props) => {
  const product = useLocation().state.product;
  const { deleteProduct, updateProduct } = props;

  const [productInfo, setProductInfo] = useState({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl,
    category: product.category,
  });

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
};

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (productInfo) => dispatch(updateProduct(productInfo)),
    deleteProduct: (productId) => dispatch(deleteProduct(productId)),
  };
};

export default connect(null, mapDispatch)(EditProduct);
