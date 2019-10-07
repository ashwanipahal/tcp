import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { BodyCopy, Image } from '../../../../../atoms';
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
import { COLOR_FITS_SIZES_MAP_PROP_TYPE } from '../../../../PickupStoreModal/PickUpStoreModal.proptypes';
import ProductAddToBagContainer from '../../../../../molecules/ProductAddToBag/container/ProductAddToBag.container';

import {
  getMapSliceForColorProductId,
  getMapSliceForColor,
  getPrices,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

class ProductCustomizeFormPart extends React.Component {
  constructor(props) {
    super(props);
    const { productInfo, colorFitsSizesMap } = this.props;
    this.state = {
      currentColorEntry: getMapSliceForColorProductId(
        colorFitsSizesMap,
        productInfo.generalProductId
      ),
    };
  }

  onChangeColor = e => {
    const { colorFitsSizesMap } = this.props;
    this.setState({ currentColorEntry: getMapSliceForColor(colorFitsSizesMap, e) });
  };

  onGoToPDPPage = (pdpUrl, selectedColorProductId) => {
    const { navigation, onCloseClick } = this.props;
    const title = navigation && navigation.getParam('title');
    onCloseClick();
    navigation.navigate('ProductDetail', {
      title,
      pdpUrl,
      selectedColorProductId,
      reset: true,
    });
  };

  render() {
    const {
      productInfo,
      plpLabels,
      currency,
      quickViewLabels,
      handleAddToBag,
      addToBagError,
    } = this.props;

    const { currentColorEntry } = this.state;
    const imageUrl = currentColorEntry
      ? productInfo.imagesByColor[currentColorEntry.color.name] &&
        productInfo.imagesByColor[currentColorEntry.color.name].basicImageUrl
      : null;
    const prices = productInfo && getPrices(productInfo, currentColorEntry.color.name);
    const { badge2, listPrice, offerPrice } = prices;
    const currencyPrefix = currency === 'USD' ? '$' : currency;
    const currentColorPdpUrl = currentColorEntry && currentColorEntry.pdpUrl;
    const colorProductId = currentColorEntry && currentColorEntry.colorProductId;

    return (
      <PickUpSkUSectionContainer>
        <ProductSummaryContainer>
          <ImageWrapper>
            <Image resizeMode="contain" height="198px" width="161px" url={imageUrl} />
            <TouchableOpacity
              onPress={() => this.onGoToPDPPage(currentColorPdpUrl, colorProductId)}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`${productInfo.name}`}
            >
              <BodyCopy
                fontSize="fs14"
                fontWeight="regular"
                fontFamily="secondary"
                textDecoration="underline"
                text={quickViewLabels.viewProductDetails}
              />
            </TouchableOpacity>
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
          onChangeColor={this.onChangeColor}
          plpLabels={plpLabels}
          currentProduct={productInfo}
          handleFormSubmit={handleAddToBag}
          errorOnHandleSubmit={addToBagError}
        />
      </PickUpSkUSectionContainer>
    );
  }
}

ProductCustomizeFormPart.propTypes = {
  plpLabels: PropTypes.shape({}).isRequired,
  onCloseClick: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}),
  handleAddToBag: PropTypes.func.isRequired,
  formValues: PropTypes.shape({}).isRequired,
  quickViewLabels: PropTypes.shape({
    addToBag: PropTypes.string,
    viewProductDetails: PropTypes.string,
  }).isRequired,
  colorFitsSizesMap: COLOR_FITS_SIZES_MAP_PROP_TYPE.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  currency: PropTypes.string,
  addToBagError: PropTypes.string,
};

ProductCustomizeFormPart.defaultProps = {
  currency: 'USD',
  addToBagError: '',
  navigation: {},
};

export default ProductCustomizeFormPart;
export { ProductCustomizeFormPart as ProductCustomizeFormPartVanilla };
