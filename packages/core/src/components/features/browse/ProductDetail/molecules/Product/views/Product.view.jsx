import React from 'react';
import PropTypes from 'prop-types';
import { PRICING_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import ProductPrice from '../../ProductPrice/ProductPrice';
import ProductBasicInfo from '../../ProductBasicInfo/ProductBasicInfo';
import {
  getPrices,
  getPricesWithRange,
  getMapSliceForColorProductId,
  checkIsSelectedSizeDisabled,
} from '../../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';

// eslint-disable-next-line complexity
const Product = props => {
  const {
    productDetails,
    currencySymbol,
    priceCurrency,
    currencyAttributes,
    isCanada,
    isHasPlcc,
    isInternationalShipping,
    isMatchingFamily,
    selectedColorProductId,
    isGiftCard,
    onAddItemToFavorites,
    isLoggedIn,
    isShowPriceRangeKillSwitch,
    formValues = {},
    isKeepAliveProduct,
    isBundleProduct,
    reviewOnTop,
    AddToFavoriteErrorMsg,
    removeAddToFavoritesErrorMsg,
  } = props;

  const productInfo = productDetails.currentProduct;
  if (!productInfo) {
    return <div />; // TODO - maybe add loader later
  }
  const { promotionalMessage, promotionalPLCCMessage } = productInfo;
  const colorProduct =
    getMapSliceForColorProductId(productInfo.colorFitsSizesMap, selectedColorProductId) || {};
  let prices = getPrices(productInfo, colorProduct.color && colorProduct.color.name);
  const badges = colorProduct.miscInfo ? colorProduct.miscInfo.badge1 : {};
  const badge1 = isMatchingFamily && badges.matchBadge ? badges.matchBadge : badges.defaultBadge;

  const isShowPriceRange = isShowPriceRangeKillSwitch;

  if (isShowPriceRange) {
    const { fit, size } = formValues;
    const isSelectedSizeDisabled = checkIsSelectedSizeDisabled(productInfo, formValues);
    prices = getPricesWithRange(
      productInfo,
      colorProduct.color.name,
      fit,
      size,
      isSelectedSizeDisabled
    );
  }
  if (isBundleProduct) {
    prices = getPricesWithRange(productInfo, colorProduct.color.name);
  }

  const { miscInfo } = colorProduct;

  const isKeepAlive = miscInfo.keepAlive && isKeepAliveProduct;

  return (
    <>
      <div className={!reviewOnTop ? 'hide-on-mobile' : 'hide-on-desktop'}>
        <ProductBasicInfo
          keepAlive={isKeepAlive}
          badge={badge1}
          isGiftCard={isGiftCard}
          productInfo={productInfo}
          isShowFavoriteCount
          currencySymbol={currencySymbol}
          priceCurrency={priceCurrency}
          currencyAttributes={currencyAttributes}
          isRatingsVisible
          isCanada={isCanada}
          isPlcc={isHasPlcc}
          isBundleProduct={isBundleProduct}
          isInternationalShipping={isInternationalShipping}
          onAddItemToFavorites={onAddItemToFavorites}
          isLoggedIn={isLoggedIn}
          productMiscInfo={colorProduct}
          AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
          removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
        />
      </div>
      <div className={reviewOnTop ? 'hide-on-mobile hide-on-desktop' : ''}>
        {!isGiftCard ? (
          <>
            <ProductPrice
              currencySymbol={currencySymbol}
              priceCurrency={priceCurrency}
              currencyAttributes={currencyAttributes}
              isItemPartNumberVisible={false}
              itemPartNumber={colorProduct.colorDisplayId}
              {...prices}
              promotionalMessage={promotionalMessage}
              isCanada={isCanada}
              promotionalPLCCMessage={promotionalPLCCMessage}
              isPlcc={isHasPlcc}
              isInternationalShipping={isInternationalShipping}
            />
            <RenderPerf.Measure name={PRICING_VISIBLE} />
          </>
        ) : null}
      </div>
    </>
  );
};

Product.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  priceCurrency: PropTypes.string.isRequired,
  selectedColorProductId: PropTypes.string.isRequired,

  isCanada: PropTypes.bool.isRequired,
  isHasPlcc: PropTypes.bool.isRequired,
  isGiftCard: PropTypes.bool.isRequired,
  currencyAttributes: PropTypes.shape({}).isRequired,

  /* We are available to know if is an international shipping */
  isInternationalShipping: PropTypes.bool.isRequired,
  productDetails: PropTypes.shape({}).isRequired,
  formValues: PropTypes.shape({}).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onAddItemToFavorites: PropTypes.func.isRequired,
  isShowPriceRangeKillSwitch: PropTypes.bool.isRequired,
  isKeepAliveProduct: PropTypes.bool.isRequired,
  isMatchingFamily: PropTypes.bool.isRequired,
  isBundleProduct: PropTypes.bool,
  reviewOnTop: PropTypes.bool.isRequired,
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
};

Product.defaultProps = {
  isBundleProduct: false,
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
};

export default Product;
