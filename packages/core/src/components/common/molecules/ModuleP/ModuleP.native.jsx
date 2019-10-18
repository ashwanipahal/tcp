import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ListItem from '../../../features/browse/ProductListing/molecules/ProductListItem';
import { getMapSliceForColorProductId } from '../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { getPromotionalMessage } from '../../../features/browse/ProductListing/molecules/ProductList/utils/utility';

// eslint-disable-next-line
const onAddToBag = data => {};

// eslint-disable-next-line
const onFavorite = item => {};

const onOpenPDPPageHandler = props => (pdpUrl, selectedColorIndex) => {
  const { title, navigation } = props;
  navigation.navigate('ProductDetail', {
    title,
    pdpUrl,
    selectedColorProductId: selectedColorIndex,
    reset: true,
  });
};

const ModuleP = props => {
  const {
    isMatchingFamily,
    currencyExchange,
    currencySymbol,
    isPlcc,
    onQuickViewOpenClick,
    item,
  } = props;

  const { colorsMap, productInfo } = item;
  const { promotionalMessage, promotionalPLCCMessage } = productInfo;
  const { colorProductId } = colorsMap[0];

  const colorsExtraInfo = colorsMap[0].color.name;

  // get default zero index color entry
  const curentColorEntry = getMapSliceForColorProductId(colorsMap, colorProductId);
  // get product color and price info of default zero index item
  const currentColorMiscInfo =
    colorsExtraInfo[curentColorEntry.color.name] || curentColorEntry.miscInfo || {};
  const { badge1, badge2 } = currentColorMiscInfo;
  // get default top badge data
  const topBadge = isMatchingFamily && badge1.matchBadge ? badge1.matchBadge : badge1.defaultBadge;

  // get default Loyalty message
  const loyaltyPromotionMessage = getPromotionalMessage(isPlcc, {
    promotionalMessage,
    promotionalPLCCMessage,
  });

  return (
    <View>
      <ListItem
        item={item}
        isMatchingFamily={isMatchingFamily}
        badge1={topBadge}
        badge2={badge2}
        isPlcc={isPlcc}
        loyaltyPromotionMessage={loyaltyPromotionMessage}
        onAddToBag={onAddToBag}
        onFavorite={onFavorite}
        currencyExchange={currencyExchange}
        currencySymbol={currencySymbol}
        onGoToPDPPage={onOpenPDPPageHandler(props)}
        onQuickViewOpenClick={onQuickViewOpenClick}
        fullWidth
      />
    </View>
  );
};

ModuleP.propTypes = {
  isMatchingFamily: PropTypes.bool,
  currencySymbol: PropTypes.string,
  currencyExchange: PropTypes.arrayOf(PropTypes.shape({})),
  isPlcc: PropTypes.bool,
  onQuickViewOpenClick: PropTypes.func,
  item: PropTypes.shape({}).isRequired,
};

ModuleP.defaultProps = {
  onQuickViewOpenClick: () => {},
  currencyExchange: [{ exchangevalue: 1 }],
  isMatchingFamily: true,
  isPlcc: false,
  currencySymbol: '$',
};

export default ModuleP;
