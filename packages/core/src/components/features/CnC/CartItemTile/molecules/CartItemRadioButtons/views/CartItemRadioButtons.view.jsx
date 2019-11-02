import React from 'react';
import PropTypes from 'prop-types';
import { getLocator, getIconPath } from '@tcp/core/src/utils';
import { BodyCopy, LabeledRadioButton, Image, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import style from '../styles/CartItemRadioButtons.style';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import CONSTANTS from '../../../../Checkout/Checkout.constants';
import { maxAllowedStoresInCart } from '../../../../../../common/organisms/PickupStoreModal/PickUpStoreModal.config';

class CartItemRadioButtons extends React.Component {
  /**
   * @function handleChangeStoreClick Handle click event for change store
   * @memberof CartItemRadioButtons
   */
  handleChangeStoreClick = () => {
    const { openPickUpModal, pickupStoresInCart } = this.props;
    const {
      productDetail: {
        miscInfo: { orderItemType },
      },
    } = this.props;
    const openSkuSelectionForm = false;
    let openRestrictedModalForBopis = false;
    /* istanbul ignore else */
    if (
      orderItemType === CARTPAGE_CONSTANTS.BOPIS &&
      pickupStoresInCart.size === maxAllowedStoresInCart
    ) {
      openRestrictedModalForBopis = true;
    }
    openPickUpModal(orderItemType, openSkuSelectionForm, openRestrictedModalForBopis);
  };

  /**
   * @function handleShipToHome Ship to Home click handler
   * @param {bool} isECOMOrder Represents Whether it is STH option selected already
   * @param {bool} isEcomSoldout Represents whether the product has been soldout or not.
   * @memberof CartItemRadioButtons
   */
  handleShipToHome = (isECOMOrder, isEcomSoldout) => {
    const {
      setShipToHome,
      productDetail: {
        itemInfo: { itemId },
        miscInfo: { orderItemType },
      },
    } = this.props;

    /* istanbul ignore else */
    if (!isECOMOrder && !isEcomSoldout) {
      setShipToHome(itemId, orderItemType);
    }
  };

  handleSingleStore = ({ pickupType, switchingToBopisOption, switchingToBossOption, formData }) => {
    const { openPickUpModal, autoSwitchPickupItemInCart, pickupStoresInCart } = this.props;
    return pickupStoresInCart.getIn([0, 'isStoreBOSSEligible']) || switchingToBopisOption
      ? autoSwitchPickupItemInCart(formData, switchingToBopisOption, switchingToBossOption)
      : openPickUpModal(pickupType);
  };

  /**
   * @return condition - checking if the store available in user's account is bossEligible
   * or switching product to bopis store.
   * @method autoSwitchPickupItemInCart is called if the the store is eligible for BOSS
   * @method OpenPickUpModal opens warning modal if the store is ineligible for BOSS
   */
  handleDifferentStores = ({
    pickupType,
    switchingToBopisOption,
    switchingToBossOption,
    formData,
    bossStoreIndex,
  }) => {
    const { openPickUpModal, autoSwitchPickupItemInCart, pickupStoresInCart } = this.props;
    return pickupStoresInCart.getIn([bossStoreIndex, 'isStoreBOSSEligible']) ||
      switchingToBopisOption
      ? autoSwitchPickupItemInCart(formData, switchingToBopisOption, switchingToBossOption)
      : openPickUpModal(pickupType, false, false, true);
  };

  getBossBopisStoreIndexes = () => {
    const { BOSS, BOPIS } = CONSTANTS.ORDER_ITEM_TYPE;
    const { pickupStoresInCart } = this.props;
    const bossStoreIndex = pickupStoresInCart.getIn([0, 'orderType']) === BOSS ? 0 : 1;
    const bopisStoreIndex = pickupStoresInCart.getIn([0, 'orderType']) === BOPIS ? 0 : 1;
    return {
      bossStoreIndex,
      bopisStoreIndex,
    };
  };

  getSwitchingOptions = pickupType => {
    const { BOSS, BOPIS } = CONSTANTS.ORDER_ITEM_TYPE;
    const switchingToBopisOption = pickupType === BOPIS;
    const switchingToBossOption = pickupType === BOSS;
    return {
      switchingToBopisOption,
      switchingToBossOption,
    };
  };

  createFormData = pickupType => {
    const {
      productDetail: {
        productInfo: { skuId, itemPartNumber, variantNo, generalProductId },
        itemInfo: { isGiftItem, itemId, qty: quantity },
        miscInfo: { orderItemType, store },
      },
      orderId,
    } = this.props;
    return {
      itemId,
      quantity,
      skuId: isGiftItem ? generalProductId : skuId,
      itemPartNumber,
      variantNo,
      orderItemType,
      targetOrderType: pickupType,
      orderId,
      store,
    };
  };

  handlePickupToggle = pickupType => {
    const { BOSS } = CONSTANTS.ORDER_ITEM_TYPE;
    const { OPEN_SELECTION_MODAL, AUTO_SWITCH } = CARTPAGE_CONSTANTS.STORE_SWITCH;
    const { openPickUpModal, pickupStoresInCart } = this.props;
    const formData = this.createFormData(pickupType);
    const { switchingToBopisOption, switchingToBossOption } = this.getSwitchingOptions(pickupType);

    /* istanbul ignore else */
    // when no stores are seleceted
    if (pickupStoresInCart.size === OPEN_SELECTION_MODAL) {
      return openPickUpModal(pickupType);
    }
    /* istanbul ignore else */
    if (pickupStoresInCart.size === AUTO_SWITCH) {
      // when one store is selected boss/bopis
      formData.storeId = pickupStoresInCart.getIn([0, 'stLocId']);
      return this.handleSingleStore({
        pickupType,
        switchingToBopisOption,
        switchingToBossOption,
        formData,
      });
    }
    /* istanbul ignore else */
    if (pickupStoresInCart.getIn([0, 'orderType']) !== pickupStoresInCart.getIn([1, 'orderType'])) {
      // when 1 boss and 1 bopis stpre is selected
      const { bossStoreIndex, bopisStoreIndex } = this.getBossBopisStoreIndexes();
      formData.storeId = switchingToBossOption
        ? pickupStoresInCart.getIn([bossStoreIndex, 'stLocId'])
        : pickupStoresInCart.getIn([bopisStoreIndex, 'stLocId']);
      return this.handleDifferentStores({
        pickupType,
        switchingToBopisOption,
        switchingToBossOption,
        formData,
        bossStoreIndex,
      });
    }
    /* istanbul ignore else */
    if (pickupType === BOSS) {
      // when 2 bopis stores are selected and toggled to boss
      return openPickUpModal(pickupType, false, false, true);
    }
    // when 2 bopis stores are selected and toggled to bopis
    return openPickUpModal(pickupType, true);
  };

  /**
   * @function showBoss Handles to show BOSS Item or not
   * @param isBossOrder Represents the current product is BOSS or not
   * @param isBossEnabled Represents the Country/State level kill switch for BOSS
   * @memberof CartItemRadioButtons
   */
  showBoss = (isBossOrder, isBossEnabled) => isBossOrder || isBossEnabled;

  /**
   * @function showBopis Handles to show BOPIS Item or not
   * @param isBopisOrder Represents the current product is BOPIS or not
   * @param isBopisEnabled Represents the Country/State level kill switch for BOPIS
   * @memberof CartItemRadioButtons
   */
  showBopis = (isBopisOrder, isBopisEnabled) => isBopisOrder || isBopisEnabled;

  /**
   * @function renderBossBanner
   * @param {bool} isBossItem Represents if the current item is Boss Item or not
   * @param {string} onlineClearanceMessage Represents the Online only message
   * @memberof CartItemRadioButtons
   */
  renderBossBanner = (isBossItem, onlineClearanceMessage) => {
    const { labels } = this.props;
    return isBossItem && !onlineClearanceMessage ? (
      <div className="banner-wrapper">
        <div className="triangle-left" />
        <div className="promo-wrapper">
          <BodyCopy fontSize="fs10" fontFamily="primary" fontWeight="black">
            {`${labels.extra} ${labels.bossOffValue || '5%'}`}
          </BodyCopy>
          <BodyCopy className="off-label" fontSize="fs10" fontFamily="primary">
            {labels.off}
          </BodyCopy>
        </div>
      </div>
    ) : null;
  };

  /**
   * @function renderBossDates Renders the boss dates values in the format as required.
   * @param {bool} isBossItem Represents if the current item is Boss Item or not
   * @returns {JSX} renders the boss dates unit
   * @memberof CartItemRadioButtons
   */
  renderBossDates = isBossItem => {
    const {
      labels,
      productDetail: {
        miscInfo: { bossStartDate, bossEndDate },
      },
    } = this.props;
    return isBossItem ? (
      <>
        {labels.by}
        <BodyCopy
          className="elem-pl-XS"
          fontWeight="semibold"
          component="span"
          fontFamily="secondary"
          fontSize="fs10"
        >
          {`${bossStartDate.get('day')}. ${bossStartDate.get('month')} ${bossStartDate.get(
            'date'
          )} - ${bossEndDate.get('day')}. ${bossEndDate.get('month')} ${bossEndDate.get('date')}`}
        </BodyCopy>
      </>
    ) : null;
  };

  /**
   * @function hideChangeStore Method use to handle various conditions for show hide the change store link
   * @param {bool} isBossItem Represents if the current item is Boss Item or not
   * @returns {bool} Whether to hide the change store
   * @memberof CartItemRadioButtons
   */
  hideChangeStore = isBossItem => {
    const {
      isBossEnabled,
      isBopisEnabled,
      productDetail: {
        miscInfo: { isBossEligible, isBopisEligible, availability },
      },
    } = this.props;

    if (isBossItem) {
      return !(
        !isBossEnabled ||
        !isBossEligible ||
        availability !== CARTPAGE_CONSTANTS.AVAILABILITY.OK
      );
    }
    return !(!isBopisEnabled || !isBopisEligible);
  };

  /**
   * @function renderChangeStore
   * @param {bool} disabled Represents with the current item is disabled or not
   * @param {bool} isBossItem Represents if the current item is Boss Item or not
   * @returns {JSX} Render Change store link.
   * @memberof CartItemRadioButtons
   */
  renderChangeStore = (disabled, isBossItem) => {
    const { labels } = this.props;
    return !disabled || this.hideChangeStore(isBossItem) ? (
      <Anchor
        className="elem-pl-LRG"
        fontSizeVariation="small"
        underline
        anchorVariation="primary"
        fontSize="fs12"
        fontFamily="secondary"
        onClick={e => {
          e.preventDefault();
          this.handleChangeStoreClick();
        }}
      >
        {`(${labels.changeStore})`}
      </Anchor>
    ) : null;
  };

  /**
   * @function renderRadioItem
   * @param {Object} Object Boss Bopis and STH settings object to draw different scenarios.
   * @return {JSX} Render each radio button line item with different variations.
   * @memberof CartItemRadioButtons
   */
  renderRadioItem = ({
    isSelected,
    onlineClearanceMessage,
    store,
    disabled,
    radioText,
    isBossItem,
    isEcomItem,
    labels,
  }) => {
    return (
      <div className={`main-container ${disabled ? 'disabled' : ''}`}>
        {isSelected && disabled && (
          <Image
            alt="disabled"
            className="disabled-icon"
            src={getIconPath('alert-triangle')}
            width="15px"
            height="15px"
          />
        )}
        <BodyCopy component="div" className="title-container">
          <BodyCopy
            dataLocator={getLocator(`cart_item_${isBossItem ? 'cartNoRush' : 'pickup_today'}`)}
            color={disabled ? 'gray.800' : 'gray.900'}
            fontSize="fs14"
            fontFamily="secondary"
          >
            {radioText}
          </BodyCopy>

          {this.renderBossBanner(isBossItem, onlineClearanceMessage)}

          {onlineClearanceMessage && (
            <BodyCopy
              className="elem-pl-MED"
              component="span"
              fontFamily="secondary"
              fontSize="fs12"
              color="gray[800]"
            >
              {onlineClearanceMessage}
            </BodyCopy>
          )}
        </BodyCopy>
        {!isEcomItem && isSelected && !onlineClearanceMessage && (
          <BodyCopy component="div" className="subtitle-container elem-mt-XS">
            <BodyCopy component="div" color="gray.800" fontFamily="secondary" fontSize="fs10">
              {labels.at}
              <BodyCopy
                className="elem-pl-XXS elem-pr-XXS"
                fontWeight="semibold"
                component="span"
                fontFamily="secondary"
                fontSize="fs10"
              >
                {store}
              </BodyCopy>
              {this.renderBossDates(isBossItem)}
            </BodyCopy>
            {this.renderChangeStore(disabled, isBossItem)}
          </BodyCopy>
        )}
      </div>
    );
  };

  render() {
    const {
      className,
      labels,
      productDetail,
      isBossEnabled,
      isBopisEnabled,
      isEcomSoldout,
      isECOMOrder,
      isBOPISOrder,
      isBOSSOrder,
      noBopisMessage,
      noBossMessage,
      bossDisabled,
      bopisDisabled,
    } = this.props;
    const { store } = productDetail.miscInfo;
    const radioGroupName = `ship-it-${productDetail.itemInfo.itemId}`;
    const commonSelectBox = 'common-select-box-css';
    const selectedMethod = 'selected-method';

    return (
      <div className={className}>
        {this.showBoss(isBOSSOrder, isBossEnabled) && (
          <LabeledRadioButton
            className={[
              'select-box-1',
              commonSelectBox,
              isBOSSOrder && selectedMethod,
              bossDisabled && 'disabled',
            ].join(' ')}
            name={radioGroupName}
            checked={isBOSSOrder}
            disabled={bossDisabled}
            data-locator={getLocator('cart_item_no_rush_radio_button')}
            onClick={() =>
              !isBOSSOrder && !bossDisabled
                ? this.handlePickupToggle(CONSTANTS.ORDER_ITEM_TYPE.BOSS)
                : ''
            }
          >
            {this.renderRadioItem({
              isSelected: isBOSSOrder,
              onlineClearanceMessage: noBossMessage,
              store,
              disabled: bossDisabled,
              radioText: labels.bossPickUp,
              isBossItem: true,
              isEcomItem: false,
              labels,
            })}
          </LabeledRadioButton>
        )}
        {this.showBopis(isBOPISOrder, isBopisEnabled) && (
          <LabeledRadioButton
            className={[
              'normal-select-box',
              commonSelectBox,
              isBOPISOrder && selectedMethod,
              bopisDisabled && 'disabled',
            ].join(' ')}
            name={radioGroupName}
            checked={isBOPISOrder}
            disabled={bopisDisabled}
            data-locator={getLocator('cart_item_pickup_radio_today_button')}
            onClick={() =>
              !isBOPISOrder && !bopisDisabled
                ? this.handlePickupToggle(CONSTANTS.ORDER_ITEM_TYPE.BOPIS)
                : ''
            }
          >
            {this.renderRadioItem({
              isSelected: isBOPISOrder,
              onlineClearanceMessage: noBopisMessage,
              store,
              disabled: bopisDisabled,
              radioText: labels.bopisPickUp,
              isBossItem: false,
              isEcomItem: false,
              labels,
            })}
          </LabeledRadioButton>
        )}
        <LabeledRadioButton
          className={[
            'normal-select-box',
            commonSelectBox,
            isECOMOrder && selectedMethod,
            isEcomSoldout && 'disabled',
          ].join(' ')}
          name={radioGroupName}
          checked={isECOMOrder}
          disabled={isEcomSoldout}
          onClick={() => {
            this.handleShipToHome(isECOMOrder, isEcomSoldout);
          }}
          data-locator={getLocator('cart_item_ship_to_home_radio_button')}
        >
          {this.renderRadioItem({
            isSelected: isECOMOrder,
            onlineClearanceMessage: false,
            store,
            disabled: isEcomSoldout,
            radioText: labels.ecomShipping,
            isBossItem: false,
            isEcomItem: true,
            labels,
          })}
        </LabeledRadioButton>
      </div>
    );
  }
}

CartItemRadioButtons.propTypes = {
  productDetail: PropTypes.shape({
    miscInfo: {},
  }).isRequired,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  isBossEnabled: PropTypes.bool.isRequired,
  isBopisEnabled: PropTypes.bool.isRequired,
  isEcomSoldout: PropTypes.bool.isRequired,
  isECOMOrder: PropTypes.bool.isRequired,
  isBOPISOrder: PropTypes.bool.isRequired,
  isBOSSOrder: PropTypes.bool.isRequired,
  noBopisMessage: PropTypes.string.isRequired,
  noBossMessage: PropTypes.string.isRequired,
  bossDisabled: PropTypes.bool.isRequired,
  bopisDisabled: PropTypes.bool.isRequired,
  openPickUpModal: PropTypes.bool.isRequired,
  setShipToHome: PropTypes.func.isRequired,
  pickupStoresInCart: PropTypes.shape({}).isRequired,
  autoSwitchPickupItemInCart: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
};

export default withStyles(CartItemRadioButtons, style);
export { CartItemRadioButtons as CartItemRadioButtonsVanilla };
