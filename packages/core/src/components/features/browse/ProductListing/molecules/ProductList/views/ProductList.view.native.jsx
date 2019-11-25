/* eslint-disable react/no-unused-state */
import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import ListItem from '../../ProductListItem';
import { getMapSliceForColorProductId } from '../utils/productsCommonUtils';
import { getPromotionalMessage } from '../utils/utility';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { styles, PageContainer, HeaderContainer } from '../styles/ProductList.style.native';
import CustomButton from '../../../../../../common/atoms/Button';
import { ModalViewWrapper } from '../../../../../account/LoginPage/molecules/LoginForm/LoginForm.style.native';
import ModalNative from '../../../../../../common/molecules/Modal/index';
import LoginPageContainer from '../../../../../account/LoginPage/index';

class ProductList extends React.PureComponent {
  flatListRef = null;

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      favorites: true,
      colorProductId: '',
    };
  }

  componentDidUpdate(prevProps) {
    const isScrollToTopValue = get(this.props, 'scrollToTop');
    const isScrollToTopPrevPropValue = get(prevProps, 'scrollToTop');
    if (isScrollToTopValue && isScrollToTopValue !== isScrollToTopPrevPropValue) {
      this.scrollToTop();
    }
  }

  componentWillUnmount() {
    const { removeAddToFavoritesErrorMsg } = this.props;
    if (typeof removeAddToFavoritesErrorMsg === 'function') {
      removeAddToFavoritesErrorMsg('');
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { onAddItemToFavorites, getProducts, navigation, isSearchListing } = props;
    const { colorProductId } = state;
    if (props.isLoggedIn && state.showModal) {
      this.categoryUrl = navigation && navigation.getParam('url');
      getProducts({ URI: 'category', url: this.categoryUrl, ignoreCache: true });
      if (colorProductId !== '') {
        onAddItemToFavorites({ colorProductId, page: isSearchListing ? 'SLP' : 'PLP' });
      }
      return { showModal: false, colorProductId: '' };
    }
    return null;
  }

  // eslint-disable-next-line
  onAddToBag = data => {};

  // eslint-disable-next-line
  onFavorite = generalProductId => {
    const { isLoggedIn, onAddItemToFavorites, isSearchListing } = this.props;
    if (!isLoggedIn) {
      this.setState({ colorProductId: generalProductId });
      this.setState({ showModal: true });
    } else {
      onAddItemToFavorites({
        colorProductId: generalProductId,
        page: isSearchListing ? 'SLP' : 'PLP',
      });
    }
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
      favorites: false,
    }));
  };

  onOpenPDPPageHandler = (pdpUrl, selectedColorIndex, productInfo) => {
    const { title, onGoToPDPPage, isFavorite } = this.props;
    const { name } = productInfo;
    const productTitle = isFavorite ? name : title;
    if (onGoToPDPPage) {
      onGoToPDPPage(productTitle, pdpUrl, selectedColorIndex, productInfo);
    }
  };

  getLoyaltyPromotionMessage = (productInfo, colorsMap) => {
    const { isPlcc } = this.props;
    const { promotionalMessage, promotionalPLCCMessage } = productInfo;
    return (
      colorsMap &&
      getPromotionalMessage(isPlcc, {
        promotionalMessage,
        promotionalPLCCMessage,
      })
    );
  };

  renderComponent = ({ isUserLoggedIn, favorites }) => {
    let componentContainer = null;
    if (!isUserLoggedIn) {
      componentContainer = (
        <LoginPageContainer
          onRequestClose={this.toggleModal}
          isUserLoggedIn={isUserLoggedIn}
          showLogin={this.showloginModal}
          variation={favorites && 'favorites'}
        />
      );
    }
    return <React.Fragment>{componentContainer}</React.Fragment>;
  };

  /**
   * @param {Object} itemData : product list item
   * @desc This is renderer method of the product tile list
   */
  renderItemList = itemData => {
    const {
      isMatchingFamily,
      currencyExchange,
      currencySymbol,
      isPlcc,
      onQuickViewOpenClick,
      isFavorite,
      setLastDeletedItemId,
      isLoggedIn,
      labelsPlpTiles,
      isKeepAliveEnabled,
      outOfStockLabels,
    } = this.props;
    const { item } = itemData;
    const { colorsMap, productInfo } = item;
    const colorProductId = colorsMap && colorsMap[0].colorProductId;

    // get default zero index color entry
    const curentColorEntry = colorsMap && getMapSliceForColorProductId(colorsMap, colorProductId);
    // get product color and price info of default zero index item
    const currentColorMiscInfo = (colorsMap && curentColorEntry.miscInfo) || {};
    const { badge1, badge2 } = currentColorMiscInfo;

    // get default top badge data
    let topBadge;
    if (colorsMap) {
      topBadge = isMatchingFamily && badge1.matchBadge ? badge1.matchBadge : badge1.defaultBadge;
    }

    // get default Loyalty message
    const loyaltyPromotionMessage = this.getLoyaltyPromotionMessage(productInfo, colorsMap);
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
        onQuickViewOpenClick={onQuickViewOpenClick}
        isFavorite={isFavorite}
        setLastDeletedItemId={setLastDeletedItemId}
        isLoggedIn={isLoggedIn}
        labelsPlpTiles={labelsPlpTiles}
        isKeepAliveEnabled={isKeepAliveEnabled}
        outOfStockLabels={outOfStockLabels}
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
    const { products, isFavorite } = this.props;
    if (isFavorite) return null;
    const productsLen = get(products, 'length', 0);
    const totalProductsCount = get(this.props, 'totalProductsCount', 0);
    if (productsLen === totalProductsCount) {
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
    if (onRenderHeader) {
      return <HeaderContainer>{onRenderHeader()}</HeaderContainer>;
    }
    return null;
  };

  setListRef = ref => {
    const { setListRef } = this.props;
    this.flatListRef = ref;
    if (setListRef) {
      setListRef(ref);
    }
  };

  getColumnWrapperStyle = () => {
    return {
      justifyContent: 'space-between',
    };
  };

  /**
   * @desc This is render product list
   */
  renderList = () => {
    const { isLoggedIn, labelsLogin, AddToFavoriteErrorMsg, products } = this.props;
    const { logIn } = labelsLogin;
    const { showModal, favorites } = this.state;
    return (
      <>
        {AddToFavoriteErrorMsg !== '' && (
          <Notification status="error" message={`Error : ${AddToFavoriteErrorMsg}`} />
        )}
        {products && products.length > 0 && (
          <FlatList
            ref={ref => this.setListRef(ref)}
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
            columnWrapperStyle={this.getColumnWrapperStyle()}
          />
        )}

        {showModal && (
          <ModalNative
            isOpen={showModal}
            onRequestClose={this.toggleModal}
            heading={logIn}
            headingFontFamily="secondary"
            fontSize="fs16"
          >
            <SafeAreaView>
              <ModalViewWrapper>
                {this.renderComponent({
                  isLoggedIn,
                  favorites,
                })}
              </ModalViewWrapper>
            </SafeAreaView>
          </ModalNative>
        )}
      </>
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
  setListRef: PropTypes.func,
  isFavorite: PropTypes.bool,
  setLastDeletedItemId: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  labelsLogin: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  labelsPlpTiles: PropTypes.shape({}),
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  isSearchListing: PropTypes.bool,
  isKeepAliveEnabled: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({}),
};

ProductList.defaultProps = {
  setListRef: () => {},
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
  isFavorite: false,
  isLoggedIn: false,
  labelsLogin: {
    logIn: '',
  },
  labelsPlpTiles: {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
  isSearchListing: false,
  isKeepAliveEnabled: false,
  outOfStockLabels: {},
};

export default withStyles(ProductList, styles);
export { ProductList as ProductListVanilla };
