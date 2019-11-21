import BagPageSelector from '../../../../../../BagPage/container/BagPage.selectors';

export const getGiftServicesLabels = state => {
  const {
    checkout: {
      shipping: {
        lbl_giftServices_header: giftServices,
        lbl_giftServices_details: details,
        lbl_giftServices_add: addAGift,
        lbl_giftServices_select: selectBrand,
        lbl_giftServices_addMessage: addMessage,
        lbl_giftServices_charLimit: charLimit,
        lbl_shipping_giftServicesTcpOptionName1: tcpOptionName1,
        lbl_shipping_giftServicesGymOptionName1: gymOptionName1,
        lbl_shipping_giftServicesTcpOptionPrice1: tcpOptionPrice1,
        lbl_shipping_giftServicesGymOptionPrice1: gymOptionPrice1,
        lbl_shipping_giftServicesTcpOptionDesc1: tcpOptionDesc1,
        lbl_shipping_giftServicesGymOptionDesc1: gymOptionDesc1,
        lbl_shipping_giftServicesTcpOptionName2: tcpOptionName2,
        lbl_shipping_giftServicesGymOptionName2: gymOptionName2,
        lbl_shipping_giftServicesTcpOptionPrice2: tcpOptionPrice2,
        lbl_shipping_giftServicesGymOptionPrice2: gymOptionPrice2,
        lbl_shipping_giftServicesTcpOptionDesc2: tcpOptionDesc2,
        lbl_shipping_giftServicesGymOptionDesc2: gymOptionDesc2,
        lbl_shipping_giftServicesTcpOptionName3: tcpOptionName3,
        lbl_shipping_giftServicesGymOptionName3: gymOptionName3,
        lbl_shipping_giftServicesTcpOptionPrice3: tcpOptionPrice3,
        lbl_shipping_giftServicesGymOptionPrice3: gymOptionPrice3,
        lbl_shipping_giftServicesTcpOptionDesc3: tcpOptionDesc3,
        lbl_shipping_giftServicesGymOptionDesc3: gymOptionDesc3,
      } = {},
    } = {},
  } = state.Labels;

  return {
    giftServices,
    details,
    addAGift,
    selectBrand,
    addMessage,
    charLimit,
    tcpOptionName1,
    gymOptionName1,
    tcpOptionPrice1,
    gymOptionPrice1,
    tcpOptionDesc1,
    gymOptionDesc1,
    tcpOptionName2,
    gymOptionName2,
    tcpOptionPrice2,
    gymOptionPrice2,
    tcpOptionDesc2,
    gymOptionDesc2,
    tcpOptionName3,
    gymOptionName3,
    tcpOptionPrice3,
    gymOptionPrice3,
    tcpOptionDesc3,
    gymOptionDesc3,
  };
};
export const getGiftWrapOptions = state => {
  const giftWrapOptions = state.Checkout.getIn(['options', 'giftWrapOptions']);
  return giftWrapOptions.text || '';
};

export const getDetailsContent = state => {
  const detailsContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === BagPageSelector.getGiftServicesContentTcpId(state)
  );
  return detailsContent && detailsContent.richText;
};
export const getDetailsContentZymboorie = state => {
  const detailsContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === BagPageSelector.getGiftServicesContentGymId(state)
  );
  return detailsContent && detailsContent.richText;
};
export const getInitialGiftWrapOptions = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'checkout', 'giftWrap']);
};

export const getFormGiftMsg = state => {
  return state.Checkout.getIn(['options', 'giftWrapOptions', 'text', 'GiftMsg']) || '';
};

export const getFormCatEntryId = state => {
  return state.Checkout.getIn(['options', 'giftWrapOptions', 'text', 'catEntryId']) || '';
};

export const getCartOrderDetails = state => {
  return state.CartPageReducer.get('orderDetails');
};

export const getCartOrderId = state => {
  return getCartOrderDetails(state).get('orderId');
};
