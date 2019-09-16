import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import { PropTypes } from 'prop-types';
import SearchDetail from '../views/SearchDetail.view';
import { getSlpProducts } from './SearchDetail.actions';
import { getProductsAndTitleBlocks } from './SearchDetail.util';
import {
  getProductsSelect,
  getLoadedProductsCount,
  getUnbxdId,
  getProductsFilters,
  getCategoryId,
  getLabelsProductListing,
  getNavigationTree,
  getLongDescription,
  getIsLoadingMore,
  getLastLoadedPageNumber,
  getLoadedProductsPages,
  getTotalProductsCount,
  getAppliedFilters,
  getAppliedSortId,
} from './SearchDetail.selectors';

class SearchDetailContainer extends React.PureComponent {
  componentDidMount() {
    const {
      router: {
        query: { sq },
        asPath,
      },
      getProducts,
    } = this.props;
    getProducts({ URI: 'search', asPath, sq, ignoreCache: true });
  }

  render() {
    return <SearchDetail />;
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
    currentNavIds: state.ProductListing && state.ProductListing.get('currentNavigationIds'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: payload => {
      dispatch(getSlpProducts(payload));
    },
  };
}

SearchDetailContainer.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      sq: PropTypes.string,
    }),
  }).isRequired,
  getProducts: PropTypes.func.isRequired,
  navTree: PropTypes.shape({}),
  filters: PropTypes.shape({}),
  filtersLength: PropTypes.shape({}),
  initialValues: PropTypes.shape({}),
  formValues: PropTypes.shape({
    sort: PropTypes.string.isRequired,
  }).isRequired,
};

SearchDetailContainer.defaultProps = {
  navTree: {},
  filters: {},
  filtersLength: {},
  initialValues: {},
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchDetailContainer)
);
