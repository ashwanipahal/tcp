/* eslint-disable max-lines */
import React from 'react';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import withHotfix from '@tcp/core/src/components/common/hoc/withHotfix';
import withRefWrapper from '@tcp/core/src/components/common/hoc/withRefWrapper';
import { getFormValues } from 'redux-form';
import dynamic from 'next/dynamic';
import { PropTypes } from 'prop-types';
import { getAPIConfig } from '@tcp/core/src/utils/utils';
import { getIsKeepAliveProduct } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import { trackPageView, setClickAnalyticsData } from '../../../../../analytics/actions';
import { getPlpProducts, getMorePlpProducts } from './ProductListing.actions';
import {
  removeAddToFavoriteErrorState,
  addItemsToWishlist,
} from '../../Favorites/container/Favorites.actions';
import {
  getPageName,
  getPageSection,
  getPageSubSection,
} from '../../../../common/organisms/PickupStoreModal/molecules/PickupStoreSelectionForm/container/PickupStoreSelectionForm.selectors';
import {
  openQuickViewWithValues,
  closeQuickViewModal,
} from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.actions';
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
  getPLPTopPromos,
  getPLPGridPromos,
  getPlpHorizontalPromo,
  getLabelsOutOfStock,
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
import {
  fetchAddToFavoriteErrorMsg,
  fetchErrorMessages,
} from '../../Favorites/container/Favorites.selectors';
import { styliticsProductTabListDataReqforOutfit } from '../../../../common/organisms/StyliticsProductTabList/container/StyliticsProductTabList.actions';

const defaultResolver = mod => mod.default;

const CategoryListing = dynamic(() =>
  import('@tcp/core/src/components/features/browse/CategoryListing').then(defaultResolver)
);

const ProductListing = dynamic(() => import('../views').then(defaultResolver));

const OutfitListingContainer = dynamic(() =>
  import('../../OutfitListing/container').then(defaultResolver)
);

class ProductListingContainer extends React.PureComponent {
  static getInitialProps = async ({ isServer, props, req }) => {
    const {
      getProducts,
      navigation,
      routerParam,
      router = {},
      getStyliticsProductTabListData,
    } = props;
    let { asPath = '' } = routerParam || router;
    asPath = asPath || req.originalUrl;
    const path = asPath.substring(asPath.lastIndexOf('/') + 1);
    if (!isServer) {
      const url = (navigation && navigation.getParam('url')) || asPath;
      await getProducts({ URI: 'category', url, ignoreCache: true });
    } else if (path.indexOf('-outfits') > -1) {
      // OutfitListingContainer.getInitialProps({ isServer, props });
      const categoryId = (navigation && navigation.getParam('outfitPath')) || path;
      await getStyliticsProductTabListData({ categoryId, count: 20 });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      router: { asPath },
      navigationData,
    } = nextProps;
    const { siteId } = getAPIConfig();
    const isCLP =
      navigationData &&
      navigationData.find(item => {
        return item.categoryContent && `/${siteId}${item.categoryContent.asPath}` === asPath;
      });
    const path = asPath.substring(asPath.lastIndexOf('/') + 1);
    return { ...prevState, isOutfit: path.indexOf('-outfits') > -1, asPath: path, isCLP };
  }

  constructor(props) {
    super(props);
    this.state = {
      isOutfit: false,
      asPath: '',
    };
  }

  componentDidUpdate(prevProps) {
    const {
      router: { asPath },
    } = prevProps;
    const {
      router: { asPath: currentAsPath },
    } = this.props;

    // To restrict unnecessary calls while applying filters and sort
    const modifiedAsPath = asPath.split('?');
    const modifiedCurrentAsPath = currentAsPath.split('?');

    if (modifiedAsPath[0] !== modifiedCurrentAsPath[0]) {
      this.makeApiCall();
    }
  }

  componentWillUnmount() {
    const { closeQuickViewModalAction } = this.props;
    closeQuickViewModalAction();
  }

  makeApiCall = () => {
    const {
      getProducts,
      navigation,
      navigationData,
      router: { asPath },
    } = this.props;
    const path = asPath.substring(asPath.lastIndexOf('/') + 1);
    if (path.indexOf('-outfits') > -1) {
      this.setState({
        isOutfit: true,
        asPath: path,
      });
    } else {
      this.setState({
        isOutfit: false,
      });
    }
    const url = navigation && navigation.getParam('url');
    const isCLP = navigationData.find(
      item => item.categoryContent && item.categoryContent.asPath === asPath
    );
    if (!isCLP) {
      getProducts({ URI: 'category', url, ignoreCache: true });
    }
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
      isPlcc,
      currencyAttributes,
      currency,
      plpTopPromos,
      plpGridPromos,
      plpHorizontalPromos,
      router: { asPath: asPathVal },
      isSearchListing,
      navigation,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      pageNameProp,
      pageSectionProp,
      pageSubSectionProp,
      trackPageLoad,
      ...otherProps
    } = this.props;
    const { isOutfit, asPath, isCLP } = this.state;
    if (isCLP) {
      return (
        <CategoryListing
          breadCrumbs={breadCrumbs}
          currentNavIds={currentNavIds}
          navTree={navTree}
          categoryId={categoryId}
        />
      );
    }
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
        isPlcc={isPlcc}
        currency={currency}
        currencyAttributes={currencyAttributes}
        plpTopPromos={plpTopPromos}
        plpGridPromos={plpGridPromos}
        plpHorizontalPromos={plpHorizontalPromos}
        asPathVal={asPathVal}
        isSearchListing={isSearchListing}
        navigation={navigation}
        AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
        removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
        pageNameProp={pageNameProp}
        pageSectionProp={pageSectionProp}
        pageSubSectionProp={pageSubSectionProp}
        trackPageLoad={trackPageLoad}
        {...otherProps}
      />
    ) : (
      <OutfitListingContainer
        asPath={asPath}
        asPathVal={asPathVal}
        breadCrumbs={breadCrumbs}
        navTree={navTree}
        currentNavIds={currentNavIds}
        longDescription={longDescription}
        categoryId={categoryId}
        plpTopPromos={plpTopPromos}
        setClickAnalyticsData={setClickAnalyticsData}
        pageNameProp={pageNameProp}
        pageSectionProp={pageSectionProp}
        pageSubSectionProp={pageSubSectionProp}
        trackPageLoad={trackPageLoad}
      />
    );
  }
}

ProductListingContainer.pageInfo = {
  pageId: 'c',
  pageData: {
    pageName: 'browse',
    pageSection: 'browse',
    pageSubSection: 'browse',
    loadAnalyticsOnload: false,
  },
};

function mapStateToProps(state) {
  const productBlocks = getLoadedProductsPages(state);
  const appliedFilters = getAppliedFilters(state);

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
  const plpHorizontalPromos = getPlpHorizontalPromo(state);
  const plpGridPromos = getPLPGridPromos(state);

  return {
    productsBlock: getProductsAndTitleBlocks(
      state,
      productBlocks,
      plpGridPromos,
      plpHorizontalPromos,
      4,
      filterCount
    ),
    products: getProductsSelect(state),
    filters: getProductsFilters(state),
    currentNavIds: state.ProductListing && state.ProductListing.currentNavigationIds,
    categoryId: getCategoryId(state),
    navTree: getNavigationTree(state),
    breadCrumbs: processBreadCrumbs(state.ProductListing && state.ProductListing.breadCrumbTrail),
    loadedProductCount: getLoadedProductsCount(state),
    unbxdId: getUnbxdId(state),
    totalProductsCount: getTotalProductsCount(state),
    filtersLength,
    initialValues: {
      ...getAppliedFilters(state),
      sort: getAppliedSortId(state) || '',
    },
    labelsFilter: state.Labels && state.Labels.PLP && state.Labels.PLP.PLP_sort_filter,
    longDescription: getLongDescription(state),
    labels: getLabelsProductListing(state),
    outOfStockLabels: getLabelsOutOfStock(state),
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
    routerParam: state.routerParam,
    plpTopPromos: getPLPTopPromos(state),
    plpGridPromos: getPLPGridPromos(state),
    plpHorizontalPromos: getPlpHorizontalPromo(state),
    AddToFavoriteErrorMsg: fetchAddToFavoriteErrorMsg(state),
    navigationData: state.Navigation && state.Navigation.navigationData,
    isKeepAliveEnabled: getIsKeepAliveProduct(state),
    pageNameProp: getPageName(state),
    pageSectionProp: getPageSection(state),
    pageSubSectionProp: getPageSubSection(state),
    errorMessages: fetchErrorMessages(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeQuickViewModalAction: () => {
      dispatch(closeQuickViewModal({ isModalOpen: false }));
    },
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
    getStyliticsProductTabListData: payload => {
      dispatch(styliticsProductTabListDataReqforOutfit(payload));
    },
    removeAddToFavoritesErrorMsg: payload => {
      dispatch(removeAddToFavoriteErrorState(payload));
    },
    addToCartEcom: () => {},
    addItemToCartBopis: () => {},
    trackPageLoad: payload => {
      const { products, customEvents } = payload;
      dispatch(
        setClickAnalyticsData({
          products,
          customEvents,
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
  isPlcc: PropTypes.bool,
  currencyAttributes: PropTypes.shape({}),
  currency: PropTypes.string,
  plpTopPromos: PropTypes.shape({}),
  closeQuickViewModalAction: PropTypes.func,
  navigationData: PropTypes.shape({}),
  isSearchListing: PropTypes.bool,
  plpGridPromos: PropTypes.shape({}),
  plpHorizontalPromos: PropTypes.shape({}),
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  pageNameProp: PropTypes.string,
  pageSectionProp: PropTypes.string,
  pageSubSectionProp: PropTypes.string,
  trackPageLoad: PropTypes.func,
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
  currencyAttributes: {
    exchangevalue: 1,
  },
  currency: 'USD',
  plpTopPromos: [],
  closeQuickViewModalAction: () => {},
  navigationData: null,
  isSearchListing: false,
  plpGridPromos: {},
  plpHorizontalPromos: {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
  isPlcc: false,
  pageNameProp: '',
  pageSectionProp: '',
  pageSubSectionProp: '',
  trackPageLoad: () => {},
};

const IsomorphicProductListingContainer = withIsomorphicRenderer({
  WrappedComponent: ProductListingContainer,
  mapStateToProps,
  mapDispatchToProps,
});

/**
 * Hotfix-Aware Component. The use of `withRefWrapper` and `withHotfix`
 * below are just for making the page hotfix-aware.
 */
const RefWrappedProductListingContainer = withRefWrapper(IsomorphicProductListingContainer);
RefWrappedProductListingContainer.displayName = 'ProductListingPage';
// eslint-disable-next-line no-unused-vars
const HotfixAwareProductListingContainer = withHotfix(RefWrappedProductListingContainer);

export default IsomorphicProductListingContainer;
