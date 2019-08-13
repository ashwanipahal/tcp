export const filterProductsBrand = (arr, searchedValue) => {
  const obj = [];
  const filterArray = arr.filter(value => {
    return value.getIn(['productInfo', 'itemBrand']) === searchedValue;
  });
  filterArray.forEach(item => {
    obj.push(item.getIn(['productInfo', 'productPartNumber']));
  });
  return obj;
};

const getBagPageLabels = state => {
  const {
    bag: {
      addedToBag: { lbl_header_addedToBag: addedToBag, lbl_cta_checkout: checkout },
      bagOverview: {
        lbl_header_bag: bagHeading,
        lbl_emptyBag_loggedInMsg: loggedInMsg,
        lbl_emptyBag_notLoggedInMsg: guestUserMsg,
        lbl_emptyBag_loginIn: login,
        lbl_emptyBag_shopNow: shopNow,
        lbl_emptyBag_inspirationTagLine: tagLine,
        lbl_emptyBag_helperMsg: helperMsg,
      } = {},
    } = {},
  } = state.Labels;
  return {
    addedToBag,
    checkout,
    bagHeading,
    loggedInMsg,
    login,
    shopNow,
    tagLine,
    guestUserMsg,
    helperMsg,
  };
};

const getTotalItems = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalItems']) || 0;
};

const getOrderItems = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'orderItems']) || 0;
};

const getProductsTypes = state => {
  const orderItems = getOrderItems(state);
  let tcpProducts = [];
  let gymProducts = [];
  if (orderItems) {
    tcpProducts = filterProductsBrand(orderItems, 'TCP');
    gymProducts = filterProductsBrand(orderItems, 'GYM');
  }
  return {
    tcpProducts,
    gymProducts,
  };
};

const getNeedHelpContentId = state => {
  const { referred = [] } = state.Labels.bag.addedToBag;
  const content = referred.find(label => label.name === 'NEED_HELP_DATA');
  return content && content.contentId;
};

export default {
  getBagPageLabels,
  getTotalItems,
  getOrderItems,
  getProductsTypes,
  getNeedHelpContentId,
};
