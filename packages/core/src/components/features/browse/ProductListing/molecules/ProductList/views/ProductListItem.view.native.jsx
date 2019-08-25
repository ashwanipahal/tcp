import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import CustomButton from '../../../../../../common/atoms/Button';
import ColorSwitch from './ColorSwitch.view.native';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';
// import { relativeSizeHeight } from '../../../../../../../utils/dimensions';

const styles = StyleSheet.create({
  /* eslint-disable */
  listContainer: {
    // borderColor: '#FF8C00',
    // borderWidth: 1,
    maxWidth: 164,
    height: 426,
  },
  itemSeparatorStyle: {
    width: 19,
    backgroundColor: '#cccccc',
  },
  imageStyle: {
    width: 164,
    height: 205,
    resizeMode: 'contain',
  },
  favoriteIconContainerStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  badge1ContainerStyle: {
    // borderColor: 'pink',
    // borderWidth: 1,
    height: 14,
  },
  badge1Style: {
    fontSize: 10,
    color: '#1a1a1a',
    lineHeight: 12,
    fontWeight: '600',
  },
  badge2ContainerStyle: {
    // borderColor: 'pink',
    // borderWidth: 1,
    height: 14,
  },
  badge2Style: {
    fontSize: 10,
    color: '#1a1a1a',
    lineHeight: 12,
    fontWeight: '900',
  },
  pricesSectionStyle: {
    // borderColor: '#ff0000',
    // borderWidth: 1,
    marginTop: 4,
  },
  offerPriceAndBadge3Style: {
    flexDirection: 'row',
  },
  listPriceStyle: {
    fontSize: 15,
    color: '#c01f1f',
    lineHeight: 18,
    fontWeight: 'bold',
  },
  listOfferPrice: {
    fontSize: 10,
    color: '#595959',
    lineHeight: 12,
    textDecorationLine: 'line-through',
  },
  badge3Style: {
    fontSize: 10,
    color: '#c01f1f',
    lineHeight: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  titleContainerStyle: {
    // borderColor: '#ff0000',
    // borderWidth: 1,
    marginTop: 4,
    height: 32,
  },
  titleStyle: {
    color: '#1a1a1a',
    fontSize: 12,
    lineHeight: 14.4,
  },
  promotionalMessageContainerStyle: {
    // borderColor: '#ff0000',
    // borderWidth: 1,
    marginTop: 12,
    height: 24,
  },
  promotionalMessageStyle: {
    color: '#f76b1f',
    fontSize: 9,
    lineHeight: 11,
  },
  colorSwitchCircleStyle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: '#ff0000',
  },
  colorSwitchCircleSelectedStyle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: '#ff0000',
    borderColor: 'black',
    borderWidth: 1,
  },
  colowSwitchesContainerStyle: {
    height: 17,
    borderColor: '#ff0000',
    borderWidth: 1,
    marginTop: 8,
  },
  addToBagStyle: {
    marginTop: 12,
  },
  customTextStyle: {
    fontSize: 12,
    lineHeight: 14.5,
  },
  /* eslint-enable */
});

const ItemSeparator = () => <View style={styles.itemSeparatorStyle} />;

const onAddToBagHandler = (onAddToBag, data) => {
  if (onAddToBag) {
    onAddToBag(data);
  }
};
const ListItem = props => {
  const {
    item,
    imageUrls,
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
  const imageUrl = get(imageUrls, `[${imageIndex}]`, {});
  return (
    <View style={listContainer}>
      <RenderTopBadge1 text={badge1} />
      <GenerateImage imageUrl={imageUrl} onFavorite={onFavorite} />
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

const GenerateImage = ({ imageUrl, onFavorite }) => {
  const { favoriteIconContainerStyle } = styles;
  return (
    <View>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.imageStyle}
      />
      <View style={favoriteIconContainerStyle}>
        <CustomIcon name={ICON_NAME.favorite} size={21} color="#9b9b9b" onPress={onFavorite} />
      </View>
    </View>
  );
};

const RenderBadge2 = ({ text }) => {
  const { badge2ContainerStyle, badge2Style } = styles;
  return (
    <View style={badge2ContainerStyle}>
      <Text style={badge2Style}>{text}</Text>
    </View>
  );
};

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

ListItem.propTypes = {
  item: PropTypes.shape({}),
  imageUrls: PropTypes.arrayOf(PropTypes.shape({})),
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
  imageUrls: [{}],
  badge1: '',
  badge2: '',
  badge3: '',
  loyaltyPromotionMessage: '',
  onAddToBag: () => {},
  onFavorite: () => {},
};

export { ListItem, ItemSeparator };
