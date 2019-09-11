/**
 * @module PickupSkuSelectionForm
 * @desc Component to display step 1 of PickUp in Store Modal and fill sku details
 * doesn't open when sku is resolved
 */

import React from 'react';
import PropTypes from 'prop-types';
import PickupProductCustomizeForm from '../../../molecules/ProductCustomizeForm';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { PICKUP_SKU_SELECTION } from '../PickUpStoreModal.constants';

const PickupSkuSelectionForm = props => {
  const {
    colorFitSizeDisplayNames,
    colorFitsSizesMap,
    initialValues,
    onColorChange,
    onChange,
    onSubmit,
    productInfo,
    isCanada,
    isPlcc,
    currencySymbol,
    isInternationalShipping,
    listPrice,
    offerPrice,
    showDefaultSizeMsg,
  } = props;
  const { pdpUrl } = productInfo;
  const viewPDLink = (
    <a className="link-redirect" href={pdpUrl}>
      View Product Details
    </a>
  );
  const { SubmitButtonAriaLabel, SubmitButtonText, FormName } = PICKUP_SKU_SELECTION;
  return (
    <PickupProductCustomizeForm
      colorFitSizeDisplayNames={colorFitSizeDisplayNames}
      colorFitsSizesMap={colorFitsSizesMap}
      form={FormName}
      initialValues={initialValues}
      isPLPCardFlipProductImage
      isPickupStoreModal
      isSelectedValuesVisibleInLabels
      onColorChange={onColorChange}
      onChange={onChange}
      onSubmit={onSubmit}
      productInfo={productInfo}
      submitButtonAriaLabel={SubmitButtonAriaLabel}
      submitButtonText={SubmitButtonText}
      viewPDLink={viewPDLink}
      isCanada={isCanada}
      isPlcc={isPlcc}
      currencySymbol={currencySymbol}
      isInternationalShipping={isInternationalShipping}
      offerPrice={offerPrice}
      listPrice={listPrice}
      showDefaultSizeMsg={showDefaultSizeMsg}
    />
  );
};

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

  onColorChange: PropTypes.func.isRequired,

  onChange: PropTypes.func.isRequired,

  onSubmit: PropTypes.func.isRequired,

  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  isCanada: PropTypes.bool.isRequired,
  /** This is used to display the correct currency symbol */
  currencySymbol: PropTypes.string.isRequired,
  /* We are available to know if is an international shipping */
  isInternationalShipping: PropTypes.bool.isRequired,

  isPlcc: PropTypes.bool.isRequired,

  showDefaultSizeMsg: PropTypes.bool.isRequired,

  listPrice: PropTypes.string.isRequired,

  offerPrice: PropTypes.string.isRequired,
};

PickupSkuSelectionForm.defaultProps = {
  colorFitSizeDisplayNames: null,
};

export default PickupSkuSelectionForm;
