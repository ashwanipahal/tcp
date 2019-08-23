/* eslint-disable extra-rules/no-commented-out-code */
/** @module ProductsGridItem
 * @summary renders a single product in a PLP.
 *
 * @author Gabriel Gomez
 * @author Miguel
 * @author Ben
 */
import React from 'react';
import productGridItemPropTypes from './ProductGridItemPropTypes';
import Button from '../../../../../../common/atoms/Button';
import { getLocator } from '../../../../../../../utils';

import { getImagesToDisplay, getMapSliceForColorProductId } from '../utils/productsCommonUtils';

// import { ProductRating } from './ProductRating';

import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ProductsGridItem.style';

import {
  getPromotionalMessage,
  // validateBossEligibility,
  // validateBopisEligibility,
} from '../utils/utility';

import {
  ProductTitle,
  ProductPricesSection,
  ProductWishlistIcon,
  // ProductPickupIcon,
  BadgeItem,
  PromotionalMessage,
} from './ProductItemComponents';
import ProductColorChips from './ProductColorChips';

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
    this.handlePickupOpenClick = this.handlePickupOpenClick.bind(this);
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
      <ProductColorChips
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
    const { currencySymbol, isPLPredesign } = this.props;
    return (
      !isPLPredesign && (
        <ProductPricesSection
          currencySymbol={currencySymbol || '$'}
          listPrice={listPriceForColor}
          offerPrice={offerPriceForColor}
          noMerchantBadge={badge3}
          merchantTag={isShowBadges ? badge3 : null}
          hidePrefixListPrice
        />
      )
    );
  };

  /* function to return promotional message component */
  getPromotionalMessageComponent = (promotionalMessage, promotionalPLCCMessage) => {
    const {
      isCanada,
      isPlcc,
      isInternationalShipping,

      isPLPredesign,
    } = this.props;
    return (
      !isPLPredesign &&
      !isCanada &&
      !isInternationalShipping && (
        <PromotionalMessage
          message={getPromotionalMessage(isPlcc, {
            promotionalMessage,
            promotionalPLCCMessage,
          })}
        />
      )
    );
  };

  handlePickupOpenClick() {
    const {
      item: {
        colorsMap,
        productInfo: { generalProductId },
      },
      onPickUpOpenClick,
    } = this.props;
    const { selectedColorProductId } = this.state;
    const colorEntry = getMapSliceForColorProductId(colorsMap, selectedColorProductId);
    onPickUpOpenClick(
      generalProductId,
      { color: colorEntry && colorEntry.color.name },
      selectedColorProductId,
      generalProductId,
      colorEntry.miscInfo.isBopisEligible,
      colorEntry.miscInfo.isBossEligible
    );
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

  handleQuickBopisOpenClick() {
    const {
      item: {
        colorsMap,
        productInfo: { generalProductId },
      },
      onQuickBopisOpenClick,
    } = this.props;

    const { selectedColorProductId } = this.state;
    const colorEntry = getMapSliceForColorProductId(colorsMap, selectedColorProductId);
    onQuickBopisOpenClick(
      generalProductId,
      { color: colorEntry && colorEntry.color.name },
      selectedColorProductId,
      generalProductId
    );
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
        // eslint-disable-next-line camelcase
        productInfo: { generalProductId, name, long_product_title },
        productInfo: { promotionalMessage, promotionalPLCCMessage },
        colorsMap,
        imagesByColor,
      },
      // isGridView,
      // isProductsGridCTAView,
      // isCanada,
      // isPlcc,
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

    // const itemContainerClassName = cssClassName(
    //   'item-container ',
    //   { 'grid-cta-enabled ': isProductsGridCTAView },
    //   { 'item-container-v1 ': isPLPredesign },
    //   { 'even ': isEvenElement }
    // );

    return (
      <li
        className={className}
        key={generalProductId}
        onMouseEnter={this.handleOpenAltImages}
        onMouseOut={this.handleCloseAltImages}
        onBlur={this.handleCloseAltImages}
      >
        <div className="item-container-inner">
          {/* <div className="item-button-container">
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
          </div> */}
          {
            <BadgeItem
              isShowBadges={isShowBadges}
              className="top-badge-container"
              text={topBadge}
              haveSpace
            />
          }
          <ProductAltImages
            pdpUrl={pdpUrl}
            videoUrl={videoUrl}
            loadedProductCount={loadedProductCount}
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
          {
            <Row fullBleed>
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
          {/* {!isPLPredesign &&
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
            ))} */}
          {/* {isPLPredesign && isShowBadges && (
            <BadgeItem className="inline-badge-container" text={badge2} haveSpace />
          )} */}

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
          {/* {!isPLPredesign && (
            <ProductPricesSection
              currencySymbol={currencySymbol}
              listPrice={listPriceForColor}
              offerPrice={offerPriceForColor}
              noMerchantBadge={badge3}
            />
          )} */}
          {this.getColorChipContainer(curentColorEntry)}

          {/* {!isPLPredesign && isShowBadges && (
            <BadgeItem className="merchant-badge-container" text={badge3} />
          )} */}
          {/* {isPLPredesign && !isCanada && !isInternationalShipping && (
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
          )} */}

          {this.getPromotionalMessageComponent(
            promotionalMessageModified,
            promotionalPLCCMessageModified
          )}

          {/* {
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
          } */}
          <div>
            <Button
              className="added-to-bag"
              fullWidth
              buttonVariation="fixed-width"
              dataLocator={getLocator('global_addtocart_Button')}
            >
              ADD TO BAG
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
  isPLPredesign: false,
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
