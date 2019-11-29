import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as labelsSelectors from '@tcp/core/src/reduxStore/selectors/labels.selectors';
import { getIsKeepAliveProductApp } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import ProductListing from '../views';
import {
  getPlpProducts,
  getMorePlpProducts,
  resetPlpProducts,
  setFilter,
} from './ProductListing.actions';
import { processBreadCrumbs, getProductsWithPromo } from './ProductListing.util';
import { addItemsToWishlist } from '../../Favorites/container/Favorites.actions';
import { openQuickViewWithValues } from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.actions';
import {
  getNavigationTree,
  getLoadedProductsCount,
  getUnbxdId,
  getCategoryId,
  getLabelsProductListing,
  getLabelsAccountOverView,
  getLongDescription,
  getIsLoadingMore,
  getLastLoadedPageNumber,
  getAppliedFilters,
  updateAppliedFiltersInState,
  getAllProductsSelect,
  getScrollToTopValue,
  getModalState,
  getTotalProductsCount,
  getIsDataLoading,
  getSelectedFilter,
  getPLPTopPromos,
  getLabelsOutOfStock,
  getPLPGridPromos,
  getPlpHorizontalPromo,
} from './ProductListing.selectors';
import { getIsPickupModalOpen } from '../../../../common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import {
  isPlccUser,
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
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

  componentDidUpdate({ navigation: oldNavigation }) {
    const { getProducts, navigation } = this.props;
    const oldNavigationUrl = oldNavigation.getParam('url');
    const newNavigationUrl = navigation.getParam('url');
    if (navigation && oldNavigationUrl !== newNavigationUrl) {
      getProducts({ URI: 'category', url: newNavigationUrl, ignoreCache: true });
    }
  }

  makeApiCall = () => {
    const { getProducts, navigation } = this.props;
    this.categoryUrl = navigation && navigation.getParam('url');
    getProducts({ URI: 'category', url: this.categoryUrl, ignoreCache: true });
  };

  onGoToPDPPage = (title, pdpUrl, selectedColorProductId, productInfo) => {
    const { navigation } = this.props;
    const { bundleProduct } = productInfo;
    const routeName = bundleProduct ? 'BundleDetail' : 'ProductDetail';
    navigation.navigate(routeName, {
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
      onAddItemToFavorites,
      isLoggedIn,
      isPlcc,
      labelsLogin,
      plpTopPromos,
      isSearchListing,
      isKeepModalOpen,
      ...otherProps
    } = this.props;
    return (
      <ProductListing
        margins="0 12px 0 12px"
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
        labelsLogin={labelsLogin}
        isLoadingMore={isLoadingMore}
        lastLoadedPageNumber={lastLoadedPageNumber}
        onSubmit={submitProductListingFiltersForm}
        getProducts={getProducts}
        navigation={navigation}
        onGoToPDPPage={this.onGoToPDPPage}
        sortLabels={sortLabels}
        onLoadMoreProducts={this.onLoadMoreProducts}
        onAddItemToFavorites={onAddItemToFavorites}
        isLoggedIn={isLoggedIn}
        isPlcc={isPlcc}
        plpTopPromos={plpTopPromos}
        isSearchListing={isSearchListing}
        isKeepModalOpen={isKeepModalOpen}
        {...otherProps}
      />
    );
  }
}

function mapStateToProps(state) {
  const appliedFilters = getAppliedFilters(state);
  const plpGridPromos = getPLPGridPromos(state);
  const plpHorizontalPromo = getPlpHorizontalPromo(state);
  const products = getAllProductsSelect(state);

  // eslint-disable-next-line
  let filtersLength = {};
  let filterCount = 0;

  // eslint-disable-next-line
  for (let key in appliedFilters) {
    if (appliedFilters[key]) {
      filtersLength[`${key}Filters`] = appliedFilters[key].length;
      filterCount += appliedFilters[key].length;
    }
  }

  const productWithGrid = getProductsWithPromo(
    products,
    plpGridPromos,
    plpHorizontalPromo,
    filterCount
  );
  const filters = updateAppliedFiltersInState(state);

  return {
    products: productWithGrid,
    filters,
    currentNavIds: state.ProductListing && state.ProductListing.currentNavigationIds,
    categoryId: getCategoryId(state),
    navTree: getNavigationTree(state),
    breadCrumbs: processBreadCrumbs(state.ProductListing && state.ProductListing.breadCrumbTrail),
    loadedProductCount: getLoadedProductsCount(state),
    unbxdId: getUnbxdId(state),
    filtersLength,
    initialValues: {
      ...state.ProductListing.appliedFiltersIds,
    },
    labelsFilter: state.Labels && state.Labels.PLP && state.Labels.PLP.PLP_sort_filter,
    longDescription: getLongDescription(state),
    labels: getLabelsProductListing(state),
    labelsLogin: getLabelsAccountOverView(state),
    isLoadingMore: getIsLoadingMore(state),
    lastLoadedPageNumber: getLastLoadedPageNumber(state),
    isPlcc: isPlccUser(state),
    sortLabels: getSortLabels(state),
    scrollToTop: getScrollToTopValue(state),
    isKeepModalOpen: getModalState(state),
    isPickupModalOpen: getIsPickupModalOpen(state),
    totalProductsCount: getTotalProductsCount(state),
    isDataLoading: getIsDataLoading(state),
    isLoggedIn: getUserLoggedInState(state) && !isRememberedUser(state),
    labelsPlpTiles: labelsSelectors.getPlpTilesLabels(state),
    selectedFilterValue: getSelectedFilter(state),
    plpTopPromos: getPLPTopPromos(state),
    isKeepAliveEnabled: getIsKeepAliveProductApp(state),
    outOfStockLabels: getLabelsOutOfStock(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: payload => {
      dispatch(getPlpProducts(payload));
    },
    setSelectedFilter: payload => {
      dispatch(setFilter(payload));
    },
    getMoreProducts: payload => {
      dispatch(getMorePlpProducts(payload));
    },
    addToCartEcom: () => {},
    addItemToCartBopis: () => {},
    resetProducts: () => {
      dispatch(resetPlpProducts());
    },
    onAddItemToFavorites: payload => {
      dispatch(addItemsToWishlist(payload));
    },
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
  };
}

ProductListingContainer.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getMoreProducts: PropTypes.func.isRequired,
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
  onAddItemToFavorites: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  labelsLogin: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  plpTopPromos: PropTypes.arrayOf(PropTypes.shape({})),
  isSearchListing: PropTypes.bool,
  isKeepModalOpen: PropTypes.bool,
  isPlcc: PropTypes.bool,
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
  isLoadingMore: false,
  lastLoadedPageNumber: 0,
  sortLabels: [],
  resetProducts: () => {},
  onAddItemToFavorites: null,
  isLoggedIn: false,
  labelsLogin: {},
  plpTopPromos: [],
  isSearchListing: false,
  isKeepModalOpen: false,
  isPlcc: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
export { ProductListingContainer as ProductListingContainerVanilla };
