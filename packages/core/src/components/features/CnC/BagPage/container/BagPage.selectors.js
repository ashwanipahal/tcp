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
      addedToBag: { lbl_header_addedToBag: addedToBag, lbl_cta_checkout: checkout, referred },
      bagOverview: { lbl_header_bag: bagHeading },
    },
  } = state.Labels;
  return {
    addedToBag,
    checkout,
    referred,
    bagHeading,
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
  let needhelpContentId;
  if (state.Labels.bag.addedToBag && Array.isArray(state.Labels.bag.addedToBag.referred)) {
    state.Labels.bag.addedToBag.referred.forEach(label => {
      if (label.name === 'NEED_HELP_DATA') needhelpContentId = label.contentId;
    });
  }
  return needhelpContentId;
};

export default {
  getBagPageLabels,
  getTotalItems,
  getOrderItems,
  getProductsTypes,
  getNeedHelpContentId,
};
