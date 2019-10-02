/**
 * @module PickupSkuSelectionForm
 * @desc Component to display step 1 of PickUp in Store Modal and fill sku details
 * doesn't open when sku is resolved
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Image, BodyCopy, Col, Anchor } from '@tcp/core/src/components/common/atoms';
import { PRODUCT_SKU_SELECTION_FORM } from '@tcp/core/src/constants/reducer.constants';
import withStyles from '../../../../../hoc/withStyles';
import styles, {
  customPriceStyles,
} from '../../../../QuickViewModal/molecules/ProductCustomizeFormPart/styles/ProductCustomizeFormPart.style';
import ProductPrice from '../../../../../../features/browse/ProductDetail/molecules/ProductPrice/ProductPrice';
import ProductAddToBagContainer from '../../../../../molecules/ProductAddToBag';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { SKU_DETAILS, PICKUP_LABELS } from '../../../PickUpStoreModal.constants';
import PickupProductFormPart from '../../PickupProductFormPart';
import {
  getMapSliceForColorProductId,
  getMapSliceForColor,
  getProductListToPath,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

class PickupSkuSelectionForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentProduct, initialValues } = this.props;
    this.colorFitsSizesMap = currentProduct && currentProduct.colorFitsSizesMap;
    const generalProductId =
      currentProduct && getMapSliceForColor(this.colorFitsSizesMap, initialValues.color);
    this.generalProductId = generalProductId && generalProductId.colorDisplayId;
    this.state = {
      currentColorEntry: getMapSliceForColorProductId(
        this.colorFitsSizesMap,
        this.generalProductId
      ),
      selectedColor: initialValues.color,
    };
    this.getPickUpSKUSection = this.getPickUpSKUSection.bind(this);
  }

  onChangeColor = e => {
    this.generalProductId =
      this.colorFitsSizesMap && getMapSliceForColor(this.colorFitsSizesMap, e);
    this.generalProductId = this.generalProductId && this.generalProductId.colorDisplayId;
    this.setState({
      currentColorEntry: getMapSliceForColor(this.colorFitsSizesMap, e),
      selectedColor: e,
    });
  };

  navigateToPDP = () => {
    const { onCloseClick } = this.props;
    onCloseClick();
  };

  getProductDetailContainer = (productPriceProps, pdpToPath, currentColorPdpUrl) => {
    return (
      <Fragment>
        <ProductPrice {...productPriceProps} />

        <Anchor
          onClick={this.navigateToPDP}
          className="link-redirect"
          to={pdpToPath}
          asPath={currentColorPdpUrl}
        >
          <BodyCopy className="product-link" fontSize="fs14" fontFamily="secondary">
            {PICKUP_LABELS.VIEW_DETAILS}
          </BodyCopy>
        </Anchor>
      </Fragment>
    );
  };

  getPickUpSKUSection = (imageUrl, currentColorEntry) => {
    const {
      currentProduct,
      initialValues,
      currency,
      prices,
      isCanada,
      isInternationalShipping,
      isHasPlcc,
      className,
    } = this.props;

    const productPriceProps = {
      currencySymbol: currency,
      isItemPartNumberVisible: false,
      ...prices,
      isCanada,
      inheritedStyles: customPriceStyles,
      customFonts: { listPriceFont: 'fs14' },
      isPlcc: isHasPlcc,
      isInternationalShipping,
    };

    const currentColorPdpUrl = currentColorEntry && currentColorEntry.pdpUrl;

    const pdpToPath = getProductListToPath(currentColorPdpUrl);

    return (
      <Row className={className}>
        <Col className="modal-header" colSize={{ small: 12, medium: 12, large: 12 }}>
          {PICKUP_LABELS.PICK_UP_MODAL_LABEL}
        </Col>
        <div className="product-customize-form-container">
          <div className="image-title-wrapper">
            <div className="image-wrapper">
              <Image alt="Error" src={imageUrl} />
            </div>
            <div className="product-details-card-container-separate">
              <BodyCopy
                fontSize="fs18"
                fontWeight="extrabold"
                fontFamily="secondary"
                className="product-name"
              >
                {currentProduct.name}
              </BodyCopy>
              {this.getProductDetailContainer(productPriceProps, pdpToPath, currentColorPdpUrl)}
            </div>
          </div>
          <div className="product-detail">
            <div className="product-details-card-container">
              <BodyCopy
                fontSize="fs18"
                fontWeight="extrabold"
                fontFamily="secondary"
                className="product-name"
              >
                {currentProduct.name}
              </BodyCopy>
              <div className="product-view-details">
                {this.getProductDetailContainer(productPriceProps, pdpToPath, currentColorPdpUrl)}
              </div>
            </div>

            <ProductAddToBagContainer
              onChangeColor={this.onChangeColor}
              plpLabels={SKU_DETAILS}
              currentProduct={currentProduct}
              customFormName={PRODUCT_SKU_SELECTION_FORM}
              selectedColorProductId={this.generalProductId}
              initialFormValues={initialValues}
              showAddToBagCTA={false}
            />
          </div>
        </div>
      </Row>
    );
  };

  render() {
    const {
      colorFitSizeDisplayNames,
      initialValues,
      isCanada,
      isPlcc,
      currencySymbol,
      isInternationalShipping,
      name,
      isShowExtendedSizesNotification,
      isSkuResolved,
      isPreferredStoreError,
      promotionalMessage,
      promotionalPLCCMessage,
      onEditSku,
      isPickUpWarningModal,
      currentProduct,
      prices,
    } = this.props;

    const { currentColorEntry, selectedColor } = this.state;

    const imageUrl = selectedColor
      ? currentProduct.imagesByColor[selectedColor].basicImageUrl
      : null;

    const listPrice = prices && prices.listPrice;
    const offerPrice = prices && prices.offerPrice;
    return isSkuResolved ? (
      <PickupProductFormPart
        colorFitSizeDisplayNames={colorFitSizeDisplayNames}
        colorFitsSizesMap={this.colorFitsSizesMap}
        name={name}
        isShowExtendedSizesNotification={isShowExtendedSizesNotification}
        isPreferredStoreError={isPreferredStoreError}
        onEditSku={onEditSku}
        promotionalMessage={promotionalMessage}
        initialValues={initialValues}
        promotionalPLCCMessage={promotionalPLCCMessage}
        isPickUpWarningModal={isPickUpWarningModal}
        isCanada={isCanada}
        isHasPlcc={isPlcc}
        currencySymbol={currencySymbol}
        isInternationalShipping={isInternationalShipping}
        imagePath={imageUrl}
        listPrice={listPrice}
        offerPrice={offerPrice}
      />
    ) : (
      this.getPickUpSKUSection(imageUrl, currentColorEntry)
    );
  }
}

PickupSkuSelectionForm.propTypes = {
  /** labels for selection fields */
  colorFitSizeDisplayNames: PropTypes.shape({
    /** label for color selection field */
    color: PropTypes.string,
    /** label for fit selection field */
    fit: PropTypes.string,
    /** label for size selection field */
    size: PropTypes.string,
  }),

  colorFitsSizesMap: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** seed values for the form */
  initialValues: PropTypes.shape({
    /** user's preselected color id from parent instance */
    color: PropTypes.string,
    /** user's preselected fit id from parent instance */
    fit: PropTypes.string,
    /** user's preselected size id from parent instance */
    size: PropTypes.string,
    /** user's preselected quantity from parent instance */
    quantity: PropTypes.number,
  }).isRequired,

  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  isCanada: PropTypes.bool.isRequired,
  /** This is used to display the correct currency symbol */
  currencySymbol: PropTypes.string.isRequired,
  /* We are available to know if is an international shipping */
  isInternationalShipping: PropTypes.bool.isRequired,

  isPlcc: PropTypes.bool.isRequired,

  currentProduct: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,

  currency: PropTypes.string,

  prices: PropTypes.shape({
    listPrice: PropTypes.number.isRequired,
    offerPrice: PropTypes.number,
  }).isRequired,

  isHasPlcc: PropTypes.bool,

  className: PropTypes.string,

  name: PropTypes.string,

  isShowExtendedSizesNotification: PropTypes.bool,

  isSkuResolved: PropTypes.bool,

  isPreferredStoreError: PropTypes.bool,

  promotionalMessage: PropTypes.string,

  promotionalPLCCMessage: PropTypes.string,

  onEditSku: PropTypes.bool,

  isPickUpWarningModal: PropTypes.bool,

  onCloseClick: PropTypes.func,
};

PickupSkuSelectionForm.defaultProps = {
  colorFitSizeDisplayNames: null,
  currency: 'USD',
  isHasPlcc: false,
  className: '',
  name: '',
  isShowExtendedSizesNotification: false,
  isSkuResolved: false,
  isPreferredStoreError: false,
  promotionalMessage: '',
  promotionalPLCCMessage: '',
  onEditSku: false,
  isPickUpWarningModal: false,
  onCloseClick: () => {},
};

export default withStyles(PickupSkuSelectionForm, styles);
