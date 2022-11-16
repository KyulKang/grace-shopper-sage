import React from "react";
import { connect } from "react-redux";
import {
  addProduct,
  fetchAdminProducts,
  me,
  deleteProduct,
} from "../../store/";
import EditProduct from "./EditProduct";
import BackToProfile from "../UserProfile/BackToProfile";

class ManageProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "",
      description: "",
      imageUrl: "",
      category: "",
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  componentDidMount() {
    this.props.loadInitialData();
    this.props.getProducts();
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.addProduct(this.state);
    this.setState({
      title: "",
      price: "",
      description: "",
      imageUrl: "",
      category: "",
    });
  };

  onDeleteHandler = (event) => {
    this.props.deleteProduct(event.target.value);
  };

  render() {
    const { user, products } = this.props;

    if (!user) {
      return <div></div>;
    } else if (user.makeAdmin && products.length > 0) {
      return (
        <div>
          <div className="product-container-top">
            <span>
              <h3>All Products</h3>
              <span className="product-container">
                {products
                  .sort((a, b) => a.id - b.id)
                  .map((product) => {
                    return (
                      <EditProduct
                        key={product.id}
                        product={product}
                        onDeleteHandler={(event) => this.onDeleteHandler(event)}
                      />
                    );
                  })}
              </span>
            </span>
            <span>
              <h3>Add New Product</h3>
              <span className="product-container">
                <form onSubmit={this.onSubmitHandler}>
                  <div className="product-field">
                    <label>Title:</label>
                    <input
                      name="title"
                      type="text"
                      value={this.state.title}
                      onChange={this.onChangeHandler}
                      required
                    />
                  </div>
                  <div className="product-field">
                    <label>Price:</label>
                    <input
                      name="price"
                      type="text"
                      value={this.state.price}
                      onChange={this.onChangeHandler}
                      required
                    />
                  </div>
                  <div className="product-field">
                    <label>Description:</label>
                    <input
                      name="description"
                      type="textarea"
                      value={this.state.description}
                      onChange={this.onChangeHandler}
                      required
                    />
                  </div>
                  <div className="product-field">
                    <label>Image Link:</label>
                    <input
                      name="description"
                      type="text"
                      value={this.state.imageUrl}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="product-field">
                    <label>Category:</label>
                    <input
                      name="category"
                      type="text"
                      value={this.state.category}
                      onChange={this.onChangeHandler}
                      required
                    />
                  </div>
                  <br />
                  <button classname="btn btn-primary" type="submit">
                    Add Product
                  </button>
                </form>
              </span>
            </span>
          </div>
        </div>
      );
    } else if (user.makeAdmin && products.length === 0) {
      return (
        <div>
          <div>No products found. Add a product to get started.</div>
          <hr />
          <span>
            <h3>Add New Product</h3>
            <span className="product-container">
              <form onSubmit={this.onSubmitHandler}>
                <div className="product-field">
                  <label>Title:</label>
                  <input
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>
                <div className="product-field">
                  <label>Price:</label>
                  <input
                    name="price"
                    type="text"
                    value={this.state.price}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>
                <div className="product-field">
                  <label>Description:</label>
                  <input
                    name="description"
                    type="textarea"
                    value={this.state.description}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>
                <div className="product-field">
                  <label>Image Link:</label>
                  <input
                    name="description"
                    type="text"
                    value={this.state.imageUrl}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="product-field">
                  <label>Category:</label>
                  <input
                    name="category"
                    type="text"
                    value={this.state.category}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>
                <br />
                <button classname="btn btn-primary" type="submit">
                  Add Product
                </button>
              </form>
            </span>
          </span>
        </div>
      );
    } else if (!user.makeAdmin) {
      return (
        <div>
          <h1>I can't let you do that, Star Fox.</h1>
          <p>
            It looks like you aren't meant to access this link! Please click on
            the link below to return to your profile.
          </p>
          <BackToProfile id={user.id} />
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    user: state.auth.authUser,
    products: state.adminProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addProduct: (productInfo) => dispatch(addProduct(productInfo)),
    getProducts: () => dispatch(fetchAdminProducts()),
    loadInitialData: () => dispatch(me()),
    deleteProduct: (productId) => dispatch(deleteProduct(productId)),
  };
};

export default connect(mapState, mapDispatch)(ManageProducts);
