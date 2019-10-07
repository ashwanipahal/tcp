import getAddedToBagFormValues from '../../../../../reduxStore/selectors/form.selectors';

import { getLabelValue } from '../../../../../utils';

export const getProductInfo = state => {
  return state.QuickView.get('quickViewProduct');
};

export const getProductInfoFromBag = state => {
  return state.QuickView.get('quickViewProductFromBag');
};

export const getGeneralProductId = state => {
  return state.QuickView.getIn(['quickViewProduct', 'generalProductId']);
};

export const getModalState = state => {
  return state.QuickView.get('isModalOpen');
};

export const getQuickViewFormValues = state => {
  const generalProductId = getGeneralProductId(state);
  return getAddedToBagFormValues(state, `ProductAddToBag-${generalProductId}`);
};

export const getQuickViewLabels = state => {
  return {
    addToBag: getLabelValue(state.Labels, 'lbl_add_to_bag', 'QuickView', 'Browse'),
    editItem: getLabelValue(state.Labels, 'lbl_edit_item', 'QuickView', 'Browse'),
    viewProductDetails: getLabelValue(
      state.Labels,
      'lbl_view_product_details',
      'QuickView',
      'Browse'
    ),
  };
};
