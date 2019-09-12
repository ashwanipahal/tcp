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
      <BadgeItem className="inline-badge-item" text={badge || 'Dummy Badge'} />
      <div className="information-container">
        {typeof pdpUrl === 'string' ? (
          <Anchor to={pdpUrl} className="product-link-title">
            {title}
          </Anchor>
        ) : (
          title
        )}
        {/* {!isBundleProduct && !isGiftCard && isRatingsVisible && <ProductRating ratingsProductId={ratingsProductId} /> } */}
        <ProductRating ratingsProductId={ratingsProductId} />
      </div>
      {/* {!isBundleProduct && !isGiftCard && (
          <FavoriteButtonContainer isActiveHoverMessage uniqueId={uniqueId} favoritedCount={colorSlice.favoritedCount}
            generalProductId={generalProductId} colorProductId={colorSlice.colorProductId} skuId={skuId} quantity={quantity}
            isInDefaultWishlist={isInDefaultWishlist} isShowFavoriteCount={isShowFavoriteCount} />
        )} */}
      {/* {!isBundleProduct && !isMobile && keepAlive && <div className="oos-message">OUT OF STOCK</div>} */}
    </div>
  );
};

ProductBasicInfo.propTypes = {
  productInfo: PropTypes.shape({}).isRequired,
  pdpUrl: PropTypes.string,
  badge: PropTypes.string,
};

ProductBasicInfo.defaultProps = {
  pdpUrl: null,
  badge: '',
};

export default ProductBasicInfo;
