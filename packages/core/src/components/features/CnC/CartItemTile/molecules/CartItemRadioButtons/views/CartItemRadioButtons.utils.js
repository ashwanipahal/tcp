import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import CONSTANTS from '../../../../Checkout/Checkout.constants';

/**
 * @function handleShipToHome Ship to Home click handler
 * @param {bool} isECOMOrder Represents Whether it is STH option selected already
 * @param {bool} isEcomSoldout Represents whether the product has been soldout or not.
 * @memberof CartItemRadioButtons
 */
export const handleShipToHome = props => {
  const {
    setShipToHome,
    productDetail: {
      itemInfo: { itemId },
      miscInfo: { orderItemType },
    },
    isECOMOrder,
    isEcomSoldout,
  } = props;

  /* istanbul ignore else */
  if (!isECOMOrder && !isEcomSoldout) {
    setShipToHome(itemId, orderItemType);
  }
};

/**
 * @function handleSingleStore Handles the toggling scenarios when there is single store in the cart.
 * @param {Object} props
 * @returns {Function} Whether to open the modal or call updateOrderItem API.
 */
const handleSingleStore = ({
  props,
  pickupType,
  switchingToBopisOption,
  switchingToBossOption,
  formData,
}) => {
  const { openPickUpModal, autoSwitchPickupItemInCart, pickupStoresInCart } = props;
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
export const handleDifferentStores = ({
  props,
  pickupType,
  switchingToBopisOption,
  switchingToBossOption,
  formData,
  bossStoreIndex,
}) => {
  const { openPickUpModal, autoSwitchPickupItemInCart, pickupStoresInCart } = props;
  return pickupStoresInCart.getIn([bossStoreIndex, 'isStoreBOSSEligible']) || switchingToBopisOption
    ? autoSwitchPickupItemInCart(formData, switchingToBopisOption, switchingToBossOption)
    : openPickUpModal(pickupType, false, false, true);
};

/**
 * @function getBossBopisStoreIndexes Retrives the indexes of the stores fron pickupInStores Object in cart
 * @param {Object} props Props from the parent component
 * @returns {Object} boss bopis indexes.
 */
const getBossBopisStoreIndexes = props => {
  const { BOSS, BOPIS } = CONSTANTS.ORDER_ITEM_TYPE;
  const { pickupStoresInCart } = props;
  const bossStoreIndex = pickupStoresInCart.getIn([0, 'orderType']) === BOSS ? 0 : 1;
  const bopisStoreIndex = pickupStoresInCart.getIn([0, 'orderType']) === BOPIS ? 0 : 1;
  return {
    bossStoreIndex,
    bopisStoreIndex,
  };
};

/**
 * @function getSwitchingOptions Retrieves the information to which option toggling is happening.
 * @param {String} pickupType Pickup type, either BOSS or BOPIS
 * @returns {Object}
 */
const getSwitchingOptions = pickupType => {
  const { BOSS, BOPIS } = CONSTANTS.ORDER_ITEM_TYPE;
  const switchingToBopisOption = pickupType === BOPIS;
  const switchingToBossOption = pickupType === BOSS;
  return {
    switchingToBopisOption,
    switchingToBossOption,
  };
};

/**
 * @function createFormData Method create the form data to be passed to update order item api call.
 * @param {Object} props
 * @param {String} pickupType Pickup type, either BOSS or BOPIS
 * @returns {Object}
 */
const createFormData = (props, pickupType) => {
  const {
    productDetail: {
      productInfo: { skuId, itemPartNumber, variantNo, generalProductId },
      itemInfo: { isGiftItem, itemId, qty: quantity },
      miscInfo: { orderItemType, store },
    },
    orderId,
  } = props;
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

export const handlePickupToggle = (props, pickupType) => {
  const { BOSS } = CONSTANTS.ORDER_ITEM_TYPE;
  const { OPEN_SELECTION_MODAL, AUTO_SWITCH } = CARTPAGE_CONSTANTS.STORE_SWITCH;
  const { openPickUpModal, pickupStoresInCart } = props;
  const formData = createFormData(props, pickupType);
  const { switchingToBopisOption, switchingToBossOption } = getSwitchingOptions(pickupType);

  /* istanbul ignore else */
  // when no stores are seleceted
  if (pickupStoresInCart.size === OPEN_SELECTION_MODAL) {
    return openPickUpModal(pickupType);
  }
  /* istanbul ignore else */
  if (pickupStoresInCart.size === AUTO_SWITCH) {
    // when one store is selected boss/bopis
    formData.storeId = pickupStoresInCart.getIn([0, 'stLocId']);
    return handleSingleStore({
      props,
      pickupType,
      switchingToBopisOption,
      switchingToBossOption,
      formData,
    });
  }
  /* istanbul ignore else */
  if (pickupStoresInCart.getIn([0, 'orderType']) !== pickupStoresInCart.getIn([1, 'orderType'])) {
    // when 1 boss and 1 bopis stpre is selected
    const { bossStoreIndex, bopisStoreIndex } = getBossBopisStoreIndexes(props);
    formData.storeId = switchingToBossOption
      ? pickupStoresInCart.getIn([bossStoreIndex, 'stLocId'])
      : pickupStoresInCart.getIn([bopisStoreIndex, 'stLocId']);
    return handleDifferentStores({
      props,
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
  return openPickUpModal(pickupType, false, true);
};
