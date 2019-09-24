import { getLabelValue } from '../../../../../utils';

export const getProductInfo = state => {
  return state.QuickView.get('quickViewProduct');
};

export const getModalState = state => {
  return state.QuickView.get('isModalOpen');
};

export const getQuickViewLabels = state => {
  return {
    addToBag: getLabelValue(state.Labels, 'lbl_add_to_bag', 'QuickView', 'Browse'),
    viewProductDetails: getLabelValue(
      state.Labels,
      'lbl_view_product_details',
      'QuickView',
      'Browse'
    ),
  };
};
