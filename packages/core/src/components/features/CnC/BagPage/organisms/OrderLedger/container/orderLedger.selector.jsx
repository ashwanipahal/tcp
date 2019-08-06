export const getItemsTotalCount = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalItems']);
};
export const getCouponsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'couponsTotal']);
};
export const getSavingsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'savingsTotal']);
};
export const getShippingTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'shippingTotal']);
};
export const getTotalTax = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totaltax']);
};
export const getGrandTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'grandTotal']);
};
export const getGiftCardsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'giftCardsTotal']);
};
export const getTotalOrderSavings = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalOrderSavings']);
};
export const getSubTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'subTotal']);
};
export const getOrderLedgerLabels = state => {
  const {
    bag: {
      bagOverview: {
        lbl_orderledger_items: itemsLabel,
        lbl_orderledger_coupons: couponsLabel,
        lbl_orderledger_promotions: promotionsLabel,
        lbl_orderledger_shipping: shippingLabel,
        lbl_orderledger_tax: taxLabel,
        lbl_orderledger_total: totalLabel,
        lbl_orderledger_giftcards: giftcardsLabel,
        lbl_orderledger_balance: balanceLabel,
        lbl_orderledger_totalsavings: totalSavingsLabel,
        lbl_orderledger_tooltiptext: tooltipText,
      },
    },
  } = state.Labels;

  return {
    itemsLabel,
    couponsLabel,
    promotionsLabel,
    shippingLabel,
    taxLabel,
    totalLabel,
    giftcardsLabel,
    balanceLabel,
    totalSavingsLabel,
    tooltipText,
  };
};
