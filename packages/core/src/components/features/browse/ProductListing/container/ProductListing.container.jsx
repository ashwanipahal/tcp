import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductListing from '../views';
import { getPlpProducts } from './ProductListing.actions';

class ProductListingPageContainer extends React.Component {
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  render() {
    const { products } = this.props;
    return <ProductListing products={products} />;
  }
}

function mapStateToProps(state) {
  return {
    products: state.ProductListing.loadedProducts,
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
  products: PropTypes.arrayOf(PropTypes.shape({})),
};

ProductListingPageContainer.defaultProps = {
  products: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingPageContainer);
