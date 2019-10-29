/** @module ProductBasicInfo
 * @summary Show the product's name, rating and wishlist CTA.
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import ProductRating from '../ProductRating/ProductRating';
import { Anchor, BodyCopy } from '../../../../../common/atoms';
import { isClient } from '../../../../../../utils';
import withStyles from '../../../../../common/hoc/withStyles';
import ProductBasicInfoStyle from './ProductBasicInfo.style';
// import {FavoriteButtonContainer} from './FavoriteButtonContainer.js';
import {
  BadgeItem,
  WishListIcon,
} from '../../../ProductListing/molecules/ProductList/views/ProductItemComponents';

class ProductBasicInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInDefaultWishlist: false,
    };
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
      productInfo: { generalProductId },
      onAddItemToFavorites,
      isLoggedIn,
    } = this.props;

    onAddItemToFavorites({ colorProductId: generalProductId });
    if (isClient() && isLoggedIn) {
      this.setState({ isInDefaultWishlist: true });
    }
  };

  render() {
    const {
      // isBundleProduct,
      pdpUrl,
      badge,
      isGiftCard,
      className,
      // isShowFavoriteCount,
      productInfo: { ratingsProductId },
    } = this.props;

    const { isInDefaultWishlist } = this.state;
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
        <div className="information-container">
          <div className="title-wrapper">
            {typeof pdpUrl === 'string' ? (
              <Anchor to={pdpUrl} className="product-link-title">
                {title}
              </Anchor>
            ) : (
              title
            )}
            {
              <div className="wishlist-container">
                {WishListIcon(
                  isFavoriteView,
                  isInDefaultWishlist,
                  this.handleAddToWishlist
                  // itemNotAvailable
                )}
              </div>
            }
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
  isLoggedIn: PropTypes.bool,
};

ProductBasicInfo.defaultProps = {
  className: '',
  pdpUrl: null,
  badge: '',
  isLoggedIn: false,
};

export default withStyles(ProductBasicInfo, ProductBasicInfoStyle);
