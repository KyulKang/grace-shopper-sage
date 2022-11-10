import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/allProducts";
import { addProduct } from "../../store/singleProduct";

const ManageProducts = (props) => {
  const { addProduct, products, getProducts } = props;
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await getProducts();
      } catch (err) {
        console.log(err);
      }
    };

    loadProducts();
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

  return (
    <div>
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
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    products: state.allProducts.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addProduct: (productInfo) => dispatch(addProduct(productInfo)),
  };
};

export default connect(mapState, mapDispatch)(ManageProducts);
