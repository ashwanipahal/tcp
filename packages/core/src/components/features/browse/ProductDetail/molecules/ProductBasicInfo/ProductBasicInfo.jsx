/** @module ProductBasicInfo
 * @summary Show the product's name, rating and wishlist CTA.
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import ProductRating from '../ProductRating/ProductRating';
import { Anchor, BodyCopy } from '../../../../../common/atoms';
// import {FavoriteButtonContainer} from './FavoriteButtonContainer.js';
import { BadgeItem } from '../../../ProductListing/molecules/ProductList/views/ProductItemComponents';

const ProductBasicInfo = props => {
  const {
    // isBundleProduct,
    pdpUrl,
    badge,
    isGiftCard,
    // isShowFavoriteCount,
    productInfo: {
      /* generalProductId, isInDefaultWishlist, isGiftCard, unbxdProdId: uniqueId */ name,
      ratingsProductId,
    },
    // isRatingsVisible
  } = props;

  const title = (
    <BodyCopy
      className="product-title"
      fontSize="fs18"
      component="p"
      fontFamily="secondary"
      fontWeight="extrabold"
    >
      {name}
    </BodyCopy>
  );

  return (
    <div className="product-details-header-container">
      <BadgeItem
        customFontWeight="regular"
        customFontSize={['fs10', 'fs10', 'fs10']}
        className="inline-badge-item"
        text={badge}
      />
      <div className="information-container">
        {typeof pdpUrl === 'string' ? (
          <Anchor to={pdpUrl} className="product-link-title">
            {title}
          </Anchor>
        ) : (
          title
        )}
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
};

ProductBasicInfo.propTypes = {
  productInfo: PropTypes.shape({}).isRequired,
  pdpUrl: PropTypes.string,
  badge: PropTypes.string,
  isGiftCard: PropTypes.bool.isRequired,
};

ProductBasicInfo.defaultProps = {
  pdpUrl: null,
  badge: '',
};

export default ProductBasicInfo;
