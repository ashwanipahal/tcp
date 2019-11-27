/* eslint-disable max-lines */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import PromotionalMessage from '@tcp/core/src/components/common/atoms/PromotionalMessage';
import logger from '@tcp/core/src/utils/loggerInstance';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  styles,
  ListContainer,
  FavoriteIconContainer,
  Badge1Container,
  Badge1Text,
  Badge2Container,
  Badge2Text,
  PricesSection,
  OfferPriceAndBadge3Container,
  TitleContainer,
  TitleText,
  AddToBagContainer,
  OfferPriceAndFavoriteIconContainer,
  ImageSectionContainer,
  RowContainer,
  OfferPriceAndBadge3View,
} from '../styles/ProductListItem.style.native';
import CustomButton from '../../../../../../common/atoms/Button';
import ColorSwitch from '../../ColorSwitch';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_FONT_CLASS, ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';
import ImageCarousel from '../../ImageCarousel';
import { getProductListToPathInMobileApp } from '../../ProductList/utils/productsCommonUtils';
import { AVAILABILITY } from '../../../../Favorites/container/Favorites.constants';

const TextProps = {
  text: PropTypes.string.isRequired,
};

let renderVariation = false;

const onCTAHandler = (
  item,
  selectedColorIndex,
  onGoToPDPPage,
  onQuickViewOpenClick,
  isFavoriteOOS,
  setLastDeletedItemId
) => {
  const { productInfo, colorsMap } = item;
  const { pdpUrl, isGiftCard, bundleProduct } = productInfo;
  const { colorProductId } = (colorsMap && colorsMap[selectedColorIndex]) || item.skuInfo;
  const modifiedPdpUrl = getProductListToPathInMobileApp(pdpUrl) || '';
  if (isFavoriteOOS) {
    const {
      itemInfo: { itemId },
    } = item;
    setLastDeletedItemId({ itemId });
  } else if (bundleProduct) {
    onGoToPDPPage(modifiedPdpUrl, colorProductId, productInfo);
  } else if (!isGiftCard) {
    onQuickViewOpenClick({
      colorProductId,
    });
  }
};

const getOOSButtonLabel = (isFavorite, outOfStockLabels, labelsPlpTiles) => {
  return isFavorite ? labelsPlpTiles.lbl_remove : outOfStockLabels.outOfStockCaps;
};

const renderAddToBagContainer = ({
  item,
  renderPriceOnly,
  selectedColorIndex,
  onQuickViewOpenClick,
  bundleProduct,
  labelsPlpTiles,
  onGoToPDPPage,
  keepAlive,
  outOfStockLabels,
  isFavorite,
  setLastDeletedItemId,
}) => {
  if (renderVariation && renderPriceOnly) return null;
  const buttonLabel = bundleProduct
    ? labelsPlpTiles.lbl_plpTiles_shop_collection
    : labelsPlpTiles.lbl_add_to_bag;
  const isFavoriteOOS = isFavorite && keepAlive;

  return (
    <AddToBagContainer>
      <CustomButton
        paddings="12px 8px 12px 8px"
        fill="BLUE"
        type="button"
        buttonVariation="variable-width"
        data-locator=""
        disableButton={keepAlive && !isFavorite}
        text={
          keepAlive
            ? getOOSButtonLabel(isFavoriteOOS, outOfStockLabels, labelsPlpTiles)
            : buttonLabel
        }
        onPress={() =>
          onCTAHandler(
            item,
            selectedColorIndex,
            onGoToPDPPage,
            onQuickViewOpenClick,
            isFavoriteOOS,
            setLastDeletedItemId
          )
        }
        accessibilityLabel={buttonLabel && buttonLabel.toLowerCase()}
        margin="0 6px 0 0"
      />
    </AddToBagContainer>
  );
};

renderAddToBagContainer.propTypes = {
  item: PropTypes.shape({}).isRequired,
  renderPriceOnly: PropTypes.bool.isRequired,
  selectedColorIndex: PropTypes.number.isRequired,
  onQuickViewOpenClick: PropTypes.func.isRequired,
  bundleProduct: PropTypes.bool.isRequired,
  labelsPlpTiles: PropTypes.shape({}).isRequired,
  onGoToPDPPage: PropTypes.bool.isRequired,
  keepAlive: PropTypes.bool.isRequired,
  outOfStockLabels: PropTypes.shape({}).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  setLastDeletedItemId: PropTypes.func.isRequired,
};

const onEditHandler = (item, selectedColorIndex, onGoToPDPPage, onQuickViewOpenClick) => {
  onCTAHandler(item, selectedColorIndex, onGoToPDPPage, onQuickViewOpenClick);
};

const isItemOutOfStock = (isKeepAliveEnabled, keepAlive, itemInfo) => {
  return (
    (isKeepAliveEnabled && keepAlive) ||
    (itemInfo && itemInfo.availability === AVAILABILITY.SOLDOUT)
  );
};

const checkEditEnabled = (isFavorite, itemOutOfStock) => {
  return isFavorite && !itemOutOfStock;
};

// eslint-disable-next-line complexity
const ListItem = props => {
  const {
    item,
    badge1,
    badge2,
    loyaltyPromotionMessage,
    onFavorite,
    currencyExchange,
    currencySymbol,
    isPlcc,
    onGoToPDPPage,
    onQuickViewOpenClick,
    isFavorite,
    setLastDeletedItemId,
    fullWidth,
    renderPriceAndBagOnly,
    renderPriceOnly,
    productImageWidth,
    margins,
    paddings,
    viaModule,
    isLoggedIn,
    labelsPlpTiles,
    isKeepAliveEnabled,
    outOfStockLabels,
    renderMoveToList,
  } = props;
  logger.info(viaModule);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { productInfo, colorsMap, itemInfo, miscInfo } = item;
  const { isInDefaultWishlist } = miscInfo;
  const { name, bundleProduct } = productInfo;
  const miscInfoData = colorsMap ? colorsMap[selectedColorIndex].miscInfo : productInfo;
  const colorMapData = colorsMap || [item.skuInfo];
  const { keepAlive } = miscInfoData;
  const itemOutOfStock = isItemOutOfStock(isKeepAliveEnabled, keepAlive, itemInfo);
  renderVariation = renderPriceAndBagOnly || renderPriceOnly;

  return (
    <ListContainer
      fullWidth={fullWidth}
      renderPriceAndBagOnly={renderVariation}
      margins={margins}
      paddings={paddings}
    >
      <RenderTopBadge1 text={badge1} />
      <ImageSection
        item={item}
        selectedColorIndex={selectedColorIndex}
        onGoToPDPPage={onGoToPDPPage}
        productImageWidth={productImageWidth}
        isFavorite={isFavorite}
        keepAlive={itemOutOfStock}
        outOfStockLabels={outOfStockLabels}
      />
      <RenderBadge2 text={badge2} />
      {checkEditEnabled(isFavorite, itemOutOfStock) && (
        <Anchor
          fontSizeVariation="medium"
          fontFamily="secondary"
          underline
          anchorVariation="custom"
          onPress={() =>
            onEditHandler(item, selectedColorIndex, onGoToPDPPage, onQuickViewOpenClick)
          }
          dataLocator=""
          text={labelsPlpTiles.lbl_edit}
          colorName="gray.900"
        />
      )}
      <RenderPricesSection
        hideFavorite={renderPriceAndBagOnly}
        onFavorite={onFavorite}
        miscInfo={miscInfoData}
        currencyExchange={currencyExchange}
        currencySymbol={currencySymbol}
        setLastDeletedItemId={setLastDeletedItemId}
        isFavorite={isInDefaultWishlist || isFavorite}
        itemInfo={isFavorite ? itemInfo : {}}
        productInfo={productInfo}
        item={item}
        isLoggedIn={isLoggedIn}
        accessibilityLabel="Price Section"
      />
      <RenderTitle
        text={name}
        onGoToPDPPage={onGoToPDPPage}
        selectedColorIndex={selectedColorIndex}
        item={item}
        productInfo={productInfo}
        colorsMap={colorMapData}
      />
      <RenderColorSwitch colorsMap={colorMapData} setSelectedColorIndex={setSelectedColorIndex} />
      {isFavorite && <RenderSizeFit item={item} />}
      {loyaltyPromotionMessage ? (
        <PromotionalMessage
          isPlcc={isPlcc}
          text={loyaltyPromotionMessage}
          height="24px"
          marginTop={12}
        />
      ) : null}
      {renderAddToBagContainer({
        item,
        renderPriceOnly,
        selectedColorIndex,
        onQuickViewOpenClick,
        bundleProduct,
        labelsPlpTiles,
        onGoToPDPPage,
        keepAlive: itemOutOfStock,
        outOfStockLabels,
        isFavorite,
        setLastDeletedItemId,
      })}
      {isFavorite && <RenderPurchasedQuantity item={item} />}
      {isFavorite && (
        <RenderMoveToListOrSeeSuggestedList
          item={item}
          labelsPlpTiles={labelsPlpTiles}
          renderMoveToList={renderMoveToList}
        />
      )}
    </ListContainer>
  );
};

const RenderColorSwitch = values => {
  const { setSelectedColorIndex, colorsMap } = values;
  if (renderVariation) return null;
  return <ColorSwitch colorsMap={colorsMap} setSelectedColorIndex={setSelectedColorIndex} />;
};
const RenderTopBadge1 = ({ text }) => {
  if (renderVariation) return null;
  return (
    <Badge1Container>
      <Badge1Text accessible={text !== ''} accessibilityRole="text" accessibilityLabel={text}>
        {text}
      </Badge1Text>
    </Badge1Container>
  );
};

RenderTopBadge1.propTypes = TextProps;

const ImageSection = ({
  item,
  selectedColorIndex,
  onGoToPDPPage,
  productImageWidth,
  isFavorite,
  keepAlive,
  outOfStockLabels,
}) => {
  return (
    <ImageSectionContainer>
      <ImageCarousel
        item={item}
        selectedColorIndex={selectedColorIndex}
        onGoToPDPPage={onGoToPDPPage}
        productImageWidth={productImageWidth}
        isFavorite={isFavorite}
        keepAlive={keepAlive}
        outOfStockLabels={outOfStockLabels}
      />
    </ImageSectionContainer>
  );
};

ImageSection.propTypes = {
  item: PropTypes.shape({}).isRequired,
  selectedColorIndex: PropTypes.number.isRequired,
  onGoToPDPPage: PropTypes.func.isRequired,
  productImageWidth: PropTypes.number,
  isFavorite: PropTypes.bool,
  keepAlive: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({
    outOfStockCaps: PropTypes.string,
  }),
};

ImageSection.defaultProps = {
  productImageWidth: '',
  isFavorite: false,
  keepAlive: false,
  outOfStockLabels: {
    outOfStockCaps: '',
  },
};

const RenderBadge2 = ({ text }) => {
  if (renderVariation) return null;
  return (
    <Badge2Container>
      <Badge2Text accessible={text !== ''} accessibilityRole="text" accessibilityLabel={text}>
        {text && text.toUpperCase()}
      </Badge2Text>
    </Badge2Container>
  );
};

RenderBadge2.propTypes = TextProps;

/**
 * @description - This method calculate Price based on the given value
 */
const calculatePriceValue = (price, currencySymbol, currencyExchange, defaultReturn = 0) => {
  let priceValue = defaultReturn;
  if (price && price > 0) {
    priceValue = `${currencySymbol}${(price * currencyExchange[0].exchangevalue).toFixed(2)}`;
  }
  return priceValue;
};

const renderOfferPrice = (productInfo, currencySymbol, currencyExchange) => {
  const lowOfferPrice = get(productInfo, 'priceRange.lowOfferPrice', productInfo.offerPrice || 0);
  const highOfferPrice = get(productInfo, 'priceRange.highOfferPrice', 0);
  const offerPriceValue = calculatePriceValue(
    lowOfferPrice,
    currencySymbol,
    currencyExchange,
    null
  );
  const highOfferPriceValue = calculatePriceValue(
    highOfferPrice,
    currencySymbol,
    currencyExchange,
    null
  );
  return (
    <BodyCopy
      margin="4px 0 0 0"
      dataLocator="plp_offer_price"
      mobileFontFamily="secondary"
      fontSize="fs15"
      fontWeight="semibold"
      color="red.500"
      text={highOfferPriceValue ? `${offerPriceValue} - ${highOfferPriceValue}` : offerPriceValue}
    />
  );
};

const renderListPriceLabels = value => {
  if (value) {
    return (
      <BodyCopy
        dataLocator="plp_filter_size_range"
        textDecoration="line-through"
        mobileFontFamily="secondary"
        fontSize="fs10"
        fontWeight="regular"
        color="gray.800"
        text={value}
        accessibilityLabel="list low price"
      />
    );
  }
  return null;
};

const renderListPriceDash = value => {
  if (value) {
    return (
      <BodyCopy
        dataLocator="plp_filter_size_range"
        mobileFontFamily="secondary"
        fontSize="fs10"
        fontWeight="regular"
        color="gray.800"
        text=" - "
        accessibilityLabel="to"
      />
    );
  }
  return null;
};

const renderPricePercentageDiscountLabel = value => {
  if (value) {
    return (
      <BodyCopy
        margin="0 0 0 8px"
        dataLocator="plp_filter_size_range"
        mobileFontFamily="secondary"
        fontSize="fs10"
        fontWeight="regular"
        color="red.500"
        text={value}
        accessibilityLabel={`discount ${value}`}
      />
    );
  }
  return null;
};

const renderListPrice = (productInfo, currencySymbol, currencyExchange, badge3) => {
  const lowListPrice = get(productInfo, 'priceRange.lowListPrice', productInfo.listPrice || 0);
  const highListPrice = get(productInfo, 'priceRange.highListPrice', 0);
  const lowOfferPrice = get(productInfo, 'priceRange.lowOfferPrice', productInfo.offerPrice || 0);
  const listPriceValue = calculatePriceValue(lowListPrice, currencySymbol, currencyExchange, null);
  const highListPriceValue = calculatePriceValue(
    highListPrice,
    currencySymbol,
    currencyExchange,
    null
  );
  if (lowListPrice > lowOfferPrice || highListPrice > lowListPrice) {
    return (
      <OfferPriceAndBadge3Container>
        {renderListPriceLabels(listPriceValue)}
        {renderListPriceDash(highListPriceValue)}
        {renderListPriceLabels(highListPriceValue)}
        {renderPricePercentageDiscountLabel(badge3)}
      </OfferPriceAndBadge3Container>
    );
  }
  return <OfferPriceAndBadge3View />;
};

const RenderPricesSection = values => {
  const {
    miscInfo,
    currencyExchange,
    currencySymbol,
    onFavorite,
    isFavorite,
    setLastDeletedItemId,
    itemInfo,
    hideFavorite,
    productInfo,
  } = values;
  const { badge3 } = miscInfo;
  const { itemId } = itemInfo;
  const { generalProductId } = productInfo || '';
  const bundleProduct = get(productInfo, 'bundleProduct', false);
  return (
    <PricesSection>
      <OfferPriceAndFavoriteIconContainer>
        {renderOfferPrice(productInfo, currencySymbol, currencyExchange)}
        {!hideFavorite && !bundleProduct && (
          <FavoriteIconContainer accessibilityRole="imagebutton" accessibilityLabel="favorite icon">
            {isFavorite ? (
              <CustomIcon
                isButton
                iconFontName={ICON_FONT_CLASS.Icomoon}
                name={ICON_NAME.filledHeart}
                size="fs21"
                color="gray.500"
                onPress={() => setLastDeletedItemId({ itemId })}
              />
            ) : (
              <CustomIcon
                isButton
                name={ICON_NAME.favorite}
                size="fs21"
                color="gray.600"
                onPress={() => {
                  onFavorite(generalProductId, itemId);
                }}
              />
            )}
          </FavoriteIconContainer>
        )}
      </OfferPriceAndFavoriteIconContainer>
      {renderListPrice(productInfo, currencySymbol, currencyExchange, badge3)}
    </PricesSection>
  );
};

const RenderTitle = ({ text, onGoToPDPPage, colorsMap, productInfo, selectedColorIndex, item }) => {
  const { pdpUrl } = productInfo;
  const modifiedPdpUrl = getProductListToPathInMobileApp(pdpUrl) || '';
  const { colorProductId } = (colorsMap && colorsMap[selectedColorIndex]) || item.skuInfo;

  if (renderVariation) return null;
  return (
    <TitleContainer onPress={() => onGoToPDPPage(modifiedPdpUrl, colorProductId, productInfo)}>
      <TitleText accessibilityRole="text" accessibilityLabel={text} numberOfLines={2}>
        {text}
      </TitleText>
    </TitleContainer>
  );
};

const RenderSizeFit = ({ item }) => {
  const { skuInfo } = item;
  const { fit, size } = skuInfo;
  if (fit || size) {
    return (
      <RowContainer margins="4px 0 12px 0">
        {size && (
          <BodyCopy
            color="gray.900"
            fontFamily="secondary"
            fontSize="fs12"
            text={size}
            textAlign="center"
          />
        )}
        {size && fit && (
          <BodyCopy
            color="gray.900"
            fontFamily="secondary"
            fontSize="fs12"
            text=" | "
            textAlign="center"
          />
        )}
        {fit && (
          <BodyCopy
            color="gray.900"
            fontFamily="secondary"
            fontSize="fs12"
            text={fit}
            textAlign="center"
          />
        )}
      </RowContainer>
    );
  }
  return <RowContainer margins="4px 0 12px 0" />;
};

RenderSizeFit.propTypes = {
  item: PropTypes.shape({
    skuInfo: PropTypes.shape({
      fit: PropTypes.string,
      size: PropTypes.string,
    }),
  }).isRequired,
};

const RenderPurchasedQuantity = ({ item }) => {
  const { quantityPurchased, itemInfo } = item;
  const { quantity } = itemInfo;
  return (
    <RowContainer margins="16px 0 0 0">
      <BodyCopy
        color="gray.900"
        fontFamily="secondary"
        fontSize="fs14"
        text={`${quantityPurchased}/${quantity} Purchased`}
        textAlign="center"
        fontWeight="regular"
      />
    </RowContainer>
  );
};

const onSeeSuggestedHandler = () => {};
const RenderMoveToListOrSeeSuggestedList = ({ item, labelsPlpTiles, renderMoveToList }) => {
  const {
    itemInfo: { availability, itemId },
  } = item;
  if (availability && availability === 'SOLDOUT') {
    return (
      <Anchor
        fontSizeVariation="large"
        fontFamily="secondary"
        underline
        anchorVariation="custom"
        onPress={onSeeSuggestedHandler}
        dataLocator=""
        text={labelsPlpTiles.lbl_see_suggested_items}
        colorName="gray.900"
        justifyContent="flex-start"
      />
    );
  }

  return (
    <RowContainer margins="8px 0 0 0">{renderMoveToList && renderMoveToList(itemId)}</RowContainer>
  );
};

RenderMoveToListOrSeeSuggestedList.propTypes = {
  labelsPlpTiles: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({
    quantityPurchased: PropTypes.string,
    itemInfo: PropTypes.shape({
      availability: PropTypes.string,
    }),
  }),
  renderMoveToList: PropTypes.func.isRequired,
};

RenderMoveToListOrSeeSuggestedList.defaultProps = {
  item: {
    itemInfo: {
      availability: 'OK',
    },
  },
};

RenderPurchasedQuantity.propTypes = {
  item: PropTypes.shape({
    quantityPurchased: PropTypes.string,
    itemInfo: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  }).isRequired,
};

RenderTitle.propTypes = {
  text: PropTypes.string.isRequired,
  onGoToPDPPage: PropTypes.func.isRequired,
  colorsMap: PropTypes.shape({
    miscInfo: PropTypes.string,
  }),
  productInfo: PropTypes.shape({
    name: PropTypes.string,
    pdpUrl: PropTypes.string,
  }),
  selectedColorIndex: PropTypes.number,
  item: PropTypes.shape({
    skuInfo: PropTypes.string,
  }),
};

RenderTitle.defaultProps = {
  colorsMap: {
    miscInfo: '',
  },
  productInfo: {
    name: '',
    pdpUrl: '',
  },
  selectedColorIndex: 0,
  item: {
    skuInfo: '',
  },
};

ListItem.propTypes = {
  theme: PropTypes.shape({}),
  item: PropTypes.shape({
    productInfo: PropTypes.shape({
      name: PropTypes.string,
      bundleProduct: PropTypes.shape({}),
    }),
    colorsMap: PropTypes.shape({}),
    itemInfo: PropTypes.shape({}),
    skuInfo: PropTypes.string,
  }),
  badge1: PropTypes.string,
  badge2: PropTypes.string,
  loyaltyPromotionMessage: PropTypes.string,
  onFavorite: PropTypes.func,
  isPlcc: PropTypes.bool,
  currencyExchange: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  onGoToPDPPage: PropTypes.func.isRequired,
  onQuickViewOpenClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  setLastDeletedItemId: PropTypes.func,
  fullWidth: PropTypes.bool,
  renderPriceAndBagOnly: PropTypes.bool,
  renderPriceOnly: PropTypes.bool,
  productImageWidth: PropTypes.number,
  margins: PropTypes.string,
  paddings: PropTypes.string,
  viaModule: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  labelsPlpTiles: PropTypes.shape({}),
  isKeepAliveEnabled: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({}),
  renderMoveToList: PropTypes.func,
};

ListItem.defaultProps = {
  theme: {},
  item: {
    productInfo: {
      name: '',
      bundleProduct: {},
    },
    colorsMap: {},
    itemInfo: {},
    skuInfo: '',
  },
  badge1: '',
  badge2: '',
  loyaltyPromotionMessage: '',
  onFavorite: () => {},
  isPlcc: false,
  isFavorite: false,
  setLastDeletedItemId: () => {},
  fullWidth: false,
  renderPriceAndBagOnly: false,
  renderPriceOnly: false,
  productImageWidth: '',
  margins: null,
  paddings: '12px 0 12px 0',
  viaModule: '',
  isLoggedIn: false,
  labelsPlpTiles: {},
  isKeepAliveEnabled: false,
  outOfStockLabels: {},
  renderMoveToList: () => {},
};

export default withStyles(ListItem, styles);
export { ListItem as ListItemVanilla };
