/* eslint-disable max-lines */
/* eslint-disable extra-rules/no-commented-out-code */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { getIconPath, routerPush, getBrand, getAPIConfig, getSiteId } from '@tcp/core/src/utils';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import { currencyConversion } from '@tcp/core/src/components/features/CnC/CartItemTile/utils/utils';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import productGridItemPropTypes, {
  productGridDefaultProps,
} from '../propTypes/ProductGridItemPropTypes';
import { Button, BodyCopy, Col, Row, Image } from '../../../../../../common/atoms';
import { getLocator, isClient } from '../../../../../../../utils';
import { getImagesToDisplay, getMapSliceForColorProductId } from '../utils/productsCommonUtils';
// import { ProductRating } from './ProductRating';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ProductsGridItem.style';
import { getPromotionalMessage } from '../utils/utility';
import {
  ProductTitle,
  ProductPricesSection,
  BadgeItem,
  PromotionalMessage,
  CreateWishList,
  PurchaseSection,
  WishListIcon,
  EditButton,
} from './ProductItemComponents';
import { getTopBadge, getVideoUrl } from './ProductGridItem.util';
import ProductColorChipWrapper from './ProductColorChipWrapper';
import ProductAltImages from './ProductAltImages';
import { AVAILABILITY } from '../../../../Favorites/container/Favorites.constants';
import { getCartItemInfo } from '../../../../../CnC/AddedToBag/util/utility';
// import ErrorMessage from './ErrorMessage';

class ProductsGridItem extends React.PureComponent {
  // eslint-disable-next-line react/forbid-prop-types
  static propTypes = { ...productGridItemPropTypes, forwardedRef: PropTypes.object };

  static defaultProps = { ...productGridDefaultProps };

  constructor(props) {
    super(props);
    const { colorsMap, skuInfo: { colorProductId: itemColorProductId } = {} } = props.item;
    if (colorsMap) {
      this.colorsExtraInfo = {
        [colorsMap[0].color.name]: colorsMap[0].miscInfo,
      };
    }
    const colorProductId = colorsMap ? colorsMap[0].colorProductId : itemColorProductId;
    const {
      item: {
        productInfo: { pdpUrl },
      },
    } = props;
    const currentSiteBrand = getBrand();
    const isTCP =
      props.item && props.item.itemInfo
        ? props.item.itemInfo.isTCP
        : currentSiteBrand.toUpperCase() === 'TCP';
    const apiConfigObj = getAPIConfig();
    const { crossDomain } = apiConfigObj;
    const itemBrand = isTCP ? 'TCP' : 'GYM';
    const isProductBrandOfSameSiteBrand =
      currentSiteBrand.toUpperCase() === itemBrand.toUpperCase();
    this.state = {
      isInDefaultWishlist: props.item.miscInfo.isInDefaultWishlist,
      selectedColorProductId: colorProductId,
      currentImageIndex: 0,
      pdpUrl: isProductBrandOfSameSiteBrand
        ? props.item.productInfo.pdpUrl
        : `${crossDomain}/${getSiteId()}${pdpUrl}`,
      isAltImgRequested: false,
      isMoveItemOpen: false,
      generalProductId: '',
      errorProductId: '',
    };
    const {
      onQuickViewOpenClick,
      item: {
        productInfo: { generalProductId },
      },
    } = this.props;
    const { selectedColorProductId } = this.state;
    this.handleOpenQuickViewClick = () =>
      onQuickViewOpenClick(generalProductId, selectedColorProductId, generalProductId);
    this.handleImageChange = index => this.setState({ currentImageIndex: index });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isLoggedIn, onAddItemToFavorites, isSearchListing, getProducts, asPathVal } = nextProps;
    const { generalProductId } = prevState;

    if (isLoggedIn && generalProductId !== '') {
      getProducts({ URI: 'category', url: asPathVal, ignoreCache: true });
      onAddItemToFavorites({
        colorProductId: generalProductId,
        productSkuId: null,
        page: isSearchListing ? 'SLP' : 'PLP',
      });
      return { generalProductId: '' };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  // DT-32496
  // When using the back button isInDefaultWishlist gets set to undefined in constructor
  // Need to update the value when we receive the latest props
  /* eslint-disable-next-line */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      item: {
        miscInfo: { isInDefaultWishlist },
      },
    } = nextProps;
    const { isInDefaultWishlist: currentIsInDefaultWishlist } = this.state;
    if (currentIsInDefaultWishlist === undefined) {
      this.setState({ isInDefaultWishlist });
    }
    const {
      item: { colorsMap },
    } = this.props;
    if (colorsMap !== nextProps.item.colorsMap) {
      this.colorsExtraInfo = {
        [nextProps.item.colorsMap[0].color.name]: nextProps.item.colorsMap[0].miscInfo,
      };
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    const { removeAddToFavoritesErrorMsg } = this.props;
    if (typeof removeAddToFavoritesErrorMsg === 'function') {
      removeAddToFavoritesErrorMsg('');
    }
  }

  getQuickViewInitialValues() {
    const {
      item: { colorsMap },
    } = this.props;
    const { selectedColorProductId } = this.state;
    const colorEntry =
      colorsMap && colorsMap.find(entry => entry.colorProductId === selectedColorProductId);
    return colorEntry && colorEntry.color && colorEntry.color.name
      ? { color: colorEntry.color.name }
      : undefined;
  }
  /**
   * This function returns array of suggested Items
   * @param {*} item
   */

  checkAndRenderSuggestedItem = item => {
    if (!item.skuInfo) {
      return false;
    }
    const { seeSuggestedDictionary } = this.props;
    const {
      skuInfo: { colorProductId },
    } = item;
    const suggestedItem = {
      status: false,
      attributes: null,
    };

    if (!colorProductId) {
      return null;
    }

    const outOfStockProduct =
      colorProductId && seeSuggestedDictionary && seeSuggestedDictionary[colorProductId];
    const outOfStockColorProductId = outOfStockProduct && outOfStockProduct.colorProductId;
    const suggestedAttributes = outOfStockProduct && outOfStockProduct.attributes;

    if (outOfStockColorProductId && outOfStockColorProductId === colorProductId) {
      suggestedItem.status = true;
      suggestedItem.attributes = suggestedAttributes;
    }
    return suggestedItem;
  };

  /**
   * This function returns array of images for carousal and also decides whether to show image carousal or not
   * @param {*} imageUrls
   */
  getImageCarouselOptions(imageUrls) {
    const { hideImageCarousel } = this.props;

    return hideImageCarousel ? imageUrls.slice(0, 1) : imageUrls;
  }

  /**
   * This function closes the move item container onclick
   * @param {object} event
   */
  handleClickOutside = event => {
    const { isMoveItemOpen } = this.state;
    const openItem = document.querySelector('.move-item-section');
    const isChildren = openItem && openItem.contains(event.target);
    if (!isChildren && !event.target.classList.contains('move-item-button') && isMoveItemOpen) {
      this.setState({
        isMoveItemOpen: false,
      });
    }
  };

  crossIcon = () => {
    const { onDismissSuggestion, outOfStockColorProductId, isSuggestedItem } = this.props;

    return isSuggestedItem ? (
      <button
        aria-label="close"
        onClick={() => onDismissSuggestion(outOfStockColorProductId)}
        className="close-btn"
      >
        <svg className="close-btn-icon" viewBox="0 0 25 25" aria-hidden="true">
          <path
            fill="#a0a0a0"
            fillRule="nonzero"
            d="M14.107 12.5l10.56-10.56A1.136 1.136 0 1 0 23.06.333L12.5 10.893 1.94.333A1.136 1.136 0 1 0 .333 1.94l10.56 10.56L.333 23.06a1.136 1.136 0 1 0 1.607 1.607l10.56-10.56 10.56 10.56c.222.222.513.333.804.333a1.136 1.136 0 0 0 .803-1.94L14.107 12.5z"
          />
        </svg>
      </button>
    ) : null;
  };

  dismissBtn = () => {
    const {
      onDismissSuggestion,
      outOfStockColorProductId,
      labelsPlpTiles,
      isSuggestedItem,
    } = this.props;

    return isSuggestedItem ? (
      <div>
        <div className="move-item-container">
          <Button
            className="move-item-button dismiss-btn"
            onClick={() => onDismissSuggestion(outOfStockColorProductId)}
          >
            <BodyCopy
              fontFamily="secondary"
              fontSize={['fs10', 'fs12', 'fs14']}
              color="gray.900"
              className="see-suggested-items"
            >
              {labelsPlpTiles.lbl_dismiss}
            </BodyCopy>
          </Button>
        </div>
      </div>
    ) : null;
  };

  handleAddToWishlist = () => {
    const {
      item: {
        productInfo: { generalProductId },
        itemInfo: { itemId } = {},
      },
      onAddItemToFavorites,
      isLoggedIn,
      removeFavItem,
      isSearchListing,
      isSuggestedItem,
    } = this.props;
    const { selectedColorProductId } = this.state;

    if (isSuggestedItem) {
      this.handleQuickViewOpenClick();
    } else if (removeFavItem) {
      removeFavItem({ itemId });
    } else {
      onAddItemToFavorites({
        colorProductId: selectedColorProductId || generalProductId,
        page: isSearchListing ? 'SLP' : 'PLP',
      });
      this.setState({ errorProductId: selectedColorProductId || generalProductId });
      if (isClient() && isLoggedIn) {
        this.setState({ isInDefaultWishlist: true });
      } else {
        this.setState({ generalProductId: selectedColorProductId || generalProductId });
      }
    }
  };

  renderQuickViewCardOrLink = () => {};

  handleOpenAltImages = () => {
    const { isAltImgRequested } = this.state;
    if (isAltImgRequested) {
      return;
    }
    this.setState({ isAltImgRequested: true });
  };

  renderSuggestedLabel = () => {
    const { labelsPlpTiles, isSuggestedItem } = this.props;

    return isSuggestedItem ? (
      <BodyCopy
        dataLocator="plp_offer_price"
        mobileFontFamily="secondary"
        fontSize="fs10"
        fontWeight="extrabold"
        color="white"
        className="suggested-label"
      >
        {labelsPlpTiles.lbl_suggested}
      </BodyCopy>
    ) : null;
  };

  /* get color chip component */
  getColorChipContainer = curentColorEntry => {
    const {
      isMobile,
      item: { colorsMap, skuInfo },
      isPLPredesign,
      isFavoriteView,
      isSuggestedItem,
    } = this.props;
    const colorProductId = skuInfo && skuInfo.colorProductId;
    if (isSuggestedItem) {
      return false;
    }
    const ChipProps = {
      className: 'color-chips-container',
      isMobile: { isMobile },
      showColorEvenOne: true,
      isPLPredesign: { isPLPredesign },
    };
    if (colorProductId && !isSuggestedItem) {
      return (
        <ProductColorChipWrapper
          selectedColorId={colorProductId}
          skuInfo={skuInfo}
          isFavoriteView={isFavoriteView}
          {...ChipProps}
        />
      );
    }
    return colorsMap && colorsMap.length >= 1 ? (
      <ProductColorChipWrapper
        onChipClick={this.handleChangeColor}
        maxVisibleItems={5}
        selectedColorId={curentColorEntry.color.name}
        colorsMap={colorsMap}
        {...ChipProps}
      />
    ) : (
      <div className="empty-color-chips-container" />
    );
  };

  /* function to get product price section */
  getProductPriceSection = (listPriceForColor, offerPriceForColor, badge3, isShowBadges) => {
    const { item, currencyAttributes } = this.props;
    const bundleProduct = item && item.productInfo && item.productInfo.bundleProduct;
    let priceRange = item && item.productInfo && item.productInfo.priceRange;

    if (priceRange && currencyAttributes && currencyAttributes.exchangevalue) {
      priceRange = {
        highListPrice: currencyConversion(priceRange.highListPrice, currencyAttributes),
        highOfferPrice: currencyConversion(priceRange.highOfferPrice, currencyAttributes),
        lowListPrice: currencyConversion(priceRange.lowListPrice, currencyAttributes),
        lowOfferPrice: currencyConversion(priceRange.lowOfferPrice, currencyAttributes),
      };
    }

    const badge3Text = listPriceForColor - offerPriceForColor !== 0 ? badge3 : '';
    return (
      <ProductPricesSection
        listPrice={listPriceForColor}
        offerPrice={offerPriceForColor}
        noMerchantBadge={badge3}
        merchantTag={isShowBadges ? badge3Text : null}
        hidePrefixListPrice
        bundleProduct={bundleProduct}
        priceRange={priceRange}
      />
    );
  };

  /* function to return promotional message component */
  getPromotionalMessageComponent = (promotionalMessage, promotionalPLCCMessage) => {
    const { isCanada, isPlcc, isInternationalShipping } = this.props;
    return (
      !isCanada &&
      !isInternationalShipping && (
        <PromotionalMessage
          text={getPromotionalMessage(isPlcc, {
            promotionalMessage,
            promotionalPLCCMessage,
          })}
        />
      )
    );
  };

  openMoveItem = () => {
    this.setState(prevState => ({
      isMoveItemOpen: !prevState.isMoveItemOpen,
    }));
  };

  handleChangeColor = colorProductId => {
    const { pdpUrl } = this.state;
    /**
     * Check if pdp url contains "_" then replace any "-" with "_" if not then vice versa.
     * So that the PDP URL changes correctly when color change in PLP page
     */
    const replaceObj =
      pdpUrl.indexOf('_') > 0
        ? { searchvalue: '-', newvalue: '_' }
        : { searchvalue: '_', newvalue: '-' };
    const { searchvalue, newvalue } = replaceObj;
    const { selectedColorProductId } = this.state;
    const color = selectedColorProductId.replace(searchvalue, newvalue);
    const selectedColor = colorProductId.replace(searchvalue, newvalue);
    // eslint-disable-next-line react/destructuring-assignment
    this.state.pdpUrl = this.state.pdpUrl.replace(color, selectedColor);
    this.setState({ selectedColorProductId: colorProductId, currentImageIndex: 0 });
  };

  handleQuickViewOpenClick = () => {
    const {
      onQuickViewOpenClick,
      isSuggestedItem,
      onReplaceWishlistItem,
      activeWishListId,
      suggestedOOSItemId,
      item,
      addToBagEcom,
      isFavoriteView,
    } = this.props;

    const {
      productInfo: { generalProductId },
      skuInfo: { skuId, size },
      itemInfo: { isTCP },
    } = item;

    const { selectedColorProductId } = this.state;
    if (isSuggestedItem && onReplaceWishlistItem) {
      const formData = {
        activeWishListId,
        itemId: suggestedOOSItemId,
        colorProductId: generalProductId,
      };
      onReplaceWishlistItem(formData);
    } else if (isFavoriteView) {
      const orderInfo = {
        itemBrand: isTCP ? 'TCP' : 'GYM',
      };
      if (skuId && size) {
        let cartItemInfo = getCartItemInfo(item, {});
        cartItemInfo = { ...cartItemInfo };
        if (addToBagEcom) addToBagEcom(cartItemInfo);
      } else {
        onQuickViewOpenClick({
          colorProductId: selectedColorProductId,
          orderInfo,
        });
      }
    } else {
      onQuickViewOpenClick({
        colorProductId: selectedColorProductId,
      });
    }
  };

  handleViewBundleClick = () => {
    const {
      isBundleProductABTest,
      item: {
        productInfo: { bundleProduct, pdpUrl },
      },
    } = this.props;
    const isBundleProduct = !isBundleProductABTest && bundleProduct;
    if (isBundleProduct && pdpUrl) {
      routerPush(pdpUrl.replace('b/', 'b?bid='), pdpUrl);
    } else {
      this.handleQuickViewOpenClick();
    }
  };

  renderMoveItem = itemId => {
    const {
      wishlistsSummaries,
      labels,
      createNewWishList,
      createNewWishListMoveItem,
      gridIndex,
      openAddNewList,
      activeWishListId,
    } = this.props;
    const { isMoveItemOpen } = this.state;
    const accordianIcon = isMoveItemOpen
      ? getIconPath('up_arrow_icon')
      : getIconPath('down_arrow_icon');
    return (
      wishlistsSummaries && (
        <div className="move-item-container">
          <Button className="move-item-button" onClick={this.openMoveItem}>
            {labels.lbl_fav_moveToAnotherList}
            <Image
              alt="accordian button"
              className="accordian-item-arrow icon-small"
              src={accordianIcon}
              data-locator="accordian-icon"
              height="6px"
            />
          </Button>
          {isMoveItemOpen && (
            <div className={`item__${gridIndex % 2 ? 'even' : 'odd'} move-item-section`}>
              <CreateWishList
                labels={labels}
                wishlistsSummaries={wishlistsSummaries}
                createNewWishList={createNewWishList}
                createNewWishListMoveItem={createNewWishListMoveItem}
                itemId={itemId}
                gridIndex={gridIndex}
                openAddNewList={openAddNewList}
                activeWishListId={activeWishListId}
              />
            </div>
          )}
        </div>
      )
    );
  };

  onSeeSuggestedHandler = itemId => {
    const {
      item: { skuInfo },
      onSeeSuggestedItems,
    } = this.props;

    const { colorProductId } = skuInfo;

    if (colorProductId && onSeeSuggestedItems) {
      onSeeSuggestedItems(colorProductId, itemId);
    }
  };

  SeeSuggestedList = itemId => {
    const { labelsPlpTiles } = this.props;

    return (
      <div className="move-item-container">
        <Button className="move-item-button" onClick={() => this.onSeeSuggestedHandler(itemId)}>
          <BodyCopy
            fontFamily="secondary"
            fontSize={['fs10', 'fs12', 'fs14']}
            color="gray.900"
            className="see-suggested-items"
          >
            {labelsPlpTiles.lbl_see_suggested_items}
          </BodyCopy>
        </Button>
      </div>
    );
  };

  renderAddToBagLabel = (isBundleProduct, keepAlive) => {
    const {
      outOfStockLabels,
      labels: { shopCollection, addToBag },
      isSuggestedItem,
      labelsPlpTiles,
    } = this.props;
    let addToBagLabel = '';

    if (isSuggestedItem) {
      addToBagLabel = labelsPlpTiles && labelsPlpTiles.lbl_add_to_favorites;
    } else if (isBundleProduct) {
      addToBagLabel = shopCollection;
    } else {
      addToBagLabel = addToBag;
    }

    return keepAlive ? outOfStockLabels.outOfStockCaps : addToBagLabel;
  };

  errorMsgDisplay = () => {
    const {
      AddToFavoriteErrorMsg,
      item: {
        productInfo: { generalProductId },
      },
    } = this.props;
    const { errorProductId } = this.state;

    return errorProductId === generalProductId && AddToFavoriteErrorMsg ? (
      <Notification
        status="error"
        colSize={{ large: 12, medium: 8, small: 6 }}
        message={AddToFavoriteErrorMsg}
      />
    ) : null;
  };

  getColorMiscInfo = curentColorEntry => {
    return (
      (curentColorEntry &&
        (this.colorsExtraInfo[curentColorEntry.color.name] || curentColorEntry.miscInfo)) ||
      {}
    );
  };

  renderSubmitButton = (keepAlive, itemNotAvailable) => {
    const {
      labels,
      item: {
        itemInfo: { itemId } = {},
        productInfo: { bundleProduct, generalProductId, pdpUrl },
      },
      removeFavItem,
      isFavoriteView,
      isShowQuickView,
      AddToFavoriteErrorMsg,
      pageNameProp,
      pageSectionProp,
      pageSubSectionProp,
    } = this.props;
    const { errorProductId } = this.state;
    const fulfilmentSection =
      AddToFavoriteErrorMsg && errorProductId === generalProductId ? '' : 'fulfillment-section';
    const isBundleProduct = bundleProduct;
    let pageShortName = '';
    const productId = generalProductId;
    if (productId) {
      const productIdParts = productId.split('_');
      const splitPdpUrl = pdpUrl && pdpUrl.split('/')[2];
      pageShortName = `product:${productIdParts[0]}:${splitPdpUrl
        .replace(productIdParts[0], '')
        .replace(productIdParts[1], '')
        .split('-')
        .join(' ')
        .trim()
        .toLowerCase()}`;
    }
    return itemNotAvailable ? (
      <div className={fulfilmentSection}>
        <Button
          className="remove-favorite"
          fullWidth
          buttonVariation="fixed-width"
          dataLocator={getLocator('remove_favorite_Button')}
          onClick={() => removeFavItem({ itemId })}
        >
          {labels.lbl_fav_removeFavorite}
        </Button>
      </div>
    ) : (
      <div className={fulfilmentSection}>
        <ClickTracker
          clickData={{
            eventName: 'cart add',
            pageType: pageNameProp,
            pageSection: pageSectionProp,
            pageSubSection: pageSubSectionProp,
            pageShortName,
            pageName: pageNameProp,
            products: [{ id: `${productId}` }],
          }}
        >
          <Button
            className="added-to-bag"
            fullWidth
            buttonVariation="fixed-width"
            dataLocator={getLocator('global_addtocart_Button')}
            onClick={
              isShowQuickView && !isBundleProduct
                ? this.handleQuickViewOpenClick
                : this.handleViewBundleClick
            }
            disabled={keepAlive}
            fill={isFavoriteView ? 'BLUE' : ''}
          >
            {this.renderAddToBagLabel(isBundleProduct, keepAlive)}
          </Button>
        </ClickTracker>
      </div>
    );
  };

  renderFavouriteIcon = (
    bundleProduct,
    isFavoriteView,
    isInDefaultWishlist,
    itemNotAvailable,
    isSuggestedItem
  ) => {
    return (
      !bundleProduct &&
      WishListIcon(
        isFavoriteView,
        isInDefaultWishlist,
        this.handleAddToWishlist,
        itemNotAvailable,
        '',
        isSuggestedItem
      )
    );
  };

  getPriceForProduct = (listPrice, offerPrice, currencyAttributes) => {
    let listPriceForColor = listPrice;
    let offerPriceForColor = offerPrice;
    if (currencyAttributes && currencyAttributes.exchangevalue) {
      listPriceForColor = currencyConversion(listPrice, currencyAttributes);
      offerPriceForColor = currencyConversion(offerPrice, currencyAttributes);
    }
    return {
      listPriceForColor,
      offerPriceForColor,
    };
  };

  render() {
    const {
      onQuickViewOpenClick,
      isShowVideoOnPlp,
      isMobile,
      //  currencySymbol,
      //  isBopisEnabled,
      currencyAttributes,
      //  isBopisEnabledForClearance,
      //  isBossClearanceProductEnabled,
      //  isBossEnabled,
      item,
      // isGridView,
      // isProductsGridCTAView,
      // isCanada,
      isOnModelImgDisplay,
      // isInternationalShipping,
      // isPLPShowPickupCTA,
      isMatchingFamily,
      //  isEvenElement,
      //  siblingProperties,
      isPLPredesign,
      loadedProductCount,
      className,
      sqnNmbr,
      unbxdId,
      labels,
      isFavoriteView,
      forwardedRef,
      outOfStockLabels,
      isKeepAliveEnabled,
      isSuggestedItem,
    } = this.props;

    const {
      productInfo: {
        bundleProduct,
        promotionalMessage,
        promotionalPLCCMessage,
        generalProductId,
        name,
        listPrice: itemListPrice,
        offerPrice: itemOfferPrice,
        long_product_title: longProductTitle,
      },
      itemInfo: { itemId, quantity, availability } = {},
      quantityPurchased,
      colorsMap,
      imagesByColor,
      miscInfo: { isInDefaultWishlist },
    } = item;

    const itemNotAvailable = availability === AVAILABILITY.SOLDOUT;
    const prodNameAltImages = longProductTitle || name;
    const {
      selectedColorProductId,
      // error,
      currentImageIndex,
      pdpUrl,
    } = this.state;

    const suggestedItem = this.checkAndRenderSuggestedItem(item);
    if (suggestedItem && suggestedItem.status) {
      return <Recommendations {...suggestedItem.attributes} />;
    }

    const curentColorEntry = getMapSliceForColorProductId(colorsMap, selectedColorProductId);
    const imageUrls = getImagesToDisplay({
      imagesByColor,
      curentColorEntry,
      isAbTestActive: isOnModelImgDisplay,
      isFavoriteView,
    });
    const imageUrlsToShow = this.getImageCarouselOptions(imageUrls);
    const currentColorMiscInfo = this.getColorMiscInfo(curentColorEntry);

    const {
      listPrice = itemListPrice,
      offerPrice = itemOfferPrice,
      // isBopisEligible,
      badge1,
      badge2,
      badge3,
      //  isClearance,
      //  isBossEligible,
      keepAlive: keepAliveProduct,
    } = currentColorMiscInfo;
    // const miscInfo = {
    //   isBossEligible,
    //   isBopisEligible,
    //   isClearance,
    // };
    const keepAlive = isKeepAliveEnabled && keepAliveProduct;
    const topBadge = getTopBadge(isMatchingFamily, badge1);
    const { listPriceForColor, offerPriceForColor } = this.getPriceForProduct(
      listPrice,
      offerPrice,
      currencyAttributes
    );
    // const isShowPickupCTA =
    //   validateBopisEligibility({
    //     isBopisClearanceProductEnabled: isBopisEnabledForClearance,
    //     isBopisEnabled,
    //     miscInfo,
    //   }) || validateBossEligibility({ isBossClearanceProductEnabled, isBossEnabled, miscInfo });
    const isShowBadges = currentImageIndex === 0;
    // NOTE: isClearance is a string 'Clearance', not a boolean we should clean this up globally in the abstractor
    const sqnNmb = sqnNmbr;
    // const ratings = this.props.item.productInfo.ratings || 0;
    //  const reviews = this.props.item.productInfo.reviewsCount || 0;
    const promotionalMessageModified = promotionalMessage || '';
    const promotionalPLCCMessageModified = promotionalPLCCMessage || '';
    const videoUrl = getVideoUrl(curentColorEntry);
    return (
      <li
        className={className}
        key={generalProductId}
        onMouseEnter={this.handleOpenAltImages}
        onMouseOut={this.handleCloseAltImages}
        onBlur={this.handleCloseAltImages}
        ref={forwardedRef}
      >
        <div className="item-container-inner">
          {
            <BadgeItem
              isShowBadges={isShowBadges}
              className="top-badge-container"
              text={topBadge}
              haveSpace
            />
          }
          {this.crossIcon()}
          <ProductAltImages
            className="product-image-container"
            pdpUrl={pdpUrl}
            videoUrl={videoUrl}
            loadedProductCount={loadedProductCount}
            imageUrls={imageUrlsToShow}
            isMobile={isMobile}
            isShowVideoOnPlp={isShowVideoOnPlp}
            productName={prodNameAltImages}
            onImageChange={this.handleImageChange}
            colorsMap={colorsMap}
            analyticsData={{
              pId: generalProductId,
              prank: sqnNmb,
              requestId: unbxdId,
            }}
            isPLPredesign={isPLPredesign}
            keepAlive={keepAlive}
            isSoldOut={itemNotAvailable}
            soldOutLabel={outOfStockLabels.outOfStockCaps}
          />
          {EditButton(
            { onQuickViewOpenClick, isFavoriteView, labels, item },
            selectedColorProductId,
            itemNotAvailable
          )}
          {
            <Row fullBleed className="product-wishlist-container">
              <Col colSize={{ small: 12 }}>
                <BodyCopy
                  dataLocator={getLocator('global_Extended_sizes_text')}
                  fontWeight="extrabold"
                  fontFamily="secondary"
                  fontSize={['fs10', 'fs12', 'fs14']}
                  className="extended-sizes-text elem-mb-SM"
                >
                  {badge2 && badge2.toUpperCase()}
                </BodyCopy>
              </Col>

              <Col colSize={{ small: 4, medium: 6, large: 10 }}>
                {this.getProductPriceSection(
                  listPriceForColor,
                  offerPriceForColor,
                  badge3,
                  isShowBadges
                )}
              </Col>
              {this.renderFavouriteIcon(
                bundleProduct,
                isFavoriteView,
                isInDefaultWishlist,
                itemNotAvailable,
                isSuggestedItem
              )}
            </Row>
          }

          <ProductTitle
            name={name}
            pdpUrl={pdpUrl}
            loadedProductCount={loadedProductCount}
            analyticsData={{
              pId: generalProductId,
              prank: sqnNmb,
              requestId: unbxdId,
            }}
          />

          {this.renderSuggestedLabel()}

          {this.getColorChipContainer(curentColorEntry)}

          {this.getPromotionalMessageComponent(
            promotionalMessageModified,
            promotionalPLCCMessageModified
          )}
          <div className="fulfillment-section">
            {this.renderSubmitButton(keepAlive, itemNotAvailable)}
          </div>
          {!itemNotAvailable ? (
            <div className="favorite-move-purchase-section">
              {PurchaseSection(quantity, labels, quantityPurchased)}
              {this.renderMoveItem(itemId)}
            </div>
          ) : (
            <div className="favorite-move-purchase-section">
              {PurchaseSection(quantity, labels, quantityPurchased)}
              {this.SeeSuggestedList(itemId)}
            </div>
          )}

          {this.dismissBtn()}

          {/* {error && <ErrorMessage error={error} />} */}
          {this.errorMsgDisplay()}
        </div>
      </li>
    );
  }
}

const ProductsGridItemWithRef = forwardRef((props, ref) => {
  return <ProductsGridItem forwardedRef={ref} {...props} />;
});

export { ProductsGridItem as ProductsGridItemVanilla };

const ProductsGridItemStyled = withStyles(ProductsGridItemWithRef, styles);

// Display name is needed for hotfix mapping capability
ProductsGridItemStyled.displayName = 'ProductsGridItem';

export default ProductsGridItemStyled;
