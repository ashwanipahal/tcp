import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductListing from '../views';
import { getPlpProducts } from './ProductListing.actions';

class ProductListingPageContainer extends React.Component {
  componentDidMount() {
    console.log('sdfasdfsd');
    const { getProducts } = this.props;
    getProducts();
  }

  render() {
    return <ProductListing />;
  }
}

function mapStateToProps(state) {
  return {
    state,
    // products: getExpensivePlpProducts(state),
    // giftCardProducts: giftCardProducts(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: payload => {
      dispatch(getPlpProducts(payload));
    },
    addToCartEcom: () => {},
    addItemToCartBopis: () => {},
  };
}

ProductListingPageContainer.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingPageContainer);
