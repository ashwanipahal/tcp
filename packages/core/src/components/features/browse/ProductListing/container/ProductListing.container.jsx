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
  componentDidMount() {
    const { getProducts, navigation } = this.props;
    const url = navigation && navigation.getParam('url');
    getProducts({ URI: 'category', url });
  }

  render() {
    const {
      products,
      currentNavIds,
      navTree,
      breadCrumbs,
      longDescription,
      labels,
      ...otherProps
    } = this.props;
    return (
      <ProductListing
        products={products}
        currentNavIds={currentNavIds}
        navTree={navTree}
        breadCrumbs={breadCrumbs}
        longDescription={longDescription}
        labels={labels}
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
    longDescription: state.ProductListing.currentListingDescription,
    labels: state.Labels.PLP.seoText,
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
  longDescription: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  navigation: PropTypes.shape({}).isRequired,
};

ProductListingContainer.defaultProps = {
  products: [],
  currentNavIds: [],
  navTree: {},
  breadCrumbs: [],
  longDescription: '',
  labels: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
