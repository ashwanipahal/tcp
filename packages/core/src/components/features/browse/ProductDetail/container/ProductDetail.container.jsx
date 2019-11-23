import React from 'react';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import withRefWrapper from '@tcp/core/src/components/common/hoc/withRefWrapper';
import withHotfix from '@tcp/core/src/components/common/hoc/withHotfix';
import SEOTags from '@tcp/web/src/components/common/atoms';
import { deriveSEOTags } from '@tcp/core/src/config/SEOTags.config';
import { PropTypes } from 'prop-types';
import ProductDetailView from '../views';
import { getProductDetails } from './ProductDetail.actions';
import {
  removeAddToFavoriteErrorState,
  addItemsToWishlist,
} from '../../Favorites/container/Favorites.actions';
import {
  getIsShowPriceRange,
  getIsKeepAliveProduct,
} from '../../../../../reduxStore/selectors/session.selectors';
import {
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import { getAddedToBagError } from '../../../CnC/AddedToBag/container/AddedToBag.selectors';
import {
  getNavTree,
  prodDetails,
  getBreadCrumbs,
  getDescription,
  getRatingsProductId,
  getDefaultImage,
  getCurrentCurrency,
  getCurrencyAttributes,
  getPlpLabels,
  getCurrentProduct,
  getPDPLabels,
  getProductDetailFormValues,
  getShortDescription,
  getGeneralProductId,
  getAlternateSizes,
  getPLPPromos,
} from './ProductDetail.selectors';

import { getLabelsOutOfStock } from '../../ProductListing/container/ProductListing.selectors';

import {
  addToCartEcom,
  clearAddToBagErrorState,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions';

import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import { fetchAddToFavoriteErrorMsg } from '../../Favorites/container/Favorites.selectors';
import PRODUCTDETAIL_CONSTANTS from './ProductDetail.constants';

/**
 * Hotfix-Aware Component. The use of `withRefWrapper` and `withHotfix`
 * below are just for making the page hotfix-aware.
 */
const ProductDetailWithRef = withRefWrapper(ProductDetailView);
ProductDetailWithRef.displayName = 'ProductDetailPage';
const ProductDetail = withHotfix(ProductDetailWithRef);

class ProductDetailContainer extends React.PureComponent {
  static extractPID = props => {
    const {
      router: {
        query: { pid },
      },
    } = props;

    // TODO - fix this to extract the product ID from the page.
    const id = pid && pid.split('-');
    let productId = id && id.length > 1 ? `${id[id.length - 2]}_${id[id.length - 1]}` : pid;
    if (
      (id.indexOf('Gift') > -1 || id.indexOf('gift') > -1) &&
      (id.indexOf('Card') > -1 || id.indexOf('card') > -1)
    ) {
      productId = 'gift';
    }

    return productId;
  };

  static getInitialProps = async ({ props, query, isServer }) => {
    const { getDetails } = props;
    let pid;
    if (isServer) {
      ({ pid } = query);
    } else {
      ({
        router: {
          query: { pid },
        },
      } = props);
    }
    // TODO - fix this to extract the product ID from the page.
    const productId = ProductDetailContainer.extractPID({ ...props, router: { query: { pid } } });
    await getDetails({ productColorId: productId });

    // Build a page name for tracking
    let pageName = '';
    if (productId) {
      const productIdParts = productId.split('_');
      pageName = `product:${productIdParts[0]}:${pid
        .replace(productIdParts[0], '')
        .replace(productIdParts[1], '')
        .split('-')
        .join(' ')
        .trim()
        .toLowerCase()}`;
    }

    return {
      pageProps: {
        pageName,
      },
    };
  };

  componentDidMount() {
    window.scrollTo(0, 100);
  }

  componentDidUpdate(prevProps) {
    const {
      getDetails,
      router: {
        query: { pid },
      },
    } = this.props;

    if (prevProps.router.query.pid !== pid) {
      const productId = ProductDetailContainer.extractPID(this.props);
      getDetails({ productColorId: productId });
      window.scrollTo(0, 100);
    }
  }

  componentWillUnmount = () => {
    const { clearAddToBagError } = this.props;
    clearAddToBagError();
  };

  getSEOTags = pageId => {
    const { productInfo, router } = this.props;
    if (pageId) {
      const seoConfig = deriveSEOTags(pageId, productInfo, router);
      return seoConfig ? <SEOTags seoConfig={seoConfig} /> : null;
    }
    return null;
  };

  handleAddToBag = () => {
    const { addToBagEcom, formValues, productInfo } = this.props;
    let cartItemInfo = getCartItemInfo(productInfo, formValues);
    cartItemInfo = { ...cartItemInfo };
    addToBagEcom(cartItemInfo);
  };

  render() {
    const {
      productDetails,
      breadCrumbs,
      longDescription,
      itemPartNumber,
      shortDescription,
      ratingsProductId,
      defaultImage,
      productInfo,
      currency,
      currencyAttributes,
      plpLabels,
      pdpLabels,
      addToBagError,
      onAddItemToFavorites,
      isLoggedIn,
      alternateSizes,
      isShowPriceRangeKillSwitch,
      outOfStockLabels,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      topPromos,
      middlePromos,
      bottomPromos,
      router: { asPath: asPathVal },
      ...otherProps
    } = this.props;
    const isProductDataAvailable = Object.keys(productInfo).length > 0;
    return (
      <>
        {ProductDetailContainer.pageInfo.pageId && productInfo
          ? this.getSEOTags(ProductDetailContainer.pageInfo.pageId)
          : null}
        <React.Fragment>
          {isProductDataAvailable ? (
            <ProductDetail
              {...otherProps}
              productDetails={productDetails}
              breadCrumbs={breadCrumbs}
              itemPartNumber={itemPartNumber}
              longDescription={longDescription}
              shortDescription={shortDescription}
              ratingsProductId={ratingsProductId}
              otherProps={otherProps}
              defaultImage={defaultImage}
              plpLabels={plpLabels}
              pdpLabels={pdpLabels}
              currency={currency}
              currencyAttributes={currencyAttributes}
              productInfo={productInfo}
              handleAddToBag={this.handleAddToBag}
              addToBagError={addToBagError}
              onAddItemToFavorites={onAddItemToFavorites}
              isLoggedIn={isLoggedIn}
              alternateSizes={alternateSizes}
              isShowPriceRangeKillSwitch={isShowPriceRangeKillSwitch}
              outOfStockLabels={outOfStockLabels}
              AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
              removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
              asPathVal={asPathVal}
              topPromos={topPromos}
              middlePromos={middlePromos}
              bottomPromos={bottomPromos}
            />
          ) : null}
        </React.Fragment>
      </>
    );
  }
}

ProductDetailContainer.pageInfo = {
  pageId: 'p',
};

function mapStateToProps(state) {
  return {
    navTree: getNavTree(state),
    productDetails: prodDetails(state),
    breadCrumbs: getBreadCrumbs(state),
    longDescription: getDescription(state),
    itemPartNumber: getGeneralProductId(state),
    shortDescription: getShortDescription(state),
    ratingsProductId: getRatingsProductId(state),
    // This is just to check if the product is correct
    defaultImage: getDefaultImage(state),
    productInfo: getCurrentProduct(state),
    currency: getCurrentCurrency(state),
    currencyAttributes: getCurrencyAttributes(state),
    plpLabels: getPlpLabels(state),
    pdpLabels: getPDPLabels(state),
    outOfStockLabels: getLabelsOutOfStock(state),
    addToBagError: getAddedToBagError(state),
    formValues: getProductDetailFormValues(state),
    isLoggedIn: getUserLoggedInState(state) && !isRememberedUser(state),
    alternateSizes: getAlternateSizes(state),
    isShowPriceRangeKillSwitch: getIsShowPriceRange(state),
    isKeepAliveEnabled: getIsKeepAliveProduct(state),
    isKeepAliveProduct: getIsKeepAliveProduct(state),
    AddToFavoriteErrorMsg: fetchAddToFavoriteErrorMsg(state),
    topPromos: getPLPPromos(state, PRODUCTDETAIL_CONSTANTS.PROMO_TOP),
    middlePromos: getPLPPromos(state, PRODUCTDETAIL_CONSTANTS.PROMO_MIDDLE),
    bottomPromos: getPLPPromos(state, PRODUCTDETAIL_CONSTANTS.PROMO_BOTTOM),
    store: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: payload => {
      dispatch(getProductDetails(payload));
    },
    addToBagEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
    clearAddToBagError: () => {
      dispatch(clearAddToBagErrorState());
    },
    onAddItemToFavorites: payload => {
      dispatch(addItemsToWishlist(payload));
    },
    removeAddToFavoritesErrorMsg: payload => {
      dispatch(removeAddToFavoriteErrorState(payload));
    },
  };
}

ProductDetailContainer.propTypes = {
  productDetails: PropTypes.arrayOf(PropTypes.shape({})),
  getDetails: PropTypes.func.isRequired,
  addToBagError: PropTypes.string,
  clearAddToBagError: PropTypes.func.isRequired,
  formValues: PropTypes.shape({}).isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  productInfo: PropTypes.arrayOf(PropTypes.shape({})),
  breadCrumbs: PropTypes.shape([]),
  pdpLabels: PropTypes.shape({}),
  longDescription: PropTypes.string,
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
  ratingsProductId: PropTypes.string,
  isShowPriceRangeKillSwitch: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      pid: PropTypes.string,
    }),
  }).isRequired,
  defaultImage: PropTypes.string,
  currency: PropTypes.string,
  currencyAttributes: PropTypes.shape({}),
  plpLabels: PropTypes.shape({
    lbl_sort: PropTypes.string,
  }),
  onAddItemToFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  alternateSizes: PropTypes.shape({
    key: PropTypes.string,
  }),
  outOfStockLabels: PropTypes.shape({}).isRequired,
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
};

ProductDetailContainer.defaultProps = {
  productDetails: [],
  productInfo: {},
  addToBagError: '',
  breadCrumbs: null,
  longDescription: '',
  shortDescription: '',
  ratingsProductId: '',
  defaultImage: '',
  currency: 'USD',
  currencyAttributes: {
    exchangevalue: 1,
  },
  plpLabels: {
    lbl_sort: '',
  },
  itemPartNumber: '',
  pdpLabels: {},
  isLoggedIn: false,
  alternateSizes: {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
};

export default withIsomorphicRenderer({
  WrappedComponent: ProductDetailContainer,
  mapStateToProps,
  mapDispatchToProps,
});
