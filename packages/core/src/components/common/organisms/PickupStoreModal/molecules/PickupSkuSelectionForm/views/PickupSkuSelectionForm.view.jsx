/**
 * @module PickupSkuSelectionForm
 * @desc Component to display step 1 of PickUp in Store Modal and fill sku details
 * doesn't open when sku is resolved
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, BodyCopy, Anchor, DamImage } from '@tcp/core/src/components/common/atoms';
import { PRODUCT_SKU_SELECTION_FORM } from '@tcp/core/src/constants/reducer.constants';
import withStyles from '../../../../../hoc/withStyles';
import styles, {
  customPriceStyles,
} from '../../../../QuickViewModal/molecules/ProductCustomizeFormPart/styles/ProductCustomizeFormPart.style';
import ProductPrice from '../../../../../../features/browse/ProductDetail/molecules/ProductPrice/ProductPrice';
import ProductAddToBagContainer from '../../../../../molecules/ProductAddToBag';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { SKU_DETAILS, PICKUP_LABELS } from '../../../PickUpStoreModal.constants';
import { getProductListToPath } from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

const PickupSkuSelectionForm = props => {
  const {
    currentProduct,
    initialValues,
    currency,
    prices,
    isCanada,
    isInternationalShipping,
    isHasPlcc,
    className,
    onChangeColor,
    currentColorEntry,
    imageUrl,
    generalProductId,
    navigateToPDP,
    currencyExchange,
  } = props;
  const productPriceProps = {
    currencySymbol: currency,
    currencyExchange,
    isItemPartNumberVisible: false,
    ...prices,
    isCanada,
    inheritedStyles: customPriceStyles,
    customFonts: { listPriceFont: 'fs14' },
    isPlcc: isHasPlcc,
    isInternationalShipping,
  };

  const currentColorPdpUrl = currentColorEntry && currentColorEntry.pdpUrl;

  const pdpToPath = currentColorPdpUrl && getProductListToPath(currentColorPdpUrl);

  const getProductDetailContainer = () => {
    return (
      <Fragment>
        <ProductPrice {...productPriceProps} />

        <Anchor
          onClick={navigateToPDP}
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

  const imgData = {
    alt: 'Error',
    url: imageUrl,
  };

  return (
    <Row className={className}>
      <div className="product-customize-form-container">
        <div className="image-title-wrapper">
          <div className="image-wrapper">
            <DamImage imgData={imgData} isProductImage />
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
            {getProductDetailContainer()}
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
            <div className="product-view-details">{getProductDetailContainer()}</div>
          </div>

          <ProductAddToBagContainer
            onChangeColor={onChangeColor}
            plpLabels={SKU_DETAILS}
            currentProduct={currentProduct}
            customFormName={PRODUCT_SKU_SELECTION_FORM}
            selectedColorProductId={generalProductId}
            initialFormValues={initialValues}
            showAddToBagCTA={false}
            renderReceiveProps
            isDisableZeroInventoryEntries={false}
            isPickup
          />
        </div>
      </div>
    </Row>
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

  isCanada: PropTypes.bool.isRequired,
  /* We are available to know if is an international shipping */
  isInternationalShipping: PropTypes.bool.isRequired,
  currentProduct: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,

  currency: PropTypes.string,
  currencyExchange: PropTypes.string,

  prices: PropTypes.shape({
    listPrice: PropTypes.number.isRequired,
    offerPrice: PropTypes.number,
  }).isRequired,

  isHasPlcc: PropTypes.bool,

  className: PropTypes.string,

  generalProductId: PropTypes.string.isRequired,

  onChangeColor: PropTypes.func,
  currentColorEntry: PropTypes.shape({}),
  imageUrl: PropTypes.string.isRequired,
  navigateToPDP: PropTypes.func.isRequired,
};

PickupSkuSelectionForm.defaultProps = {
  colorFitSizeDisplayNames: null,
  currency: 'USD',
  isHasPlcc: false,
  className: '',
  onChangeColor: () => {},
  currentColorEntry: {},
  currencyExchange: 1,
};

export default withStyles(PickupSkuSelectionForm, styles);
