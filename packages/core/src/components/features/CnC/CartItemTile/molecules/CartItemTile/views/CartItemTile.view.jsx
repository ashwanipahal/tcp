/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import ItemAvailability from '@tcp/core/src/components/features/CnC/common/molecules/ItemAvailability';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils';
import {
  validateBossEligibility,
  validateBopisEligibility,
} from '@tcp/core/src/components/common/organisms/ProductPickup/util';
import { KEY_CODES } from '@tcp/core/src/constants/keyboard.constants';
import ProductEditForm from '../../../../../../common/molecules/ProductCustomizeForm';
import CartItemRadioButtons from '../../CartItemRadioButtons/views/CartItemRadioButtons.view';
import { Image, Row, BodyCopy, Col } from '../../../../../../common/atoms';
import { getIconPath, getLocator, isCanada, disableBodyScroll } from '../../../../../../../utils';
import getModifiedString from '../../../utils';
import styles from '../styles/CartItemTile.style';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import CONSTANTS from '../../../../Checkout/Checkout.constants';
import DamImage from '../../../../../../common/atoms/DamImage';

class CartItemTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  componentWillUnmount() {
    this.clearToggleErrorState();
  }

  clearToggleErrorState = () => {
    const { pageView, clearToggleError } = this.props;
    if (pageView === 'myBag') {
      clearToggleError();
    }
  };

  toggleFormVisibility = () => {
    const { isEdit } = this.state;
    this.setState({ isEdit: !isEdit });
    this.toggleEditLinkVisibility();
  };

  toggleEditLinkVisibility = () => {
    const { toggleEditAllowance } = this.props;
    toggleEditAllowance();
  };

  handleEditCartItem = (pageView, itemBrand, productNumber) => {
    if (pageView !== 'myBag') {
      const productNum = productNumber.slice(0, productNumber.indexOf('_'));
      this.toggleFormVisibility();
      const { getProductSKUInfo } = this.props;
      getProductSKUInfo({ productNum, itemBrand });
    } else {
      const { onQuickViewOpenClick, productDetail } = this.props;
      const { itemId, qty, color, size, fit } = productDetail.itemInfo;
      onQuickViewOpenClick({
        colorProductId: productNumber,
        orderInfo: {
          orderItemId: itemId,
          selectedQty: qty,
          selectedColor: color,
          selectedSize: size,
          selectedFit: fit,
          itemBrand,
        },
      });
    }
  };

  /**
   *
   * @method handleEditCartItemWithStore
   * @description this method handles edit for cart item for boss/bopis item
   * @memberof CartItemTile
   */
  handleEditCartItemWithStore = (changeStoreType, openSkuSelectionForm = false) => {
    const { onPickUpOpenClick, productDetail, orderId } = this.props;
    const { itemId, qty, color, size, fit, itemBrand } = productDetail.itemInfo;
    const { store, orderItemType } = productDetail.miscInfo;
    const { productPartNumber } = productDetail.productInfo;
    const isItemShipToHome = !store;
    const isBopisCtaEnabled = changeStoreType === CARTPAGE_CONSTANTS.BOPIS;
    const isBossCtaEnabled = changeStoreType === CARTPAGE_CONSTANTS.BOSS;
    onPickUpOpenClick({
      colorProductId: productPartNumber,
      orderInfo: {
        orderItemId: itemId,
        Quantity: qty,
        color,
        Size: size,
        Fit: fit,
        orderId,
        orderItemType,
        itemBrand,
      },
      openSkuSelectionForm,
      isBopisCtaEnabled,
      isBossCtaEnabled,
      isItemShipToHome,
    });
  };

  callEditMethod = () => {
    const { productDetail, pageView } = this.props;
    const {
      miscInfo: { orderItemType },
    } = productDetail;
    disableBodyScroll();
    if (orderItemType === CARTPAGE_CONSTANTS.ECOM) {
      this.handleEditCartItem(
        pageView,
        productDetail.itemInfo.itemBrand,
        productDetail.productInfo.productPartNumber
      );
    } else if (pageView === 'myBag') {
      const openSkuSelectionForm = true;
      this.handleEditCartItemWithStore(orderItemType, openSkuSelectionForm);
    }
  };

  handleKeyDown = (event, callback) => {
    const { KEY_ENTER, KEY_SPACE } = KEY_CODES;
    const { which } = event;
    if (which === KEY_ENTER || which === KEY_SPACE) {
      callback();
    }
  };

  handleMoveItemtoSaveList = () => {
    const {
      productDetail,
      sflItemsCount,
      sflMaxCount,
      isCondense,
      isGenricGuest,
      addItemToSflList,
      setCartItemsSflError,
      labels,
    } = this.props;
    const {
      itemInfo: { itemId, isGiftItem },
      productInfo: { skuId, generalProductId },
    } = productDetail;
    const catEntryId = isGiftItem ? generalProductId : skuId;
    const userInfoRequired = isGenricGuest && isGenricGuest.get('userId') && isCondense; // Flag to check if getRegisteredUserInfo required after SflList

    this.clearToggleErrorState();

    if (sflItemsCount >= sflMaxCount) {
      return setCartItemsSflError(labels.sflMaxLimitError);
    }
    const payloadData = { itemId, catEntryId, userInfoRequired };
    return addItemToSflList({ ...payloadData });
  };

  removeSflItem = () => {
    const { productDetail, startSflItemDelete } = this.props;
    const {
      itemInfo: { isGiftItem },
      productInfo: { skuId, generalProductId },
    } = productDetail;
    const catEntryId = isGiftItem ? generalProductId : skuId;

    const payloadData = { catEntryId };
    this.clearToggleErrorState();
    return startSflItemDelete({ ...payloadData });
  };

  moveToBagSflItem = () => {
    const { productDetail, startSflDataMoveToBag } = this.props;
    const {
      itemInfo: { itemId, isGiftItem },
      productInfo: { skuId, generalProductId },
    } = productDetail;
    const catEntryId = isGiftItem ? generalProductId : skuId;

    const payloadData = { itemId, catEntryId };
    this.clearToggleErrorState();
    return startSflDataMoveToBag({ ...payloadData });
  };

  handleSubmit = (itemId, skuId, quantity, itemPartNumber, variantNo) => {
    const { updateCartItem } = this.props;
    this.clearToggleErrorState();
    updateCartItem(itemId, skuId, quantity, itemPartNumber, variantNo);
    this.toggleFormVisibility();
  };

  getBossBopisDetailsForMiniBag = (productDetail, labels) => {
    return (
      <Col className="padding-left-13" colSize={{ small: 4, medium: 6, large: 8 }}>
        {productDetail.miscInfo.store && (
          <BodyCopy
            fontFamily="secondary"
            color="gray.600"
            component="span"
            fontSize="fs10"
            fontWeight={['extrabold']}
          >
            {getModifiedString(
              labels,
              productDetail.miscInfo.store,
              productDetail.miscInfo.orderItemType,
              productDetail.miscInfo.bossStartDate,
              productDetail.miscInfo.bossEndDate
            )}
          </BodyCopy>
        )}
      </Col>
    );
  };

  getBadgeDetails = productDetail => {
    return (
      <Row className="product-detail-row">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <BodyCopy
            fontFamily="secondary"
            tag="span"
            fontSize="fs10"
            fontWeight={['extrabold']}
            dataLocator="addedtobag-productname"
          >
            {productDetail.miscInfo.badge}
          </BodyCopy>
        </Col>
      </Row>
    );
  };

  renderSflActionsLinks = () => {
    const { productDetail, isShowSaveForLater, labels, isBagPageSflSection } = this.props;
    const { isEdit } = this.state;
    if (isEdit) return null;
    if (
      !isBagPageSflSection &&
      productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY.OK &&
      isShowSaveForLater
    ) {
      return (
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs12"
          component="p"
          fontWeight={['semibold']}
          dataLocator="saveForLaterLink"
          className="sflActions"
          onClick={() => {
            this.handleMoveItemtoSaveList();
          }}
        >
          {labels.saveForLaterLink}
        </BodyCopy>
      );
    }
    if (
      isBagPageSflSection &&
      productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY.OK
    ) {
      return (
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs12"
          component="p"
          fontWeight={['semibold']}
          dataLocator="moveToBagLink"
          className="sflActions"
          onClick={() => {
            this.moveToBagSflItem();
          }}
        >
          {labels.moveToBagLink}
        </BodyCopy>
      );
    }
    return null;
  };

  removeCartItem = () => {
    const {
      removeCartItem,
      pageView,
      productDetail,
      isGenricGuest,
      isCondense,
      isBagPageSflSection,
    } = this.props;
    const {
      itemInfo: { itemId, isGiftItem, itemBrand },
      productInfo: { skuId, generalProductId },
      miscInfo: { orderItemType },
    } = productDetail;
    const catEntryId = isGiftItem ? generalProductId : skuId;
    const userInfoRequired = isGenricGuest && isGenricGuest.get('userId') && isCondense; // Flag to check if getRegisteredUserInfo required after SflList

    this.clearToggleErrorState();
    removeCartItem({
      itemId,
      pageView,
      catEntryId,
      userInfoRequired,
      isBagPageSflSection,
      itemBrand,
      orderItemType,
    });
  };

  getItemDetails = (productDetail, labels, pageView) => {
    const { isEdit } = this.state;
    const { currencySymbol } = this.props;
    return (
      <Row className={`padding-top-15 padding-bottom-20 parent-${pageView}`} fullBleed>
        {pageView !== 'myBag' && this.getBossBopisDetailsForMiniBag(productDetail, labels)}
        <Col className="save-for-later-label" colSize={{ small: 1, medium: 1, large: 3 }}>
          {productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT && (
            <BodyCopy
              fontFamily="secondary"
              className={pageView !== 'myBag' ? 'updateOOSMiniBag' : 'updateOOSBag'}
              color="error"
              fontSize="fs12"
              component="span"
              dataLocator={getLocator('cart_item_soldOut_remove')}
              onClick={this.removeCartItem}
            >
              {labels.removeEdit}
            </BodyCopy>
          )}
          {productDetail.miscInfo.availability !== CARTPAGE_CONSTANTS.AVAILABILITY.OK &&
            productDetail.miscInfo.availability !== CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT &&
            !isEdit && (
              <BodyCopy
                fontFamily="secondary"
                className={pageView !== 'myBag' ? 'updateOOSMiniBag' : 'updateOOSBag'}
                color="error"
                fontSize="fs12"
                component="span"
                dataLocator={getLocator('cart_item_unavailable_update')}
                onClick={this.callEditMethod}
              >
                {labels.update}
              </BodyCopy>
            )}
          {this.renderSflActionsLinks()}
        </Col>
        {pageView === 'myBag' && (
          <BodyCopy
            className="price-label"
            fontFamily="secondary"
            component="span"
            fontSize="fs16"
            fontWeight={['extrabold']}
            dataLocator={getLocator('cart_item_total_price')}
          >
            {`${currencySymbol}${productDetail.itemInfo.price.toFixed(2)}`}
          </BodyCopy>
        )}
      </Row>
    );
  };

  getColorLabel = (productDetail, labels) => {
    return productDetail.itemInfo.isGiftItem === true ? `${labels.design}:` : `${labels.color}:`;
  };

  getSizeLabel = (productDetail, labels) => {
    return productDetail.itemInfo.isGiftItem === true ? `${labels.value}:` : `${labels.size}:`;
  };

  getPointsColor = () => {
    const { isPlcc } = this.props;
    if (isPlcc) {
      return 'blue.B100';
    }
    return 'orange.800';
  };

  getProductItemUpcNumber = (productDetail, pageView) => {
    if (pageView === 'myBag') {
      return (
        <Row className="product-detail-row">
          <Col className="productImgBrand" colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy
              fontFamily="secondary"
              tag="span"
              fontSize="fs10"
              dataLocator={getLocator('cart_item_upc')}
            >
              {`UPC: ${productDetail.productInfo.upc}`}
            </BodyCopy>
          </Col>
        </Row>
      );
    }
    return '';
  };

  getProductPriceList = (productDetail, pageView) => {
    const { isBagPageSflSection, showOnReviewPage, labels, currencySymbol } = this.props;
    if (isBagPageSflSection) {
      return (
        <>
          {showOnReviewPage && (
            <Col className="label-responsive" colSize={{ large: 3, medium: 3, small: 2 }}>
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs12"
                fontWeight={['extrabold']}
              >
                {`${labels.price}: `}
              </BodyCopy>
            </Col>
          )}
          <Col className="value-responsive" colSize={{ small: 2, medium: 3, large: 8 }}>
            <BodyCopy
              fontFamily="secondary"
              component="span"
              fontSize="fs12"
              dataLocator={getLocator('cart_item_price')}
              fontWeight={['extrabold']}
            >
              {`${currencySymbol}${productDetail.itemInfo.price.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </>
      );
    }
    return (
      <>
        {showOnReviewPage && (
          <Col className="label-responsive" colSize={{ large: 3, medium: 3, small: 2 }}>
            <BodyCopy
              fontFamily="secondary"
              component="span"
              fontSize="fs12"
              fontWeight={['extrabold']}
            >
              {`${labels.price}: `}
            </BodyCopy>
          </Col>
        )}
        <Col className="value-responsive" colSize={{ small: 2, medium: 3, large: 8 }}>
          <BodyCopy
            fontFamily="secondary"
            component="span"
            fontSize={showOnReviewPage ? 'fs12' : 'fs16'}
            dataLocator={getLocator('cart_item_price')}
            fontWeight={['extrabold']}
            className={!showOnReviewPage && 'reviewPagePrice'}
          >
            {pageView === 'myBag'
              ? `${currencySymbol}${productDetail.itemInfo.itemUnitPrice.toFixed(2)}`
              : `${currencySymbol}${productDetail.itemInfo.price.toFixed(2)}`}
          </BodyCopy>
        </Col>
      </>
    );
  };

  getProductPointsList = (productDetail, isBagPageSflSection, showOnReviewPage) => {
    const { labels } = this.props;
    return (
      <>
        {!isCanada() && !isBagPageSflSection && showOnReviewPage && (
          <Row className="product-detail-row label-responsive-wrapper">
            <Col
              className="label-responsive label-responsive-price"
              colSize={{ large: 3, medium: 3, small: 2 }}
            >
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs12"
                fontWeight={['extrabold']}
              >
                {`${labels.points}:`}
              </BodyCopy>
            </Col>
            <Col className="value-responsive" colSize={{ small: 2, medium: 3, large: 3 }}>
              <BodyCopy
                fontFamily="secondary"
                component="span"
                fontSize="fs12"
                fontWeight={['extrabold']}
                color={this.getPointsColor()}
                dataLocator={getLocator('cart_item_points')}
              >
                {productDetail.itemInfo.myPlacePoints}
              </BodyCopy>
            </Col>
          </Row>
        )}
      </>
    );
  };

  getProductFit = productDetail => {
    return !productDetail.itemInfo.fit || productDetail.itemInfo.fit === 'regular'
      ? ' '
      : ` ${productDetail.itemInfo.fit}`;
  };

  getUnavailableHeaderClass = () => {
    const { productDetail } = this.props;
    if (productDetail.miscInfo.availability === 'UNAVAILABLE') {
      return 'unavailable-header';
    }
    return '';
  };

  renderItemQuantity = () => {
    const { isBagPageSflSection, labels, productDetail } = this.props;
    if (isBagPageSflSection) return null;
    return (
      <div>
        <div className="color-size-fit-label color-fit-size-desktop">
          <BodyCopy
            fontFamily="secondary"
            component="span"
            fontSize="fs12"
            fontWeight={['extrabold']}
          >
            {` ${labels.qty}:`}
          </BodyCopy>
        </div>
        <BodyCopy
          className="padding-left-10"
          fontFamily="secondary"
          component="span"
          fontSize="fs12"
          color="gray.800"
          dataLocator="addedtobag-productqty"
        >
          {`${productDetail.itemInfo.qty}`}
        </BodyCopy>
      </div>
    );
  };

  renderSizeAndFit = () => {
    const { labels, productDetail, isBagPageSflSection } = this.props;
    return (
      <div>
        <div className="color-size-fit-label color-fit-size-desktop">
          <BodyCopy
            fontFamily="secondary"
            component="span"
            fontSize="fs12"
            fontWeight={['extrabold']}
          >
            {this.getSizeLabel(productDetail, labels)}
          </BodyCopy>
        </div>
        <BodyCopy
          className="padding-left-10"
          fontFamily="secondary"
          component="span"
          fontSize="fs12"
          color="gray.800"
          dataLocator={getLocator('cart_item_size')}
        >
          {`${productDetail.itemInfo.size}`}
          {this.getProductFit(productDetail)}
        </BodyCopy>
        {!isBagPageSflSection && (
          <BodyCopy
            className="color-fit-size-separator"
            fontFamily="secondary"
            component="span"
            fontSize="fs12"
            color="gray.600"
          >
            |
          </BodyCopy>
        )}
      </div>
    );
  };

  renderHeartIcon = () => {
    const { isBagPageSflSection, labels } = this.props;
    if (!isBagPageSflSection) return null;
    return (
      <div className="heartIcon">
        <Image
          alt={getLabelValue(labels, 'lbl_sfl_favIcon', 'bagPage', 'checkout')}
          className="sfl-fav-image"
          src={getIconPath('fav-icon')}
        />
      </div>
    );
  };

  getCrossIconImage = () => {
    const {
      isBagPageSflSection,
      productDetail: {
        itemInfo: { name },
      },
      labels: { removeEdit },
    } = this.props;
    return (
      <Image
        alt={`${removeEdit} ${name}`}
        role="button"
        tabIndex="0"
        className="close-icon-image"
        src={getIconPath('close-icon')}
        onClick={isBagPageSflSection ? this.removeSflItem : this.removeCartItem}
        onKeyDown={e =>
          this.handleKeyDown(e, isBagPageSflSection ? this.removeSflItem : this.removeCartItem)
        }
      />
    );
  };

  /**
   * @function getBOSSUnavailabilityMessage Get Boss Unavailability messages
   * @param {bool} bossDisabled Represents if the boss option should be disabled or not
   * @param {string} noBossMessage Represents the online only products or clearance disabled products message.
   * @param {string} availability Represents status of the availability
   * @param {Object} labels
   * @returns {string} Unavailable message string
   * @memberof CartItemTile
   */
  getBOSSUnavailabilityMessage = (bossDisabled, noBossMessage, availability, labels) => {
    let unavailableMessage = '';
    /* istanbul ignore else */
    if (bossDisabled || !!noBossMessage) {
      switch (availability) {
        case CARTPAGE_CONSTANTS.AVAILABILITY.UNAVAILABLE:
          unavailableMessage = labels.bossUnavailable;
          break;
        case CARTPAGE_CONSTANTS.AVAILABILITY.REQ_QTY_UNAVAILABLE:
          unavailableMessage = labels.bossReqQtyUnavailable;
          break;
        case CARTPAGE_CONSTANTS.AVAILABILITY.BOSSINELIGIBLE:
          unavailableMessage = labels.bossInEligible;
          break;
        default:
          unavailableMessage = labels.bossUnavailable;
      }
    }
    return unavailableMessage;
  };

  /**
   * @function getBOPISUnavailabilityMessage Get BOPIS Unavailability messages
   * @param {bool} bopisDisabled Represents if the bopis option should be disabled or not
   * @param {string} noBopisMessage Represents the online only products or clearance disabled products message.
   * @param {string} availability Represents status of the availability
   * @param {Object} labels
   * @returns {string} Unavailable message string
   * @memberof CartItemTile
   */
  getBOPISUnavailabilityMessage = (bopisDisabled, noBopisMessage, availability, labels) => {
    let unavailableMessage = '';
    /* istanbul ignore else */
    if (bopisDisabled || !!noBopisMessage) {
      unavailableMessage = labels.bopisUnavailable;
    }
    return unavailableMessage;
  };

  /**
   * @function getSTHUnavailabilityMessage
   * @param {string} availability Represents status of the availability
   * @param {Object} labels
   * @memberof CartItemTile
   */
  getSTHUnavailabilityMessage = (availability, labels) =>
    availability !== CARTPAGE_CONSTANTS.AVAILABILITY.OK ? labels.ecomUnavailable : '';

  /**
   * @function renderUnavailableErrorMessage
   * @param {Object} settings
   * @returns {JSX} Returns Item Unavailable component with respective variation of text via passed input
   * @memberof CartItemTile
   */
  renderUnavailableErrorMessage = ({
    isEcomSoldout,
    bossDisabled,
    isBOSSOrder,
    bopisDisabled,
    isBOPISOrder,
    noBossMessage,
    noBopisMessage,
    availability,
  }) => {
    const { labels } = this.props;
    let unavailableMessage = '';
    if (isEcomSoldout) {
      unavailableMessage = labels.soldOutError;
    } else if (isBOSSOrder) {
      unavailableMessage = this.getBOSSUnavailabilityMessage(
        bossDisabled,
        noBossMessage,
        availability,
        labels
      );
    } else if (isBOPISOrder) {
      unavailableMessage = this.getBOPISUnavailabilityMessage(
        bopisDisabled,
        noBopisMessage,
        availability,
        labels
      );
    } else {
      unavailableMessage = this.getSTHUnavailabilityMessage(availability, labels);
    }

    return unavailableMessage ? (
      <ItemAvailability
        className="unavailable-error"
        errorMsg={labels.itemUnavailable}
        chooseDiff={unavailableMessage}
      />
    ) : null;
  };

  /**
   * @function headerAndAvailabilityErrorContainer
   * @param {Object} settings
   * @returns {JSX} Returns Error Message component
   * @memberof CartItemTile
   */
  headerAndAvailabilityErrorContainer = ({
    isEcomSoldout,
    bossDisabled,
    isBOSSOrder,
    bopisDisabled,
    isBOPISOrder,
    noBossMessage,
    noBopisMessage,
    availability,
  }) => {
    const { pageView, showOnReviewPage } = this.props;
    const { isEdit } = this.state;
    return (
      showOnReviewPage && (
        <div className={this.getUnavailableHeaderClass()}>
          {this.renderUnavailableErrorMessage({
            isEcomSoldout,
            bossDisabled,
            isBOSSOrder,
            bopisDisabled,
            isBOPISOrder,
            noBossMessage,
            noBopisMessage,
            availability,
          })}
          {!isEdit && (
            <div className={pageView === 'myBag' ? 'crossDeleteIconBag' : 'crossDeleteIconMiniBag'}>
              {this.getCrossIconImage()}
            </div>
          )}
        </div>
      )
    );
  };

  getProductDetailClass = () => {
    const { showOnReviewPage } = this.props;
    return showOnReviewPage ? 'product-detail' : 'product-detail product-detail-review-page';
  };

  renderReviewPageSection = () => {
    const { showOnReviewPage } = this.props;
    return (
      <>
        {!showOnReviewPage ? (
          <div className="size-and-item-container">
            {this.renderSizeAndFit()}
            {this.renderItemQuantity()}
          </div>
        ) : (
          <>
            {this.renderSizeAndFit()}
            {this.renderItemQuantity()}
          </>
        )}
      </>
    );
  };

  /**
   * @function noBossBopisMessage Checks for online only or clearance messages for BOSS/BOPIS items
   * @return {Object}
   * @memberof CartItemTile
   */
  noBossBopisMessage = () => {
    const {
      productDetail: {
        miscInfo: { isOnlineOnly, clearanceItem },
      },
      isBopisClearanceProductEnabled,
      isBossClearanceProductEnabled,
      labels,
    } = this.props;

    let noBopisMessage = null;
    let noBossMessage = null;

    // BOPIS online only check
    if (isOnlineOnly) {
      noBopisMessage = labels.notAvailableOnlineOnly;
    } else if (clearanceItem && !isBopisClearanceProductEnabled) {
      // BOPIS clearance check
      noBopisMessage = labels.notAvailableClearanceItem;
    }

    // BOSS clearance check
    if (clearanceItem && !isBossClearanceProductEnabled) {
      noBossMessage = labels.notAvailableClearanceItem;
    }

    return { noBopisMessage, noBossMessage };
  };

  isEcomOrder = orderType => orderType === CONSTANTS.ORDER_ITEM_TYPE.ECOM;

  isBopisOrder = orderType => orderType === CONSTANTS.ORDER_ITEM_TYPE.BOPIS;

  isBossOrder = orderType => orderType === CONSTANTS.ORDER_ITEM_TYPE.BOSS;

  /**
   * @function checkBOSSDisabled
   * @param {bool} isBossEnabled Represents Country/State level kill switch
   * @param {bool} isEcomSoldout Represents whether the product is sold out
   * @param {bool} isBOSSOrder Represent BOSS item
   * @memberof CartItemTile
   */
  checkBOSSDisabled = (isBossEnabled, isEcomSoldout, isBOSSOrder) => {
    const {
      productDetail: {
        miscInfo: { isStoreBOSSEligible, availability },
      },
      productDetail: { miscInfo },
      isBossClearanceProductEnabled,
      isRadialInventoryEnabled,
    } = this.props;
    return (
      !validateBossEligibility({
        isBossClearanceProductEnabled,
        isBossEnabled,
        miscInfo,
      }) ||
      (isRadialInventoryEnabled
        ? !miscInfo.isInventoryAvailBOSS ||
          (isBOSSOrder && availability !== CARTPAGE_CONSTANTS.AVAILABILITY.OK)
        : isEcomSoldout) ||
      (isBOSSOrder && !isStoreBOSSEligible)
    );
  };

  /**
   * @function checkBOPISDisabled
   * @param {bool} isBopisEnabled Represents Country/State level kill switch
   * @param {bool} isEcomSoldout Represents whether the product is sold out
   * @param {bool }isBOPISOrder Represent BOPIS item
   * @memberof CartItemTile
   */
  checkBOPISDisabled = (isBopisEnabled, isEcomSoldout, isBOPISOrder) => {
    const {
      productDetail: {
        miscInfo: { isOnlineOnly, availability },
        itemInfo: { isGiftItem },
      },
      productDetail: { miscInfo },
      isBopisClearanceProductEnabled,
    } = this.props;

    return (
      !validateBopisEligibility({
        isBopisClearanceProductEnabled,
        isBopisEnabled,
        miscInfo,
      }) ||
      (isBOPISOrder && availability !== CARTPAGE_CONSTANTS.AVAILABILITY.OK) ||
      isOnlineOnly ||
      isEcomSoldout ||
      isGiftItem
    );
  };

  /**
   * @function checkBossBopisDisabled
   * @param {bool} isBossEnabled Represents Country/State level kill switch
   * @param {bool} isBopisEnabled Represents Country/State level kill switch
   * @param {bool} isEcomSoldout Represents whether the product is sold out
   * @param {bool} isBOSSOrder Represent BOSS item
   * @param {bool }isBOPISOrder Represent BOPIS item
   * @memberof CartItemTile
   */
  checkBossBopisDisabled = (
    isBossEnabled,
    isBopisEnabled,
    isEcomSoldout,
    isBOSSOrder,
    isBOPISOrder
  ) => {
    const bossDisabled = this.checkBOSSDisabled(isBossEnabled, isEcomSoldout, isBOSSOrder);
    const bopisDisabled = this.checkBOPISDisabled(isBopisEnabled, isEcomSoldout, isBOPISOrder);
    return { bossDisabled, bopisDisabled };
  };

  showRadioButtons = ({ isEcomSoldout, isECOMOrder, isBossEnabled, isBopisEnabled, store }) => {
    return (!isEcomSoldout || isECOMOrder) && (isBossEnabled || isBopisEnabled || store);
  };

  isSoldOut = availability => availability === CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT;

  getBossBopisFlags = brand => {
    const {
      [`isBossEnabled${brand}`]: isBossEnabled,
      [`isBopisEnabled${brand}`]: isBopisEnabled,
    } = this.props;

    return {
      isBossEnabled,
      isBopisEnabled,
    };
  };

  hideEditBossBopis = (isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled) => {
    return (isBOSSOrder && bossDisabled) || (isBOPISOrder && bopisDisabled);
  };

  /**
   * @function renderTogglingError Render Toggling error
   * @returns {JSX} Error Component with toggling api error.
   * @memberof CartItemTile
   */
  renderTogglingError = () => {
    const {
      pageView,
      toggleError,
      productDetail: {
        itemInfo: { itemId },
      },
    } = this.props;
    return pageView === 'myBag' && toggleError && itemId === toggleError.itemId ? (
      <ErrorMessage
        className="toggle-error"
        fontSize="fs12"
        fontWeight="extrabold"
        error={toggleError.errorMessage}
      />
    ) : null;
  };

  // eslint-disable-next-line complexity
  render() {
    const { isEdit } = this.state;
    const {
      productDetail,
      productDetail: {
        miscInfo: { store, orderItemType, availability },
        itemInfo: { itemBrand },
      },
      labels,
      editableProductInfo,
      className,
      pageView,
      isEditAllowed,
      isBagPageSflSection,
      showOnReviewPage,
      setShipToHome,
    } = this.props;

    const { isBossEnabled, isBopisEnabled } = this.getBossBopisFlags(itemBrand);
    const isECOMOrder = this.isEcomOrder(orderItemType);
    const isBOPISOrder = this.isBopisOrder(orderItemType);
    const isBOSSOrder = this.isBossOrder(orderItemType);
    const isEcomSoldout = this.isSoldOut(availability);

    const { noBopisMessage, noBossMessage } = this.noBossBopisMessage();
    const { bossDisabled, bopisDisabled } = this.checkBossBopisDisabled(
      isBossEnabled,
      isBopisEnabled,
      isEcomSoldout,
      isBOSSOrder,
      isBOPISOrder
    );

    const initialValues = {
      color: { name: productDetail.itemInfo.color },
      Fit: productDetail.itemInfo.fit,
      Size: productDetail.itemInfo.size,
      Qty: productDetail.itemInfo.qty,
    };
    console.log('productDetail.itemInfo.imagePath', productDetail.itemInfo.imagePath);
    return (
      <div className={`${className} tile-header`}>
        {this.renderTogglingError()}
        {this.headerAndAvailabilityErrorContainer({
          isEcomSoldout,
          bossDisabled,
          isBOSSOrder,
          bopisDisabled,
          isBOPISOrder,
          noBossMessage,
          noBopisMessage,
          availability,
        })}
        <Row
          fullBleed
          className={['product', pageView === 'myBag' ? 'product-tile-wrapper' : ''].join(' ')}
          tabIndex="0"
          aria-label={`${productDetail.itemInfo.name}. ${labels.price} ${
            productDetail.itemInfo.price
          }. ${labels.size} ${productDetail.itemInfo.size}. ${labels.qty} ${
            productDetail.itemInfo.qty
          }`}
        >
          <Col
            key="productDetails"
            className="align-product-img product-brand-img-wrapper"
            colSize={{ small: 2, medium: 2, large: 3 }}
          >
            <div className="imageWrapper">
              {/* <Image
                alt={labels.productImageAlt}
                className="product-image"
                src={endpoints.global.baseURI + productDetail.itemInfo.imagePath}
                data-locator={getLocator('cart_item_image')}
              /> */}
              <DamImage
                imgData={{
                  alt: labels.productImageAlt,
                  url: productDetail.itemInfo.imagePath,
                }}
                isProductImage
              />
              {availability === CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT && (
                <BodyCopy
                  className="soldOutLabel"
                  component="span"
                  fontFamily="secondary"
                  textAlign="center"
                  fontSize="fs12"
                >
                  {labels.soldOut}
                </BodyCopy>
              )}
            </div>
            {!productDetail.itemInfo.isGiftItem && (
              <div className="logoWrapper">
                <Image
                  alt={labels.productBandAlt}
                  className="brand-image"
                  src={
                    productDetail.itemInfo.itemBrand === 'TCP'
                      ? getIconPath(`header__brand-tab--tcp`)
                      : getIconPath('header__brand-tab-gymboree')
                  }
                  data-locator={getLocator('cart_item_brand_logo')}
                />
              </div>
            )}
          </Col>
          <Col
            className="bag-product-detail-wrapper"
            key="productDetails"
            colSize={{ small: 4, medium: 6, large: 9 }}
          >
            {showOnReviewPage &&
              productDetail.miscInfo.badge &&
              this.getBadgeDetails(productDetail)}
            <Row className="product-detail-row">
              <Col className="productImgBrand" colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy
                  fontFamily="secondary"
                  component="h2"
                  fontSize="fs14"
                  fontWeight={['extrabold']}
                  dataLocator={getLocator('cart_item_title')}
                >
                  {productDetail.itemInfo.name}
                </BodyCopy>
              </Col>
            </Row>
            {showOnReviewPage && this.getProductItemUpcNumber(productDetail, pageView)}
            {!isEdit ? (
              <React.Fragment>
                <Row className="product-detail-row padding-top-10 color-map-size-fit">
                  <Col
                    className={
                      pageView !== 'myBag' ? this.getProductDetailClass() : 'product-detail-bag'
                    }
                    colSize={{ small: 10, medium: 10, large: 10 }}
                  >
                    <div>
                      <div className="color-size-fit-label">
                        <BodyCopy
                          fontFamily="secondary"
                          component="span"
                          fontSize="fs12"
                          fontWeight={['extrabold']}
                          textAlign="left"
                        >
                          {this.getColorLabel(productDetail, labels)}
                        </BodyCopy>
                      </div>
                      <BodyCopy
                        className="padding-left-10"
                        fontFamily="secondary"
                        component="span"
                        fontSize="fs12"
                        color="gray.800"
                        dataLocator={getLocator('cart_item_color')}
                      >
                        {`${productDetail.itemInfo.color}`}
                      </BodyCopy>
                      {showOnReviewPage && (
                        <BodyCopy
                          className="color-fit-size-separator"
                          fontFamily="secondary"
                          component="span"
                          fontSize="fs12"
                          color="gray.600"
                        >
                          |
                        </BodyCopy>
                      )}
                    </div>
                    {this.renderReviewPageSection()}
                  </Col>
                  {showOnReviewPage && (
                    <Col colSize={{ small: 2, medium: 2, large: 2 }}>
                      {!isBagPageSflSection &&
                        isEditAllowed &&
                        !this.hideEditBossBopis(
                          isBOSSOrder,
                          bossDisabled,
                          isBOPISOrder,
                          bopisDisabled
                        ) && (
                          <BodyCopy
                            fontFamily="secondary"
                            fontSize="fs12"
                            component="div"
                            role="button"
                            tabIndex="0"
                            dataLocator={getLocator('cart_item_edit_link')}
                            className="padding-left-10 responsive-edit-css"
                            onClick={this.callEditMethod}
                            onKeyDown={e => this.handleKeyDown(e, this.callEditMethod)}
                          >
                            {labels.edit}
                          </BodyCopy>
                        )}
                    </Col>
                  )}
                </Row>
              </React.Fragment>
            ) : (
              <ProductEditForm
                item={productDetail}
                colorFitsSizesMap={editableProductInfo}
                handleSubmit={this.handleSubmit}
                initialValues={initialValues}
                labels={labels}
                formVisiblity={this.toggleFormVisibility}
              />
            )}
            <Row className="product-detail-row label-responsive-wrapper padding-top-10">
              {this.getProductPriceList(productDetail, pageView)}
            </Row>
            {this.getProductPointsList(productDetail, isBagPageSflSection, showOnReviewPage)}
            {showOnReviewPage && this.getItemDetails(productDetail, labels, pageView)}
          </Col>
          {showOnReviewPage && this.renderHeartIcon()}
        </Row>
        {showOnReviewPage &&
          !isBagPageSflSection &&
          pageView === 'myBag' &&
          this.showRadioButtons({
            isEcomSoldout,
            isECOMOrder,
            isBossEnabled,
            isBopisEnabled,
            store,
          }) && (
            <Row fullBleed>
              <CartItemRadioButtons
                className="cart-item-radio-buttons"
                productDetail={productDetail}
                labels={labels}
                isEcomSoldout={isEcomSoldout}
                isECOMOrder={isECOMOrder}
                isBOSSOrder={isBOSSOrder}
                isBOPISOrder={isBOPISOrder}
                noBopisMessage={noBopisMessage}
                noBossMessage={noBossMessage}
                bossDisabled={bossDisabled}
                bopisDisabled={bopisDisabled}
                isBossEnabled={isBossEnabled}
                isBopisEnabled={isBopisEnabled}
                openPickUpModal={this.handleEditCartItemWithStore}
                setShipToHome={setShipToHome}
              />
            </Row>
          )}
      </div>
    );
  }
}

CartItemTile.defaultProps = {
  pageView: '',
  isEditAllowed: true,
  isCondense: true,
  sflItemsCount: 0,
  isBagPageSflSection: false,
  showOnReviewPage: true,
  onQuickViewOpenClick: () => {},
  isBossClearanceProductEnabled: false,
  isBopisClearanceProductEnabled: false,
  isRadialInventoryEnabled: false,
  setShipToHome: () => {},
  toggleError: null,
  clearToggleError: () => {},
};

CartItemTile.propTypes = {
  productDetail: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  getProductSKUInfo: PropTypes.func.isRequired,
  updateCartItem: PropTypes.func.isRequired,
  editableProductInfo: PropTypes.shape({}).isRequired,
  removeCartItem: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  isPlcc: PropTypes.string.isRequired,
  pageView: PropTypes.string,
  toggleEditAllowance: PropTypes.func.isRequired,
  isEditAllowed: PropTypes.bool,
  isShowSaveForLater: PropTypes.bool.isRequired,
  isCondense: PropTypes.bool,
  isGenricGuest: PropTypes.shape({}).isRequired,
  sflItemsCount: PropTypes.number,
  sflMaxCount: PropTypes.number.isRequired,
  addItemToSflList: PropTypes.func.isRequired,
  setCartItemsSflError: PropTypes.func.isRequired,
  isBagPageSflSection: PropTypes.bool,
  showOnReviewPage: PropTypes.bool,
  startSflItemDelete: PropTypes.func.isRequired,
  startSflDataMoveToBag: PropTypes.func.isRequired,
  onPickUpOpenClick: PropTypes.func.isRequired,
  onQuickViewOpenClick: PropTypes.func,
  orderId: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  isBossClearanceProductEnabled: PropTypes.bool,
  isBopisClearanceProductEnabled: PropTypes.bool,
  isRadialInventoryEnabled: PropTypes.bool,
  setShipToHome: PropTypes.func,
  toggleError: PropTypes.shape({}),
  clearToggleError: PropTypes.func,
};

export default withStyles(CartItemTile, styles);
export { CartItemTile as CartItemTileVanilla };
