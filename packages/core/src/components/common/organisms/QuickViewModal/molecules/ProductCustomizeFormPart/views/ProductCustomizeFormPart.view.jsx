import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { BodyCopy, Anchor, DamImage } from '../../../../../atoms';
import { COLOR_FITS_SIZES_MAP_PROP_TYPE } from '../../../../PickupStoreModal/PickUpStoreModal.proptypes';
import withStyles from '../../../../../hoc/withStyles';
import styles, {
  customPriceStyles,
  customSubmitButtonStyle,
} from '../styles/ProductCustomizeFormPart.style';
import ProductPrice from '../../../../../../features/browse/ProductDetail/molecules/ProductPrice/ProductPrice';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import ProductAddToBagContainer from '../../../../../molecules/ProductAddToBag/container/ProductAddToBag.container';
import { SIZE_CHART_LINK_POSITIONS } from '../../../../../molecules/ProductAddToBag/views/ProductAddToBag.view';
import { getSiteId, getLocator, getAPIConfig, getBrand } from '../../../../../../../utils';
import InputCheckbox from '../../../../../atoms/InputCheckbox';
import {
  getPrices,
  getProductListToPath,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

const ProductCustomizeFormPart = props => {
  const {
    className,
    productInfo,
    isMultiItemQVModal,
    plpLabels,
    currency,
    priceCurrency,
    currencyAttributes,
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
    formRef,
    formEnabled,
    onInputSelectionChange,
    handleUpdateItem,
    colorFitsSizesMap,
    fromBagPage,
    productInfoFromBag,
    quickViewColorSwatchesCss,
    onCloseClick,
    alternateSizes,
    isGiftCard,
    ...otherProps
  } = props;
  const prices = productInfo && getPrices(productInfo, currentColorEntry.color.name);
  const currentColorPdpUrl =
    currentColorEntry && currentColorEntry.pdpUrl ? currentColorEntry.pdpUrl : productInfo.pdpUrl;
  const productPriceProps = {
    currencySymbol: currency,
    currencyAttributes,
    priceCurrency,
    isItemPartNumberVisible: false,
    ...prices,
    isCanada,
    inheritedStyles: customPriceStyles,
    customFonts: { listPriceFont: 'fs14' },
    isPlcc: isHasPlcc,
    isInternationalShipping,
  };
  const imgData = {
    alt: productInfo.name,
    url: imageUrl,
  };

  const sizeChartLinkVisibility = !isGiftCard ? SIZE_CHART_LINK_POSITIONS.AFTER_SIZE : null;

  const apiConfigObj = getAPIConfig();
  const { crossDomain } = apiConfigObj;
  const currentSiteBrand = getBrand();
  const isProductBrandOfSameDomain = !isEmpty(productInfoFromBag)
    ? currentSiteBrand.toUpperCase() === productInfoFromBag.itemBrand.toUpperCase()
    : true;
  const toPath = isProductBrandOfSameDomain
    ? `/${getSiteId()}${currentColorPdpUrl}`
    : `${crossDomain}/${getSiteId()}${currentColorPdpUrl}`;
  const pdpToPath = isProductBrandOfSameDomain
    ? getProductListToPath(currentColorPdpUrl)
    : `${crossDomain}/${getSiteId()}${currentColorPdpUrl}`;
  return (
    <div className={className}>
      {isMultiItemQVModal && (
        <div className="inputCheckBox">
          <InputCheckbox
            execOnChangeByDefault={false}
            input={{ value: formEnabled, onChange: onInputSelectionChange }}
          />
        </div>
      )}
      <div className="multi-items-QV-product">
        <div className="product-customize-form-container">
          <div className="image-title-wrapper">
            <div className="image-wrapper">
              <DamImage
                data-locator={getLocator('quick_view_product_image')}
                imgData={imgData}
                lazyLoad={false}
                isProductImage
              />
              <Anchor
                dataLocator={getLocator('quick_view_View_Product_details')}
                className="link-redirect"
                noLink
                to={toPath}
                onClick={e =>
                  goToPDPPage(
                    e,
                    pdpToPath,
                    isProductBrandOfSameDomain ? currentColorPdpUrl : pdpToPath
                  )
                }
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
              {...otherProps}
              onChangeColor={onChangeColor}
              showAddToBagCTA={!isMultiItemQVModal}
              showColorChips={!isMultiItemQVModal}
              plpLabels={plpLabels}
              currentProduct={productInfo}
              errorOnHandleSubmit={addToBagError}
              handleFormSubmit={fromBagPage ? handleUpdateItem : handleAddToBag}
              fromBagPage={fromBagPage}
              productInfoFromBag={productInfoFromBag}
              customSubmitButtonStyle={customSubmitButtonStyle}
              colorFitsSizesMap={colorFitsSizesMap}
              formRef={formRef}
              formEnabled={formEnabled}
              quickViewColorSwatchesCss={quickViewColorSwatchesCss}
              onCloseClick={onCloseClick}
              alternateSizes={alternateSizes}
              sizeChartLinkVisibility={sizeChartLinkVisibility}
            />
          </div>
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
  currencyAttributes: PropTypes.shape({}).isRequired,
  isCanada: PropTypes.bool,
  isInternationalShipping: PropTypes.bool,
  isMultiItemQVModal: PropTypes.bool.isRequired,
  isHasPlcc: PropTypes.bool,
  addToBagError: PropTypes.string,
  imageUrl: PropTypes.string,
  currentColorEntry: PropTypes.func,
  goToPDPPage: PropTypes.func,
  colorFitsSizesMap: COLOR_FITS_SIZES_MAP_PROP_TYPE.isRequired,
  formRef: PropTypes.shape({}).isRequired,
  formEnabled: PropTypes.bool.isRequired,
  onInputSelectionChange: PropTypes.func.isRequired,
  fromBagPage: PropTypes.bool.isRequired,
  quickViewColorSwatchesCss: PropTypes.string,
  productInfoFromBag: PropTypes.shape({}).isRequired,
  onCloseClick: PropTypes.func,
  alternateSizes: PropTypes.shape({}),
  isGiftCard: PropTypes.bool,
};

ProductCustomizeFormPart.defaultProps = {
  currency: 'USD',
  className: '',
  priceCurrency: '',
  isCanada: false,
  isHasPlcc: false,
  isInternationalShipping: false,
  currentColorEntry: () => {},
  goToPDPPage: () => {},
  addToBagError: '',
  imageUrl: '',
  quickViewColorSwatchesCss: '',
  onCloseClick: () => {},
  alternateSizes: {},
  isGiftCard: false,
};

export default withStyles(ProductCustomizeFormPart, styles);
export { ProductCustomizeFormPart as ProductCustomizeFormPartVanilla };
