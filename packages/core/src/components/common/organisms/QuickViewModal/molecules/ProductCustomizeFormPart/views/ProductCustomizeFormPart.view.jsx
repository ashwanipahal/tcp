import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor, Image } from '../../../../../atoms';
import { COLOR_FITS_SIZES_MAP_PROP_TYPE } from '../../../../PickupStoreModal/PickUpStoreModal.proptypes';
import withStyles from '../../../../../hoc/withStyles';
import styles, {
  customPriceStyles,
  customSubmitButtonStyle,
} from '../styles/ProductCustomizeFormPart.style';
import ProductPrice from '../../../../../../features/browse/ProductDetail/molecules/ProductPrice/ProductPrice';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import ProductAddToBagContainer from '../../../../../molecules/ProductAddToBag/container/ProductAddToBag.container';
import { getSiteId, getLocator } from '../../../../../../../utils';

import {
  getPrices,
  getProductListToPath,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

const ProductCustomizeFormPart = props => {
  const {
    className,
    productInfo,
    plpLabels,
    currency,
    priceCurrency,
    currencyExchange,
    isCanada,
    isHasPlcc,
    isInternationalShipping,
    quickViewLabels,
    handleAddToBag,
    addToBagError,
    currentColorEntry,
    onChangeColor,
    goToPDPPage,
    imageUrl,
    handleUpdateItem,
    colorFitsSizesMap,
    ...otherProps
  } = props;
  const { fromBagPage, productInfoFromBag } = otherProps;
  const prices = productInfo && getPrices(productInfo, currentColorEntry.color.name);
  const currentColorPdpUrl =
    currentColorEntry && currentColorEntry.pdpUrl ? currentColorEntry.pdpUrl : productInfo.pdpUrl;
  const pdpToPath = getProductListToPath(currentColorPdpUrl);
  const productPriceProps = {
    currencySymbol: currency,
    currencyExchange,
    priceCurrency,
    isItemPartNumberVisible: false,
    ...prices,
    isCanada,
    inheritedStyles: customPriceStyles,
    customFonts: { listPriceFont: 'fs14' },
    isPlcc: isHasPlcc,
    isInternationalShipping,
  };

  return (
    <div className={className}>
      <div className="product-customize-form-container">
        <div className="image-title-wrapper">
          <div className="image-wrapper">
            <Image
              data-locator={getLocator('quick_view_product_image')}
              alt={productInfo.name}
              src={imageUrl}
            />
            <Anchor
              dataLocator={getLocator('quick_view_View_Product_details')}
              className="link-redirect"
              noLink
              to={`/${getSiteId()}${currentColorPdpUrl}`}
              onClick={e => goToPDPPage(e, pdpToPath, currentColorPdpUrl)}
            >
              <BodyCopy className="product-link" fontSize="fs14" fontFamily="secondary">
                {quickViewLabels.viewProductDetails}
              </BodyCopy>
            </Anchor>
          </div>
          <div className="product-details-card-container-separate">
            <BodyCopy
              fontSize="fs18"
              fontWeight="extrabold"
              fontFamily="secondary"
              className="product-name"
              dataLocator={getLocator('quick_view_product_name')}
            >
              {productInfo.name}
            </BodyCopy>
            <ProductPrice {...productPriceProps} />
          </div>
        </div>
        <div className="product-detail">
          <div className="product-details-card-container">
            <BodyCopy
              fontSize="fs18"
              fontWeight="extrabold"
              fontFamily="secondary"
              className="product-name"
              dataLocator={getLocator('quick_view_product_name')}
            >
              {productInfo.name}
            </BodyCopy>
            <ProductPrice {...productPriceProps} />
          </div>

          <ProductAddToBagContainer
            onChangeColor={onChangeColor}
            plpLabels={plpLabels}
            currentProduct={productInfo}
            errorOnHandleSubmit={addToBagError}
            handleFormSubmit={fromBagPage ? handleUpdateItem : handleAddToBag}
            fromBagPage={fromBagPage}
            productInfoFromBag={productInfoFromBag}
            customSubmitButtonStyle={customSubmitButtonStyle}
            colorFitsSizesMap={colorFitsSizesMap}
          />
        </div>
      </div>
    </div>
  );
};

ProductCustomizeFormPart.propTypes = {
  plpLabels: PropTypes.shape({}).isRequired,
  onChangeColor: PropTypes.func.isRequired,
  handleAddToBag: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  quickViewLabels: PropTypes.shape({
    addToBag: PropTypes.string,
    viewProductDetails: PropTypes.string,
  }).isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  currency: PropTypes.string,
  className: PropTypes.string,
  priceCurrency: PropTypes.string,
  currencyExchange: PropTypes.string,
  isCanada: PropTypes.bool,
  isInternationalShipping: PropTypes.bool,
  isHasPlcc: PropTypes.bool,
  addToBagError: PropTypes.string,
  imageUrl: PropTypes.string,
  currentColorEntry: PropTypes.func,
  goToPDPPage: PropTypes.func,
  colorFitsSizesMap: COLOR_FITS_SIZES_MAP_PROP_TYPE.isRequired,
};

ProductCustomizeFormPart.defaultProps = {
  currency: 'USD',
  className: '',
  priceCurrency: '',
  currencyExchange: '',
  isCanada: false,
  isHasPlcc: false,
  isInternationalShipping: false,
  currentColorEntry: () => {},
  goToPDPPage: () => {},
  addToBagError: '',
  imageUrl: '',
};

export default withStyles(ProductCustomizeFormPart, styles);
export { ProductCustomizeFormPart as ProductCustomizeFormPartVanilla };
