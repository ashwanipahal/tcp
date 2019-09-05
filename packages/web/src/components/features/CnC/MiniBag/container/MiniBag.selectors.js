export const getTotalItemCount = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalItems']);
};

export const getIsCartItemsUpdating = state => {
  return state.CartPageReducer.getIn(['uiFlags', 'isCartItemsUpdating']);
};

export const getLabelsMiniBag = state => {
  const {
    global: {
      addedToBagModal: { lbl_footer_continueShopping: continueShopping },
      minibag: {
        lbl_miniBag_createAccount: createAccount,
        lbl_miniBag_logIn: logIn,
        lbl_cartTile_points: points,
        lbl_miniBag_inRewards: inRewards,
        lbl_miniBag_hi: hi,
        lbl_miniBag_viewBag: viewBag,
        lbl_miniBag_ViewSaveForLater: viewSaveForLater,
        lbl_miniBag_subTotal: subTotal,
        lbl_miniBag_checkout: checkOut,
        lbl_miniBag_yourShoppingBag: yourShoppingBag,
        lbl_miniBag_dontHaveAccount: dontHaveAccount,
        lbl_miniBag_createOne: createOne,
        lbl_minibag_itemUpdated: itemUpdated,
        lbl_minibag_itemDeleted: itemDeleted,
      } = {},
    },
  } = state.Labels;
  return {
    createAccount,
    logIn,
    points,
    inRewards,
    hi,
    viewBag,
    viewSaveForLater,
    subTotal,
    checkOut,
    continueShopping,
    yourShoppingBag,
    dontHaveAccount,
    createOne,
    itemUpdated,
    itemDeleted,
  };
};
