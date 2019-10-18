import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PromotionalMessage from '@tcp/core/src/components/common/atoms/PromotionalMessage';
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
  ListPrice,
  ListOfferPrice,
  Badge3Text,
  TitleContainer,
  TitleText,
  AddToBagContainer,
  OfferPriceAndFavoriteIconContainer,
  ImageSectionContainer,
} from '../styles/ProductListItem.style.native';
import CustomButton from '../../../../../../common/atoms/Button';
import ColorSwitch from '../../ColorSwitch';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';
import ImageCarousel from '../../ImageCarousel';

const TextProps = {
  text: PropTypes.string.isRequired,
};

const handleQuickViewOpenClick = (selectedColorIndex, colorsMap, onQuickViewOpenClick) => {
  const { colorProductId } = colorsMap[selectedColorIndex];
  onQuickViewOpenClick({
    colorProductId,
  });
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
    fullWidth,
    renderPriceAndBagOnly,
    renderPriceOnly,
  } = props;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { productInfo, colorsMap } = item;
  const { name } = productInfo;
  const { miscInfo } = colorsMap[selectedColorIndex];

  const renderVariation = renderPriceAndBagOnly || renderPriceOnly;

  if (renderVariation) {
    return (
      <ListContainer fullWidth={fullWidth} renderPriceAndBagOnly={renderVariation} accessible>
        <ImageSection
          item={item}
          selectedColorIndex={selectedColorIndex}
          onGoToPDPPage={onGoToPDPPage}
        />
        <RenderPricesSection
          hideFavorite={renderVariation}
          onFavorite={onFavorite}
          miscInfo={miscInfo}
          currencyExchange={currencyExchange}
          currencySymbol={currencySymbol}
          accessibilityLabel="Price Section"
        />
        {!renderPriceOnly && (
          <AddToBagContainer>
            <CustomButton
              fill="BLUE"
              type="button"
              buttonVariation="variable-width"
              data-locator=""
              text="ADD TO BAG"
              onPress={() => {
                handleQuickViewOpenClick(selectedColorIndex, colorsMap, onQuickViewOpenClick);
              }}
              accessibilityLabel="add to bag"
            />
          </AddToBagContainer>
        )}
      </ListContainer>
    );
  }

  return (
    <ListContainer accessible fullWidth={fullWidth}>
      <RenderTopBadge1 text={badge1} />
      <ImageSection
        item={item}
        selectedColorIndex={selectedColorIndex}
        onGoToPDPPage={onGoToPDPPage}
      />
      <RenderBadge2 text={badge2} />
      <RenderPricesSection
        hideFavorite={renderPriceAndBagOnly}
        onFavorite={onFavorite}
        miscInfo={miscInfo}
        currencyExchange={currencyExchange}
        currencySymbol={currencySymbol}
      />
      <RenderTitle text={name} />
      <ColorSwitch colorsMap={colorsMap} setSelectedColorIndex={setSelectedColorIndex} />
      {loyaltyPromotionMessage ? (
        <PromotionalMessage
          isPlcc={isPlcc}
          text={loyaltyPromotionMessage}
          height="24px"
          marginTop={12}
        />
      ) : null}
      <AddToBagContainer>
        <CustomButton
          fill="BLUE"
          type="button"
          buttonVariation="variable-width"
          data-locator=""
          text="ADD TO BAG"
          onPress={() => {
            handleQuickViewOpenClick(selectedColorIndex, colorsMap, onQuickViewOpenClick);
          }}
          accessibilityLabel="add to bag"
        />
      </AddToBagContainer>
    </ListContainer>
  );
};

const RenderTopBadge1 = ({ text }) => {
  return (
    <Badge1Container>
      <Badge1Text accessible={text !== ''} accessibilityRole="text" accessibilityLabel={text}>
        {text}
      </Badge1Text>
    </Badge1Container>
  );
};

RenderTopBadge1.propTypes = TextProps;

const ImageSection = ({ item, selectedColorIndex, onGoToPDPPage }) => {
  return (
    <ImageSectionContainer>
      <ImageCarousel
        item={item}
        selectedColorIndex={selectedColorIndex}
        onGoToPDPPage={onGoToPDPPage}
      />
    </ImageSectionContainer>
  );
};

ImageSection.propTypes = {
  item: PropTypes.shape({}).isRequired,
  selectedColorIndex: PropTypes.number.isRequired,
  onGoToPDPPage: PropTypes.func.isRequired,
};

const RenderBadge2 = ({ text }) => {
  return (
    <Badge2Container>
      <Badge2Text accessible={text !== ''} accessibilityRole="text" accessibilityLabel={text}>
        {text}
      </Badge2Text>
    </Badge2Container>
  );
};

RenderBadge2.propTypes = TextProps;

const RenderPricesSection = values => {
  const { miscInfo, currencyExchange, currencySymbol, onFavorite, hideFavorite } = values;
  const { badge3, listPrice, offerPrice } = miscInfo;
  // calculate default list price
  const listPriceForColor = `${currencySymbol}${(
    listPrice * currencyExchange[0].exchangevalue
  ).toFixed(2)}`;
  // calculate default offer price
  const offerPriceForColor = `${currencySymbol}${(
    offerPrice * currencyExchange[0].exchangevalue
  ).toFixed(2)}`;
  return (
    <PricesSection>
      <OfferPriceAndFavoriteIconContainer>
        <ListPrice accessibilityRole="text" accessibilityLabel={`list price ${offerPriceForColor}`}>
          {offerPriceForColor}
        </ListPrice>
        {!hideFavorite && (
          <FavoriteIconContainer accessibilityRole="imagebutton" accessibilityLabel="favorite icon">
            <CustomIcon
              name={ICON_NAME.favorite}
              size="fs21"
              color="gray.600"
              onPress={onFavorite}
            />
          </FavoriteIconContainer>
        )}
      </OfferPriceAndFavoriteIconContainer>
      <OfferPriceAndBadge3Container>
        {listPriceForColor !== offerPriceForColor && (
          <ListOfferPrice
            accessibilityRole="text"
            accessibilityLabel={`offer price ${listPriceForColor}`}
          >
            {listPriceForColor}
          </ListOfferPrice>
        )}
        <Badge3Text accessible={badge3 !== ''} accessibilityRole="text" accessibilityLabel={badge3}>
          {badge3}
        </Badge3Text>
      </OfferPriceAndBadge3Container>
    </PricesSection>
  );
};

const RenderTitle = ({ text }) => {
  return (
    <TitleContainer>
      <TitleText accessibilityRole="text" accessibilityLabel={text} numberOfLines={2}>
        {text}
      </TitleText>
    </TitleContainer>
  );
};

RenderTitle.propTypes = TextProps;

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
  fullWidth: PropTypes.bool,
  renderPriceAndBagOnly: PropTypes.bool,
  renderPriceOnly: PropTypes.bool,
};

ListItem.defaultProps = {
  theme: {},
  item: {},
  badge1: '',
  badge2: '',
  loyaltyPromotionMessage: '',
  onFavorite: () => {},
  isPlcc: false,
  fullWidth: false,
  renderPriceAndBagOnly: false,
  renderPriceOnly: false,
};

export default withStyles(ListItem, styles);
export { ListItem as ListItemVanilla };
