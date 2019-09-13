import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import { PropTypes } from 'prop-types';
import SearchDetail from '../views/SearchDetail.view';
import getSearchedResult from './SearchDetail.selectors';
import {
  processBreadCrumbs,
  getProductsAndTitleBlocks,
} from '../../ProductListing/container/ProductListing.util';
import {
  getProductsSelect,
  getNavigationTree,
  getLoadedProductsCount,
  getUnbxdId,
  getProductsFilters,
  getCategoryId,
  getLabelsProductListing,
  getLongDescription,
  getIsLoadingMore,
  getLastLoadedPageNumber,
  getLoadedProductsPages,
  getTotalProductsCount,
  getAppliedFilters,
  getAppliedSortId,
} from '../../ProductListing/container/ProductListing.selectors';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import submitProductListingFiltersForm from '../../ProductListing/container/productListingOnSubmitHandler';
import { getSearchResult } from '../../../../../../../web/src/components/features/content/Header/molecules/SearchBar/SearchBar.actions';

class SearchDetailContainer extends React.PureComponent {
  componentDidMount() {
    const {
      router: {
        query: { sq },
      },
      fetchSearchResults,
    } = this.props;
    fetchSearchResults(sq);
  }

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
      onSubmit,
      onPickUpOpenClick,
      searchedResult,
      ...otherProps
    } = this.props;
    return (
      <SearchDetail
        searchedResult={searchedResult}
        products={products}
        labels={labels}
        {...otherProps}
      />
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
    currentNavIds: state.ProductListing && state.ProductListing.get('currentNavigationIds'),
    categoryId: getCategoryId(state),
    navTree: getNavigationTree(state),
    breadCrumbs: processBreadCrumbs(
      state.ProductListing && state.ProductListing.get('breadCrumbTrail')
    ),
    loadedProductCount: getLoadedProductsCount(state),
    unbxdId: getUnbxdId(state),
    totalProductsCount: getTotalProductsCount(state),
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
    onSubmit: submitProductListingFiltersForm,
    // formValues: getFormValues('filter-form')(state),
    isPlcc: isPlccUser(state),
    searchedResult: getSearchedResult(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSearchResults: searchQuery => {
      dispatch(getSearchResult(searchQuery));
    },
  };
}

SearchDetailContainer.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      sq: PropTypes.string,
    }),
  }).isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  searchedResult: PropTypes.arrayOf(PropTypes.shape({})),
  getProducts: PropTypes.func.isRequired,
  onPickUpOpenClick: PropTypes.func.isRequired,
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
  onSubmit: PropTypes.func.isRequired,
};

SearchDetailContainer.defaultProps = {
  searchedResult: {},
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
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchDetailContainer)
);
