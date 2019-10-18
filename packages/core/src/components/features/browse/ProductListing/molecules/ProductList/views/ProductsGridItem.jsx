/* eslint-disable max-lines */
/* eslint-disable extra-rules/no-commented-out-code */

import React from 'react';
import { getIconPath, disableBodyScroll } from '@tcp/core/src/utils';
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
// import ErrorMessage from './ErrorMessage';

class ProductsGridItem extends React.PureComponent {
  static propTypes = { ...productGridItemPropTypes };

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
    this.state = {
      isInDefaultWishlist: props.item.miscInfo.isInDefaultWishlist,
      selectedColorProductId: colorProductId,
      currentImageIndex: 0,
      pdpUrl: props.item.productInfo.pdpUrl,
      isAltImgRequested: false,
      isMoveItemOpen: false,
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

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  // DT-32496
  // When using the back button isInDefaultWishlist gets set to undefined in constructor
  // Need to update the value when we receive the latest props
  componentWillReceiveProps(nextProps) {
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

  handleAddToWishlist = () => {
    const {
      item: {
        productInfo: { generalProductId },
        itemInfo: { itemId } = {},
      },
      onAddItemToFavorites,
      isLoggedIn,
      removeFavItem,
    } = this.props;
    const { selectedColorProductId } = this.state;
    if (removeFavItem) {
      removeFavItem({ itemId });
    } else {
      onAddItemToFavorites({ colorProductId: selectedColorProductId || generalProductId });
      if (isClient() && isLoggedIn) {
        this.setState({ isInDefaultWishlist: true });
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

  /* get color chip component */
  getColorChipContainer = curentColorEntry => {
    const {
      isMobile,
      item: { colorsMap, skuInfo },
      isPLPredesign,
      isFavoriteView,
    } = this.props;
    const colorProductId = skuInfo && skuInfo.colorProductId;
    const ChipProps = {
      className: 'color-chips-container',
      isMobile: { isMobile },
      showColorEvenOne: true,
      isPLPredesign: { isPLPredesign },
    };
    if (colorProductId) {
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
    const { currencySymbol } = this.props;
    return (
      <ProductPricesSection
        currencySymbol={currencySymbol || '$'}
        listPrice={listPriceForColor}
        offerPrice={offerPriceForColor}
        noMerchantBadge={badge3}
        merchantTag={isShowBadges ? badge3 : null}
        hidePrefixListPrice
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
    const { onQuickViewOpenClick } = this.props;
    const { selectedColorProductId } = this.state;
    disableBodyScroll();
    onQuickViewOpenClick({
      colorProductId: selectedColorProductId,
    });
  };

  renderMoveItem = itemId => {
    const {
      wishlistsSummaries,
      labels,
      createNewWishList,
      createNewWishListMoveItem,
      gridIndex,
    } = this.props;
    const { isMoveItemOpen } = this.state;
    const accordianIcon = isMoveItemOpen
      ? getIconPath('up_arrow_icon')
      : getIconPath('down_arrow_icon');
    return (
      wishlistsSummaries && (
        <div className="move-item-container">
          <Button className="move-item-button" onClick={this.openMoveItem}>
            {labels.moveToAnotherList}
            <Image
              alt="accordian button"
              className="accordian-item-arrow icon-small"
              src={accordianIcon}
              data-locator="accordian-icon"
              height="8px"
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
              />
            </div>
          )}
        </div>
      )
    );
  };

  renderSubmitButton = itemNotAvailable => {
    const {
      labels,
      item: { itemInfo: { itemId } = {} },
      removeFavItem,
      isFavoriteView,
    } = this.props;
    return itemNotAvailable ? (
      <Button
        className="remove-favorite"
        fullWidth
        buttonVariation="fixed-width"
        dataLocator={getLocator('remove_favorite_Button')}
        onClick={() => removeFavItem({ itemId })}
      >
        {labels.removeFavorite}
      </Button>
    ) : (
      <Button
        className="added-to-bag"
        fullWidth
        buttonVariation="fixed-width"
        dataLocator={getLocator('global_addtocart_Button')}
        onClick={this.handleQuickViewOpenClick}
        fill={isFavoriteView ? 'BLUE' : ''}
      >
        {labels.addToBag}
      </Button>
    );
  };

  render() {
    const {
      onQuickViewOpenClick,
      isShowVideoOnPlp,
      isMobile,
      //  currencySymbol,
      //  isBopisEnabled,
      currencyExchange,
      //  isBopisEnabledForClearance,
      //  isBossClearanceProductEnabled,
      //  isBossEnabled,
      item: {
        productInfo: {
          promotionalMessage,
          promotionalPLCCMessage,
          generalProductId,
          name,
          listPrice: itemListPrice,
          offerPrice: itemOfferPrice,
          long_product_title: longProductTitle,
        },
        itemInfo: { itemId, quantity, keepAlive: keepAliveFlag, availability } = {},
        quantityPurchased,
        colorsMap,
        imagesByColor,
      },
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
      isKeepAliveKillSwitch,
      loadedProductCount,
      className,
      sqnNmbr,
      unbxdId,
      labels,
      isFavoriteView,
    } = this.props;
    const itemNotAvailable = availability === AVAILABILITY.SOLDOUT;

    const prodNameAltImages = longProductTitle || name;
    const {
      selectedColorProductId,
      // error,
      currentImageIndex,
      pdpUrl,
      isInDefaultWishlist,
    } = this.state;

    const curentColorEntry = getMapSliceForColorProductId(colorsMap, selectedColorProductId);
    const imageUrls = getImagesToDisplay({
      imagesByColor,
      curentColorEntry,
      isAbTestActive: isOnModelImgDisplay,
    });
    const imageUrlsToShow = this.getImageCarouselOptions(imageUrls);
    const currentColorMiscInfo =
      (curentColorEntry &&
        (this.colorsExtraInfo[curentColorEntry.color.name] || curentColorEntry.miscInfo)) ||
      {};
    const {
      listPrice = itemListPrice,
      offerPrice = itemOfferPrice,
      // isBopisEligible,
      badge1,
      badge2,
      badge3,
      //  isClearance,
      //  isBossEligible,
      keepAlive = keepAliveFlag,
    } = currentColorMiscInfo;
    // const miscInfo = {
    //   isBossEligible,
    //   isBopisEligible,
    //   isClearance,
    // };
    const isKeepAlive = keepAlive && isKeepAliveKillSwitch;
    const topBadge = getTopBadge(isMatchingFamily, badge1);
    const listPriceForColor = listPrice * currencyExchange[0].exchangevalue;
    const offerPriceForColor = offerPrice * currencyExchange[0].exchangevalue;
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
            keepAlive={isKeepAlive}
          />
          {EditButton(
            { onQuickViewOpenClick, isFavoriteView, labels },
            selectedColorProductId,
            itemNotAvailable
          )}
          {
            <Row fullBleed className="product-wishlist-container">
              <Col colSize={{ small: 4, medium: 6, large: 10 }}>
                <BodyCopy
                  dataLocator={getLocator('global_Extended_sizes_text')}
                  fontWeight="extrabold"
                  fontFamily="secondary"
                  fontSize={['fs10', 'fs12', 'fs14']}
                >
                  {badge2 && badge2.toUpperCase()}
                </BodyCopy>
              </Col>
              {WishListIcon(
                isFavoriteView,
                isInDefaultWishlist,
                this.handleAddToWishlist,
                itemNotAvailable
              )}
            </Row>
          }
          {this.getProductPriceSection(listPriceForColor, offerPriceForColor, badge3, isShowBadges)}

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

          {this.getColorChipContainer(curentColorEntry)}

          {this.getPromotionalMessageComponent(
            promotionalMessageModified,
            promotionalPLCCMessageModified
          )}
          <div className="fulfillment-section">{this.renderSubmitButton(itemNotAvailable)}</div>
          {!itemNotAvailable && (
            <div className="favorite-move-purchase-section">
              {PurchaseSection(quantity, labels, quantityPurchased)}
              {this.renderMoveItem(itemId)}
            </div>
          )}
          {/* {error && <ErrorMessage error={error} />} */}
        </div>
      </li>
    );
  }
}

export default withStyles(ProductsGridItem, styles);
export { ProductsGridItem as ProductsGridItemVanilla };
