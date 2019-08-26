import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductListing from '../views';
import { getPlpProducts } from './ProductListing.actions';
import { processBreadCrumbs } from './ProductListing.util';
import {
  getProductsSelect,
  getNavigationTree,
  getLoadedProductsCount,
  getUnbxdId,
  getBreadCrumbTrail,
} from './ProductListing.selectors';

class ProductListingContainer extends React.PureComponent {
  categoryUrl = '';

  componentDidMount() {
    this.makeApiCall();
  }

  makeApiCall = () => {
    const { getProducts, navigation } = this.props;
    const url = navigation && navigation.getParam('url');
    if (url && url !== this.categoryUrl) {
      this.categoryUrl = url;
      getProducts({ URI: 'category', url, ignoreCache: true });
    }
  };

  render() {
    const { products, currentNavIds, navTree, breadCrumbs, ...otherProps } = this.props;
    // have to call this method because when come back from L2/L3 none of the component lifecycle method calls.
    // But this method only making call once.
    this.makeApiCall();
    return (
      <ProductListing
        products={products}
        currentNavIds={currentNavIds}
        navTree={navTree}
        breadCrumbs={breadCrumbs}
        {...otherProps}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    products: getProductsSelect(state),
    currentNavIds: state.ProductListing.currentNavigationIds,
    navTree: getNavigationTree(state),
    breadCrumbs: processBreadCrumbs(getBreadCrumbTrail(state)),
    loadedProductCount: getLoadedProductsCount(state),
    unbxdId: getUnbxdId(state),
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

ProductListingContainer.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  navTree: PropTypes.shape({}),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  navigation: PropTypes.shape({}).isRequired,
};

ProductListingContainer.defaultProps = {
  products: [],
  currentNavIds: [],
  navTree: {},
  breadCrumbs: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
