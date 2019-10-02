import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; // eslint-disable-line
import { getFormValues } from 'redux-form';
import { PropTypes } from 'prop-types';
import ProductListing from '../views';
import { getPlpProducts, getMorePlpProducts } from './ProductListing.actions';
import { openQuickViewWithValues } from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.actions';
import { processBreadCrumbs, getProductsAndTitleBlocks } from './ProductListing.util';
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
  getLabels,
} from './ProductListing.selectors';
import submitProductListingFiltersForm from './productListingOnSubmitHandler';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import getSortLabels from '../molecules/SortSelector/views/Sort.selectors';

class ProductListingContainer extends React.PureComponent {
  componentDidMount() {
    this.makeApiCall();
  }

  componentDidUpdate(prevProps) {
    const {
      router: {
        query: { cid },
      },
    } = prevProps;
    const {
      router: {
        query: { cid: currentCid },
      },
    } = this.props;
    if (cid !== currentCid) {
      this.makeApiCall();
    }
  }

  makeApiCall = () => {
    const { getProducts, navigation } = this.props;
    const url = navigation && navigation.getParam('url');
    getProducts({ URI: 'category', url, ignoreCache: true });
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
      onSubmit,
      onQuickViewOpenClick,
      formValues,
      sortLabels,
      slpLabels,
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
        getProducts={getProducts}
        onSubmit={onSubmit}
        onQuickViewOpenClick={onQuickViewOpenClick}
        formValues={formValues}
        sortLabels={sortLabels}
        slpLabels={slpLabels}
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
    // Need to pass form values in as prop so we can compare current values to previous values
    formValues: getFormValues('filter-form')(state),
    isPlcc: isPlccUser(state),
    sortLabels: getSortLabels(state),
    slpLabels: getLabels(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: payload => {
      dispatch(getPlpProducts(payload));
    },
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
    getMoreProducts: payload => {
      dispatch(getMorePlpProducts(payload));
    },
    addToCartEcom: () => {},
    addItemToCartBopis: () => {},
  };
}

ProductListingContainer.propTypes = {
  getProducts: PropTypes.func.isRequired,
  onQuickViewOpenClick: PropTypes.func.isRequired,
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
  onSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.shape({
    sort: PropTypes.string.isRequired,
  }).isRequired,
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
  slpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
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
  slpLabels: {},
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductListingContainer)
);
