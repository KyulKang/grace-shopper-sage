import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProduct } from "../../store/adminSingleProduct";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: props.product,
      editMode: false,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onChangeHandler = (event) => {
    if (this.state.editMode) {
      const { name, value } = event.target;
      this.setState((prevState) => ({
        ...prevState,
        productInfo: { ...this.state.productInfo, [name]: value },
      }));
    }
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.updateProduct(this.state.productInfo);
    this.setState((prevState) => ({
      ...prevState,
      editMode: false,
    }));
  };

  onClickHandler = () => {
    this.setState((prevState) => ({
      ...prevState,
      editMode: !this.state.editMode,
    }));
  };

  render() {
    const { title, price, description, imageUrl, category, id } =
      this.state.productInfo;

    return (
      <div className="product-container">
        <form onSubmit={this.onSubmitHandler}>
          <label>{"#" + id}</label>
          <label>&nbsp;Title:&nbsp;</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={this.onChangeHandler}
            required
          />
          <label>&nbsp;Price:&nbsp;</label>
          <input
            name="price"
            type="text"
            value={price}
            onChange={this.onChangeHandler}
            required
          />
          <label>&nbsp;Description:&nbsp;</label>
          <input
            name="description"
            type="textarea"
            value={description ? description : ""}
            onChange={this.onChangeHandler}
            required
          />
          <label>&nbsp;Image Link:&nbsp;</label>
          <input
            name="imageUrl"
            type="text"
            value={imageUrl}
            onChange={this.onChangeHandler}
          />
          <label>&nbsp;Category:&nbsp;</label>
          <input
            name="category"
            type="text"
            value={category}
            onChange={this.onChangeHandler}
            required
          />
          <button
            value={this.props.product.id}
            type="button"
            onClick={this.onClickHandler}
          >
            Edit
          </button>
          <button
            value={this.props.product.id}
            type="button"
            onClick={(event) => this.props.onDeleteHandler(event)}
          >
            Delete
          </button>
          {this.state.editMode ? (
            <button type="submit">Submit Edit</button>
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (productInfo) => dispatch(updateProduct(productInfo)),
  };
};

export default connect(null, mapDispatch)(EditProduct);
