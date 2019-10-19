import {
  validateBossEligibility,
  validateBopisEligibility,
} from '@tcp/core/src/components/common/organisms/ProductPickup/util';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import CONSTANTS from '../../../../Checkout/Checkout.constants';

/**
 * @function noBossBopisMessage Checks for online only or clearance messages for BOSS/BOPIS items
 * @return {Object}
 * @memberof CartItemTile
 */
export const noBossBopisMessage = props => {
  const {
    productDetail: {
      miscInfo: { isOnlineOnly, clearanceItem },
    },
    isBopisClearanceProductEnabled,
    isBossClearanceProductEnabled,
    labels,
  } = props;

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

export const isEcomOrder = orderType => orderType === CONSTANTS.ORDER_ITEM_TYPE.ECOM;

export const isBopisOrder = orderType => orderType === CONSTANTS.ORDER_ITEM_TYPE.BOPIS;

export const isBossOrder = orderType => orderType === CONSTANTS.ORDER_ITEM_TYPE.BOSS;

/**
 * @function checkBOSSDisabled
 * @param {bool} isBossEnabled Represents Country/State level kill switch
 * @param {bool} isEcomSoldout Represents whether the product is sold out
 * @param {bool} isBOSSOrder Represent BOSS item
 * @memberof CartItemTile
 */
export const checkBOSSDisabled = (props, isBossEnabled, isEcomSoldout, isBOSSOrder) => {
  const {
    productDetail: {
      miscInfo: { isStoreBOSSEligible, availability },
    },
    productDetail: { miscInfo },
    isBossClearanceProductEnabled,
    isRadialInventoryEnabled,
  } = props;
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
export const checkBOPISDisabled = (props, isBopisEnabled, isEcomSoldout, isBOPISOrder) => {
  const {
    productDetail: {
      miscInfo: { isOnlineOnly, availability },
      itemInfo: { isGiftItem },
    },
    productDetail: { miscInfo },
    isBopisClearanceProductEnabled,
  } = props;

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
export const checkBossBopisDisabled = (
  props,
  isBossEnabled,
  isBopisEnabled,
  isEcomSoldout,
  isBOSSOrder,
  isBOPISOrder
) => {
  const bossDisabled = checkBOSSDisabled(props, isBossEnabled, isEcomSoldout, isBOSSOrder);
  const bopisDisabled = checkBOPISDisabled(props, isBopisEnabled, isEcomSoldout, isBOPISOrder);
  return { bossDisabled, bopisDisabled };
};

export const showRadioButtons = ({
  isEcomSoldout,
  isECOMOrder,
  isBossEnabled,
  isBopisEnabled,
  store,
}) => {
  return (!isEcomSoldout || isECOMOrder) && (isBossEnabled || isBopisEnabled || store);
};

export const isSoldOut = availability => availability === CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT;

export const getBossBopisFlags = (props, brand) => {
  const {
    [`isBossEnabled${brand}`]: isBossEnabled,
    [`isBopisEnabled${brand}`]: isBopisEnabled,
  } = props;

  return {
    isBossEnabled,
    isBopisEnabled,
  };
};
