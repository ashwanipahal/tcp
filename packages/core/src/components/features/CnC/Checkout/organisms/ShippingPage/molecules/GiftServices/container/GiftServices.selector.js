import BagPageSelector from '../../../../../../BagPage/container/BagPage.selectors';

export const getGiftServicesLabels = state => {
  const {
    checkout: {
      shipping: {
        lbl_giftServices_header: giftServices,
        lbl_giftServices_details: details,
        lbl_giftServices_add: addAGift,
        lbl_giftServices_select: selectBrand,
      } = {},
    } = {},
  } = state.Labels;

  return {
    giftServices,
    details,
    addAGift,
    selectBrand,
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
