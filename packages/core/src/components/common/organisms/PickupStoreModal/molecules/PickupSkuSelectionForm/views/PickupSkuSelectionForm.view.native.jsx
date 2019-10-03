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

import {
  PickUpSkUSectionContainer,
  ImageWrapper,
  ProductSummaryContainer,
  ProductDetailSummary,
  OfferPriceAndBadge3Container,
} from '../styles/PickupSkuSelectionForm.style.native';

const PickupSkuSelectionForm = props => {
  const onGoToPDPPage = (pdpUrl, selectedColorProductId) => {
    const { navigation, onCloseClick } = props;
    const title = navigation && navigation.getParam('title');
    onCloseClick();
    navigation.navigate('ProductDetail', {
      title,
      pdpUrl,
      selectedColorProductId,
      reset: true,
    });
  };

  const {
    initialValues,
    currentProduct,
    prices,
    currency,
    currentColorEntry,
    imageUrl,
    onChangeColor,
    generalProductId,
  } = props;

  const badge2 = prices && prices.badge2;
  const currencyPrefix = currency === 'USD' ? '$' : currency;
  const currentColorPdpUrl = currentColorEntry && currentColorEntry.pdpUrl;
  const colorProductId = currentColorEntry && currentColorEntry.colorProductId;

  const listPrice = prices && prices.listPrice;
  const offerPrice = prices && prices.offerPrice;

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
            onPress={() => onGoToPDPPage(currentColorPdpUrl, colorProductId)}
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
        onChangeColor={onChangeColor}
        plpLabels={SKU_DETAILS}
        currentProduct={currentProduct}
        customFormName={PRODUCT_SKU_SELECTION_FORM}
        selectedColorProductId={generalProductId}
        initialFormValues={initialValues}
        showAddToBagCTA={false}
      />
    </PickUpSkUSectionContainer>
  );
};

PickupSkuSelectionForm.propTypes = {
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

  currentProduct: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,

  currency: PropTypes.string,
  generalProductId: PropTypes.string,

  prices: PropTypes.shape({
    listPrice: PropTypes.number.isRequired,
    offerPrice: PropTypes.number,
  }).isRequired,

  // isHasPlcc: PropTypes.bool,

  onCloseClick: PropTypes.func,
  navigation: PropTypes.func,
  onChangeColor: PropTypes.func,
  currentColorEntry: PropTypes.shape({}),
  imageUrl: PropTypes.string.isRequired,
};

PickupSkuSelectionForm.defaultProps = {
  navigation: null,
  currency: 'USD',
  onCloseClick: () => {},
  onChangeColor: null,
  currentColorEntry: {},
  generalProductId: '',
};

export default withStyles(PickupSkuSelectionForm, styles);
