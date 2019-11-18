/** @module ProductBasicInfo
 * @summary Show the product's name, rating and wishlist CTA.
 */

import React from 'react';
import { PropTypes } from 'prop-types';
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
    this.state = {};
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
        component="p"
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
      productMiscInfo: { colorProductId },
    } = this.props;

    onAddItemToFavorites({ colorProductId, page: 'PDP' });
  };

  render() {
    const {
      isBundleProduct,
      pdpUrl,
      badge,
      isGiftCard,
      className,
      // isShowFavoriteCount,
      productInfo: { ratingsProductId },
      keepAlive,
      outOfStockLabels,
      productMiscInfo,
    } = this.props;
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
        <div className="information-container">
          <div className="title-wrapper">
            {typeof pdpUrl === 'string' ? (
              <Anchor to={pdpUrl} className="product-link-title">
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
};

ProductBasicInfo.defaultProps = {
  className: '',
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
};

export default withStyles(ProductBasicInfo, ProductBasicInfoStyle);
