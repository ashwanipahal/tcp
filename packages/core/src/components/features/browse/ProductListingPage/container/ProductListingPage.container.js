/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { getPlpProducts } from './ProductListingPage.actions';
import { ProductListView } from '../views/ProductListingPage.view';
import getExpensivePlpProducts from './ProductListingPage.selectors';
import {
  addToCartEcom,
  addItemToCartBopis,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions';

class ProductListingPageContainer extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { addToCartEcom, addItemToCartBopis } = this.props;
    return (
      <ProductListView
        data={this.props.products}
        addToCartEcom={addToCartEcom}
        addItemToCartBopis={addItemToCartBopis}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    products: getExpensivePlpProducts(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => {
      dispatch(getPlpProducts());
    },
    addToCartEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
    addItemToCartBopis: payload => {
      dispatch(addItemToCartBopis(payload));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingPageContainer);
