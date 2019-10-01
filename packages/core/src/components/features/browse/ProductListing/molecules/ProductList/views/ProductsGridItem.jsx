/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import productGridItemPropTypes from '../propTypes/ProductGridItemPropTypes';
import Button from '../../../../../../common/atoms/Button';
import { getLocator } from '../../../../../../../utils';
import { getImagesToDisplay, getMapSliceForColorProductId } from '../utils/productsCommonUtils';
// import { ProductRating } from './ProductRating';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ProductsGridItem.style';
import { getPromotionalMessage } from '../utils/utility';

import {
  ProductTitle,
  ProductPricesSection,
  ProductWishlistIcon,
  BadgeItem,
  PromotionalMessage,
} from './ProductItemComponents';
import ProductColorChipWrapper from './ProductColorChipWrapper';

import ProductAltImages from './ProductAltImages';

// import ErrorMessage from './ErrorMessage';
import { BodyCopy, Col, Row } from '../../../../../../common/atoms';

class ProductsGridItem extends React.PureComponent {
  static propTypes = { ...productGridItemPropTypes };

  constructor(props) {
    super(props);

    this.colorsExtraInfo = {
      [props.item.colorsMap[0].color.name]: props.item.colorsMap[0].miscInfo,
    };

    const { colorProductId } = props.item.colorsMap[0];

    this.state = {
      isInDefaultWishlist: props.item.miscInfo.isInDefaultWishlist,
      selectedColorProductId: colorProductId,
      currentImageIndex: 0,
      pdpUrl: props.item.productInfo.pdpUrl,
      isAltImgRequested: false,
    };

    this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
    this.handleOpenAltImages = this.handleOpenAltImages.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleQuickViewOpenClick = this.handleQuickViewOpenClick.bind(this);
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

  // DT-32496
  // When using the back button isInDefaultWishlist gets set to undefined in constructor
  // Need to update the value when we receive the latest props
  componentWillReceiveProps(nextProps) {
    const {
      item: {
        miscInfo: { isInDefaultWishlist },
      },
    } = nextProps;

    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isInDefaultWishlist === undefined) {
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

  getQuickViewInitialValues() {
    const {
      item: { colorsMap },
    } = this.props;
    const { selectedColorProductId } = this.state;
    const colorEntry = colorsMap.find(entry => entry.colorProductId === selectedColorProductId);
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

  handleAddToWishlist = () => {
    const {
      item: {
        productInfo: { generalProductId },
      },
      onAddItemToFavorites,
    } = this.props;
    const { selectedColorProductId } = this.state;
    this.setError();
    onAddItemToFavorites(selectedColorProductId || generalProductId)
      .then(() => this.setState({ isInDefaultWishlist: true }))
      .catch(err => this.setError(err));
  };

  renderQuickViewCardOrLink = () => {};

  handleOpenAltImages = () => {
    const { isAltImgRequested } = this.state;
    if (isAltImgRequested) {
      return;
    }
    this.setState({ isAltImgRequested: true });
  };

  /* getTopBadge  */
  getTopBadge = (isMatchingFamily, badge1) => {
    return isMatchingFamily && badge1.matchBadge
      ? badge1.matchBadge
      : badge1 && badge1.defaultBadge;
  };

  /* get video url */
  getVideoUrl = curentColorEntry => {
    return Array.isArray(curentColorEntry.miscInfo.videoUrl)
      ? curentColorEntry.miscInfo.videoUrl[0]
      : '';
  };

  /* get color chip component */
  getColorChipContainer = curentColorEntry => {
    const {
      isMobile,
      item: { colorsMap },
      isPLPredesign,
    } = this.props;
    return colorsMap.length >= 1 ? (
      <ProductColorChipWrapper
        className="color-chips-container"
        onChipClick={this.handleChangeColor}
        maxVisibleItems={5}
        selectedColorId={curentColorEntry.color.name}
        colorsMap={colorsMap}
        isMobile={isMobile}
        showColorEvenOne
        isPLPredesign={isPLPredesign}
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

  handleQuickViewOpenClick() {
    const { onQuickViewOpenClick } = this.props;
    const { selectedColorProductId } = this.state;
    onQuickViewOpenClick({
      colorProductId: selectedColorProductId,
    });
  }

  handleChangeColor(colorProductId) {
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
  }

  render() {
    const {
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
          // eslint-disable-next-line camelcase
          long_product_title,
        },
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
    } = this.props;

    // eslint-disable-next-line camelcase
    const prodNameAltImages = long_product_title || name;
    // eslint-disable-next-line no-unused-vars
    const {
      isInDefaultWishlist,
      selectedColorProductId,
      // error,
      currentImageIndex,
      pdpUrl,
    } = this.state;

    const curentColorEntry = getMapSliceForColorProductId(colorsMap, selectedColorProductId);
    const imageUrls = getImagesToDisplay({
      imagesByColor,
      curentColorEntry,
      isAbTestActive: isOnModelImgDisplay,
    });

    const imageUrlsToShow = this.getImageCarouselOptions(imageUrls);

    const currentColorMiscInfo =
      this.colorsExtraInfo[curentColorEntry.color.name] || curentColorEntry.miscInfo || {};

    const {
      listPrice,
      offerPrice,
      // isBopisEligible,
      badge1,
      badge2,
      badge3,
      //  isClearance,
      //  isBossEligible,
      keepAlive,
    } = currentColorMiscInfo;
    // const miscInfo = {
    //   isBossEligible,
    //   isBopisEligible,
    //   isClearance,
    // };
    const isKeepAlive = keepAlive && isKeepAliveKillSwitch;

    const topBadge = this.getTopBadge(isMatchingFamily, badge1);

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

    const videoUrl = this.getVideoUrl(curentColorEntry);

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
              <Col colSize={{ small: 2, medium: 2, large: 2 }}>
                <ProductWishlistIcon
                  onClick={this.handleAddToWishlist}
                  activeButton={isInDefaultWishlist}
                  className="fav-icon"
                />
              </Col>
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
          <div className="fulfillment-section">
            <Button
              className="added-to-bag"
              fullWidth
              buttonVariation="fixed-width"
              dataLocator={getLocator('global_addtocart_Button')}
              onClick={this.handleQuickViewOpenClick}
            >
              {labels.addToBag}
            </Button>
          </div>

          {/* {error && <ErrorMessage error={error} />} */}
        </div>
      </li>
    );
  }
}

ProductsGridItem.defaultProps = {
  //  isBopisEnabled: false,
  onPickUpOpenClick: () => {},
  onQuickBopisOpenClick: () => {},
  onAddItemToFavorites: () => {},
  isInternationalShipping: false,
  isPLPredesign: true,
  siblingProperties: false,
  isShowVideoOnPlp: false,
  isMatchingFamily: false,
  isKeepAliveKillSwitch: false,
  loadedProductCount: 1,
  // isPLPShowPickupCTA: true,
  currencyExchange: {
    exchangevalue: 0,
  },
};

export default withStyles(ProductsGridItem, styles);
export { ProductsGridItem as ProductsGridItemVanilla };
