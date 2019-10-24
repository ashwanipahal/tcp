import {
  validateBossEligibility,
  validateBopisEligibility,
} from '@tcp/core/src/components/common/organisms/ProductPickup/util';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import CONSTANTS from '../../../../Checkout/Checkout.constants';
import { currencyConversion } from '../../../utils/utils';

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

export const hideEditBossBopis = (isBOSSOrder, bossDisabled, isBOPISOrder, bopisDisabled) => {
  return (isBOSSOrder && bossDisabled) || (isBOPISOrder && bopisDisabled);
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
export const getBOSSUnavailabilityMessage = (bossDisabled, noBossMessage, availability, labels) => {
  let unavailableMessage = '';
  const { UNAVAILABLE, REQ_QTY_UNAVAILABLE, BOSSINELIGIBLE } = CARTPAGE_CONSTANTS.AVAILABILITY;
  /* istanbul ignore else */
  if (bossDisabled || !!noBossMessage) {
    switch (availability) {
      case UNAVAILABLE:
        unavailableMessage = labels.bossUnavailable;
        break;
      case REQ_QTY_UNAVAILABLE:
        unavailableMessage = labels.bossReqQtyUnavailable;
        break;
      case BOSSINELIGIBLE:
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
export const getBOPISUnavailabilityMessage = (
  bopisDisabled,
  noBopisMessage,
  availability,
  labels
) => {
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
export const getSTHUnavailabilityMessage = (availability, labels) =>
  availability !== CARTPAGE_CONSTANTS.AVAILABILITY.OK ? labels.ecomUnavailable : '';

export const isCurrencyExchangeAvailable = currencyExchange =>
  currencyExchange && currencyExchange.length;

export const getPrices = ({ productDetail, currencyExchange }) => {
  let { listPrice, wasPrice, salePrice, price } = productDetail.itemInfo;
  const isCurrencyExchange = isCurrencyExchangeAvailable(currencyExchange);
  // Cart item tile prices
  salePrice =
    isCurrencyExchange && salePrice
      ? currencyConversion(salePrice, currencyExchange[0])
      : salePrice;
  wasPrice =
    isCurrencyExchange && wasPrice ? currencyConversion(wasPrice, currencyExchange[0]) : wasPrice;

  // SFL prices
  listPrice =
    isCurrencyExchange && listPrice
      ? currencyConversion(listPrice, currencyExchange[0])
      : listPrice;
  price = isCurrencyExchange && price ? currencyConversion(listPrice, currencyExchange[0]) : price;
  return {
    salePrice,
    wasPrice,
    listPrice,
    price,
  };
};
