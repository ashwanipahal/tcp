/**
 * @module PickupSkuSelectionFormContainer
 * @desc Component to display step 1 of PickUp in Store Modal and fill sku details
 * doesn't open when sku is resolved
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../hoc/withStyles';
import styles from '../../../../QuickViewModal/molecules/ProductCustomizeFormPart/styles/ProductCustomizeFormPart.style';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import PickupProductFormPart from '../../PickupProductFormPart';
import PickupSkuSelectionForm from '../views/PickupSkuSelectionForm.view';
import {
  getMapSliceForColorProductId,
  getMapSliceForColor,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

class PickupSkuSelectionFormContainer extends React.Component {
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
      currencyExchange,
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
        currencyExchange={currencyExchange}
      />
    ) : (
      <PickupSkuSelectionForm
        selectedColor={selectedColor}
        generalProductId={this.generalProductId}
        navigateToPDP={this.navigateToPDP}
        onChangeColor={this.onChangeColor}
        imageUrl={imageUrl}
        currentColorEntry={currentColorEntry}
        currencyExchange={currencyExchange}
        {...this.props}
      />
    );
  }
}

PickupSkuSelectionFormContainer.propTypes = {
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
  currencyExchange: PropTypes.string,

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

PickupSkuSelectionFormContainer.defaultProps = {
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
  currencyExchange: '',
};

export default withStyles(PickupSkuSelectionFormContainer, styles);
