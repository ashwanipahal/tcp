import React from 'react';
import { FlatList } from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import ListItem from '../../ProductListItem';
import { getMapSliceForColorProductId } from '../utils/productsCommonUtils';
import { getPromotionalMessage } from '../utils/utility';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { styles, PageContainer } from '../styles/ProductList.style.native';
import CustomButton from '../../../../../../common/atoms/Button';

class ProductList extends React.PureComponent {
  flatListRef = null;

  constructor(props) {
    super(props);
    const { products } = this.props;
    const item = get(products, '[0]', []);
    const colorName = get(item, 'colorsMap[0].color.name', 'colorName');
    const miscInfo = get(item, 'colorsMap[0].miscInfo', '');
    this.colorsExtraInfo = {
      [colorName]: miscInfo,
    };
  }

  componentDidUpdate(prevProps) {
    const isScrollToTopValue = get(this.props, 'scrollToTop');
    const isScrollToTopPrevPropValue = get(prevProps, 'scrollToTop');
    if (isScrollToTopValue && isScrollToTopValue !== isScrollToTopPrevPropValue) {
      this.scrollToTop();
    }
  }

  // eslint-disable-next-line
  onAddToBag = data => {};

  // eslint-disable-next-line
  onFavorite = item => {};

  onOpenPDPPageHandler = (pdpUrl, selectedColorIndex) => {
    const { title, onGoToPDPPage } = this.props;
    if (onGoToPDPPage) {
      onGoToPDPPage(title, pdpUrl, selectedColorIndex);
    }
  };

  /**
   * @param {Object} itemData : product list item
   * @desc This is renderer method of the product tile list
   */
  renderItemList = itemData => {
    const { isMatchingFamily, currencyExchange, currencySymbol, isPlcc } = this.props;
    const { item } = itemData;
    const { colorsMap, productInfo } = item;
    const { promotionalMessage, promotionalPLCCMessage } = productInfo;
    const { colorProductId } = colorsMap[0];

    // get default zero index color entry
    const curentColorEntry = getMapSliceForColorProductId(colorsMap, colorProductId);
    // get product color and price info of default zero index item
    const currentColorMiscInfo =
      this.colorsExtraInfo[curentColorEntry.color.name] || curentColorEntry.miscInfo || {};
    const { badge1, badge2 } = currentColorMiscInfo;
    // get default top badge data
    const topBadge =
      isMatchingFamily && badge1.matchBadge ? badge1.matchBadge : badge1.defaultBadge;

    // get default Loyalty message
    const loyaltyPromotionMessage = getPromotionalMessage(isPlcc, {
      promotionalMessage,
      promotionalPLCCMessage,
    });

    return (
      <ListItem
        item={item}
        isMatchingFamily={isMatchingFamily}
        badge1={topBadge}
        badge2={badge2}
        isPlcc={isPlcc}
        loyaltyPromotionMessage={loyaltyPromotionMessage}
        onAddToBag={this.onAddToBag}
        onFavorite={this.onFavorite}
        currencyExchange={currencyExchange}
        currencySymbol={currencySymbol}
        onGoToPDPPage={this.onOpenPDPPageHandler}
      />
    );
  };

  onLoadMoreProductsHandler = () => {
    const { onLoadMoreProducts } = this.props;
    if (onLoadMoreProducts) {
      onLoadMoreProducts();
    }
  };

  /**
   * @desc This is render product list load more footer
   */
  renderFooter = () => {
    const { products } = this.props;
    const productsLen = get(products, 'length', 0);
    const totalProductsInCurrCategory = get(this.props, 'totalProductsInCurrCategory', 0);
    if (productsLen === totalProductsInCurrCategory) {
      return null;
    }

    return (
      <CustomButton
        margin="0 12px 20px 12px"
        fill="WHITE"
        type="button"
        buttonVariation="variable-width"
        data-locator="lod more"
        text="LOAD MORE"
        onPress={() => {
          this.onLoadMoreProductsHandler();
        }}
        accessibilityLabel="load more"
      />
    );
  };

  /**
   * @desc This is render product list load more footer
   */
  renderHeader = () => {
    const { onRenderHeader } = this.props;
    return onRenderHeader();
  };

  /**
   * @desc This is render product list
   */
  renderList = () => {
    const { products } = this.props;
    return (
      <FlatList
        ref={ref => {
          this.flatListRef = ref;
        }}
        data={products}
        renderItem={this.renderItemList}
        keyExtractor={item => item.productInfo.generalProductId}
        initialNumToRender={4}
        maxToRenderPerBatch={2}
        numColumns={2}
        extraData={this.props}
        ListFooterComponent={this.renderFooter}
        ListHeaderComponent={this.renderHeader}
        stickyHeaderIndices={[0]}
      />
    );
  };

  scrollToTop = () => {
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

  render() {
    return <PageContainer>{this.renderList()}</PageContainer>;
  }
}

ProductList.propTypes = {
  // TODO: Disable eslint for the proptypes as some of the values are not being used in the list. This will be cover in kill swithc story.
  /* eslint-disable */
  className: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  /** the generalProductId of the product (if any) requesting quickView to show */
  showQuickViewForProductId: PropTypes.string,
  /** Price related currency symbol to be rendered */
  currencySymbol: PropTypes.string,
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
  /* eslint-enable */
  onGoToPDPPage: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onLoadMoreProducts: PropTypes.func.isRequired,
  onRenderHeader: PropTypes.func.isRequired,
};

ProductList.defaultProps = {
  className: '',
  products: [],
  showQuickViewForProductId: '',
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
  currencySymbol: '$',
};

export default withStyles(ProductList, styles);
export { ProductList as ProductListVanilla };
