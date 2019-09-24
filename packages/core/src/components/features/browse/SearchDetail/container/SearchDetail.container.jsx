/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import { getFormValues } from 'redux-form';
import { PropTypes } from 'prop-types';
import { isClient } from '../../../../../utils/index';
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
  getProductsSelect,
  getCurrentSearchForText,
  getLabels,
  getAppliedFilters,
  getAppliedSortId,
  getIsLoadingMore,
} from '../container/SearchDetail.selectors';

import { isPlccUser } from '../../../account/User/container/User.selectors';
import submitProductListingFiltersForm from '../../ProductListing/container/productListingOnSubmitHandler';
import { getSearchResult } from '../../../../../../../web/src/components/features/content/Header/molecules/SearchBar/SearchBar.actions';
import NoResponseSearchDetail from '../views/NoResponseSearchDetail.view';
class SearchDetailContainer extends React.PureComponent {
  componentDidMount() {
    const {
      router: {
        query: { searchQuery },
        asPath,
      },
      getProducts,
      formValues,
    } = this.props;
    const splitAsPathBy = `/search/${searchQuery}?`;
    const queryString = asPath.split(splitAsPathBy);
    const filterSortString = (queryString.length && queryString[1]) || '';
    getProducts({
      URI: 'search',
      asPath: filterSortString,
      searchQuery,
      ignoreCache: true,
      formValues,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      router: {
        query: { searchQuery },
        asPath,
      },
      getProducts,
      formValues,
    } = prevProps;

    const {
      router: {
        query: { searchQuery: currentSearchQuery },
      },
    } = this.props;
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
      });
    }
  }

  render() {
    const { isLoadingMore, products, ...otherProps } = this.props;

    return (
      <>
        {isLoadingMore === true ? (
          <>
            {products && products.length > 0 ? (
              <SearchDetail isLoadingMore={isLoadingMore} products={products} {...otherProps} />
            ) : (
              <NoResponseSearchDetail {...otherProps} />
            )}
          </>
        ) : (
          <SearchDetail isLoadingMore={isLoadingMore} products={products} {...otherProps} />
        )}
      </>
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
};

SearchDetailContainer.defaultProps = {
  navTree: {},
  filters: {},
  filtersLength: {},
  initialValues: {},
  isLoadingMore: false,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchDetailContainer)
);
