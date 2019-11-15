/* eslint-disable */
import React from 'react';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import { getFormValues } from 'redux-form';
import { PropTypes } from 'prop-types';
import SearchDetail from '../views/SearchDetail.view';
import { getSlpProducts, getMoreSlpProducts } from './SearchDetail.actions';
import { getProductsAndTitleBlocks } from '../container/SearchDetail.util';
import { addItemsToWishlist } from '../../Favorites/container/Favorites.actions';
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
} from '../container/SearchDetail.selectors';

import { isPlccUser } from '../../../account/User/container/User.selectors';
import submitProductListingFiltersForm from '../../ProductListing/container/productListingOnSubmitHandler';
import NoResponseSearchDetail from '../views/NoResponseSearchDetail.view';

import {
  getCurrentCurrency,
  getCurrencyAttributes,
} from '../../../../features/browse/ProductDetail/container/ProductDetail.selectors';

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
    } = this.props;

    const {
      router: {
        query: { searchQuery: currentSearchQuery },
      },
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
      },
      currency,
      currencyAttributes,
      onAddItemToFavorites,
      isLoggedIn,
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
};

function mapStateToProps(state) {
  const productBlocks = getLoadedProductsPages(state);
  const appliedFilters = getAppliedFilters(state);

  // eslint-disable-next-line
  let filtersLength = {};

  // eslint-disable-next-line
  for (let key in appliedFilters) {
    if (appliedFilters[key]) {
      filtersLength[`${key}Filters`] = appliedFilters[key].length;
    }
  }

  return {
    productsBlock: getProductsAndTitleBlocks(state, productBlocks),
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
};

SearchDetailContainer.defaultProps = {
  navTree: {},
  filters: {},
  filtersLength: {},
  initialValues: {},
  isLoadingMore: false,
  isSearchResultsAvailable: false,
};

export default withIsomorphicRenderer({
  WrappedComponent: SearchDetailContainer,
  mapStateToProps,
  mapDispatchToProps,
});
