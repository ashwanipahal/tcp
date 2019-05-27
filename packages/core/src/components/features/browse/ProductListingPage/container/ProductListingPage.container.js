import React from 'react';
import { connect } from "react-redux";
import { getPlpProducts } from "./ProductListingPage.actions";
import { ProductListView } from "../views/ProductListingPage.view";

class ProductListingPageContainer extends React.Component {

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
        <ProductListView data={this.props.products}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(ProductListingPageContainer);