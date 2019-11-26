import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { PropTypes } from 'prop-types';
import * as labelsSelectors from '@tcp/core/src/reduxStore/selectors/labels.selectors';
import { getIsKeepAliveProductApp } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import SearchDetail from '../views/SearchDetail.view';
import { getSlpProducts, getMoreSlpProducts, resetSlpProducts } from './SearchDetail.actions';
import { getProductsAndTitleBlocks } from '../../ProductListing/container/ProductListing.util';
import getSortLabels from '../../ProductListing/molecules/SortSelector/views/Sort.selectors';
import { openQuickViewWithValues } from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.actions';
import { addItemsToWishlist } from '../../Favorites/container/Favorites.actions';
import {
  getUnbxdId,
  getCategoryId,
  getLabelsProductListing,
  getLabelsAccountOverView,
  getNavigationTree,
  getLongDescription,
  getLastLoadedPageNumber,
  getSelectedFilter,
  getLabelsOutOfStock,
} from '../../ProductListing/container/ProductListing.selectors';
import { setFilter } from '../../ProductListing/container/ProductListing.actions';
import {
  getLoadedProductsCount,
  getLoadedProductsPages,
  getTotalProductsCount,
  getCurrentSearchForText,
  getLabels,
  getAppliedFilters,
  getAppliedSortId,
  getIsLoadingMore,
  checkIfSearchResultsAvailable,
  getAllProductsSelect,
  updateAppliedFiltersInState,
  getScrollToTopValue,
  getPDPLabels,
  getModalState,
  getPLPGridPromos,
  getPlpHorizontalPromo,
} from './SearchDetail.selectors';

import NoResponseSearchDetail from '../views/NoResponseSearchDetail.view';
import { setRecentSearch } from '../../../../common/organisms/SearchProduct/RecentSearch.actions';
import {
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import { PLPSkeleton } from '../../../../common/atoms/index.native';
import { getProductsWithPromo } from '../../ProductListing/container/ProductListing.util';

class SearchDetailContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const { resetProducts } = this.props;
    resetProducts();
  }

  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam('title');
    this.makeApiCall(title);
  }

  componentWillUpdate = nextProps => {
    const { navigation } = nextProps;
    const title = navigation.getParam('title');
    const isForceUpdate = navigation.getParam('isForceUpdate');
    if (isForceUpdate) {
      this.makeApiCall(title);
    }
  };

  makeApiCall = searchQuery => {
    const { getProducts, setRecentSearches } = this.props;
    if (this.searchQuery !== searchQuery) {
      this.searchQuery = searchQuery;
      const splitAsPathBy = `/search/${this.searchQuery}?`;
      this.asPath = `/us/search/${this.searchQuery}`;
      const queryString = this.asPath.split(splitAsPathBy);
      const filterSortString = (queryString.length && queryString[1]) || '';
      const formValues = { sort: '' }; // TODO
      if (this.searchQuery.length > 0) {
        setRecentSearches(this.searchQuery);
      }
      getProducts({
        URI: 'search',
        asPath: filterSortString,
        searchQuery,
        ignoreCache: true,
        formValues,
        url: this.asPath,
      });
    }
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
    getMoreProducts({ URI: 'search', url: this.asPath, ignoreCache: true });
  };

  onSubmitFilters = (formData, submit, getProducts) => {
    const data = {
      URI: 'search',
      ignoreCache: true,
      url: this.asPath,
      sortBySelected: true,
      formData,
      scrollToTop: true,
      isKeepModalOpen: true,
    };
    getProducts(data);
  };

  render() {
    const {
      formValues,
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
      onSubmit,
      onPickUpOpenClick,
      slpLabels,
      searchResultSuggestions,
      sortLabels,
      isSearchResultsAvailable,
      searchedText,
      onAddItemToFavorites,
      isLoggedIn,
      labelsLogin,
      navigation,
      pdpLabels,
      isKeepModalOpen,
      ...otherProps
    } = this.props;

    return (
      <React.Fragment>
        {isSearchResultsAvailable || isLoadingMore ? (
          <View>
            {this.searchQuery && products && products.length > 0 ? (
              <SearchDetail
                margins="0 12px 0 12px"
                filters={filters}
                formValues={formValues}
                filtersLength={filtersLength}
                getProducts={getProducts}
                isLoadingMore={isLoadingMore}
                initialValues={initialValues}
                onSubmit={this.onSubmitFilters}
                products={products}
                totalProductsCount={totalProductsCount}
                labels={labels}
                labelsFilter={labelsFilter}
                slpLabels={slpLabels}
                searchedText={searchedText}
                sortLabels={sortLabels}
                searchResultSuggestions={searchResultSuggestions}
                onGoToPDPPage={this.onGoToPDPPage}
                onLoadMoreProducts={this.onLoadMoreProducts}
                onAddItemToFavorites={onAddItemToFavorites}
                isLoggedIn={isLoggedIn}
                labelsLogin={labelsLogin}
                navigation={navigation}
                pdpLabels={pdpLabels}
                isKeepModalOpen={isKeepModalOpen}
                {...otherProps}
              />
            ) : (
              <NoResponseSearchDetail
                totalProductsCount={totalProductsCount}
                labels={labels}
                slpLabels={slpLabels}
                searchedText={this.searchQuery}
                sortLabels={sortLabels}
                searchResultSuggestions={searchResultSuggestions}
                navigation={navigation}
                pdpLabels={pdpLabels}
                {...otherProps}
              />
            )}
          </View>
        ) : (
          <PLPSkeleton col={20} />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const appliedFilters = getAppliedFilters(state);
  const plpGridPromos = getPLPGridPromos(state);
  const plpHorizontalPromo = getPlpHorizontalPromo(state);
  const products = getAllProductsSelect(state);
  const productWithGrid = getProductsWithPromo(products, plpGridPromos, plpHorizontalPromo);

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
    products: productWithGrid,
    filters,
    categoryId: getCategoryId(state),
    loadedProductCount: getLoadedProductsCount(state),
    unbxdId: getUnbxdId(state),
    totalProductsCount: getTotalProductsCount(state),
    navTree: getNavigationTree(state),
    searchedText: getCurrentSearchForText(state),
    filtersLength,
    initialValues: {
      ...getAppliedFilters(state),
      // TODO - change after site id comes for us or ca
      sort: getAppliedSortId(state) || '',
    },
    labelsFilter: state.Labels && state.Labels.PLP && state.Labels.PLP.PLP_sort_filter,
    longDescription: getLongDescription(state),
    labels: getLabelsProductListing(state),
    labelsLogin: getLabelsAccountOverView(state),
    isLoadingMore: getIsLoadingMore(state),
    isSearchResultsAvailable: checkIfSearchResultsAvailable(state),
    selectedFilterValue: getSelectedFilter(state),
    lastLoadedPageNumber: getLastLoadedPageNumber(state),
    formValues: getFormValues('filter-form')(state),
    currentNavIds: state.ProductListing && state.ProductListing.currentNavigationIds,
    slpLabels: getLabels(state),
    searchResultSuggestions:
      state.SearchListingPage && state.SearchListingPage.searchResultSuggestions,
    sortLabels: getSortLabels(state),
    scrollToTop: getScrollToTopValue(state),
    isLoggedIn: getUserLoggedInState(state) && !isRememberedUser(state),
    labelsPlpTiles: labelsSelectors.getPlpTilesLabels(state),
    pdpLabels: getPDPLabels(state),
    isKeepModalOpen: getModalState(state),
    isKeepAliveEnabled: getIsKeepAliveProductApp(state),
    outOfStockLabels: getLabelsOutOfStock(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: payload => {
      dispatch(getSlpProducts(payload));
    },
    getMoreProducts: payload => {
      dispatch(getMoreSlpProducts(payload));
    },
    resetProducts: () => {
      dispatch(resetSlpProducts());
    },
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
    onAddItemToFavorites: payload => {
      dispatch(addItemsToWishlist(payload));
    },
    setRecentSearches: searchTerm => {
      dispatch(setRecentSearch({ searchTerm }));
    },
    setSelectedFilter: payload => {
      dispatch(setFilter(payload));
    },
  };
}

SearchDetailContainer.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      searchQuery: PropTypes.string,
    }),
  }).isRequired,
  getProducts: PropTypes.func.isRequired,
  getMoreProducts: PropTypes.func.isRequired,
  navTree: PropTypes.shape({}),
  filters: PropTypes.shape({}),
  filtersLength: PropTypes.shape({}),
  initialValues: PropTypes.shape({}),
  formValues: PropTypes.shape({
    sort: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoadingMore: PropTypes.bool,
  isSearchResultsAvailable: PropTypes.bool,
  navigation: PropTypes.shape({}),
  products: PropTypes.arrayOf(PropTypes.shape({})),
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  totalProductsCount: PropTypes.number,
  longDescription: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  lastLoadedPageNumber: PropTypes.number,
  labelsFilter: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  categoryId: PropTypes.string.isRequired,
  onPickUpOpenClick: PropTypes.func,
  searchedText: PropTypes.string,
  slpLabels: PropTypes.shape({}),
  searchResultSuggestions: PropTypes.shape({}),
  sortLabels: PropTypes.shape({}),
  resetProducts: PropTypes.func,
  setRecentSearches: PropTypes.func,
  onAddItemToFavorites: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  labelsLogin: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  pdpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  isKeepModalOpen: PropTypes.bool,
  isKeepAliveEnabled: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({}),
};

SearchDetailContainer.defaultProps = {
  navTree: {},
  filters: {},
  filtersLength: {},
  initialValues: {},
  isLoadingMore: false,
  isSearchResultsAvailable: false,
  navigation: {},
  products: [],
  currentNavIds: [],
  breadCrumbs: [],
  totalProductsCount: 0,
  labels: {},
  longDescription: '',
  lastLoadedPageNumber: 0,
  labelsFilter: {},
  onPickUpOpenClick: () => {},
  searchedText: '',
  slpLabels: {},
  searchResultSuggestions: {},
  sortLabels: {},
  resetProducts: () => {},
  setRecentSearches: null,
  onAddItemToFavorites: null,
  isLoggedIn: false,
  labelsLogin: {},
  pdpLabels: {},
  isKeepModalOpen: false,
  isKeepAliveEnabled: false,
  outOfStockLabels: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDetailContainer);
