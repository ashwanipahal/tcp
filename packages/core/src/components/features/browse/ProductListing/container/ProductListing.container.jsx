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
  getBreadCrumbTrail,
  getLabelsProductListing,
  getLongDescription,
  getLoadedProductsPages,
  getIsLoadingMore,
  getLastLoadedPageNumber,
} from './ProductListing.selectors';
import { PRODUCTS_PER_LOAD } from './ProductListing.constants';

function getProductsAndTitleBlocks(state) {
  const productBlocks = getLoadedProductsPages(state);
  // const injectionHandler = injectProductGridItem(state);
  const productsAndTitleBlocks = [];
  let lastProductsAndTitleBlock;

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
    const { getProducts, navigation } = this.props;
    const url = navigation && navigation.getParam('url');
    getProducts({ URI: 'category', url });
  }

  render() {
    const {
      productsBlock,
      currentNavIds,
      navTree,
      breadCrumbs,
      longDescription,
      labels,
      isLoadingMore,
      lastLoadedPageNumber,
      ...otherProps
    } = this.props;
    return (
      <ProductListing
        productsBlock={productsBlock}
        currentNavIds={currentNavIds}
        navTree={navTree}
        breadCrumbs={breadCrumbs}
        longDescription={longDescription}
        labels={labels}
        isLoadingMore={isLoadingMore}
        lastLoadedPageNumber={lastLoadedPageNumber}
        {...otherProps}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    productsBlock: getProductsAndTitleBlocks(state),
    currentNavIds: state.ProductListing.currentNavigationIds,
    navTree: getNavigationTree(state),
    breadCrumbs: processBreadCrumbs(getBreadCrumbTrail(state)),
    loadedProductCount: getLoadedProductsCount(state),
    unbxdId: getUnbxdId(state),
    longDescription: getLongDescription(state),
    labels: getLabelsProductListing(state),
    isLoadingMore: getIsLoadingMore(state),
    lastLoadedPageNumber: getLastLoadedPageNumber(state),
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
  currentNavIds: PropTypes.arrayOf(PropTypes.shape({})),
  navTree: PropTypes.shape({}),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  longDescription: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  navigation: PropTypes.shape({}).isRequired,
};

ProductListingContainer.defaultProps = {
  productsBlock: [],
  currentNavIds: [],
  navTree: {},
  breadCrumbs: [],
  longDescription: '',
  labels: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
