import React, { useState } from 'react';
import { View } from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components/native';
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
  PromotionalMessageContainer,
  PromotionalMessage,
  AddToBagContainer,
  PromotionalMessagePostfix,
} from '../styles/ProductListItem.style.native';
import CustomButton from '../../../../../../common/atoms/Button';
import ColorSwitch from '../../ColorSwitch';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';
import ImageCarousel from '../../ImageCarousel';

const TextProps = {
  text: PropTypes.string.isRequired,
};

const onAddToBagHandler = (onAddToBag, data) => {
  if (onAddToBag) {
    onAddToBag(data);
  }
};

// to get loyalty text in desired format
const getFormatedText = text => {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split('on');
};

const ListItem = props => {
  const {
    item,
    badge1,
    badge2,
    loyaltyPromotionMessage,
    onAddToBag,
    onFavorite,
    currencyExchange,
    theme,
    isPlcc,
  } = props;
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { productInfo, colorsMap } = item;
  const { name } = productInfo;
  const { miscInfo } = colorsMap[selectedColorIndex];
  const favoriteIconColor = get(theme, 'colorPalette.gray[600]', '#9b9b9b');
  const favoriteIconSize = get(theme, 'typography.fontSizes.fs21', 21);
  return (
    <ListContainer>
      <RenderTopBadge1 text={badge1} />
      <ImageSection
        onFavorite={onFavorite}
        item={item}
        selectedColorIndex={selectedColorIndex}
        favoriteIconColor={favoriteIconColor}
        favoriteIconSize={favoriteIconSize}
      />
      <RenderBadge2 text={badge2} />
      <RenderPricesSection miscInfo={miscInfo} currencyExchange={currencyExchange} />
      <RenderTitle text={name} />
      <ColorSwitch colorsMap={colorsMap} setSelectedColorIndex={setSelectedColorIndex} />
      <RenderPromotionalMessage isPlcc={isPlcc} text={loyaltyPromotionMessage} />
      <AddToBagContainer>
        <CustomButton
          color="white"
          fill="BLUE"
          type="submit"
          buttonVariation="variable-width"
          data-locator=""
          text="ADD TO BAG"
          onPress={() => {
            onAddToBagHandler(onAddToBag, item);
          }}
          accessibilityLabel="ADD TO BAG"
        />
      </AddToBagContainer>
    </ListContainer>
  );
};

const RenderTopBadge1 = ({ text }) => {
  return (
    <Badge1Container>
      <Badge1Text accessibilityRole="text" accessibilityLabel={text}>
        {text}
      </Badge1Text>
    </Badge1Container>
  );
};

RenderTopBadge1.propTypes = TextProps;

const ImageSection = ({
  item,
  onFavorite,
  selectedColorIndex,
  favoriteIconColor,
  favoriteIconSize,
}) => {
  return (
    <View>
      <ImageCarousel item={item} selectedColorIndex={selectedColorIndex} />
      <FavoriteIconContainer>
        <CustomIcon
          name={ICON_NAME.favorite}
          size={favoriteIconSize}
          color={favoriteIconColor}
          onPress={onFavorite}
        />
      </FavoriteIconContainer>
    </View>
  );
};

ImageSection.propTypes = {
  item: PropTypes.shape({}).isRequired,
  onFavorite: PropTypes.func.isRequired,
  selectedColorIndex: PropTypes.number.isRequired,
  favoriteIconColor: PropTypes.string.isRequired,
  favoriteIconSize: PropTypes.string.isRequired,
};

const RenderBadge2 = ({ text }) => {
  return (
    <Badge2Container>
      <Badge2Text accessibilityRole="text" accessibilityLabel={text}>
        {text}
      </Badge2Text>
    </Badge2Container>
  );
};

RenderBadge2.propTypes = TextProps;

const RenderPricesSection = values => {
  const { miscInfo, currencyExchange } = values;
  const { badge3, listPrice, offerPrice } = miscInfo;
  // calculate default list price
  const listPriceForColor = listPrice * currencyExchange[0].exchangevalue;
  // calculate default offer price
  const offerPriceForColor = offerPrice * currencyExchange[0].exchangevalue;
  return (
    <PricesSection>
      <ListPrice accessibilityRole="text" accessibilityLabel={listPriceForColor}>
        {listPriceForColor}
      </ListPrice>
      <OfferPriceAndBadge3Container>
        <ListOfferPrice accessibilityRole="text" accessibilityLabel={offerPriceForColor}>
          {offerPriceForColor}
        </ListOfferPrice>
        <Badge3Text accessibilityRole="text" accessibilityLabel={badge3}>
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

const RenderPromotionalMessage = ({ text, isPlcc }) => {
  return (
    <PromotionalMessageContainer>
      <PromotionalMessage
        isPlcc={isPlcc}
        accessibilityRole="text"
        accessibilityLabel={text}
        numberOfLines={2}
      >
        {text && getFormatedText(text)[0]}
        {text && (
          <PromotionalMessagePostfix>{` on${getFormatedText(text)[1]}`}</PromotionalMessagePostfix>
        )}
      </PromotionalMessage>
    </PromotionalMessageContainer>
  );
};

RenderPromotionalMessage.propTypes = { ...TextProps, isPlcc: PropTypes.bool };

ListItem.propTypes = {
  theme: PropTypes.shape({}),
  item: PropTypes.shape({}),
  badge1: PropTypes.string,
  badge2: PropTypes.string,
  loyaltyPromotionMessage: PropTypes.string,
  onAddToBag: PropTypes.func,
  onFavorite: PropTypes.func,
  isPlcc: PropTypes.bool,
  currencyExchange: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ListItem.defaultProps = {
  theme: {},
  item: {},
  badge1: '',
  badge2: '',
  loyaltyPromotionMessage: '',
  onAddToBag: () => {},
  onFavorite: () => {},
  isPlcc: false,
};

RenderPromotionalMessage.defaultProps = {
  isPlcc: false,
};

export default withStyles(withTheme(ListItem), styles);
export { ListItem as ListItemVanilla };
