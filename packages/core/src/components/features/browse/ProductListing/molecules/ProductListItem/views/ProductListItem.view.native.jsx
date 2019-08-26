import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/ProductListItem.style.native';
import CustomButton from '../../../../../../common/atoms/Button';
import ColorSwitch from '../../ColorSwitch';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';
import ImageComp from '../../ImageComp';

const TextProps = {
  text: PropTypes.string.isRequired,
};

const onAddToBagHandler = (onAddToBag, data) => {
  if (onAddToBag) {
    onAddToBag(data);
  }
};

const ListItem = props => {
  const {
    item,
    badge1,
    badge2,
    badge3,
    listPriceForColor,
    offerPriceForColor,
    loyaltyPromotionMessage,
    onAddToBag,
    onFavorite,
  } = props;
  const [imageIndex, setImageIndex] = useState(0);
  const { listContainer, addToBagStyle } = styles;
  const { productInfo, colorsMap } = item;
  const { name } = productInfo;

  return (
    <View style={listContainer}>
      <RenderTopBadge1 text={badge1} />
      <ImageSection onFavorite={onFavorite} item={item} imageIndex={imageIndex} />
      <RenderBadge2 text={badge2} />
      <RenderPricesSection
        listPrice={listPriceForColor}
        offerPrice={offerPriceForColor}
        noMerchantBadge={badge3}
      />
      <RenderTitle text={name} />
      <ColorSwitch colorsMap={colorsMap} setImageIndex={setImageIndex} />
      <RenderPromotionalMessage text={loyaltyPromotionMessage} />
      <CustomButton
        customStyle={addToBagStyle}
        color="white"
        fill="BLUE"
        type="submit"
        size={12}
        buttonVariation="variable-width"
        data-locator=""
        text="ADD TO BAG"
        onPress={() => {
          onAddToBagHandler(onAddToBag, item);
        }}
      />
    </View>
  );
};

const RenderTopBadge1 = ({ text }) => {
  const { badge1ContainerStyle, badge1Style } = styles;
  return (
    <View style={badge1ContainerStyle}>
      <Text style={badge1Style}>{text}</Text>
    </View>
  );
};

RenderTopBadge1.propTypes = TextProps;

const ImageSection = ({ item, onFavorite, imageIndex }) => {
  const { favoriteIconContainerStyle } = styles;
  return (
    <View>
      <ImageComp item={item} imageIndex={imageIndex} />
      <View style={favoriteIconContainerStyle}>
        <CustomIcon name={ICON_NAME.favorite} size={21} color="#9b9b9b" onPress={onFavorite} />
      </View>
    </View>
  );
};

ImageSection.propTypes = {
  item: PropTypes.shape({}).isRequired,
  onFavorite: PropTypes.func.isRequired,
  imageIndex: PropTypes.number.isRequired,
};

const RenderBadge2 = ({ text }) => {
  const { badge2ContainerStyle, badge2Style } = styles;
  return (
    <View style={badge2ContainerStyle}>
      <Text style={badge2Style}>{text}</Text>
    </View>
  );
};

RenderBadge2.propTypes = TextProps;

const RenderPricesSection = values => {
  const {
    pricesSectionStyle,
    listPriceStyle,
    listOfferPrice,
    badge3Style,
    offerPriceAndBadge3Style,
  } = styles;
  const { listPrice, offerPrice, noMerchantBadge } = values;
  return (
    <View style={pricesSectionStyle}>
      <Text style={listPriceStyle}>{listPrice}</Text>
      <View style={offerPriceAndBadge3Style}>
        <Text style={listOfferPrice}>{offerPrice}</Text>
        <Text style={badge3Style}>{noMerchantBadge}</Text>
      </View>
    </View>
  );
};

const RenderTitle = ({ text }) => {
  const { titleContainerStyle, titleStyle } = styles;
  return (
    <View style={titleContainerStyle}>
      <Text numberOfLines={2} style={titleStyle}>
        {text}
      </Text>
    </View>
  );
};

RenderTitle.propTypes = TextProps;

const RenderPromotionalMessage = ({ text }) => {
  const { promotionalMessageContainerStyle, promotionalMessageStyle } = styles;
  return (
    <View style={promotionalMessageContainerStyle}>
      <Text numberOfLines={2} style={promotionalMessageStyle}>
        {text}
      </Text>
    </View>
  );
};

RenderPromotionalMessage.propTypes = TextProps;

ListItem.propTypes = {
  item: PropTypes.shape({}),
  badge1: PropTypes.string,
  badge2: PropTypes.string,
  badge3: PropTypes.string,
  listPriceForColor: PropTypes.number.isRequired,
  offerPriceForColor: PropTypes.number.isRequired,
  loyaltyPromotionMessage: PropTypes.string,
  onAddToBag: PropTypes.func,
  onFavorite: PropTypes.func,
};

ListItem.defaultProps = {
  item: {},
  badge1: '',
  badge2: '',
  badge3: '',
  loyaltyPromotionMessage: '',
  onAddToBag: () => {},
  onFavorite: () => {},
};

export default ListItem;
