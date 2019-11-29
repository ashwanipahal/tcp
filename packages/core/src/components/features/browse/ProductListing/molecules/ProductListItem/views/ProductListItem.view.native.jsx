/* eslint-disable max-lines */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import PromotionalMessage from '@tcp/core/src/components/common/atoms/PromotionalMessage';
import logger from '@tcp/core/src/utils/loggerInstance';
import { getLabelValue } from '@tcp/core/src/utils';
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
  CloseIconContainer,
  SuggestedContainer,
  SeeSuggestedContainer,
} from '../styles/ProductListItem.style.native';
import CustomButton from '../../../../../../common/atoms/Button';
import ColorSwitch from '../../ColorSwitch';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_FONT_CLASS, ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';
import ImageCarousel from '../../ImageCarousel';
import { getProductListToPathInMobileApp } from '../../ProductList/utils/productsCommonUtils';
import { AVAILABILITY } from '../../../../Favorites/container/Favorites.constants';
import { getCartItemInfo } from '../../../../../CnC/AddedToBag/util/utility';

const TextProps = {
  text: PropTypes.string.isRequired,
};

let renderVariation = false;

const onCTAHandler = props => {
  const {
    item,
    selectedColorIndex,
    onGoToPDPPage,
    onQuickViewOpenClick,
    isFavoriteOOS,
    setLastDeletedItemId,
    handleAddToBag,
    addToBagEcom,
    isFavoriteEdit,
    isFavorite,
    isSuggestedItem,
    onReplaceWishlistItem,
  } = props;
  const { productInfo, colorsMap } = item;
  const { pdpUrl, bundleProduct } = productInfo;
  const { colorProductId } = (colorsMap && colorsMap[selectedColorIndex || 0]) || item.skuInfo;
  const modifiedPdpUrl = getProductListToPathInMobileApp(pdpUrl) || '';
  if (isSuggestedItem && onReplaceWishlistItem) {
    const { generalProductId } = productInfo;
    const { activeWishListId, suggestedOOSItemId } = props;
    const formData = {
      activeWishListId,
      itemId: suggestedOOSItemId,
      colorProductId: generalProductId,
    };
    onReplaceWishlistItem(formData);
  } else if (isFavoriteOOS) {
    const {
      itemInfo: { itemId },
    } = item;
    setLastDeletedItemId({ itemId });
  } else if (bundleProduct) {
    onGoToPDPPage(modifiedPdpUrl, colorProductId, productInfo);
  } else if (isFavorite) {
    handleFavoriteAddOrEdit(
      colorProductId,
      item,
      addToBagEcom,
      onQuickViewOpenClick,
      isFavoriteEdit
    );
  } else {
    onQuickViewOpenClick({
      colorProductId,
    });
  }
};

const handleFavoriteAddOrEdit = (
  colorProductId,
  item,
  addToBagEcom,
  onQuickViewOpenClick,
  isFavoriteEdit
) => {
  const {
    skuInfo: { skuId, size, fit, color },
  } = item;
  const { itemId, quantity } = item.itemInfo;
  const orderInfo = {
    orderItemId: itemId,
    selectedQty: quantity,
    selectedColor: color,
    selectedSize: size,
    selectedFit: fit,
    skuId: skuId,
  };
  if (skuId && size) {
    if (isFavoriteEdit) {
      onQuickViewOpenClick({
        colorProductId: colorProductId,
        orderInfo: orderInfo,
        isFavoriteEdit: true,
      });
    } else if (addToBagEcom) {
      let cartItemInfo = getCartItemInfo(item, {});
      cartItemInfo = { ...cartItemInfo };
      addToBagEcom(cartItemInfo);
    }
  } else if (isFavoriteEdit) {
    onQuickViewOpenClick({
      colorProductId: colorProductId,
      orderInfo: orderInfo,
      isFavoriteEdit: true,
    });
  } else {
    onQuickViewOpenClick({
      colorProductId,
    });
  }
};

const getOOSButtonLabel = (isFavorite, outOfStockLabels, labelsPlpTiles) => {
  return isFavorite ? labelsPlpTiles.lbl_remove : outOfStockLabels.outOfStockCaps;
};

const renderAddToBagContainer = (props, keepAlive) => {
  const {
    renderPriceOnly,
    bundleProduct,
    labelsPlpTiles,
    outOfStockLabels,
    isFavorite,
    isSuggestedItem,
  } = props;
  if (renderVariation && renderPriceOnly) return null;
  let buttonLabel = '';
  if (isSuggestedItem) {
    buttonLabel = getLabelValue(labelsPlpTiles, 'lbl_add_to_favorites');
  } else if (bundleProduct) {
    buttonLabel = getLabelValue(labelsPlpTiles, 'lbl_plpTiles_shop_collection');
  } else {
    buttonLabel = getLabelValue(labelsPlpTiles, 'lbl_add_to_bag');
  }
  const isFavoriteOOS = isFavorite && keepAlive;

  return (
    <AddToBagContainer>
      <CustomButton
        paddings="12px 4px 12px 4px"
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
        onPress={() => onCTAHandler(props)}
        accessibilityLabel={buttonLabel && buttonLabel.toLowerCase()}
        margin="0 6px 0 0"
      />
    </AddToBagContainer>
  );
};

renderAddToBagContainer.propTypes = {
  props: PropTypes.shape({}).isRequired,
};

const onEditHandler = props => {
  const ctaProps = {
    ...props,
    isFavoriteEdit: true,
    isFavorite: true,
  };
  onCTAHandler(ctaProps);
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

const getKeepAlive = (isFavorite, itemInfo, miscInfoData) => {
  return isFavorite ? itemInfo.keepAlive : miscInfoData.keepAlive || false;
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
    addToBagEcom,
    onSeeSuggestedItems,
    isSuggestedItem,
    outOfStockColorProductId,
    onDismissSuggestion,
  } = props;
  logger.info(viaModule);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { productInfo, colorsMap, itemInfo, miscInfo } = item;
  const { isInDefaultWishlist } = miscInfo;
  const { name } = productInfo;
  const miscInfoData = colorsMap ? colorsMap[selectedColorIndex].miscInfo : productInfo;
  const colorMapData = colorsMap || [item.skuInfo];
  const keepAlive = getKeepAlive(isFavorite, itemInfo, miscInfoData);
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
      <RenderCloseIcon
        isSuggestedItem={isSuggestedItem}
        outOfStockColorProductId={outOfStockColorProductId}
        onDismissSuggestion={onDismissSuggestion}
      />
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
          onPress={() => onEditHandler(props)}
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
        isSuggestedItem={isSuggestedItem}
        itemOutOfStock={itemOutOfStock}
      />
      <RenderTitle
        text={name}
        onGoToPDPPage={onGoToPDPPage}
        selectedColorIndex={selectedColorIndex}
        item={item}
        productInfo={productInfo}
        colorsMap={colorMapData}
      />
      <RenderSuggestedLabel isSuggestedItem={isSuggestedItem} labelsPlpTiles={labelsPlpTiles} />
      <RenderColorSwitch
        colorsMap={colorMapData}
        setSelectedColorIndex={setSelectedColorIndex}
        isSuggestedItem={isSuggestedItem}
      />
      {isFavorite && <RenderSizeFit item={item} />}
      {loyaltyPromotionMessage ? (
        <PromotionalMessage
          isPlcc={isPlcc}
          text={loyaltyPromotionMessage}
          height="24px"
          marginTop={12}
        />
      ) : null}
      {renderAddToBagContainer(props, itemOutOfStock)}
      <RenderDismissLink
        isSuggestedItem={isSuggestedItem}
        outOfStockColorProductId={outOfStockColorProductId}
        onDismissSuggestion={onDismissSuggestion}
        labelsPlpTiles={labelsPlpTiles}
      />
      {isFavorite && <RenderPurchasedQuantity item={item} />}
      {isFavorite && (
        <RenderMoveToListOrSeeSuggestedList
          item={item}
          labelsPlpTiles={labelsPlpTiles}
          renderMoveToList={renderMoveToList}
          onSeeSuggestedItems={onSeeSuggestedItems}
        />
      )}
    </ListContainer>
  );
};

const RenderCloseIcon = ({ isSuggestedItem, outOfStockColorProductId, onDismissSuggestion }) => {
  if (isSuggestedItem) {
    return (
      <CloseIconContainer>
        <CustomIcon
          iconFontName={ICON_FONT_CLASS.Icomoon}
          name={ICON_NAME.large}
          size="fs10"
          color="gray.900"
          accessibilityLabel="close"
          isButton
          onPress={() => onDismissSuggestion(outOfStockColorProductId)}
        />
      </CloseIconContainer>
    );
  }
  return null;
};

const RenderSuggestedLabel = ({ isSuggestedItem, labelsPlpTiles }) => {
  if (isSuggestedItem) {
    return (
      <SuggestedContainer>
        <BodyCopy
          dataLocator="plp_offer_price"
          mobileFontFamily="secondary"
          fontSize="fs10"
          fontWeight="extrabold"
          color="white"
          text={getLabelValue(labelsPlpTiles, 'lbl_suggested')}
        />
      </SuggestedContainer>
    );
  }
  return null;
};

const RenderDismissLink = ({
  isSuggestedItem,
  outOfStockColorProductId,
  onDismissSuggestion,
  labelsPlpTiles,
}) => {
  if (isSuggestedItem) {
    return (
      <Anchor
        margins="12px 0 0 0"
        fontSizeVariation="large"
        fontFamily="secondary"
        underline
        anchorVariation="custom"
        onPress={() => onDismissSuggestion(outOfStockColorProductId)}
        dataLocator=""
        text={getLabelValue(labelsPlpTiles, 'lbl_dismiss')}
        colorName="gray.900"
        justifyContent="flex-start"
      />
    );
  }
  return null;
};

const RenderColorSwitch = values => {
  const { setSelectedColorIndex, colorsMap, isSuggestedItem } = values;
  if (renderVariation || isSuggestedItem) return null;
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
    isSuggestedItem,
    itemOutOfStock,
  } = values;
  const { badge3 } = miscInfo;
  const { itemId } = itemInfo;
  const { generalProductId } = productInfo || '';
  const bundleProduct = get(productInfo, 'bundleProduct', false);
  return (
    <PricesSection>
      <OfferPriceAndFavoriteIconContainer>
        {renderOfferPrice(productInfo, currencySymbol, currencyExchange)}
        {!hideFavorite && !bundleProduct && !isSuggestedItem && !itemOutOfStock && (
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

const onSeeSuggestedHandler = (item, onSeeSuggestedItems) => {
  const {
    skuInfo: { colorProductId },
    itemInfo: { itemId },
  } = item;
  if (colorProductId && onSeeSuggestedItems) {
    onSeeSuggestedItems(colorProductId, itemId);
  }
};

const RenderMoveToListOrSeeSuggestedList = ({
  item,
  labelsPlpTiles,
  renderMoveToList,
  onSeeSuggestedItems,
}) => {
  const {
    itemInfo: { availability, itemId },
  } = item;
  if (availability && availability === 'SOLDOUT') {
    return (
      <SeeSuggestedContainer>
        <Anchor
          fontSizeVariation="large"
          fontFamily="secondary"
          underline
          anchorVariation="custom"
          onPress={() => onSeeSuggestedHandler(item, onSeeSuggestedItems)}
          dataLocator=""
          text={labelsPlpTiles.lbl_see_suggested_items}
          colorName="gray.900"
          justifyContent="flex-start"
        />
      </SeeSuggestedContainer>
    );
  }

  return <RowContainer>{renderMoveToList && renderMoveToList(itemId)}</RowContainer>;
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
  addToBagEcom: PropTypes.func,
  onSeeSuggestedItems: PropTypes.func,
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
  addToBagEcom: () => {},
  onSeeSuggestedItems: () => {},
};

export default withStyles(ListItem, styles);
export { ListItem as ListItemVanilla };
