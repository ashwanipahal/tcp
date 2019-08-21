import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductListing from '../views';
import { getPlpProducts } from './ProductListing.actions';
import { getNavigationTree } from './ProductListing.selectors';
import { processBreadCrumbs } from './ProductListing.util';

class ProductListingPageContainer extends React.PureComponent {
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts({ URI: 'category' });
  }

  render() {
    const { products, currentNavIds, navTree, breadCrumbs, filters } = this.props;
    return (
      <ProductListing
        products={products}
        filters={filters}
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
    filters: state.ProductListing.filtersMaps,
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
  filters: PropTypes.shape({}),
};

ProductListingPageContainer.defaultProps = {
  products: [],
  currentNavIds: [],
  navTree: {},
  breadCrumbs: [],
  filters: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingPageContainer);
