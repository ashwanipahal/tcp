/**
 * @module PickupSkuSelectionForm
 * @desc Component to display step 1 of PickUp in Store Modal and fill sku details
 * doesn't open when sku is resolved
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { PRODUCT_SKU_SELECTION_FORM } from '@tcp/core/src/constants/reducer.constants';
import withStyles from '../../../../../hoc/withStyles';
import styles from '../../../../QuickViewModal/molecules/ProductCustomizeFormPart/styles/ProductCustomizeFormPart.style';
import ProductAddToBagContainer from '../../../../../molecules/ProductAddToBag';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { SKU_DETAILS, PICKUP_LABELS } from '../../../PickUpStoreModal.constants';
import PickupProductFormPart from '../../PickupProductFormPart';
import {
  getMapSliceForColorProductId,
  getMapSliceForColor,
  getProductListToPath,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import {
  PickUpSkUSectionContainer,
  ImageWrapper,
  ProductSummaryContainer,
  ProductDetailSummary,
  OfferPriceAndBadge3Container,
} from '../styles/PickupSkuSelectionForm.style.native';

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

  onGoToPDPPage = (pdpUrl, selectedColorProductId) => {
    const { navigation } = this.props;
    const title = navigation && navigation.getParam('title');
    navigation.navigate('ProductDetail', {
      title,
      pdpUrl,
      selectedColorProductId,
      reset: true,
    });
  };

  getPickUpSKUSection = (imageUrl, currentColorEntry) => {
    const { currentProduct, initialValues, currency, prices } = this.props;
    const listPrice = prices && prices.listPrice;
    const offerPrice = prices && prices.offerPrice;
    const badge2 = prices && prices.badge2;
    const currencyPrefix = currency === 'USD' ? '$' : currency;
    const currentColorPdpUrl = currentColorEntry && currentColorEntry.pdpUrl;
    const colorProductId = currentColorEntry && currentColorEntry.colorProductId;

    const pdpToPath = getProductListToPath(currentColorPdpUrl);

    return (
      <PickUpSkUSectionContainer>
        <ProductSummaryContainer>
          <ImageWrapper>
            <Image resizeMode="contain" height="202px" width="164px" url={imageUrl} />
          </ImageWrapper>
          <ProductDetailSummary>
            <BodyCopy
              fontSize="fs14"
              fontWeight="extrabold"
              mobileFontFamily="secondary"
              text={currentProduct.name}
              margin="0 0 24px 0"
            />
            <OfferPriceAndBadge3Container>
              <BodyCopy
                dataLocator="pdp_current_product_price"
                mobileFontFamily="secondary"
                fontSize="fs16"
                fontWeight="black"
                color="red.500"
                text={`${currencyPrefix}${offerPrice}`}
              />

              {listPrice !== offerPrice ? (
                <BodyCopy
                  dataLocator="pdp_discounted_product_price"
                  textDecoration="line-through"
                  mobileFontFamily="secondary"
                  fontSize="fs12"
                  margin="0 0 0 10px"
                  fontWeight="regular"
                  color="gray.800"
                  text={`${currencyPrefix}${listPrice}`}
                />
              ) : null}
              {badge2 ? (
                <BodyCopy
                  dataLocator="pdp_discounted_percentage"
                  margin="0 0 0 10px"
                  mobileFontFamily="secondary"
                  fontSize="fs12"
                  fontWeight="regular"
                  color="red.500"
                  text={badge2}
                />
              ) : null}
            </OfferPriceAndBadge3Container>
            <TouchableOpacity
              onPress={() => this.onGoToPDPPage(pdpToPath, colorProductId)}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`${currentProduct.name}`}
            >
              <BodyCopy
                fontSize="fs14"
                fontWeight="regular"
                mobileFontFamily="secondary"
                textDecoration="underline"
                text={PICKUP_LABELS.VIEW_DETAILS}
              />
            </TouchableOpacity>
          </ProductDetailSummary>
        </ProductSummaryContainer>

        <ProductAddToBagContainer
          onChangeColor={this.onChangeColor}
          plpLabels={SKU_DETAILS}
          currentProduct={currentProduct}
          customFormName={PRODUCT_SKU_SELECTION_FORM}
          selectedColorProductId={this.generalProductId}
          initialFormValues={initialValues}
          showAddToBagCTA={false}
        />
      </PickUpSkUSectionContainer>
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
      //  isSkuResolved, TODO - need to Fix with pickup modal 2
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
    const conditionToRender = false; // it will replace by isSkuResolved
    return conditionToRender ? (
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

  // colorFitsSizesMap: PropTypes.arrayOf(PropTypes.object).isRequired,

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

  // productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
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

  // isHasPlcc: PropTypes.bool,

  name: PropTypes.string,

  isShowExtendedSizesNotification: PropTypes.bool,

  // isSkuResolved: PropTypes.bool, TODO: need to implement

  isPreferredStoreError: PropTypes.bool,

  promotionalMessage: PropTypes.string,

  promotionalPLCCMessage: PropTypes.string,

  onEditSku: PropTypes.bool,

  isPickUpWarningModal: PropTypes.bool,

  onCloseClick: PropTypes.func,
  navigation: PropTypes.func,
};

PickupSkuSelectionForm.defaultProps = {
  colorFitSizeDisplayNames: null,
  navigation: null,
  currency: 'USD',
  // isHasPlcc: false,
  name: '',
  isShowExtendedSizesNotification: false,
  // isSkuResolved: false,
  isPreferredStoreError: false,
  promotionalMessage: '',
  promotionalPLCCMessage: '',
  onEditSku: false,
  isPickUpWarningModal: false,
  onCloseClick: () => {},
};

export default withStyles(PickupSkuSelectionForm, styles);
