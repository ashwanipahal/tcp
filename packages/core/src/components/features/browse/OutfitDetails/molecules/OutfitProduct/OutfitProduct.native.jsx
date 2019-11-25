/* eslint-disable max-lines */
import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { calculatePriceValue } from '@tcp/core/src/utils';
import ImageCarousel from '@tcp/core/src/components/common/molecules/ImageCarousel';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import CustomIcon from '../../../../../common/atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../../../common/atoms/Icon/Icon.constants';
import PromotionalMessage from '../../../../../common/atoms/PromotionalMessage';
import {
  getPrices,
  getImagesToDisplay,
  getMapSliceForColorProductId,
  getMapSliceForSizeSkuID,
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
  const { currentProduct, selectedColorProductId, keepAlive, outOfStockLabels } = props;
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
        keepAlive={keepAlive}
        outOfStockLabels={outOfStockLabels}
      />
    );
  }
  return null;
};

renderPickUpStore.propTypes = {
  currentProduct: PropTypes.string.isRequired,
  selectedColorProductId: PropTypes.string.isRequired,
  keepAlive: PropTypes.bool.isRequired,
  outOfStockLabels: PropTypes.shape({}).isRequired,
};

const navigateToPdp = (navigation, outfitProduct) =>
  navigation.navigate('ProductDetail', {
    title: outfitProduct.name,
    pdpUrl: outfitProduct.pdpUrl && outfitProduct.pdpUrl.replace('/p/', ''),
    reset: true,
  });

const renderImageContainer = ({
  navigation,
  outfitProduct,
  productIndexText,
  imageUrls,
  isBundleProduct,
  keepAlive,
  outOfStockLabels,
}) => {
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
      <ImageCarousel
        imageUrls={imageUrls}
        keepAlive={keepAlive}
        outOfStockLabels={outOfStockLabels}
        onImageClick={() => navigateToPdp(navigation, outfitProduct)}
      />
      <TouchableOpacity
        onPress={() => navigateToPdp(navigation, outfitProduct)}
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

renderImageContainer.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  outfitProduct: PropTypes.shape({}).isRequired,
  productIndexText: PropTypes.string.isRequired,
  imageUrls: PropTypes.shape([]).isRequired,
  isBundleProduct: PropTypes.bool.isRequired,
  keepAlive: PropTypes.bool.isRequired,
  outOfStockLabels: PropTypes.shape({}).isRequired,
};

const renderFavoriteSection = (
  isAddedToFav,
  setShowModal,
  isLoggedIn,
  favoriteCount,
  handleAddToFavorites
) => {
  return (
    <FavoriteView accessibilityRole="imagebutton" accessibilityLabel="favorite icon">
      {isAddedToFav ? (
        <CustomIcon
          iconFontName={ICON_FONT_CLASS.Icomoon}
          name={ICON_NAME.filledHeart}
          size="fs25"
          color="gray.600"
          isButton
        />
      ) : (
        <CustomIcon
          name={ICON_NAME.favorite}
          size="fs25"
          color="gray.600"
          isButton
          onPress={() => handleAddToFavorites()}
        />
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

const onChangeColor = (colorIndex, setCurrentColorIndex, colorindex, generalProductId) => {
  if (setCurrentColorIndex) {
    setCurrentColorIndex(colorIndex);
  }
  if (colorindex && generalProductId) {
    colorindex(colorIndex, generalProductId);
  }
};

const renderAddToBagContainer = (
  setCurrentColorIndex,
  setSelectedSizeName,
  handleAddToBag,
  outfitProduct,
  plpLabels,
  sizeChartLinkVisibility,
  addToBagError,
  isBundleProduct,
  toastMessage,
  isKeepAliveEnabled,
  outOfStockLabels,
  colorindex
  // eslint-disable-next-line max-params
) => {
  const { generalProductId } = outfitProduct;
  return (
    <ProductAddToBagContainer
      handleFormSubmit={handleAddToBag}
      currentProduct={outfitProduct}
      plpLabels={plpLabels}
      sizeChartLinkVisibility={sizeChartLinkVisibility}
      errorOnHandleSubmit={addToBagError}
      isOutfitPage
      simplifiedProductPickupView
      onChangeColor={(colorName, selectedSizeName, selectedFitName, selectedQuantity, colorIndex) =>
        // eslint-disable-next-line sonarjs/no-extra-arguments
        onChangeColor(colorIndex, setCurrentColorIndex, colorindex, generalProductId)
      }
      onChangeSize={(colorName, selectedSizeName, selectedFitName, selectedQuantity) =>
        setSelectedSizeName(selectedSizeName)
      }
      isBundleProduct={isBundleProduct}
      toastMessage={toastMessage}
      isKeepAliveEnabled={isKeepAliveEnabled}
      outOfStockLabels={outOfStockLabels}
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

const renderOutOfStockError = (keepAlive, outOfStockLabels) => {
  return keepAlive ? (
    <BodyCopy
      text={outOfStockLabels.itemSoldOutMessage}
      color="red.500"
      fontSize="fs10"
      fontFamily="secondary"
    />
  ) : null;
};

const checkKeepAlive = (isKeepAliveEnabled, keepAliveProduct) => {
  return isKeepAliveEnabled && keepAliveProduct;
};

// eslint-disable-next-line complexity
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
  addToBagError,
  toastMessage,
  isKeepAliveEnabled,
  outOfStockLabels,
  pageName,
  AddToFavoriteErrorMsg,
  removeAddToFavoritesErrorMsg,
  productMiscInfo,
  colorindex,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(
    productMiscInfo.isFavorite || productMiscInfo.miscInfo.isInDefaultWishlist || false
  );
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [selectedSizeName, setSelectedSizeName] = useState('');
  const [isFaviconClicked, setFaviconClicked] = useState(false);

  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevLoggedIn = usePrevious(isLoggedIn);
  const prevProductId = usePrevious(productMiscInfo);

  useEffect(() => {
    if (prevLoggedIn !== isLoggedIn && isFaviconClicked) {
      setShowModal(false);
      setFaviconClicked(false);
      addToFavorites({
        colorProductId: outfitProduct.productId,
        productSkuId: (skuId && skuId.skuId) || null,
        pdpColorProductId: colorProduct.colorProductId,
        page: pageName || 'OUTFIT',
      });
    }

    return () => {
      if (typeof removeAddToFavoritesErrorMsg === 'function') {
        removeAddToFavoritesErrorMsg('');
      }
    };
  }, []);

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

  let skuId = null;
  if (typeof selectedSizeName === 'string' && selectedSizeName) {
    skuId = getMapSliceForSizeSkuID(colorProduct, selectedSizeName);
  }
  if (
    (productMiscInfo.isFavorite || productMiscInfo.miscInfo.isInDefaultWishlist) &&
    !isAddedToFav
  ) {
    setIsAddedToFav(productMiscInfo.isFavorite || productMiscInfo.miscInfo.isInDefaultWishlist);
  }
  const { miscInfo } = colorProduct;

  const { listPrice, offerPrice } = prices;
  // The PLP badge2 (EXTENDED SIZE etc) are not showing on the PDP as per the production behavior
  const { badge1, badge2, keepAlive: keepAliveProduct } = miscInfo;

  const keepAlive = checkKeepAlive(isKeepAliveEnabled, keepAliveProduct);
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
      addToFavorites({
        colorProductId: outfitProduct.productId,
        productSkuId: (skuId && skuId.skuId) || null,
        pdpColorProductId: colorProduct.colorProductId,
        page: pageName || 'OUTFIT',
      });
    } else {
      setShowModal(true);
      setFaviconClicked(true);
    }
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
      {AddToFavoriteErrorMsg !== 'undefined' && AddToFavoriteErrorMsg !== '' && (
        <Notification status="error" message={`Error : ${AddToFavoriteErrorMsg}`} />
      )}
      <OutfitProductContainer>
        {renderImageContainer({
          navigation,
          outfitProduct,
          productIndexText,
          imageUrls,
          isBundleProduct,
          keepAlive,
          outOfStockLabels,
        })}
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
          {renderOutOfStockError(keepAlive, outOfStockLabels)}
          <TouchableOpacity
            onPress={_ => navigateToPdp(navigation, outfitProduct)}
            accessible
            accessibilityRole="button"
            accessibilityLabel={`${name}`}
          >
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs18"
              fontWeight="extrabold"
              color="gray.900"
              text={name}
              margin="0 0 4px 0"
            />
          </TouchableOpacity>
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
          handleAddToFavorites
        )}
      </OutfitProductContainer>
      {renderAddToBagContainer(
        setCurrentColorIndex,
        setSelectedSizeName,
        handleAddToBag,
        outfitProduct,
        plpLabels,
        sizeChartLinkVisibility,
        addToBagError,
        isBundleProduct,
        toastMessage,
        isKeepAliveEnabled,
        outOfStockLabels,
        colorindex
      )}
      {!isBundleProduct &&
        renderPickUpStore({
          currentProduct: outfitProduct,
          selectedColorProductId: colorProductId,
          keepAlive,
          outOfStockLabels,
        })}

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
  addToBagError: PropTypes.string,
  toastMessage: PropTypes.func,
  isKeepAliveEnabled: PropTypes.bool.isRequired,
  outOfStockLabels: PropTypes.shape({}),
  productMiscInfo: PropTypes.shape({}),
  colorindex: PropTypes.func,
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
  addToBagError: '',
  outOfStockLabels: {},
  toastMessage: () => {},
  productMiscInfo: {},
  colorindex: () => {},
};

// export default withStyles(OutfitDetailsView, OutfitProductStyle);
export default OutfitDetailsView;
