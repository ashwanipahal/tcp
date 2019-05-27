import React from 'react';
import { connect } from "react-redux";
import { getPlpProducts } from "../plp.actions";
import { ProductList } from "./productListComponent";

class PlpPage extends React.Component {

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
        <ProductList data={this.props.products}/>
    );
  }
}

function mapStateToProps(state) {
 return {
  products: state.ProductListingPageReducer.products
 };
};

function mapDispatchToProps(dispatch) {
  return { 
  getProducts: () => {
    dispatch(getPlpProducts());
  }
}
};

export default connect(mapStateToProps,mapDispatchToProps)(PlpPage);