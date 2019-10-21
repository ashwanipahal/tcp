import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image, Anchor } from '../../../../../atoms';
import {
  PickUpSkUSectionContainer,
  ImageWrapper,
  ProductSummaryContainer,
  ProductDetailSummary,
  OfferPriceAndBadge3Container,
  ListPriceAndBadgeContainer,
} from '../styles/ProductCustomizeFormPart.style.native';
import { BodyCopyWithSpacing } from '../../../../../atoms/styledWrapper';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import ProductAddToBagContainer from '../../../../../molecules/ProductAddToBag/container/ProductAddToBag.container';
import InputCheckbox from '../../../../../atoms/InputCheckbox';

import {
  getPrices,
  getProductListToPathInMobileApp,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

const ProductCustomizeFormPart = props => {
  const {
    productInfo,
    plpLabels,
    currency,
    quickViewLabels,
    handleAddToBag,
    addToBagError,
    currentColorEntry,
    imageUrl,
    isMultiItemQVModal,
    goToPDPPageMobile,
    onChangeColor,
    formRef,
    formEnabled,
    onInputSelectionChange,
  } = props;

  const prices = productInfo && getPrices(productInfo, currentColorEntry.color.name);
  const { badge2, listPrice, offerPrice } = prices;
  const currencyPrefix = currency === 'USD' ? '$' : currency;
  const currentColorPdpUrl =
    currentColorEntry && currentColorEntry.pdpUrl ? currentColorEntry.pdpUrl : productInfo.pdpUrl;
  const modifiedPdpUrl = getProductListToPathInMobileApp(currentColorPdpUrl) || '';
  // const pdpToPath = getProductListToPath(currentColorPdpUrl);
  const colorProductId = currentColorEntry && currentColorEntry.colorProductId;
  return (
    <PickUpSkUSectionContainer>
      <ProductSummaryContainer>
        <ImageWrapper>
          <Image resizeMode="contain" height="198px" width="161px" url={imageUrl} />

          <Anchor noLink onPress={() => goToPDPPageMobile(modifiedPdpUrl, colorProductId)}>
            <BodyCopy
              fontSize="fs14"
              fontWeight="regular"
              fontFamily="secondary"
              textDecoration="underline"
              text={quickViewLabels.viewProductDetails}
            />
          </Anchor>
        </ImageWrapper>
        <ProductDetailSummary>
          <BodyCopyWithSpacing
            fontFamily="secondary"
            fontSize="fs18"
            fontWeight="extrabold"
            text={productInfo.name}
            spacingStyles="margin-bottom-SM"
          />
          <OfferPriceAndBadge3Container>
            <BodyCopy
              dataLocator="pdp_current_product_price"
              fontFamily="secondary"
              fontSize="fs22"
              fontWeight="black"
              color="red.500"
              text={`${currencyPrefix}${offerPrice}`}
            />

            <ListPriceAndBadgeContainer>
              {listPrice !== offerPrice ? (
                <BodyCopy
                  dataLocator="pdp_discounted_product_price"
                  textDecoration="line-through"
                  fontFamily="secondary"
                  fontSize="fs12"
                  fontWeight="regular"
                  color="gray.800"
                  text={`${currencyPrefix}${listPrice}`}
                />
              ) : null}
              {badge2 ? (
                <BodyCopy
                  dataLocator="pdp_discounted_percentage"
                  margin="0 0 0 4px"
                  fontFamily="secondary"
                  fontSize="fs12"
                  fontWeight="regular"
                  color="red.500"
                  text={badge2}
                />
              ) : null}
            </ListPriceAndBadgeContainer>
          </OfferPriceAndBadge3Container>
        </ProductDetailSummary>
      </ProductSummaryContainer>

      <ProductAddToBagContainer
        showAddToBagCTA={!isMultiItemQVModal}
        showColorChips={!isMultiItemQVModal}
        onChangeColor={onChangeColor}
        plpLabels={plpLabels}
        currentProduct={productInfo}
        handleFormSubmit={handleAddToBag}
        errorOnHandleSubmit={addToBagError}
        formRef={formRef}
        formEnabled={formEnabled}
      />
      {isMultiItemQVModal && (
        <div className="inputCheckBox">
          <InputCheckbox
            execOnChangeByDefault={false}
            input={{ value: formEnabled, onChange: onInputSelectionChange }}
          />
        </div>
      )}
    </PickUpSkUSectionContainer>
  );
};

ProductCustomizeFormPart.propTypes = {
  plpLabels: PropTypes.shape({}).isRequired,
  imageUrl: PropTypes.string.isRequired,
  goToPDPPageMobile: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  currentColorEntry: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
  handleAddToBag: PropTypes.func.isRequired,
  formValues: PropTypes.shape({}).isRequired,
  quickViewLabels: PropTypes.shape({
    addToBag: PropTypes.string,
    viewProductDetails: PropTypes.string,
  }).isRequired,
  isMultiItemQVModal: PropTypes.bool.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  currency: PropTypes.string,
  addToBagError: PropTypes.string,
  formRef: PropTypes.shape({}).isRequired,
  formEnabled: PropTypes.bool.isRequired,
  onInputSelectionChange: PropTypes.func.isRequired,
};

ProductCustomizeFormPart.defaultProps = {
  currency: 'USD',
  addToBagError: '',
  navigation: {},
};

export default ProductCustomizeFormPart;
export { ProductCustomizeFormPart as ProductCustomizeFormPartVanilla };
