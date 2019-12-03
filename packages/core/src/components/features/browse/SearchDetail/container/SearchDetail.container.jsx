/* eslint-disable */
// Disabling eslint for temporary fix
import React from 'react';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import { getFormValues } from 'redux-form';
import { PropTypes } from 'prop-types';
import { getIsKeepAliveProduct } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import SearchDetail from '../views/SearchDetail.view';
import { trackPageView, setClickAnalyticsData } from '../../../../../analytics/actions';
import { getSlpProducts, getMoreSlpProducts, initActions } from './SearchDetail.actions';
import { getProductsAndTitleBlocks } from '../../ProductListing/container/ProductListing.util';
import {
  removeAddToFavoriteErrorState,
  addItemsToWishlist,
} from '../../Favorites/container/Favorites.actions';
import {
  getPageName,
  getPageSection,
  getPageSubSection,
} from '../../../../common/organisms/PickupStoreModal/molecules/PickupStoreSelectionForm/container/PickupStoreSelectionForm.selectors';
import getSortLabels from '../../ProductListing/molecules/SortSelector/views/Sort.selectors';
import { openQuickViewWithValues } from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.actions';
import {
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import {
  getUnbxdId,
  getCategoryId,
  getLabelsProductListing,
  getNavigationTree,
  getLongDescription,
  getLastLoadedPageNumber,
  getLabelsOutOfStock,
} from '../../ProductListing/container/ProductListing.selectors';
import {
  getLoadedProductsCount,
  getLoadedProductsPages,
  getProductsFilters,
  getTotalProductsCount,
  getProductsSelect,
  getCurrentSearchForText,
  getLabels,
  getAppliedFilters,
  getAppliedSortId,
  getIsLoadingMore,
  checkIfSearchResultsAvailable,
  getPDPLabels,
  getPlpHorizontalPromo,
  getPLPGridPromos,
} from './SearchDetail.selectors';
import { fetchAddToFavoriteErrorMsg } from '../../Favorites/container/Favorites.selectors';

import submitProductListingFiltersForm from '../../ProductListing/container/productListingOnSubmitHandler';
import NoResponseSearchDetail from '../views/NoResponseSearchDetail.view';

import {
  getCurrentCurrency,
  getCurrencyAttributes,
} from '../../ProductDetail/container/ProductDetail.selectors';

class SearchDetailContainer extends React.PureComponent {
  static pageProps = {
    pageData: {
      pageName: 'search',
    },
  };

  static getInitialProps = async ({ props, query, req, isServer }) => {
    const { getProducts, formValues } = props;
    let searchQuery;
    let asPath = '';
    if (isServer) {
      ({ searchQuery } = query);
      ({ originalUrl: asPath } = req);
    } else {
      ({
        router: {
          query: { searchQuery },
          asPath,
        },
      } = props);
    }
    const splitAsPathBy = `/search/${searchQuery}?`;
    const queryString = asPath.split(splitAsPathBy);
    const filterSortString = (queryString.length && queryString[1]) || '';
    await getProducts({
      URI: 'search',
      asPath: filterSortString,
      searchQuery,
      ignoreCache: true,
      formValues,
      url: asPath,
    });
  };

  componentDidUpdate(prevProps) {
    const {
      router: {
        query: { searchQuery },
        asPath,
      },
      getProducts,
      formValues,
      isLoggedIn: currentLyLoggedIn,
    } = this.props;

    const {
      router: {
        query: { searchQuery: currentSearchQuery },
      },
      isLoggedIn,
    } = prevProps;
    if (searchQuery !== currentSearchQuery) {
      const splitAsPathBy = `/search/${searchQuery}?`;
      const queryString = asPath.split(splitAsPathBy);
      const filterSortString = (queryString.length && queryString[1]) || '';
      getProducts({
        URI: 'search',
        asPath: filterSortString,
        searchQuery,
        ignoreCache: true,
        formValues,
        url: asPath,
      });
    }
    if (isLoggedIn !== currentLyLoggedIn) {
      const splitAsPathBy = `/search/${searchQuery}?`;
      const queryString = asPath.split(splitAsPathBy);
      const filterSortString = (queryString.length && queryString[1]) || '';
      getProducts({
        URI: 'search',
        asPath: filterSortString,
        searchQuery,
        ignoreCache: true,
        formValues,
        url: asPath,
      });
    }
  }

  render() {
    const {
      formValues,
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
      onSubmit,
      onPickUpOpenClick,
      searchedText,
      slpLabels,
      searchResultSuggestions,
      sortLabels,
      isSearchResultsAvailable,
      router: {
        query: { searchQuery },
        asPath: asPathVal,
      },
      currency,
      currencyAttributes,
      onAddItemToFavorites,
      isLoggedIn,
      pdpLabels,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      pageNameProp,
      pageSectionProp,
      pageSubSectionProp,
      trackPageLoad,
      ...otherProps
    } = this.props;

    return (
      <React.Fragment>
        {isSearchResultsAvailable ? (
          <div>
            {products && products.length > 0 && searchQuery ? (
              <SearchDetail
                filters={filters}
                formValues={formValues}
                filtersLength={filtersLength}
                getProducts={getProducts}
                isLoadingMore={isLoadingMore}
                initialValues={initialValues}
                onSubmit={onSubmit}
                products={products}
                productsBlock={productsBlock}
                totalProductsCount={totalProductsCount}
                labels={labels}
                labelsFilter={labelsFilter}
                slpLabels={slpLabels}
                searchedText={searchedText}
                sortLabels={sortLabels}
                searchResultSuggestions={searchResultSuggestions}
                currencyAttributes={currencyAttributes}
                currency={currency}
                onAddItemToFavorites={onAddItemToFavorites}
                isLoggedIn={isLoggedIn}
                isSearchListing
                asPathVal={asPathVal}
                AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
                removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
                pageNameProp={pageNameProp}
                pageSectionProp={pageSectionProp}
                pageSubSectionProp={pageSubSectionProp}
                trackPageLoad={trackPageLoad}
                {...otherProps}
              />
            ) : (
              <NoResponseSearchDetail
                totalProductsCount={totalProductsCount}
                labels={labels}
                slpLabels={slpLabels}
                searchedText={searchedText}
                sortLabels={sortLabels}
                searchResultSuggestions={searchResultSuggestions}
                pdpLabels={pdpLabels}
                {...otherProps}
              />
            )}
          </div>
        ) : (
          <div>
            <SearchDetail
              filters={filters}
              formValues={formValues}
              filtersLength={filtersLength}
              getProducts={getProducts}
              isLoadingMore={isLoadingMore}
              initialValues={initialValues}
              onSubmit={onSubmit}
              products={products}
              productsBlock={productsBlock}
              totalProductsCount={totalProductsCount}
              labels={labels}
              labelsFilter={labelsFilter}
              slpLabels={slpLabels}
              searchedText={searchedText}
              sortLabels={sortLabels}
              searchResultSuggestions={searchResultSuggestions}
              currency={currency}
              currencyAttributes={currencyAttributes}
              onAddItemToFavorites={onAddItemToFavorites}
              isLoggedIn={isLoggedIn}
              isSearchListing
              asPathVal={asPathVal}
              AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
              removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
              pageNameProp={pageNameProp}
              pageSectionProp={pageSectionProp}
              pageSubSectionProp={pageSubSectionProp}
              trackPageLoad={trackPageLoad}
              {...otherProps}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

SearchDetailContainer.pageInfo = {
  pageId: 'search',
  pageData: {
    pageName: 'search',
    pageSection: 'search',
    pageSubSection: 'search',
    loadAnalyticsOnload: false,
  },
};

SearchDetailContainer.getInitActions = () => initActions;

function mapStateToProps(state) {
  const productBlocks = getLoadedProductsPages(state);
  const appliedFilters = getAppliedFilters(state);

  const filtersLength = {};
  let filterCount = 0;

  // eslint-disable-next-line
  for (let key in appliedFilters) {
    if (appliedFilters[key]) {
      filtersLength[`${key}Filters`] = appliedFilters[key].length;
      filterCount += appliedFilters[key].length;
    }
  }

  const plpHorizontalPromos = getPlpHorizontalPromo(state);
  const plpGridPromos = getPLPGridPromos(state);

  return {
    productsBlock: getProductsAndTitleBlocks(
      state,
      productBlocks,
      plpGridPromos,
      plpHorizontalPromos,
      5,
      filterCount
    ),
    products: getProductsSelect(state),
    filters: getProductsFilters(state),
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
    isLoadingMore: getIsLoadingMore(state),
    isSearchResultsAvailable: checkIfSearchResultsAvailable(state),
    lastLoadedPageNumber: getLastLoadedPageNumber(state),
    formValues: getFormValues('filter-form')(state),
    onSubmit: submitProductListingFiltersForm,
    currentNavIds: state.ProductListing && state.ProductListing.currentNavigationIds,
    slpLabels: getLabels(state),
    searchResultSuggestions:
      state.SearchListingPage && state.SearchListingPage.searchResultSuggestions,
    sortLabels: getSortLabels(state),
    currency: getCurrentCurrency(state),
    currencyAttributes: getCurrencyAttributes(state),
    isLoggedIn: getUserLoggedInState(state) && !isRememberedUser(state),
    deviceType: state.DeviceInfo && state.DeviceInfo.deviceType,
    pdpLabels: getPDPLabels(state),
    isKeepAliveEnabled: getIsKeepAliveProduct(state),
    outOfStockLabels: getLabelsOutOfStock(state),
    AddToFavoriteErrorMsg: fetchAddToFavoriteErrorMsg(state),
    pageNameProp: getPageName(state),
    pageSectionProp: getPageSection(state),
    pageSubSectionProp: getPageSubSection(state),
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
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
    onAddItemToFavorites: payload => {
      dispatch(addItemsToWishlist(payload));
    },
    removeAddToFavoritesErrorMsg: payload => {
      dispatch(removeAddToFavoriteErrorState(payload));
    },
    trackPageLoad: payload => {
      const { products } = payload;
      dispatch(
        setClickAnalyticsData({
          products,
        })
      );
      setTimeout(() => {
        dispatch(
          trackPageView({
            props: {
              initialProps: {
                pageProps: {
                  pageData: {
                    ...payload,
                  },
                },
              },
            },
          })
        );
        setTimeout(() => {
          dispatch(setClickAnalyticsData({}));
        }, 200);
      }, 100);
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
  pdpLabels: PropTypes.shape({}),
  isLoggedIn: PropTypes.bool,
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
  products: PropTypes.shape({}),
  currentNavIds: PropTypes.arrayOf(PropTypes.string),
  breadCrumbs: PropTypes.shape({}),
};

SearchDetailContainer.defaultProps = {
  navTree: {},
  filters: {},
  filtersLength: {},
  initialValues: {},
  isLoadingMore: false,
  isSearchResultsAvailable: false,
  pdpLabels: {},
  productsBlock: [],
  isLoggedIn: false,
  products: {},
  currentNavIds: [],
  breadCrumbs: [],
};

export default withIsomorphicRenderer({
  WrappedComponent: SearchDetailContainer,
  mapStateToProps,
  mapDispatchToProps,
});
