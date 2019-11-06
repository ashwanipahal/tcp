/* eslint-disable max-lines */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
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
  ListOfferPrice,
  Badge3Text,
  TitleContainer,
  TitleText,
  AddToBagContainer,
  OfferPriceAndFavoriteIconContainer,
  ImageSectionContainer,
  RowContainer,
} from '../styles/ProductListItem.style.native';
import CustomButton from '../../../../../../common/atoms/Button';
import ColorSwitch from '../../ColorSwitch';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_FONT_CLASS, ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';
import ImageCarousel from '../../ImageCarousel';
import { getProductListToPathInMobileApp } from '../../ProductList/utils/productsCommonUtils';

const TextProps = {
  text: PropTypes.string.isRequired,
};

let renderVariation = false;

const onCTAHandler = (item, selectedColorIndex, onGoToPDPPage, onQuickViewOpenClick) => {
  const { productInfo, colorsMap } = item;
  const { name, pdpUrl, isGiftCard, bundleProduct } = productInfo;
  const { colorProductId } = (colorsMap && colorsMap[selectedColorIndex]) || item.skuInfo;
  const modifiedPdpUrl = getProductListToPathInMobileApp(pdpUrl) || '';
  if (bundleProduct) {
    onGoToPDPPage(modifiedPdpUrl, colorProductId, name);
  } else if (!isGiftCard) {
    onQuickViewOpenClick({
      colorProductId,
    });
  }
};

const renderAddToBagContainer = (
  item,
  renderPriceOnly,
  selectedColorIndex,
  onQuickViewOpenClick,
  bundleProduct,
  labelsPlpTiles,
  onGoToPDPPage
) => {
  if (renderVariation && renderPriceOnly) return null;
  const buttonLabel = bundleProduct
    ? labelsPlpTiles.lbl_plpTiles_shop_collection
    : labelsPlpTiles.lbl_add_to_bag;
  return (
    <AddToBagContainer>
      <CustomButton
        paddings="12px 12px 12px 12px"
        fill="BLUE"
        type="button"
        buttonVariation="variable-width"
        data-locator=""
        text={buttonLabel}
        onPress={() => onCTAHandler(item, selectedColorIndex, onGoToPDPPage, onQuickViewOpenClick)}
        accessibilityLabel={buttonLabel && buttonLabel.toLowerCase()}
      />
    </AddToBagContainer>
  );
};

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
    labelsPlpTiles,
  } = props;
  logger.info(viaModule);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { productInfo, colorsMap, itemInfo } = item;
  const { name, bundleProduct } = productInfo;
  const miscInfo = colorsMap ? colorsMap[selectedColorIndex].miscInfo : productInfo;
  const colorMapData = colorsMap || [item.skuInfo];

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
      />
      <RenderBadge2 text={badge2} />
      {isFavorite && (
        <BodyCopy
          color="gray.900"
          fontFamily="secondary"
          fontSize="fs12"
          text="Edit"
          textAlign="center"
        />
      )}
      <RenderPricesSection
        hideFavorite={renderPriceAndBagOnly}
        onFavorite={onFavorite}
        miscInfo={miscInfo}
        currencyExchange={currencyExchange}
        currencySymbol={currencySymbol}
        setLastDeletedItemId={setLastDeletedItemId}
        isFavorite={isFavorite}
        itemInfo={isFavorite ? itemInfo : {}}
        accessibilityLabel="Price Section"
        productInfo={productInfo}
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
      {renderAddToBagContainer(
        item,
        renderPriceOnly,
        selectedColorIndex,
        onQuickViewOpenClick,
        bundleProduct,
        labelsPlpTiles,
        onGoToPDPPage
      )}
      {isFavorite && <RenderPurchasedQuantity item={item} />}
      {isFavorite && <RenderMoveToWishlist />}
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

const ImageSection = ({ item, selectedColorIndex, onGoToPDPPage, productImageWidth }) => {
  return (
    <ImageSectionContainer>
      <ImageCarousel
        item={item}
        selectedColorIndex={selectedColorIndex}
        onGoToPDPPage={onGoToPDPPage}
        productImageWidth={productImageWidth}
      />
    </ImageSectionContainer>
  );
};

ImageSection.propTypes = {
  item: PropTypes.shape({}).isRequired,
  selectedColorIndex: PropTypes.number.isRequired,
  onGoToPDPPage: PropTypes.func.isRequired,
  productImageWidth: PropTypes.number,
};

ImageSection.defaultProps = {
  productImageWidth: '',
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
 * @description - This method calculate offer price range for the collection products
 */
const calculateCollectionOfferPriceRange = (productInfo, currencySymbol, currencyExchange) => {
  const lowOfferPrice = (
    get(productInfo, 'priceRange.lowOfferPrice', 0) * currencyExchange[0].exchangevalue
  ).toFixed(2);

  const highOfferPrice = (
    get(productInfo, 'priceRange.highOfferPrice', 0) * currencyExchange[0].exchangevalue
  ).toFixed(2);
  const highOfferPriceFinalValue = highOfferPrice.toString() === '0' ? '' : ` - ${highOfferPrice}`;

  return `${currencySymbol}${lowOfferPrice}${highOfferPriceFinalValue}`;
};

/**
 * @description - This method calculate list price of the product
 */
const calculateListPrice = (productInfo, miscInfo, currencySymbol, currencyExchange) => {
  const bundleProduct = get(productInfo, 'bundleProduct', false);
  if (bundleProduct) {
    const lowListPrice = (
      get(productInfo, 'priceRange.lowListPrice', 0) * currencyExchange[0].exchangevalue
    ).toFixed(2);

    const highListPrice = (
      get(productInfo, 'priceRange.highListPrice', 0) * currencyExchange[0].exchangevalue
    ).toFixed(2);
    return (
      <RowContainer>
        <BodyCopy
          dataLocator="plp_filter_size_range"
          textDecoration="line-through"
          mobileFontFamily="secondary"
          fontSize="fs10"
          fontWeight="regular"
          color="gray.800"
          text={lowListPrice}
          accessibilityLabel="list low price"
        />
        {highListPrice !== 0 && (
          <BodyCopy
            mobileFontFamily="secondary"
            fontSize="fs10"
            fontWeight="regular"
            color="gray.800"
            text=" - "
          />
        )}
        {highListPrice !== 0 && (
          <BodyCopy
            dataLocator="plp_filter_size_range"
            textDecoration="line-through"
            mobileFontFamily="secondary"
            fontSize="fs10"
            fontWeight="regular"
            color="gray.800"
            text={highListPrice}
            accessibilityLabel="list high price"
          />
        )}
      </RowContainer>
    );
  }

  // calculate default list price
  const { listPrice } = miscInfo;
  const listPriceForColor = `${currencySymbol}${(
    listPrice * currencyExchange[0].exchangevalue
  ).toFixed(2)}`;
  return (
    <BodyCopy
      dataLocator="plp_filter_size_range"
      textDecoration="line-through"
      mobileFontFamily="secondary"
      fontSize="fs10"
      fontWeight="regular"
      color="gray.800"
      text={listPriceForColor}
      accessibilityLabel={`offer price ${listPriceForColor}`}
    />
  );
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
  const { badge3, listPrice, offerPrice } = miscInfo;
  const { itemId } = itemInfo;
  const bundleProduct = get(productInfo, 'bundleProduct', false);

  // calculate default offer price
  const offerPriceForColor = bundleProduct
    ? calculateCollectionOfferPriceRange(productInfo, currencySymbol, currencyExchange)
    : `${currencySymbol}${(offerPrice * currencyExchange[0].exchangevalue).toFixed(2)}`;

  // calculate default list price
  const listPriceForColor = `${currencySymbol}${(
    listPrice * currencyExchange[0].exchangevalue
  ).toFixed(2)}`;
  return (
    <PricesSection>
      <OfferPriceAndFavoriteIconContainer>
        <ListOfferPrice
          accessibilityRole="text"
          accessibilityLabel={`list price ${offerPriceForColor}`}
        >
          {offerPriceForColor}
        </ListOfferPrice>
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
                onPress={onFavorite}
              />
            )}
          </FavoriteIconContainer>
        )}
      </OfferPriceAndFavoriteIconContainer>
      <OfferPriceAndBadge3Container>
        {listPriceForColor !== offerPriceForColor &&
          calculateListPrice(productInfo, miscInfo, currencySymbol, currencyExchange)}
        <Badge3Text accessible={badge3 !== ''} accessibilityRole="text" accessibilityLabel={badge3}>
          {badge3}
        </Badge3Text>
      </OfferPriceAndBadge3Container>
    </PricesSection>
  );
};

const RenderTitle = ({ text, onGoToPDPPage, colorsMap, productInfo, selectedColorIndex, item }) => {
  const { pdpUrl } = productInfo;
  const modifiedPdpUrl = getProductListToPathInMobileApp(pdpUrl) || '';
  const { colorProductId } = (colorsMap && colorsMap[selectedColorIndex]) || item.skuInfo;

  if (renderVariation) return null;
  return (
    <TitleContainer onPress={() => onGoToPDPPage(modifiedPdpUrl, colorProductId, text)}>
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
  item: PropTypes.shape({}).isRequired,
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

RenderPurchasedQuantity.propTypes = {
  item: PropTypes.shape({}).isRequired,
};

const RenderMoveToWishlist = () => {
  return (
    <RowContainer margins="8px 0 0 0">
      <BodyCopy
        color="gray.900"
        fontFamily="secondary"
        fontSize="fs14"
        text="Move to another list "
        fontWeight="regular"
      />
      <CustomIcon name={ICON_NAME.chevronDown} size="fs14" color="gray.600" margins="0 0 0 12px" />
    </RowContainer>
  );
};

RenderPurchasedQuantity.propTypes = {
  item: PropTypes.shape({}).isRequired,
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
  item: PropTypes.shape({}),
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
  labelsPlpTiles: PropTypes.shape({}),
};

ListItem.defaultProps = {
  theme: {},
  item: {},
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
  labelsPlpTiles: {},
};

export default withStyles(ListItem, styles);
export { ListItem as ListItemVanilla };
