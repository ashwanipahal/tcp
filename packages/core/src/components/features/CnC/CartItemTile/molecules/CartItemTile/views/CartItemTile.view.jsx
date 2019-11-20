/* eslint-disable max-lines */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ItemAvailability from '@tcp/core/src/components/features/CnC/common/molecules/ItemAvailability';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  getLabelValue,
  getIconPath,
  getLocator,
  isCanada,
  getAPIConfig,
  getBrand,
} from '@tcp/core/src/utils';
import { PriceCurrency } from '@tcp/core/src/components/common/molecules';
import { KEY_CODES } from '@tcp/core/src/constants/keyboard.constants';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { CONTROLS_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import ProductEditForm from '../../../../../../common/molecules/ProductCustomizeForm';
import CartItemRadioButtons from '../../CartItemRadioButtons/views/CartItemRadioButtons.view';
import { Image, Row, BodyCopy, Col, Anchor } from '../../../../../../common/atoms';
import getModifiedString from '../../../utils';
import styles from '../styles/CartItemTile.style';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import DamImage from '../../../../../../common/atoms/DamImage';
import {
  getBossBopisFlags,
  isEcomOrder,
  isBopisOrder,
  isBossOrder,
  isSoldOut,
  noBossBopisMessage,
  checkBossBopisDisabled,
  showRadioButtons,
  hideEditBossBopis,
  getBOSSUnavailabilityMessage,
  getBOPISUnavailabilityMessage,
  getSTHUnavailabilityMessage,
  getPrices,
} from './CartItemTile.utils';
import { getProductListToPath } from '../../../../../browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

/**
 * LinkWrapper component is to wrap anchor component to decide whether child needs anchor tag or not
 * @param {object} props
 */
const LinkWrapper = props => {
  LinkWrapper.propTypes = {
    pdpToPath: PropTypes.string.isRequired,
    pdpAsPathUrl: PropTypes.string.isRequired,
    disableLink: PropTypes.bool.isRequired,
    noWrap: PropTypes.bool.isRequired,
    IsSlugPathAdded: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  LinkWrapper.defaultProps = {
    IsSlugPathAdded: false,
  };

  const { pdpToPath, pdpAsPathUrl, disableLink, children, noWrap, IsSlugPathAdded } = props;
  return noWrap ? (
    children
  ) : (
    <Anchor
      to={pdpToPath}
      asPath={pdpAsPathUrl}
      noLink={disableLink}
      IsSlugPathAdded={IsSlugPathAdded}
    >
      {children}
    </Anchor>
  );
};

class CartItemTile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      isBagPageSflSection,
      toggleBossBopisError,
      productDetail: {
        itemInfo: { itemId },
      },
    } = this.props;
    if (
      !isBagPageSflSection &&
      toggleBossBopisError &&
      itemId === toggleBossBopisError.itemId &&
      (prevProps.toggleBossBopisError === null ||
        prevProps.toggleBossBopisError.errorMessage !== toggleBossBopisError.errorMessage)
    ) {
      setTimeout(() => {
        this.handleEditCartItemWithStore(toggleBossBopisError.targetOrderType);
      });
    }
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

  handleEditCartItemMiniBag = (pageView, itemBrand, productNumber) => {
    const productNum = productNumber.slice(0, productNumber.indexOf('_'));
    this.toggleFormVisibility();
    const { getProductSKUInfo } = this.props;
    getProductSKUInfo({ productNum, itemBrand });
  };

  handleEditCartItem = (pageView, itemBrand, productNumber, isBagPageSflSection = false) => {
    if (pageView !== 'myBag') {
      this.handleEditCartItemMiniBag(pageView, itemBrand, productNumber);
    } else {
      const { onQuickViewOpenClick, productDetail } = this.props;
      const { itemId, qty, color, size, fit, isGiftItem } = productDetail.itemInfo;
      const {
        productInfo: { skuId, generalProductId },
      } = productDetail;
      onQuickViewOpenClick({
        fromBagPage: pageView === 'myBag',
        colorProductId: productNumber,
        isSflProduct: isBagPageSflSection,
        orderInfo: {
          orderItemId: itemId,
          selectedQty: qty,
          selectedColor: color,
          selectedSize: size,
          selectedFit: fit,
          itemBrand,
          skuId: isGiftItem ? generalProductId : skuId,
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
  handleEditCartItemWithStore = (
    changeStoreType,
    openSkuSelectionForm = false,
    openRestrictedModalForBopis = false,
    isPickUpWarningModal = false
  ) => {
    const { onPickUpOpenClick, productDetail, orderId } = this.props;
    const { itemId, qty, color, size, fit, itemBrand } = productDetail.itemInfo;
    const { store, orderItemType } = productDetail.miscInfo;
    const { productPartNumber } = productDetail.productInfo;
    const isItemShipToHome = !store;
    const isBopisCtaEnabled = changeStoreType === CARTPAGE_CONSTANTS.BOPIS;
    const isBossCtaEnabled = changeStoreType === CARTPAGE_CONSTANTS.BOSS;
    const alwaysSearchForBOSS = changeStoreType === CARTPAGE_CONSTANTS.BOSS;
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
      alwaysSearchForBOSS,
      openRestrictedModalForBopis,
      isPickUpWarningModal,
    });
  };

  callEditMethod = () => {
    const { productDetail, pageView, isBagPageSflSection } = this.props;
    const {
      miscInfo: { orderItemType },
    } = productDetail;
    if (orderItemType === CARTPAGE_CONSTANTS.ECOM || isBagPageSflSection) {
      this.handleEditCartItem(
        pageView,
        productDetail.itemInfo.itemBrand,
        productDetail.productInfo.productPartNumber,
        isBagPageSflSection
      );
    } else if (pageView === 'myBag') {
      const openSkuSelectionForm = true;
      this.handleEditCartItemWithStore(orderItemType, openSkuSelectionForm);
    } else {
      this.handleEditCartItemMiniBag(
        pageView,
        productDetail.itemInfo.itemBrand,
        productDetail.productInfo.productPartNumber
      );
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
      pageView,
      setClickAnalyticsData,
    } = this.props;
    const {
      itemInfo: { itemId, isGiftItem, color, name, offerPrice, size, listPrice },
      productInfo: { skuId, generalProductId, upc, productPartNumber },
    } = productDetail;
    const catEntryId = isGiftItem ? generalProductId : skuId;
    const userInfoRequired = isGenricGuest && isGenricGuest.get('userId') && isCondense; // Flag to check if getRegisteredUserInfo required after SflList
    const isMiniBag = pageView !== 'myBag';
    this.clearToggleErrorState();

    if (sflItemsCount >= sflMaxCount) {
      return setCartItemsSflError(labels.sflMaxLimitError);
    }
    const payloadData = { itemId, catEntryId, userInfoRequired, isMiniBag };
    const productsData = {
      color,
      id: itemId,
      name,
      price: offerPrice,
      extPrice: offerPrice,
      sflExtPrice: offerPrice,
      listPrice,
      partNumber: productPartNumber,
      size,
      upc,
      sku: skuId.toString(),
    };
    setClickAnalyticsData({
      customEvents: ['event134', 'event136'],
      products: [productsData],
      eventName: 'Save for Later',
    });
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
    const { productDetail, startSflDataMoveToBag, setClickAnalyticsData } = this.props;
    const {
      itemInfo: { itemId, isGiftItem, color, name, offerPrice, size, listPrice },
      productInfo: { skuId, generalProductId, upc, productPartNumber },
    } = productDetail;
    const catEntryId = isGiftItem ? generalProductId : skuId;

    const payloadData = { itemId, catEntryId };
    this.clearToggleErrorState();
    const productsData = {
      color,
      id: itemId,
      name,
      price: offerPrice,
      extPrice: offerPrice,
      sflExtPrice: offerPrice,
      listPrice,
      partNumber: productPartNumber,
      size,
      upc,
      sku: skuId.toString(),
    };
    setClickAnalyticsData({
      customEvents: ['event135', 'event137'],
      products: [productsData],
      eventName: 'Move to Bag',
    });
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
        <ClickTracker name="Save_for_Later">
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
        </ClickTracker>
      );
    }
    if (
      isBagPageSflSection &&
      productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY.OK
    ) {
      return (
        <ClickTracker name="Move_to_Bag">
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
        </ClickTracker>
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

  renderEditLink = () => {
    const {
      labels,
      showOnReviewPage,
      isBagPageSflSection,
      isEditAllowed,
      productDetail: {
        miscInfo: { orderItemType, availability },
        itemInfo: { itemBrand },
      },
    } = this.props;

    const { isBossEnabled, isBopisEnabled } = getBossBopisFlags(this.props, itemBrand);
    const isBOPISOrder = isBopisOrder(orderItemType);
    const isBOSSOrder = isBossOrder(orderItemType);
    const isEcomSoldout = isSoldOut(availability);

    const { bossDisabled, bopisDisabled } = checkBossBopisDisabled(
      this.props,
      isBossEnabled,
      isBopisEnabled,
      isEcomSoldout,
      isBOSSOrder,
      isBOPISOrder
    );
    return (
      <>
        {showOnReviewPage &&
          !isBagPageSflSection &&
          isEditAllowed &&
          !hideEditBossBopis(isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled) && (
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
      </>
    );
  };

  // eslint-disable-next-line complexity
  getItemDetails = (productDetail, labels, pageView) => {
    const { isEdit } = this.state;
    const { isBagPageSflSection } = this.props;
    const { offerPrice } = productDetail.itemInfo;
    // SFL prices
    const isBagPage = pageView === 'myBag';
    const topPaddingClass = isBagPageSflSection ? 'padding-top-40' : 'padding-top-15';
    return (
      <Row className={`${topPaddingClass} padding-bottom-20 parent-${pageView}`} fullBleed>
        {!isBagPage && this.getBossBopisDetailsForMiniBag(productDetail, labels)}
        <Col className="save-for-later-label" colSize={{ small: 1, medium: 1, large: 3 }}>
          {productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT && (
            <BodyCopy
              fontFamily="secondary"
              className={!isBagPage ? 'updateOOSMiniBag' : 'updateOOSBag'}
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
                className={!isBagPage ? 'updateOOSMiniBag' : 'updateOOSBag'}
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
          {isBagPage && this.renderEditLink()}
        </Col>
        {isBagPage && (
          <BodyCopy
            className="price-label"
            fontFamily="secondary"
            component="span"
            fontSize="fs16"
            fontWeight={['extrabold']}
            dataLocator={getLocator('cart_item_total_price')}
          >
            <PriceCurrency price={offerPrice} />
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

  getProductItemUpcNumber = (productDetail, isBagPage) => {
    if (isBagPage) {
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

  getProductPriceList = (productDetail, pageView, currencyExchange) => {
    const { isBagPageSflSection, showOnReviewPage, labels } = this.props;
    const { isGiftItem } = productDetail.itemInfo;
    const { salePrice, wasPrice, listPrice, price } = getPrices({
      productDetail,
      currencyExchange,
    });
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
              fontSize="fs13"
              dataLocator={getLocator('sfl_sale_price')}
              fontWeight={['extrabold']}
            >
              <PriceCurrency price={Number(price)} />
            </BodyCopy>
            <BodyCopy
              fontFamily="secondary"
              component="span"
              fontSize="fs12"
              dataLocator={getLocator('sfl_was_price')}
              fontWeight={['regular']}
              className="was-price"
            >
              <PriceCurrency price={Number(listPrice)} />
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
            dataLocator={getLocator('cart_sale_price')}
            fontWeight={['extrabold']}
            className={!showOnReviewPage && 'reviewPagePrice'}
          >
            <PriceCurrency price={Number(salePrice)} />
          </BodyCopy>
          {!isGiftItem && wasPrice !== salePrice && (
            <BodyCopy
              fontFamily="secondary"
              component="span"
              fontSize="fs12"
              dataLocator={getLocator('cart_was_price')}
              fontWeight={['regular']}
              className="was-price"
            >
              <PriceCurrency price={Number(wasPrice)} />
            </BodyCopy>
          )}
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
    return !productDetail.itemInfo.fit ? ' ' : ` ${productDetail.itemInfo.fit}`;
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
            fontSize="fs13"
            fontWeight={['extrabold']}
          >
            {` ${labels.qty}:`}
          </BodyCopy>
        </div>
        <BodyCopy
          className="padding-left-10"
          fontFamily="secondary"
          component="span"
          fontSize="fs13"
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
            fontSize="fs13"
            fontWeight={['extrabold']}
          >
            {this.getSizeLabel(productDetail, labels)}
          </BodyCopy>
        </div>
        <BodyCopy
          className="padding-left-10"
          fontFamily="secondary"
          component="span"
          fontSize="fs13"
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
      unavailableMessage = getBOSSUnavailabilityMessage(
        bossDisabled,
        noBossMessage,
        availability,
        labels
      );
    } else if (isBOPISOrder) {
      unavailableMessage = getBOPISUnavailabilityMessage(
        bopisDisabled,
        noBopisMessage,
        availability,
        labels
      );
    } else {
      unavailableMessage = getSTHUnavailabilityMessage(availability, labels);
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

  getItemBrand = itemBrand => {
    return itemBrand && itemBrand.toLowerCase();
  };

  getPdpToPath = (isProductBrandOfSameDomain, pdpUrl, crossDomain) => {
    return isProductBrandOfSameDomain ? getProductListToPath(pdpUrl) : `${crossDomain}${pdpUrl}`;
  };

  getPdpAsPathurl = (isProductBrandOfSameDomain, pdpUrl, crossDomain) => {
    return isProductBrandOfSameDomain ? pdpUrl : `${crossDomain}${pdpUrl}`;
  };

  closeMiniBagMethod = () => {
    const { closeMiniBag } = this.props;
    closeMiniBag();
  };

  // eslint-disable-next-line complexity
  render() {
    const { isEdit } = this.state;
    const {
      productDetail,
      productDetail: {
        miscInfo: { store, orderItemType, availability },
        itemInfo: { itemBrand },
        productInfo: { pdpUrl },
      },
      labels,
      editableProductInfo,
      className,
      pageView,
      isBagPageSflSection,
      showOnReviewPage,
      setShipToHome,
      currencyExchange,
      pickupStoresInCart,
      autoSwitchPickupItemInCart,
      orderId,
      disableProductRedirect,
    } = this.props;

    const { isBossEnabled, isBopisEnabled } = getBossBopisFlags(this.props, itemBrand);
    const isECOMOrder = isEcomOrder(orderItemType);
    const isBOPISOrder = isBopisOrder(orderItemType);
    const isBOSSOrder = isBossOrder(orderItemType);
    const isEcomSoldout = isSoldOut(availability);
    const apiConfigObj = getAPIConfig();
    const { crossDomain } = apiConfigObj;
    const currentSiteBrand = getBrand();
    const isProductBrandOfSameDomain = currentSiteBrand.toUpperCase() === itemBrand.toUpperCase();

    const { noBopisMessage, noBossMessage } = noBossBopisMessage(this.props);
    const { bossDisabled, bopisDisabled } = checkBossBopisDisabled(
      this.props,
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
    const pdpToPath = this.getPdpToPath(isProductBrandOfSameDomain, pdpUrl, crossDomain);
    const pdpAsPathUrl = this.getPdpAsPathurl(isProductBrandOfSameDomain, pdpUrl, crossDomain);

    const isBagPage = pageView === 'myBag';
    const disableLink = disableProductRedirect;
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
          className={['product', isBagPage ? 'product-tile-wrapper' : ''].join(' ')}
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
              <LinkWrapper
                pdpToPath={pdpToPath}
                pdpAsPathUrl={pdpAsPathUrl}
                disableLink={disableLink}
                noWrap={disableLink}
                IsSlugPathAdded
              >
                <DamImage
                  imgData={{
                    alt: labels.productImageAlt,
                    url: productDetail.itemInfo.imagePath,
                  }}
                  itemBrand={this.getItemBrand(productDetail.itemInfo.itemBrand)}
                  isProductImage
                  onClick={this.closeMiniBagMethod}
                  className={`${!showOnReviewPage ? 'dam-image-review-page' : ''}`}
                />
              </LinkWrapper>
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
                <LinkWrapper
                  pdpToPath={pdpToPath}
                  pdpAsPathUrl={pdpAsPathUrl}
                  disableLink={disableLink}
                  noWrap={disableLink}
                  IsSlugPathAdded
                >
                  <BodyCopy
                    fontFamily="secondary"
                    component="h2"
                    fontSize="fs14"
                    fontWeight={['extrabold']}
                    dataLocator={getLocator('cart_item_title')}
                    onClick={this.closeMiniBagMethod}
                  >
                    {productDetail.itemInfo.name}
                  </BodyCopy>
                </LinkWrapper>
              </Col>
            </Row>
            {showOnReviewPage && this.getProductItemUpcNumber(productDetail, isBagPage)}
            {!isEdit ? (
              <React.Fragment>
                <Row className="product-detail-row padding-top-10 color-map-size-fit">
                  <Col
                    className={!isBagPage ? this.getProductDetailClass() : 'product-detail-bag'}
                    colSize={{ small: 12, medium: 12, large: 12 }}
                  >
                    <div className="product-detail-section">
                      <div className="color-size-fit-label">
                        <BodyCopy
                          fontFamily="secondary"
                          component="span"
                          fontSize="fs13"
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
                        fontSize="fs13"
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
                          fontSize="fs13"
                          color="gray.600"
                        >
                          |
                        </BodyCopy>
                      )}
                      {this.renderReviewPageSection()}
                    </div>
                    {!isBagPage && this.renderEditLink()}
                  </Col>
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
              {this.getProductPriceList(productDetail, pageView, currencyExchange)}
            </Row>
            {this.getProductPointsList(productDetail, isBagPageSflSection, showOnReviewPage)}
            {showOnReviewPage && this.getItemDetails(productDetail, labels, pageView)}
          </Col>
          {showOnReviewPage && this.renderHeartIcon()}
        </Row>
        {showOnReviewPage &&
          !isBagPageSflSection &&
          isBagPage &&
          showRadioButtons({
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
                pickupStoresInCart={pickupStoresInCart}
                autoSwitchPickupItemInCart={autoSwitchPickupItemInCart}
                orderId={orderId}
              />
              <RenderPerf.Measure name={CONTROLS_VISIBLE} />
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
  setShipToHome: () => {},
  toggleError: null,
  toggleBossBopisError: null,
  clearToggleError: () => {},
  currencyExchange: null,
  autoSwitchPickupItemInCart: () => {},
  disableProductRedirect: false,
  closeMiniBag: () => {},
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
  setShipToHome: PropTypes.func,
  toggleError: PropTypes.shape({}),
  toggleBossBopisError: PropTypes.shape({
    errorMessage: PropTypes.string,
  }),
  clearToggleError: PropTypes.func,
  currencyExchange: PropTypes.shape([]),
  pickupStoresInCart: PropTypes.shape({}).isRequired,
  autoSwitchPickupItemInCart: PropTypes.func,
  disableProductRedirect: PropTypes.bool,
  setClickAnalyticsData: PropTypes.func.isRequired,
  closeMiniBag: PropTypes.func,
};

export default withStyles(CartItemTile, styles);
export { CartItemTile as CartItemTileVanilla };
