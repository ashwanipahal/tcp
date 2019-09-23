/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { getPlpProducts, getGiftCardProducts } from './ProductListingPage.actions';
import { ProductListView } from '../views/ProductListingPage.view';
import getExpensivePlpProducts, { giftCardProducts } from './ProductListingPage.selectors';
import {
  addToCartEcom,
  addItemToCartBopis,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions';
import getSortLabels from '../../../browse/ProductListing/molecules/SortSelector/views/Sort.selectors';

class ProductListingPageContainer extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { addToCartEcom, addItemToCartBopis, giftCardProducts, navigation } = this.props;
    return (
      <ProductListView
        data={this.props.products}
        giftCardProducts={giftCardProducts}
        addToCartEcom={addToCartEcom}
        addItemToCartBopis={addItemToCartBopis}
        navigation={navigation}
        sortLabels={sortLabels}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    products: getExpensivePlpProducts(state),
    giftCardProducts: giftCardProducts(state),
    sortLabels: getSortLabels(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => {
      dispatch(getPlpProducts());
      dispatch(getGiftCardProducts());
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
