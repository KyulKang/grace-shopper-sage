import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProduct } from "../../store";

class EditProduct extends Component {
  constructor() {
    super();
    this.state = {
      productInfo: {
        title: "",
        price: "",
        description: "",
        imageUrl: "",
        category: "",
      },
      editMode: false,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  componenspanidMount() {
    const { title, price, description, imageUrl, category } =
      this.props.product;

    this.setState((prevState) => ({
      productInfo: {
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        category: category,
      },
      ...prevState,
    }));
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitHandler = (event) => {
    event.prevenspanefault();
    this.props.updateProduct(this.state.productInfo);

    this.setState({
      productInfo: {
        title: "",
        price: "",
        description: "",
        imageUrl: "",
        category: "",
      },
      editMode: false,
    });
  };

  onDeleteHandler = () => {
    this.props.deleteProduct(this.props.product.id);
  };

  render() {
    const { title, price, description, imageUrl, category } =
      this.props.product;

    return (
      <div>
        <span>{title}</span>
        <span>{price}</span>
        <span>{category}</span>
        <span></span>
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
