import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import CustomIcon from '../../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../../common/atoms/Icon/Icon.constants';
import PromotionalMessage from '../../../../../common/atoms/PromotionalMessage';
import {
  getPrices,
  getMapSliceForColorProductId,
} from '../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ProductAddToBagContainer from '../../../../../common/molecules/ProductAddToBag';
import CustomImage from '../../../../../common/atoms/CustomImage';
import { BodyCopy } from '../../../../../common/atoms';
import { getPromotionalMessage } from '../../../ProductListing/molecules/ProductList/utils/utility';
import {
  OutfitProductContainer,
  ImageContainer,
  DetailsContainer,
  DiscountedPriceContainer,
  FavoriteView,
  OutfitProductWrapper,
} from '../styles/OutfitProduct.native.style';
import ProductPickupContainer from '../../../../../common/organisms/ProductPickup';

const renderPickUpStore = props => {
  const { currentProduct, selectedColorProductId } = props;
  if (currentProduct) {
    const colorFitsSizesMap = get(currentProduct, 'colorFitsSizesMap', null);
    const curentColorEntry = getMapSliceForColorProductId(
      colorFitsSizesMap,
      selectedColorProductId
    );
    const { miscInfo } = curentColorEntry;
    return (
      <ProductPickupContainer
        productInfo={currentProduct}
        formName={`ProductAddToBag-${currentProduct.generalProductId}`}
        miscInfo={miscInfo}
        simplifiedProductPickupView
      />
    );
  }
  return null;
};

renderPickUpStore.propTypes = {
  currentProduct: PropTypes.string.isRequired,
  selectedColorProductId: PropTypes.string.isRequired,
};

const OutfitDetailsView = ({
  outfitProduct,
  colorProductId,
  productIndexText,
  plpLabels,
  isPlcc,
  currencySymbol,
  currencyExchange,
  favoriteCount,
  handleAddToBag,
  handleAddToFavorites,
  navigation,
}) => {
  const {
    imagesByColor,
    colorFitsSizesMap,
    promotionalMessage,
    promotionalPLCCMessage,
    name,
  } = outfitProduct;
  const colorProduct =
    outfitProduct && getMapSliceForColorProductId(colorFitsSizesMap, colorProductId);
  const prices = outfitProduct && getPrices(outfitProduct, colorProduct.color.name);

  const { miscInfo } = colorProduct;

  const { listPrice, offerPrice } = prices;
  // The PLP badge2 (EXTENDED SIZE etc) are not showing on the PDP as per the production behavior
  const { badge1, badge2 } = miscInfo;
  // get default top badge data
  const badge1Value = badge1.matchBadge ? badge1.matchBadge : badge1.defaultBadge;

  // const badge1Value = 'New Arrival';
  // const badge2 = '30% off';

  // calculate default list price
  const listPriceForColor = `${currencySymbol}${(
    listPrice * currencyExchange[0].exchangevalue
  ).toFixed(2)}`;
  // calculate default offer price
  const offerPriceForColor = `${currencySymbol}${(
    offerPrice * currencyExchange[0].exchangevalue
  ).toFixed(2)}`;

  // TODO - this is temporary - just for the display - once the form values are fetched, it would be updated
  const color = Object.keys(imagesByColor)[0];

  const loyaltyPromotionMessage = getPromotionalMessage(isPlcc, {
    promotionalMessage,
    promotionalPLCCMessage,
  });
  return (
    <OutfitProductWrapper>
      <OutfitProductContainer>
        <ImageContainer>
          <BodyCopy
            mobileFontFamily="secondary"
            fontSize="fs10"
            fontWeight="regular"
            color="gray.600"
            text={productIndexText}
          />
          <CustomImage url={imagesByColor[color].basicImageUrl} width="100%" height="200" />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetail', {
                title: outfitProduct.name,
                pdpUrl: outfitProduct.pdpUrl && outfitProduct.pdpUrl.replace('/p/', ''),
                reset: true,
              })
            }
            accessible
            accessibilityRole="button"
            accessibilityLabel={`${outfitProduct.name}`}
          >
            <BodyCopy
              fontSize="fs14"
              fontWeight="regular"
              fontFamily="secondary"
              textDecoration="underline"
              text="View Product Details"
            />
          </TouchableOpacity>
        </ImageContainer>
        <DetailsContainer>
          {badge1Value !== '' && (
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs10"
              fontWeight="regular"
              color="gray.900"
              text={badge1Value}
              margin="0 0 4px 0"
            />
          )}
          <BodyCopy
            mobileFontFamily="secondary"
            fontSize="fs18"
            fontWeight="extrabold"
            color="gray.900"
            text={name}
            margin="0 0 4px 0"
          />
          <FavoriteView accessibilityRole="imagebutton" accessibilityLabel="favorite icon">
            <CustomIcon
              name={ICON_NAME.favorite}
              size="fs25"
              color="gray.600"
              isButton
              onPress={handleAddToFavorites}
            />
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs10"
              fontWeight="regular"
              color="gray.600"
              text={favoriteCount}
              textAlign="center"
              margin="0 0 16px 0"
            />
          </FavoriteView>
          <BodyCopy
            margin="4px 0 0 0"
            mobileFontFamily="secondary"
            fontSize="fs22"
            fontWeight="black"
            color="red.500"
            text={offerPriceForColor}
          />
          <DiscountedPriceContainer>
            {listPriceForColor !== offerPriceForColor && (
              <BodyCopy
                dataLocator="pdp_discounted_product_price"
                textDecoration="line-through"
                mobileFontFamily="secondary"
                fontSize="fs14"
                fontWeight="regular"
                color="gray.800"
                text={listPriceForColor}
              />
            )}
            <BodyCopy
              dataLocator="pdp_discounted_percentage"
              margin="0 0 0 10px"
              mobileFontFamily="secondary"
              fontSize="fs14"
              fontWeight="regular"
              color="red.500"
              text={badge2}
            />
          </DiscountedPriceContainer>
          {loyaltyPromotionMessage && (
            <PromotionalMessage
              fontSize="fs12"
              text={loyaltyPromotionMessage}
              isPlcc={isPlcc}
              marginTop={8}
              dataLocator="pdp_loyalty_text"
            />
          )}
        </DetailsContainer>
      </OutfitProductContainer>
      <ProductAddToBagContainer
        handleFormSubmit={handleAddToBag}
        currentProduct={outfitProduct}
        plpLabels={plpLabels}
        isOutfitPage
        simplifiedProductPickupView
      />
      {renderPickUpStore({
        currentProduct: outfitProduct,
        selectedColorProductId: colorProductId,
      })}
    </OutfitProductWrapper>
  );
};

OutfitDetailsView.propTypes = {
  outfitProduct: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  colorProductId: PropTypes.string,
  productIndexText: PropTypes.string,
  plpLabels: PropTypes.shape({}),
  isPlcc: PropTypes.bool,
  currencySymbol: PropTypes.string,
  currencyExchange: PropTypes.string,
  favoriteCount: PropTypes.string,
  handleAddToBag: PropTypes.func.isRequired,
  handleAddToFavorites: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

OutfitDetailsView.defaultProps = {
  outfitProduct: {},
  colorProductId: '',
  productIndexText: '',
  plpLabels: {},
  isPlcc: false,
  currencySymbol: '$',
  currencyExchange: [{ exchangevalue: 1 }],
  favoriteCount: 0,
  navigation: {},
};

// export default withStyles(OutfitDetailsView, OutfitProductStyle);
export default OutfitDetailsView;
