import {
  getColorFormValue,
  getQuantityFormValue,
  getFitFormValue,
  getSizeFormValue,
} from '../../components/common/organisms/QuickViewModal/utils';

const getQuickViewFormValues = state => {
  const getCurrentProduct = state.QuickView && state.QuickView.get('quickViewProduct');
  const getGeneralProdId = getCurrentProduct && getCurrentProduct.generalProductId;
  const formValues =
    getGeneralProdId &&
    state.form[`ProductAddToBag-${getGeneralProdId}`] &&
    state.form[`ProductAddToBag-${getGeneralProdId}`].values;
  return (
    formValues && {
      color: getColorFormValue(formValues),
      size: getSizeFormValue(formValues),
      quantity: getQuantityFormValue(formValues),
      fit: getFitFormValue(formValues),
    }
  );
};

export default getQuickViewFormValues;
