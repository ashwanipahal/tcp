import getAddedToBagFormValues from '../../../../../reduxStore/selectors/form.selectors';
import { PRODUCT_ADD_TO_BAG } from '../../../../../constants/reducer.constants';

import { getLabelValue } from '../../../../../utils';

export const getProductInfo = state => {
  return state.QuickView.get('quickViewProducts');
};

export const getProductInfoFromBag = state => {
  return state.QuickView.get('quickViewProductFromBag');
};

export const getLoadingState = state => {
  return state.QuickView.get('isLoading');
};

export const getSelectedColorId = state => {
  return state.QuickView.get('selectedColorId');
};

export const getFromBagPage = state => {
  return state.QuickView.get('fromBagPage');
};

export const getIsFromBagProductSfl = state => {
  return state.QuickView.get('isSflProduct');
};

export const getEditFavorite = state => {
  return state.QuickView.get('isFavoriteEdit');
};

export const getGeneralProductId = state => {
  return state.QuickView.getIn(['quickViewProducts', 'generalProductId']);
};

export const getModalState = state => {
  return state.QuickView.get('isModalOpen');
};

export const getQuickViewFormValues = state => {
  const products = getProductInfo(state) || [];
  return products.map(({ product }) => {
    const { generalProductId } = product;
    return getAddedToBagFormValues(state, `${PRODUCT_ADD_TO_BAG}-${generalProductId}`);
  });
};

export const getQuickViewLabels = state => {
  return {
    addToBag: getLabelValue(state.Labels, 'lbl_add_to_bag', 'QuickView', 'Browse'),
    editItem: getLabelValue(state.Labels, 'lbl_edit_item', 'QuickView', 'Browse'),
    editProduct: getLabelValue(state.Labels, 'lbl_edit_product', 'QuickView', 'Browse'),
    noProductSelected: getLabelValue(
      state.Labels,
      'plp_no_product_selected_error',
      'QuickView',
      'Browse'
    ),
    viewProductDetails: getLabelValue(
      state.Labels,
      'lbl_view_product_details',
      'QuickView',
      'Browse'
    ),
  };
};
