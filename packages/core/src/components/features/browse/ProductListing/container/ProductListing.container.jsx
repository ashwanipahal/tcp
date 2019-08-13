import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductListing from '../views';
import { getPlpProducts } from './ProductListing.actions';
import { getNavigationTree } from './ProductListing.selectors';
import { extractCategory, processBreadCrumbs } from './ProductListing.util';

class ProductListingPageContainer extends React.PureComponent {
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts({ URI: 'category' });
  }

  render() {
    const { products, currentNavIds, navTree, breadCrumbs } = this.props;
    return (
      <ProductListing
        products={products}
        currentNavIds={currentNavIds}
        navTree={navTree}
        breadCrumbs={breadCrumbs}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.ProductListing.loadedProducts,
    currentNavIds: state.ProductListing.currentNavigationIds,
    navTree: getNavigationTree(state),
    breadCrumbs: processBreadCrumbs(state.ProductListing.breadCrumbTrail),
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
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
};

ProductListingPageContainer.defaultProps = {
  products: [],
  currentNavIds: [],
  navTree: {},
  breadCrumbs: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingPageContainer);
