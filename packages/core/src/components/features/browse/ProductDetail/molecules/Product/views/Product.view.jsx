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

const Product = props => {
  const {
    productDetails,
    currencySymbol,
    priceCurrency,
    currencyExchange,
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

  const { miscInfo } = colorProduct;

  const isKeepAlive = miscInfo.keepAlive && isKeepAliveProduct;

  return (
    <div>
      <ProductBasicInfo
        keepAlive={isKeepAlive}
        badge={badge1}
        isGiftCard={isGiftCard}
        productInfo={productInfo}
        isShowFavoriteCount
        currencySymbol={currencySymbol}
        priceCurrency={priceCurrency}
        currencyExchange={currencyExchange}
        isRatingsVisible
        isCanada={isCanada}
        isPlcc={isHasPlcc}
        isInternationalShipping={isInternationalShipping}
        onAddItemToFavorites={onAddItemToFavorites}
        isLoggedIn={isLoggedIn}
      />
      {!isGiftCard ? (
        <>
          <ProductPrice
            currencySymbol={currencySymbol}
            priceCurrency={priceCurrency}
            currencyExchange={currencyExchange}
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
  );
};

Product.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  priceCurrency: PropTypes.string.isRequired,
  selectedColorProductId: PropTypes.string.isRequired,

  isCanada: PropTypes.bool.isRequired,
  isHasPlcc: PropTypes.bool.isRequired,
  isGiftCard: PropTypes.bool.isRequired,
  currencyExchange: PropTypes.string.isRequired,

  /* We are available to know if is an international shipping */
  isInternationalShipping: PropTypes.bool.isRequired,
  productDetails: PropTypes.shape({}).isRequired,
  formValues: PropTypes.shape({}).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onAddItemToFavorites: PropTypes.func.isRequired,
  isShowPriceRangeKillSwitch: PropTypes.bool.isRequired,
  isKeepAliveProduct: PropTypes.bool.isRequired,
  isMatchingFamily: PropTypes.bool.isRequired,
};

export default Product;
