import { getFormSquValue } from '../../utils/utils';

const getFormValues = (state, formName) => {
  return state.form[formName] && state.form[formName].values;
};

const getQuickViewFormValues = (state, formName) => {
  const formValues = getFormValues(state, formName);
  return (
    formValues && {
      ...getFormSquValue(formValues),
    }
  );
};

export default getQuickViewFormValues;
