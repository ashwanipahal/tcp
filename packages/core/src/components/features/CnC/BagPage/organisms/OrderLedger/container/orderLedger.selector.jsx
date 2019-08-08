export const getItemsTotalCount = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalItems']) || 0;
};
export const getCouponsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'couponsTotal']) || 0;
};
export const getSavingsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'savingsTotal']) || 0;
};
export const getShippingTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'shippingTotal']) || 0;
};
export const getTotalTax = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totaltax']) || 0;
};
export const getGrandTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'grandTotal']) || 0;
};
export const getGiftCardsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'giftCardsTotal']) || 0;
};
export const getTotalOrderSavings = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalOrderSavings']) || 0;
};
export const getSubTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'subTotal']) || 0;
};
export const getCurrencySymbol = state => {
  const currency = state.session && state.session.getIn(['siteDetails', 'currency']);
  // eslint-disable-next-line no-nested-ternary
  return currency ? (currency === 'USD' || currency === 'CA' ? '$' : currency) : '$';
};
export const getLedgerSummaryData = state => {
  return {
    itemsCount: getItemsTotalCount(state),
    subTotal: getSubTotal(state),
    couponsTotal: getCouponsTotal(state),
    savingsTotal: getSavingsTotal(state),
    shippingTotal: getShippingTotal(state),
    taxesTotal: getTotalTax(state),
    grandTotal: getGrandTotal(state),
    giftCardsTotal: getGiftCardsTotal(state),
    orderBalanceTotal: getGrandTotal(state) - getGiftCardsTotal(state),
    totalOrderSavings: getTotalOrderSavings(state),
    currencySymbol: getCurrencySymbol(state),
  };
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
        lbl_orderledger_free: free,
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
    free,
  };
};
