import { getLabelValue } from '@tcp/core/src/utils';

export const getTotalItemCount = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'totalItems']);
};

export const getIsCartItemsUpdating = state => {
  return state.CartPageReducer.getIn(['uiFlags', 'isCartItemsUpdating']);
};

export const getIsCartItemsSFL = state => {
  return state.CartPageReducer.getIn(['uiFlags', 'isItemMovedToSflList']);
};

export const getCartItemsSflError = state => {
  return state.CartPageReducer.getIn(['uiFlags', 'cartItemSflError']);
};

export const getIsMiniBagOpen = state => {
  return state.Header.miniBag;
};

export const getLabelsMiniBag = state => {
  return {
    createAccount: getLabelValue(state.Labels, 'lbl_miniBag_createAccount', 'minibag', 'global'),
    logIn: getLabelValue(state.Labels, 'lbl_miniBag_logIn', 'minibag', 'global'),
    points: getLabelValue(state.Labels, 'lbl_cartTile_points', 'cartItemTile', 'global'),
    inRewards: getLabelValue(state.Labels, 'lbl_miniBag_inRewards', 'minibag', 'global'),
    hi: getLabelValue(state.Labels, 'lbl_miniBag_hi', 'minibag', 'global'),
    viewBag: getLabelValue(state.Labels, 'lbl_miniBag_viewBag', 'minibag', 'global'),
    viewSaveForLater: getLabelValue(
      state.Labels,
      'lbl_miniBag_ViewSaveForLater',
      'minibag',
      'global'
    ),
    subTotal: getLabelValue(state.Labels, 'lbl_miniBag_subTotal', 'minibag', 'global'),
    checkOut: getLabelValue(state.Labels, 'lbl_miniBag_checkout', 'minibag', 'global'),
    yourShoppingBag: getLabelValue(
      state.Labels,
      'lbl_miniBag_yourShoppingBag',
      'minibag',
      'global'
    ),
    dontHaveAccount: getLabelValue(
      state.Labels,
      'lbl_miniBag_dontHaveAccount',
      'minibag',
      'global'
    ),
    createOne: getLabelValue(state.Labels, 'lbl_miniBag_createOne', 'minibag', 'global'),
    itemUpdated: getLabelValue(state.Labels, 'lbl_minibag_itemUpdated', 'minibag', 'global'),
    itemDeleted: getLabelValue(state.Labels, 'lbl_minibag_itemDeleted', 'minibag', 'global'),
    continueShopping: getLabelValue(
      state.Labels,
      'lbl_footer_continueShopping',
      'addedToBagModal',
      'global'
    ),
    viewSfl: getLabelValue(state.Labels, 'lbl_sfl_viewsfl', 'bagPage', 'checkout'),
    sflSuccess: getLabelValue(state.Labels, 'bl_sfl_actionSuccess', 'bagPage', 'checkout'),
    tickIcon: getLabelValue(state.Labels, 'lbl_sfl_success_tickIcon', 'bagPage', 'checkout'),
  };
};
