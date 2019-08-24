import React from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { ListItem } from './ProductListItem.view.native';
import { getImagesToDisplay, getMapSliceForColorProductId } from '../utils/productsCommonUtils';
import { getPromotionalMessage } from '../utils/utility';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  /* eslint-disable */
  container: {
    flex: 1,
    borderColor: '#1a1a1a',
    borderWidth: 1,
  },
  listContainer: {
    borderColor: '#595959',
    borderWidth: 1,
  },
  columnWrapperStyle: {
    flex: 1,
    justifyContent: 'space-around',
  },
  /* eslint-enable */
});

class ProductList extends React.PureComponent {
  // const ProductList = ({
  //   className,
  //   products,
  //   showQuickViewForProductId,
  //   // currencySymbol,
  //   onAddItemToFavorites,
  //   onQuickViewOpenClick,
  //   onPickUpOpenClick,
  //   onColorChange,
  //   isBopisEnabled,
  //   unbxdId,
  //   onProductCardHover,
  //   isBopisEnabledForClearance,
  //   onQuickBopisOpenClick,
  //   currencyExchange,
  //   siblingProperties,
  //   loadedProductCount,
  //   isMatchingFamily,
  // }) => {
  constructor(props) {
    super(props);
    const { products } = this.props;
    const item = get(products, '[0]', []);
    const colorName = get(item, 'colorsMap[0].color.name', 'colorName');
    const miscInfo = get(item, 'colorsMap[0].miscInfo', '');
    this.colorsExtraInfo = {
      [colorName]: miscInfo,
    };
    this.state = {
      // selectedColor: '';
      selected: (new Map(): Map<string, boolean>),
    };
  }

  onAddToBag = data => {
    console.log('onAddToBag', data);
  };

  onSelectColor = colorProductId => {
    // updater functions are preferred for transactional updates
    console.log('colorProductId--', colorProductId);
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      // selected.set(colorProductId, !selected.get(colorProductId)); // toggle
      selected.set(colorProductId, colorProductId); // toggle
      console.log('selected:::', selected);
      return { selected };
    });
  };

  renderItemList = itemData => {
    const { isMatchingFamily, currencyExchange, isPlcc } = this.props;
    const { item } = itemData;
    // console.log('item:::', item);
    const { colorsMap, imagesByColor, productInfo } = item;
    const { promotionalMessage, promotionalPLCCMessage } = productInfo;
    const { colorProductId } = colorsMap[0];
    const curentColorEntry = getMapSliceForColorProductId(colorsMap, colorProductId);
    const imageUrls = getImagesToDisplay({
      imagesByColor,
      curentColorEntry,
      isAbTestActive: true,
    });
    const currentColorMiscInfo =
      this.colorsExtraInfo[curentColorEntry.color.name] || curentColorEntry.miscInfo || {};
    const { badge1, badge2, badge3, listPrice, offerPrice } = currentColorMiscInfo;
    const topBadge =
      isMatchingFamily && badge1.matchBadge ? badge1.matchBadge : badge1.defaultBadge;
    const listPriceForColor = listPrice * currencyExchange[0].exchangevalue;
    const offerPriceForColor = offerPrice * currencyExchange[0].exchangevalue;
    const loyaltyPromotionMessage = getPromotionalMessage(isPlcc, {
      promotionalMessage,
      promotionalPLCCMessage,
    });
    const { selected } = this.state;
    return (
      <ListItem
        item={item}
        isMatchingFamily={isMatchingFamily}
        imageUrls={imageUrls}
        badge1={topBadge}
        badge2={badge2}
        badge3={badge3}
        listPriceForColor={listPriceForColor}
        offerPriceForColor={offerPriceForColor}
        loyaltyPromotionMessage={loyaltyPromotionMessage}
        onAddToBag={this.onAddToBag}
        // selected={selected.get(item.colorProductId)}
        // onSelectColor={this.onSelectColor}
      />
    );
  };

  renderList = () => {
    // console.log('this.state: ', this.state);
    const { products } = this.props;
    const { listContainer, columnWrapperStyle } = styles;
    return (
      <FlatList
        contentContainerStyle={listContainer}
        data={products}
        renderItem={this.renderItemList}
        keyExtractor={item => item.generalProductId}
        // ListHeaderComponent={<Header totalResults={totalResults} />}
        // ListFooterComponent={<Footer />}
        // onEndReached={() => dispatchFetchPage()}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
        numColumns={2}
        columnWrapperStyle={columnWrapperStyle}
        // onEndReachedThreshold={0.5}
        extraData={this.state}
      />
    );
  };

  render() {
    const { container } = styles;
    return <View style={container}>{this.renderList()}</View>;
  }
}

ProductList.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  /** the generalProductId of the product (if any) requesting quickView to show */
  showQuickViewForProductId: PropTypes.string,
  /** Price related currency symbol to be rendered */
  // currencySymbol: ProductsGridItem.propTypes.currencySymbol,
  currencyExchange: PropTypes.arrayOf(PropTypes.shape({})),
  /** callback for clicks on wishlist CTAs. Accepts: colorProductId. */
  onAddItemToFavorites: PropTypes.func,
  /** callback for clicks on quickView CTAs. Accepts a generalProductId, colorProductId */
  onQuickViewOpenClick: PropTypes.func,
  onPickUpOpenClick: PropTypes.func,
  /** callback to trigger when the user chooses to display a different color (used to retrieve prices) */
  onColorChange: PropTypes.func,
  /** When flase, flags that BOPIS is globaly disabled */
  isBopisEnabled: PropTypes.bool,
  /* This unbxd request ID will be passed to UNXD product click anlytics as request ID */
  unbxdId: PropTypes.string,
  onProductCardHover: PropTypes.func,
  isBopisEnabledForClearance: PropTypes.bool,
  onQuickBopisOpenClick: PropTypes.func,
  siblingProperties: PropTypes.shape({
    colorMap: PropTypes.arrayOf(PropTypes.shape({})),
    promotionalMessage: PropTypes.string,
    promotionalPLCCMessage: PropTypes.string,
  }),
  loadedProductCount: PropTypes.number.isRequired,
  isMatchingFamily: PropTypes.bool,
  isPlcc: PropTypes.bool,
};

ProductList.defaultProps = {
  className: '',
  products: [],
  showQuickViewForProductId: '',
  // currencySymbol: '',
  onAddItemToFavorites: () => {},
  onQuickViewOpenClick: () => {},
  onPickUpOpenClick: () => {},
  onColorChange: () => {},
  isBopisEnabled: false,
  unbxdId: 'fc0d2287-4a11-4739-98b4-1e2fd91016c4',
  onProductCardHover: () => {},
  isBopisEnabledForClearance: false,
  onQuickBopisOpenClick: () => {},
  currencyExchange: [{ exchangevalue: 1 }],
  siblingProperties: {
    colorMap: [],
    promotionalMessage: '',
    promotionalPLCCMessage: '',
  },
  isMatchingFamily: true,
  isPlcc: false,
};

export default ProductList;
