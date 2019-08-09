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
    const { products, currentNavIds, navTree } = this.props;
    return <ProductListing products={products} currentNavIds={currentNavIds} navTree={navTree} />;
  }
}

function mapStateToProps(state) {
  return {
    products: state.ProductListing.loadedProducts,
    currentNavIds: state.ProductListing.currentNavigationIds,
    navTree: state.Navigation.navigationData,
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
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  navTree: PropTypes.shape({}),
};

ProductListingPageContainer.defaultProps = {
  products: [],
  currentNavIds: [],
  navTree: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingPageContainer);
