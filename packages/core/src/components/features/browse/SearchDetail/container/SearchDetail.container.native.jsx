/* eslint-disable */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { PropTypes } from 'prop-types';
import SearchDetail from '../views/SearchDetail.view';
import { getSlpProducts, getMoreSlpProducts } from './SearchDetail.actions';
import { getProductsAndTitleBlocks } from '../container/SearchDetail.util';
import getSortLabels from '../../ProductListing/molecules/SortSelector/views/Sort.selectors';
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
  getCurrentSearchForText,
  getLabels,
  getAppliedFilters,
  getAppliedSortId,
  getIsLoadingMore,
  checkIfSearchResultsAvailable,
  getAllProductsSelect,
} from '../container/SearchDetail.selectors';

import { isPlccUser } from '../../../account/User/container/User.selectors';
import submitProductListingFiltersForm from '../../ProductListing/container/productListingOnSubmitHandler';
import NoResponseSearchDetail from '../views/NoResponseSearchDetail.view';
class SearchDetailContainer extends React.PureComponent {
  searchQuery;
  asPath;

  componentDidMount() {
    this.makeApiCall();
  }

  componentDidUpdate(prevProps) {
    this.makeApiCall();
  }

  makeApiCall = () => {
    const { getProducts, navigation } = this.props;
    const searchQuery = navigation && navigation.getParam('searchQuery');
    if (this.searchQuery !== searchQuery) {
      this.searchQuery = searchQuery;
      const splitAsPathBy = `/search/${this.searchQuery}?`;
      this.asPath = `/us/search/${this.searchQuery}`;
      const queryString = this.asPath.split(splitAsPathBy);
      const filterSortString = (queryString.length && queryString[1]) || '';
      const formValues = { sort: '' }; // TODO
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
    getMoreProducts({ URI: 'search', url: this.asPath, ignoreCache: true });
  };

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
      ...otherProps
    } = this.props;

    return (
      <React.Fragment>
        {isSearchResultsAvailable ? (
          <View>
            {products && products.length > 0 ? (
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
                onGoToPDPPage={this.onGoToPDPPage}
                onLoadMoreProducts={this.onLoadMoreProducts}
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
          </View>
        ) : (
          <View>
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
              {...otherProps}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}

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
    products: getAllProductsSelect(state),
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
    currentNavIds: state.ProductListing && state.ProductListing.get('currentNavigationIds'),
    slpLabels: getLabels(state),
    searchResultSuggestions:
      state.SearchListingPage && state.SearchListingPage.get('searchResultSuggestions'),
    sortLabels: getSortLabels(state),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDetailContainer);
