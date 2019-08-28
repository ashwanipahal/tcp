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
  getProductsFilters,
  getCategoryId,
  getLabelsProductListing,
  getLongDescription,
} from './ProductListing.selectors';
import { isPlccUser } from '../../../account/User/container/User.selectors';

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
    const {
      products,
      currentNavIds,
      navTree,
      breadCrumbs,
      filters,
      totalProductsCount,
      filtersLength,
      initialValues,
      longDescription,
      labels,
      labelsFilter,
      categoryId,
      ...otherProps
    } = this.props;
    // have to call this method because when come back from L2/L3 none of the component lifecycle method calls.
    // But this method only making call once.
    this.makeApiCall();
    return (
      <ProductListing
        products={products}
        filters={filters}
        currentNavIds={currentNavIds}
        categoryId={categoryId}
        navTree={navTree}
        breadCrumbs={breadCrumbs}
        totalProductsCount={totalProductsCount}
        initialValues={initialValues}
        filtersLength={filtersLength}
        longDescription={longDescription}
        labelsFilter={labelsFilter}
        labels={labels}
        {...otherProps}
      />
    );
  }
}

function mapStateToProps(state) {
  const appliedFilters = state.ProductListing.appliedFiltersIds;

  // eslint-disable-next-line
  let filtersLength = {};

  // eslint-disable-next-line
  for (let key in appliedFilters) {
    if (appliedFilters[key]) {
      filtersLength[`${key}Filters`] = appliedFilters[key].length;
    }
  }

  return {
    products: getProductsSelect(state),
    filters: getProductsFilters(state),
    currentNavIds: getCategoryId(state),
    categoryId: getCategoryId(state),
    navTree: getNavigationTree(state),
    breadCrumbs: processBreadCrumbs(state.ProductListing.breadCrumbTrail),
    loadedProductCount: getLoadedProductsCount(state),
    unbxdId: getUnbxdId(state),
    totalProductsCount: state.ProductListing.totalProductsCount,
    filtersLength,
    initialValues: {
      ...state.ProductListing.appliedFiltersIds,
    },
    labelsFilter: state.Labels.PLP.PLP_sort_filter,
    longDescription: getLongDescription(state),
    labels: getLabelsProductListing(state),
    isPlcc: isPlccUser(state),
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
  categoryId: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  navTree: PropTypes.shape({}),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  filters: PropTypes.shape({}),
  totalProductsCount: PropTypes.string,
  filtersLength: PropTypes.shape({}),
  initialValues: PropTypes.shape({}),
  longDescription: PropTypes.string,
  navigation: PropTypes.shape({}).isRequired,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  labelsFilter: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

ProductListingContainer.defaultProps = {
  products: [],
  currentNavIds: [],
  navTree: {},
  breadCrumbs: [],
  filters: {},
  totalProductsCount: '0',
  filtersLength: {},
  initialValues: {},
  longDescription: '',
  labels: {},
  labelsFilter: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
