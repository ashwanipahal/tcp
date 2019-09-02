/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductListing from '../views';
import { getPlpProducts, getMorePlpProducts } from './ProductListing.actions';
import { processBreadCrumbs } from './ProductListing.util';
import {
  getProductsSelect,
  getNavigationTree,
  getLoadedProductsCount,
  getUnbxdId,
  getProductsFilters,
  getCategoryId,
  getLabelsProductListing,
  getLongDescription,
  getLoadedProductsPages,
  getIsLoadingMore,
  getLastLoadedPageNumber,
} from './ProductListing.selectors';
import { PRODUCTS_PER_LOAD } from './ProductListing.constants';
import { isPlccUser } from '../../../account/User/container/User.selectors';

function getIsShowCategoryGrouping(state) {
  const isL2Category = state.ProductListing.get('breadCrumbTrail').length === 2;
  // const isNotAppliedSort = !state.productListing.appliedSortId;
  const isNotAppliedSort = !null;
  const appliedFilters = state.ProductListing.appliedFiltersIds;
  const isNotAppliedFilter =
    (appliedFilters && appliedFilters.length > 0 && !sumValues(appliedFilters)) || true;

  return isL2Category && isNotAppliedSort && isNotAppliedFilter;
}

function getProductsAndTitleBlocks(state) {
  const productBlocks = getLoadedProductsPages(state);
  // const injectionHandler = injectProductGridItem(state);
  const productsAndTitleBlocks = [];
  let lastProductsAndTitleBlock;
  let lastCategoryName = null;

  productBlocks &&
    productBlocks.forEach((block, blockIndex) => {
      const productsAndTitleBlock = [];
      lastProductsAndTitleBlock = productsAndTitleBlock;

      // For each product in this block try to extract the category name if new
      block &&
        block.forEach((product, productIndex) => {
          const currentProductIndex =
            parseInt(productIndex) + 1 + parseInt(blockIndex) * PRODUCTS_PER_LOAD;
          const { categoryName } = product.miscInfo;

          // This is to inject Dynamic Marketing Espots into our product Grid
          // injectionHandler.marketing(productsAndTitleBlock, currentProductIndex, categoryName);

          // push: If we should group and we hit a new category name push on array
          // injectionHandler.seperator(productsAndTitleBlock, categoryName);
          const shouldGroup = getIsShowCategoryGrouping(state);
          if (shouldGroup && (categoryName && categoryName !== lastCategoryName)) {
            productsAndTitleBlock.push(categoryName);
            lastCategoryName = categoryName;
          }
          // push: product onto block
          productsAndTitleBlock.push(product);
        });

      // push: product block onto matrix
      productsAndTitleBlocks.push(productsAndTitleBlock);
    });
  // if (lastProductsAndTitleBlock) {
  //   injectionHandler.marketingLast(lastProductsAndTitleBlock);
  // }

  return productsAndTitleBlocks;
}
class ProductListingContainer extends React.PureComponent {
  componentDidMount() {
    this.makeApiCall();
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
        {...otherProps}
      />
    );
  }
}

function mapStateToProps(state) {
  const appliedFilters = state.ProductListing.appliedFiltersIds;

  // eslint-disable-next-line
  let filtersLength = {};

  // eslint-disable-next-line
  for (let key in appliedFilters) {
    if (appliedFilters[key]) {
      filtersLength[`${key}Filters`] = appliedFilters[key].length;
    }
  }

  return {
    productsBlock: getProductsAndTitleBlocks(state),
    currentNavIds: state.ProductListing.currentNavigationIds,
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
    totalProductsCount: state.ProductListing.totalProductsCount,
    filtersLength,
    initialValues: {
      ...state.ProductListing.appliedFiltersIds,
    },
    labelsFilter: state.Labels.PLP.PLP_sort_filter,
    longDescription: getLongDescription(state),
    labels: getLabelsProductListing(state),
    isLoadingMore: getIsLoadingMore(state),
    lastLoadedPageNumber: getLastLoadedPageNumber(state),
    isPlcc: isPlccUser(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: payload => {
      dispatch(getPlpProducts(payload));
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
};

ProductListingContainer.defaultProps = {
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
