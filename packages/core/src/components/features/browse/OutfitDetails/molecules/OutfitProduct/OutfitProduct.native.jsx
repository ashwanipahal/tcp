import React, { useState } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { calculatePriceValue } from '@tcp/core/src/utils';
import ImageCarousel from '@tcp/core/src/components/common/molecules/ImageCarousel';
import CustomIcon from '../../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../../common/atoms/Icon/Icon.constants';
import PromotionalMessage from '../../../../../common/atoms/PromotionalMessage';
import {
  getPrices,
  getImagesToDisplay,
  getMapSliceForColorProductId,
} from '../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ProductAddToBagContainer from '../../../../../common/molecules/ProductAddToBag';
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

import { ModalViewWrapper } from '../../../../account/LoginPage/molecules/LoginForm/LoginForm.style.native';
import ModalNative from '../../../../../common/molecules/Modal/index';
import LoginPageContainer from '../../../../account/LoginPage/index';
import { SIZE_CHART_LINK_POSITIONS } from '../../../../../common/molecules/ProductAddToBag/views/ProductAddToBag.view.native';

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

const renderImageContainer = (
  navigation,
  outfitProduct,
  productIndexText,
  imageUrls,
  isBundleProduct
) => {
  return (
    <ImageContainer>
      {!isBundleProduct && (
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs10"
          fontWeight="regular"
          color="gray.600"
          text={productIndexText}
        />
      )}
      <ImageCarousel imageUrls={imageUrls} />
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
          textAlign="center"
          fontSize="fs14"
          fontWeight="regular"
          fontFamily="secondary"
          textDecoration="underline"
          text="View Product Details"
        />
      </TouchableOpacity>
    </ImageContainer>
  );
};

const renderFavoriteSection = (
  isAddedToFav,
  setShowModal,
  isLoggedIn,
  favoriteCount,
  showModal,
  handleAddToFavorites
) => {
  return (
    <FavoriteView accessibilityRole="imagebutton" accessibilityLabel="favorite icon">
      {isAddedToFav ? (
        <CustomIcon name={ICON_NAME.favorite} size="fs25" color="gray.500" isButton />
      ) : (
        <CustomIcon
          name={ICON_NAME.favorite}
          size="fs25"
          color="gray.600"
          isButton
          onPress={() => handleAddToFavorites()}
        />
      )}
      {showModal && (
        <ModalNative
          isOpen={showModal}
          onRequestClose={() => setShowModal(!showModal)}
          heading="LOG IN"
          headingFontFamily="secondary"
          fontSize="fs16"
        >
          <SafeAreaView>
            <ModalViewWrapper>
              <LoginPageContainer
                onRequestClose={() => setShowModal(!showModal)}
                isUserLoggedIn={isLoggedIn}
                variation="favorites"
                showLogin={showModal}
              />
            </ModalViewWrapper>
          </SafeAreaView>
        </ModalNative>
      )}
      <BodyCopy
        mobileFontFamily="secondary"
        fontSize="fs10"
        fontWeight="regular"
        color="gray.600"
        text={favoriteCount}
        textAlign="center"
      />
    </FavoriteView>
  );
};

const onChangeColor = (colorIndex, setCurrentColorIndex) => {
  if (setCurrentColorIndex) {
    setCurrentColorIndex(colorIndex);
  }
};

const renderAddToBagContainer = (
  setCurrentColorIndex,
  handleAddToBag,
  outfitProduct,
  plpLabels,
  sizeChartLinkVisibility
) => {
  return (
    <ProductAddToBagContainer
      handleFormSubmit={handleAddToBag}
      currentProduct={outfitProduct}
      plpLabels={plpLabels}
      sizeChartLinkVisibility={sizeChartLinkVisibility}
      isOutfitPage
      simplifiedProductPickupView
      onChangeColor={(colorName, selectedSizeName, selectedFitName, selectedQuantity, colorIndex) =>
        onChangeColor(colorIndex, setCurrentColorIndex)
      }
    />
  );
};

const getColorProductId = (colorProductId, colorFitsSizesMap, currentColorIndex) => {
  return (
    (colorProductId === '' &&
      colorFitsSizesMap &&
      colorFitsSizesMap[currentColorIndex].colorProductId) ||
    colorProductId
  );
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
  navigation,
  isLoggedIn,
  addToFavorites,
  isBundleProduct,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const { colorFitsSizesMap, promotionalMessage, promotionalPLCCMessage, name } = outfitProduct;

  const colorProductIdValue = getColorProductId(
    colorProductId,
    colorFitsSizesMap,
    currentColorIndex
  );

  const colorProduct =
    outfitProduct && getMapSliceForColorProductId(colorFitsSizesMap, colorProductIdValue);
  const prices = outfitProduct && getPrices(outfitProduct, colorProduct.color.name);
  let imageUrls = [];
  if (colorFitsSizesMap) {
    imageUrls = getImagesToDisplay({
      imagesByColor: outfitProduct.imagesByColor,
      curentColorEntry: colorProduct,
      isAbTestActive: false,
      isFullSet: true,
    });
  }

  const { miscInfo } = colorProduct;

  const { listPrice, offerPrice } = prices;
  // The PLP badge2 (EXTENDED SIZE etc) are not showing on the PDP as per the production behavior
  const { badge1, badge2 } = miscInfo;
  // get default top badge data
  const badge1Value = badge1.matchBadge ? badge1.matchBadge : badge1.defaultBadge;

  // calculate default list price
  const listPriceForColor = calculatePriceValue(
    listPrice,
    currencySymbol,
    currencyExchange[0].exchangevalue,
    0
  );

  // calculate default offer price
  const offerPriceForColor = calculatePriceValue(
    offerPrice,
    currencySymbol,
    currencyExchange[0].exchangevalue,
    0
  );

  const handleAddToFavorites = () => {
    if (isLoggedIn) {
      addToFavorites({ colorProductId: outfitProduct.generalProductId });
    } else {
      setShowModal(true);
    }

    setIsAddedToFav(!!isLoggedIn);
  };

  const loyaltyPromotionMessage = getPromotionalMessage(isPlcc, {
    promotionalMessage,
    promotionalPLCCMessage,
  });

  const sizeChartLinkVisibility = !outfitProduct.isGiftCard
    ? SIZE_CHART_LINK_POSITIONS.AFTER_SIZE
    : null;

  return (
    <OutfitProductWrapper>
      <OutfitProductContainer>
        {renderImageContainer(
          navigation,
          outfitProduct,
          productIndexText,
          imageUrls,
          isBundleProduct
        )}
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
        {renderFavoriteSection(
          isAddedToFav,
          setShowModal,
          isLoggedIn,
          favoriteCount,
          showModal,
          handleAddToFavorites
        )}
      </OutfitProductContainer>
      {renderAddToBagContainer(
        setCurrentColorIndex,
        handleAddToBag,
        outfitProduct,
        plpLabels,
        sizeChartLinkVisibility
      )}
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  addToFavorites: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isBundleProduct: PropTypes.bool,
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
  isLoggedIn: false,
  addToFavorites: () => {},
  isBundleProduct: false,
};

// export default withStyles(OutfitDetailsView, OutfitProductStyle);
export default OutfitDetailsView;
