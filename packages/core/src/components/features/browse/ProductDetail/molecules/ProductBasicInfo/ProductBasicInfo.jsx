/** @module ProductBasicInfo
 * @summary Show the product's name, rating and wishlist CTA.
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import { PRODUCT_ADD_TO_BAG } from '@tcp/core/src/constants/reducer.constants';
import ProductRating from '../ProductRating/ProductRating';
import { Anchor, BodyCopy } from '../../../../../common/atoms';
import withStyles from '../../../../../common/hoc/withStyles';
import ProductBasicInfoStyle from './ProductBasicInfo.style';
// import {FavoriteButtonContainer} from './FavoriteButtonContainer.js';
import {
  BadgeItem,
  WishListIcon,
} from '../../../ProductListing/molecules/ProductList/views/ProductItemComponents';

class ProductBasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedProdutId: '',
      errorProductId: '',
      isLoggedIn: props.isLoggedIn,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      isLoggedIn,
      onAddItemToFavorites,
      productInfo: { productId },
      productMiscInfo: { colorProductId },
      pageName,
      skuId,
      formName,
    } = props;

    const { clickedProdutId, isLoggedIn: wasLoggedIn } = state;
    if (isLoggedIn && isLoggedIn !== wasLoggedIn && clickedProdutId === productId) {
      onAddItemToFavorites({
        colorProductId: productId,
        productSkuId: (skuId && skuId.skuId) || null,
        pdpColorProductId: colorProductId,
        formName: formName || PRODUCT_ADD_TO_BAG,
        page: pageName || 'PDP',
      });
      return { clickedProdutId: '', isLoggedIn };
    }
    return null;
  }

  componentWillUnmount() {
    const { removeAddToFavoritesErrorMsg } = this.props;
    if (typeof removeAddToFavoritesErrorMsg === 'function') {
      removeAddToFavoritesErrorMsg('');
    }
  }

  title = () => {
    const {
      productInfo: { name },
      className,
    } = this.props;
    return (
      <BodyCopy
        className={`product-title ${className}`}
        fontSize="fs18"
        component="h1"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {name}
      </BodyCopy>
    );
  };

  handleAddToWishlist = () => {
    const {
      onAddItemToFavorites,
      productInfo: { productId },
      productMiscInfo: { colorProductId },
      pageName,
      skuId,
      formName,
    } = this.props;

    onAddItemToFavorites({
      colorProductId: productId,
      productSkuId: (skuId && skuId.skuId) || null,
      pdpColorProductId: colorProductId,
      formName: formName || PRODUCT_ADD_TO_BAG,
      page: pageName || 'PDP',
    });
    this.setState({
      clickedProdutId: productId,
      errorProductId: productId,
    });
  };

  render() {
    const {
      isBundleProduct,
      asPath,
      pdpUrl,
      badge,
      isGiftCard,
      className,
      // isShowFavoriteCount,
      productInfo: { ratingsProductId, productId },
      keepAlive,
      outOfStockLabels,
      productMiscInfo,
      AddToFavoriteErrorMsg,
    } = this.props;
    const { errorProductId } = this.state;
    const isFavorite =
      productMiscInfo.isFavorite ||
      (productMiscInfo.miscInfo && productMiscInfo.miscInfo.isInDefaultWishlist);
    const title = this.title();
    const isFavoriteView = false;
    return (
      <div className={`product-details-header-container ${className}`}>
        <BadgeItem
          customFontWeight="regular"
          customFontSize={['fs10', 'fs10', 'fs10']}
          className="inline-badge-item"
          text={badge}
        />
        {keepAlive && (
          <BodyCopy color="red.500" fontSize="fs10" fontFamily="secondary">
            {outOfStockLabels.itemSoldOutMessage}
          </BodyCopy>
        )}

        {AddToFavoriteErrorMsg && errorProductId === productId && (
          <Notification
            status="error"
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={AddToFavoriteErrorMsg}
          />
        )}
        <div className="information-container">
          <div className="title-wrapper">
            {typeof pdpUrl === 'string' ? (
              <Anchor to={pdpUrl} asPath={asPath} className="product-link-title">
                {title}
              </Anchor>
            ) : (
              title
            )}
            {!isGiftCard && (
              <div className="wishlist-container">
                {!isBundleProduct &&
                  WishListIcon(
                    isFavoriteView,
                    isFavorite,
                    this.handleAddToWishlist,
                    false, // itemNotAvailable
                    productMiscInfo.favoritedCount
                  )}
              </div>
            )}
          </div>
          {/* TODO - fix it with bundle product requirement */}
          {/* {!isBundleProduct && !isGiftCard && isRatingsVisible && <ProductRating ratingsProductId={ratingsProductId} /> } */}
          {!isGiftCard ? <ProductRating ratingsProductId={ratingsProductId} /> : null}
        </div>
        {/* TODO - the favourite functionality needs to be implemented here */}
        {/* {!isBundleProduct && !isGiftCard && (
              <FavoriteButtonContainer isActiveHoverMessage uniqueId={uniqueId} favoritedCount={colorSlice.favoritedCount}
                generalProductId={generalProductId} colorProductId={colorSlice.colorProductId} skuId={skuId} quantity={quantity}
                isInDefaultWishlist={isInDefaultWishlist} isShowFavoriteCount={isShowFavoriteCount} />
            )} */}
        {/* TODO - fix it with bundle product requirement */}
        {/* {!isBundleProduct && !isMobile && keepAlive && <div className="oos-message">OUT OF STOCK</div>} */}
      </div>
    );
  }
}

ProductBasicInfo.propTypes = {
  className: PropTypes.string,
  productInfo: PropTypes.shape({}).isRequired,
  asPath: PropTypes.string,
  pdpUrl: PropTypes.string,
  badge: PropTypes.string,
  isGiftCard: PropTypes.bool.isRequired,
  onAddItemToFavorites: PropTypes.func.isRequired,
  isBundleProduct: PropTypes.bool,
  keepAlive: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({
    itemSoldOutMessage: PropTypes.string,
  }),
  productMiscInfo: PropTypes.shape({
    isInDefaultWishlist: PropTypes.bool,
  }),
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  pageName: PropTypes.string,
  skuId: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  formName: PropTypes.string,
};

ProductBasicInfo.defaultProps = {
  className: '',
  asPath: null,
  pdpUrl: null,
  badge: '',
  isBundleProduct: false,
  outOfStockLabels: {
    itemSoldOutMessage: '',
  },
  keepAlive: false,
  productMiscInfo: {
    isInDefaultWishlist: false,
  },
  AddToFavoriteErrorMsg: '',
  pageName: '',
  skuId: '',
  removeAddToFavoritesErrorMsg: () => {},
  isLoggedIn: false,
  formName: PRODUCT_ADD_TO_BAG,
};

export default withStyles(ProductBasicInfo, ProductBasicInfoStyle);
