export const getTotalItemCount = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalItems']);
};

export const getLabelsMiniBag = state => {
  const {
    bag: {
      bagOverview: {
        lbl_miniBag_createAccount: createAccount,
        lbl_miniBag_logIn: logIn,
        lbl_cartTile_points: points,
        lbl_miniBag_inRewards: inRewards,
        lbl_miniBag_hi: hi,
        lbl_miniBag_viewBag: viewBag,
        lbl_miniBag_ViewSaveForLater: viewSaveForLater,
        lbl_miniBag_subTotal: subTotal,
      },
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
  };
};
