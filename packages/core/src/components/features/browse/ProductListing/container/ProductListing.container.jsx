import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; // eslint-disable-line
import { getFormValues } from 'redux-form';
import { PropTypes } from 'prop-types';
import ProductListing from '../views';
import OutfitListingContainer from '../../OutfitListing/container';
import { getPlpProducts, getMorePlpProducts } from './ProductListing.actions';
import { addItemsToWishlist } from '../../Favorites/container/Favorites.actions';
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
  getIsFilterBy,
} from './ProductListing.selectors';
import submitProductListingFiltersForm from './productListingOnSubmitHandler';
import {
  isPlccUser,
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import getSortLabels from '../molecules/SortSelector/views/Sort.selectors';

import {
  getCurrentCurrency,
  getCurrencyAttributes,
} from '../../ProductDetail/container/ProductDetail.selectors';

class ProductListingContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOutfit: false,
      asPath: '',
    };
  }

  componentDidMount() {
    this.makeApiCall();
  }

  componentDidUpdate(prevProps) {
    const {
      router: { asPath },
    } = prevProps;
    const {
      router: { asPath: currentAsPath },
    } = this.props;
    if (asPath !== currentAsPath) {
      this.makeApiCall();
    }
  }

  makeApiCall = () => {
    const {
      getProducts,
      navigation,
      router: { asPath },
    } = this.props;
    const path = asPath.substring(asPath.lastIndexOf('/') + 1);
    if (path.indexOf('-outfits') > -1) {
      this.setState({
        isOutfit: true,
        asPath: path,
      });
    }
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
      isLoggedIn,
      currencyAttributes,
      currency,
      ...otherProps
    } = this.props;
    const { isOutfit, asPath } = this.state;
    return !isOutfit ? (
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
        isLoggedIn={isLoggedIn}
        currency={currency}
        currencyExchange={currencyAttributes.exchangevalue}
        {...otherProps}
      />
    ) : (
      <OutfitListingContainer
        asPath={asPath}
        breadCrumbs={breadCrumbs}
        navTree={navTree}
        currentNavIds={currentNavIds}
        longDescription={longDescription}
        categoryId={categoryId}
      />
    );
  }
}

ProductListingContainer.pageId = 'c';

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
    isGuest: getUserLoggedInState(state),
    isLoggedIn: getUserLoggedInState(state) && !isRememberedUser(state),
    isFilterBy: getIsFilterBy(state),
    currencyAttributes: getCurrencyAttributes(state),
    currency: getCurrentCurrency(state),
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
    onAddItemToFavorites: payload => {
      dispatch(addItemsToWishlist(payload));
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
  isLoggedIn: PropTypes.bool,
  currencyAttributes: PropTypes.shape({}),
  currency: PropTypes.string,
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
  isLoggedIn: false,
  currencyAttributes: {},
  currency: '$',
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductListingContainer)
);
