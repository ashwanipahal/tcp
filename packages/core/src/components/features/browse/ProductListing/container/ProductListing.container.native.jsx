import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductListing from '../views';
import { getPlpProducts, getMorePlpProducts, resetPlpProducts } from './ProductListing.actions';
import { processBreadCrumbs, getProductsAndTitleBlocks } from './ProductListing.util';
import { openQuickViewWithValues } from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.actions';
import {
  getNavigationTree,
  getLoadedProductsCount,
  getUnbxdId,
  getCategoryId,
  getLabelsProductListing,
  getLongDescription,
  getIsLoadingMore,
  getLastLoadedPageNumber,
  getLoadedProductsPages,
  getAppliedFilters,
  updateAppliedFiltersInState,
  getAllProductsSelect,
  getScrollToTopValue,
  getTotalProductsCount,
} from './ProductListing.selectors';
import { getIsPickupModalOpen } from '../../../../common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import submitProductListingFiltersForm from './productListingOnSubmitHandler';
import getSortLabels from '../molecules/SortSelector/views/Sort.selectors';

class ProductListingContainer extends React.PureComponent {
  categoryUrl;

  constructor(props) {
    super(props);
    const { resetProducts } = this.props;
    resetProducts();
  }

  componentDidMount() {
    this.makeApiCall();
  }

  makeApiCall = () => {
    const { getProducts, navigation } = this.props;
    this.categoryUrl = navigation && navigation.getParam('url');
    getProducts({ URI: 'category', url: this.categoryUrl, ignoreCache: true });
  };

  onGoToPDPPage = (title, pdpUrl, selectedColorProductId) => {
    const { navigation } = this.props;
    navigation.navigate('ProductDetail', {
      title,
      pdpUrl,
      selectedColorProductId,
      reset: true,
    });
  };

  onLoadMoreProducts = () => {
    const { getMoreProducts } = this.props;
    getMoreProducts({ URI: 'category', url: this.categoryUrl, ignoreCache: true });
  };

  render() {
    const {
      productsBlock,
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
      isLoadingMore,
      lastLoadedPageNumber,
      labelsFilter,
      categoryId,
      getProducts,
      navigation,
      sortLabels,
      ...otherProps
    } = this.props;
    return (
      <ProductListing
        productsBlock={productsBlock}
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
        isLoadingMore={isLoadingMore}
        lastLoadedPageNumber={lastLoadedPageNumber}
        onSubmit={submitProductListingFiltersForm}
        getProducts={getProducts}
        navigation={navigation}
        onGoToPDPPage={this.onGoToPDPPage}
        sortLabels={sortLabels}
        onLoadMoreProducts={this.onLoadMoreProducts}
        {...otherProps}
      />
    );
  }
}

function mapStateToProps(state) {
  const appliedFilters = getAppliedFilters(state);
  const productBlocks = getLoadedProductsPages(state);

  // eslint-disable-next-line
  let filtersLength = {};

  // eslint-disable-next-line
  for (let key in appliedFilters) {
    if (appliedFilters[key]) {
      filtersLength[`${key}Filters`] = appliedFilters[key].length;
    }
  }

  const filters = updateAppliedFiltersInState(state);

  return {
    productsBlock: getProductsAndTitleBlocks(state, productBlocks),
    products: getAllProductsSelect(state),
    filters,
    currentNavIds: state.ProductListing && state.ProductListing.get('currentNavigationIds'),
    categoryId: getCategoryId(state),
    navTree: getNavigationTree(state),
    breadCrumbs: processBreadCrumbs(
      state.ProductListing && state.ProductListing.get('breadCrumbTrail')
    ),
    loadedProductCount: getLoadedProductsCount(state),
    unbxdId: getUnbxdId(state),
    filtersLength,
    initialValues: {
      ...state.ProductListing.appliedFiltersIds,
    },
    labelsFilter: state.Labels && state.Labels.PLP && state.Labels.PLP.PLP_sort_filter,
    longDescription: getLongDescription(state),
    labels: getLabelsProductListing(state),
    isLoadingMore: getIsLoadingMore(state),
    lastLoadedPageNumber: getLastLoadedPageNumber(state),
    isPlcc: isPlccUser(state),
    sortLabels: getSortLabels(state),
    scrollToTop: getScrollToTopValue(state),
    isPickupModalOpen: getIsPickupModalOpen(state),
    totalProductsCount: getTotalProductsCount(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: payload => {
      dispatch(getPlpProducts(payload));
    },
    getMoreProducts: payload => {
      dispatch(getMorePlpProducts(payload));
    },
    addToCartEcom: () => {},
    addItemToCartBopis: () => {},
    resetProducts: () => {
      dispatch(resetPlpProducts());
    },
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
  };
}

ProductListingContainer.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getMoreProducts: PropTypes.func.isRequired,
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
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
  isLoadingMore: PropTypes.bool,
  lastLoadedPageNumber: PropTypes.number,
  router: PropTypes.shape({}).isRequired,
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
  resetProducts: PropTypes.func,
};

ProductListingContainer.defaultProps = {
  products: [],
  productsBlock: [],
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
  isLoadingMore: false,
  lastLoadedPageNumber: 0,
  sortLabels: [],
  resetProducts: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
