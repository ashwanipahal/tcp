/* eslint-disable */
/** @module ProductsGridItem
 * @summary renders a single product in a PLP.
 *
 * @author Gabriel Gomez
 * @author Miguel
 * @author Ben
 */
/* eslint-disable */
import React from 'react';
import { PropTypes } from 'prop-types';

import { getImagesToDisplay, getMapSliceForColorProductId } from '../utils/productsCommonUtils';

import { ProductRating } from './ProductRating';

import {
  MISC_INFO_PROP_TYPES_SHAPE,
  PRODUCT_INFO_PROP_TYPE_SHAPE,
  COLOR_PROP_TYPE,
  PRODUCT_INFO_PROP_TYPES,
} from '../propTypes/productsAndItemsPropTypes';

import cssClassName from '../utils/cssClassName';

import {
  getPromotionalMessage,
  validateBossEligibility,
  validateBopisEligibility,
} from '../utils/utility';

import {
  ProductTitle,
  ProductPricesSection,
  ProductWishlistIcon,
  ProductPickupIcon,
  BadgeItem,
  PromotionalMessage,
} from './ProductItemComponents';

import { ProductColorChips } from './ProductColorChips';

import { ProductAltImages } from './ProductAltImages';

import ErrorMessage from './ErrorMessage';

export default class ProductsGridItem extends React.PureComponent {
  static propTypes = {
    currencyExchange: PropTypes.shape({
      exchangevalue: PropTypes.number,
    }),
    /** */
    isMobile: PropTypes.bool.isRequired,

    item: PropTypes.shape({
      productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
      miscInfo: MISC_INFO_PROP_TYPES_SHAPE.isRequired,

      colorsMap: PropTypes.arrayOf(
        PropTypes.shape({
          color: COLOR_PROP_TYPE.isRequired,
          colorProductId: PropTypes.string.isRequired,
          miscInfo: MISC_INFO_PROP_TYPES_SHAPE.isRequired,
        })
      ).isRequired,

      imagesByColor: PRODUCT_INFO_PROP_TYPES.imagesByColor.isRequired,
      sqnNmbr: PropTypes.number.isRequired,

      /* TODO: Per Ben's request, commenting availability until Product defines what to do with badges */
      // availability: ITEM_INFO_PROP_TYPES.availability.isRequired
    }),

    /** When flase, flags that BOPIS is globaly disabled */
    isBopisEnabled: PropTypes.bool,
    /** flags whether to show the quickview card */
    isShowQuickView: PropTypes.bool.isRequired,
    /** callback for clicks on quickView CTAs. Accepts: generalProductId, colorProductId */
    onQuickViewOpenClick: PropTypes.func.isRequired,

    /** callback for clicks on BOPIS CTAs. Accepts: generalProductId, initialValues, colorProductId. Required if isBopisEnabled prop is true. */
    onPickUpOpenClick: PropTypes.func,
    /** callback for clicks on wishlist CTAs. Accepts: colorProductId. */
    onAddItemToFavorites: PropTypes.func,

    /** indicates monies symbol to represent the product's currency */
    currencySymbol: PropTypes.string.isRequired,

    /**
     *  Callback to trigger when the user chooses to display a different color.
     *  Accepts colorProductId.
     *  Returns a promise that resolves to an object with the structure MISC_INFO_PROP_TYPES_SHAPE.
     */
    // onColorChange: PropTypes.func.isRequired,

    /** Mobile Two column mobile AB Test */
    isGridView: PropTypes.bool.isRequired,

    /** This unbxd request ID will be passed to UNXD product click anlytics as request ID */
    unbxdId: PropTypes.string.isRequired,

    isCanada: PropTypes.bool.isRequired,
    isPlcc: PropTypes.bool.isRequired,

    /* This is the flag that will tell the component if it should render the onModel images and not the regular ones */
    isOnModelImgDisplay: PropTypes.bool.isRequired,
    /* We are available to know if is an international shipping */
    isInternationalShipping: PropTypes.bool,

    /* This is AB test for Pickup CTA */
    isPLPShowPickupCTA: PropTypes.bool,
  };

  static defaultProps = {
    isPLPShowPickupCTA: true,
    currencyExchange: {
      exchangevalue: 0,
    },
  };

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
    this.handlePickupOpenClick = this.handlePickupOpenClick.bind(this);
    this.handleOpenQuickViewClick = () =>
      this.props.onQuickViewOpenClick(
        this.props.item.productInfo.generalProductId,
        this.state.selectedColorProductId,
        this.props.item.productInfo.generalProductId
      );
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

    if (this.state.isInDefaultWishlist === undefined) {
      this.setState({ isInDefaultWishlist });
    }
    const { colorsMap } = this.props.item;
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
    const colorEntry = colorsMap.find(
      entry => entry.colorProductId === this.state.selectedColorProductId
    );
    return colorEntry && colorEntry.color && colorEntry.color.name
      ? { color: colorEntry.color.name }
      : undefined;
  }

  handlePickupOpenClick() {
    let colorEntry = getMapSliceForColorProductId(
      this.props.item.colorsMap,
      this.state.selectedColorProductId
    );
    this.props.onPickUpOpenClick(
      this.props.item.productInfo.generalProductId,
      { color: colorEntry && colorEntry.color.name },
      this.state.selectedColorProductId,
      this.props.item.productInfo.generalProductId,
      colorEntry.miscInfo.isBopisEligible,
      colorEntry.miscInfo.isBossEligible
    );
  }

  handleChangeColor(colorProductId, colorName) {
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

    const color = this.state.selectedColorProductId.replace(searchvalue, newvalue);
    const selectedColor = colorProductId.replace(searchvalue, newvalue);

    this.state.pdpUrl = this.state.pdpUrl.replace(color, selectedColor);
    if (this.colorsExtraInfo[colorName]) {
      // if already loaded the extra info for this color
      this.setState({ selectedColorProductId: colorProductId, currentImageIndex: 0 });
    } else {
      this.setState({ selectedColorProductId: colorProductId, currentImageIndex: 0 });
    }
  }

  handleQuickBopisOpenClick() {
    const colorEntry = getMapSliceForColorProductId(
      this.props.item.colorsMap,
      this.state.selectedColorProductId
    );
    this.props.onQuickBopisOpenClick(
      this.props.item.productInfo.generalProductId,
      { color: colorEntry && colorEntry.color.name },
      this.state.selectedColorProductId,
      this.props.item.productInfo.generalProductId
    );
  }

  handleAddToWishlist() {}

  renderQuickViewCardOrLink = () => {};

  handleOpenAltImages() {
    const { isAltImgRequested } = this.state;

    if (isAltImgRequested) {
      return;
    }

    this.setState({ isAltImgRequested: true });
  }

  render() {
    const {
      isShowVideoOnPlp,
      isMobile,
      currencySymbol,
      isBopisEnabled,
      currencyExchange,
      isBopisEnabledForClearance,
      isBossClearanceProductEnabled,
      isBossEnabled,
      item: {
        productInfo: { generalProductId, name, long_product_title },
        colorsMap,
        imagesByColor,
      },
      isGridView,
      isProductsGridCTAView,
      isCanada,
      isPlcc,
      isOnModelImgDisplay,
      isInternationalShipping,
      isPLPShowPickupCTA,
      isMatchingFamily,
      isEvenElement,
      siblingProperties,
      isPLPredesign,
      isKeepAliveKillSwitch,
    } = this.props;
    const prodNameAltImages = long_product_title || name;
    const { isInDefaultWishlist, selectedColorProductId, error, currentImageIndex } = this.state;

    const curentColorEntry = getMapSliceForColorProductId(colorsMap, selectedColorProductId);
    const imageUrls = getImagesToDisplay({
      imagesByColor,
      curentColorEntry,
      isAbTestActive: isOnModelImgDisplay,
    });

    const currentColorMiscInfo =
      this.colorsExtraInfo[curentColorEntry.color.name] || curentColorEntry.miscInfo || {};

    const {
      listPrice,
      offerPrice,
      isBopisEligible,
      badge1,
      badge2,
      badge3,
      isClearance,
      isBossEligible,
      keepAlive,
    } = currentColorMiscInfo;
    let miscInfo = {
      isBossEligible,
      isBopisEligible,
      isClearance,
    };
    const isKeepAlive = keepAlive && isKeepAliveKillSwitch;
    const topBadge =
      isMatchingFamily && badge1.matchBadge ? badge1.matchBadge : badge1.defaultBadge;
    const listPriceForColor = listPrice * currencyExchange[0].exchangevalue;
    const offerPriceForColor = offerPrice * currencyExchange[0].exchangevalue;
    const isShowPickupCTA =
      validateBopisEligibility({
        isBopisClearanceProductEnabled: isBopisEnabledForClearance,
        isBopisEnabled,
        miscInfo,
      }) || validateBossEligibility({ isBossClearanceProductEnabled, isBossEnabled, miscInfo });
    let isShowBadges = currentImageIndex === 0;
    // NOTE: isClearance is a string 'Clearance', not a boolean we should clean this up globally in the abstractor
    let sqnNmb = this.props.sqnNmbr;
    let unbxdId = this.props.unbxdId;
    const ratings = this.props.item.productInfo.ratings || 0;
    const reviews = this.props.item.productInfo.reviewsCount || 0;
    const promotionalMessage = this.props.item.productInfo.promotionalMessage || '';
    const promotionalPLCCMessage = this.props.item.productInfo.promotionalPLCCMessage || '';
    const videoUrl = Array.isArray(curentColorEntry.miscInfo.videoUrl)
      ? curentColorEntry.miscInfo.videoUrl[0]
      : '';
    const itemContainerClassName = cssClassName(
      'item-container ',
      { 'grid-cta-enabled ': isProductsGridCTAView },
      { 'item-container-v1 ': isPLPredesign },
      { 'even ': isEvenElement }
    );

    return (
      <li
        className={itemContainerClassName}
        key={generalProductId}
        onMouseEnter={this.handleOpenAltImages}
        onMouseOut={this.handleCloseAltImages}
        onBlur={this.handleCloseAltImages}
      >
        <div className="item-container-inner">
          <div className="item-button-container">
            {!isKeepAlive && !isMobile && this.renderQuickViewCardOrLink()}
            {!isPLPredesign && (
              <ProductWishlistIcon
                onClick={this.handleAddToWishlist}
                activeButton={isInDefaultWishlist}
                keepAlive={isKeepAlive}
              />
            )}
            {!isMobile && isPLPShowPickupCTA && (
              <ProductPickupIcon
                isMobile={isMobile}
                onClick={this.handlePickupOpenClick}
                isShowBopisButton={isShowPickupCTA}
                keepAlive={isKeepAlive}
              />
            )}
          </div>
          {isShowBadges && <BadgeItem className="top-badge-container" text={topBadge} haveSpace />}
          <ProductAltImages
            pdpUrl={this.state.pdpUrl}
            videoUrl={videoUrl}
            loadedProductCount={this.props.loadedProductCount}
            imageUrls={imageUrls}
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
          {isPLPredesign && (
            <div className="item-button-container fav-container">
              <ProductWishlistIcon
                onClick={this.handleAddToWishlist}
                activeButton={isInDefaultWishlist}
              />
            </div>
          )}
          {!isPLPredesign &&
            (colorsMap.length > 1 ? (
              <ProductColorChips
                onChipClick={this.handleChangeColor}
                maxVisibleItems={isGridView ? 4 : 5}
                selectedColorId={curentColorEntry.color.name}
                colorsMap={colorsMap}
                isMobile={isMobile}
              />
            ) : (
              <div className="empty-color-chips-container" />
            ))}
          {isPLPredesign && isShowBadges && (
            <BadgeItem className="inline-badge-container" text={badge2} haveSpace />
          )}
          {isPLPredesign && (
            <ProductPricesSection
              currencySymbol={currencySymbol}
              listPrice={listPriceForColor}
              offerPrice={offerPriceForColor}
              noMerchantBadge={badge3}
              merchantTag={isShowBadges ? badge3 : null}
              hidePrefixListPrice
            />
          )}
          <ProductTitle
            name={name}
            pdpUrl={this.state.pdpUrl}
            loadedProductCount={this.props.loadedProductCount}
            analyticsData={{
              pId: generalProductId,
              prank: sqnNmb,
              requestId: unbxdId,
            }}
          >
            {!isPLPredesign && isShowBadges && (
              <BadgeItem className="inline-badge-container" text={badge2} />
            )}
          </ProductTitle>
          {!isPLPredesign && (
            <ProductPricesSection
              currencySymbol={currencySymbol}
              listPrice={listPriceForColor}
              offerPrice={offerPriceForColor}
              noMerchantBadge={badge3}
            />
          )}
          {isPLPredesign &&
            (colorsMap.length >= 1 ? (
              <ProductColorChips
                onChipClick={this.handleChangeColor}
                maxVisibleItems={5}
                selectedColorId={curentColorEntry.color.name}
                colorsMap={colorsMap}
                isMobile={isMobile}
                showColorEvenOne
                isPLPredesign
              />
            ) : (
              siblingProperties &&
              siblingProperties.colorsMap.length > 1 && (
                <div className="empty-color-chips-container" />
              )
            ))}
          {!isPLPredesign && isShowBadges && (
            <BadgeItem className="merchant-badge-container" text={badge3} />
          )}
          {!isPLPredesign && !!ratings && <ProductRating ratings={ratings} reviews={reviews} />}
          {isPLPredesign && !isCanada && !isInternationalShipping && (
            <PromotionalMessage
              wrapperClassName="promotion-message-container-v1"
              message={getPromotionalMessage(isPlcc, {
                promotionalMessage: promotionalMessage,
                promotionalPLCCMessage: promotionalPLCCMessage,
              })}
              haveSpace={
                siblingProperties &&
                (!!siblingProperties.promotionalMessage ||
                  !!siblingProperties.promotionalPLCCMessage)
              }
            />
          )}
          {isMobile && (
            <div className="buttons-container__all-buttons">
              {!isKeepAlive && this.renderQuickViewCardOrLink()}
              {isKeepAlive && (
                <button
                  type="button"
                  aria-label="Out of Stock"
                  disabled
                  className="bag-button-oos-on-plp"
                >
                  <span>Out of Stock</span>
                </button>
              )}
              {!isPLPredesign && isPLPShowPickupCTA && (
                <ProductPickupIcon
                  isMobile={isMobile}
                  onClick={this.handlePickupOpenClick}
                  isShowBopisButton={isShowPickupCTA}
                  isProductsGridCTAView={isProductsGridCTAView}
                />
              )}
              {(!isShowPickupCTA || !isPLPShowPickupCTA) && <div className="bopis-placeholder" />}
            </div>
          )}
          {!isPLPredesign && !isCanada && !isInternationalShipping && (
            <PromotionalMessage
              message={getPromotionalMessage(isPlcc, {
                promotionalMessage: promotionalMessage,
                promotionalPLCCMessage: promotionalPLCCMessage,
              })}
            />
          )}
          {error && <ErrorMessage error={error} />}
          {isMobile && <div className="button-spacer__all-buttons-spacer" />}
        </div>
      </li>
    );
  }
}
