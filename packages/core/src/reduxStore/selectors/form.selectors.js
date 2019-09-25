import { getFormSKUValue } from '../../utils/utils';

const getFormValues = (state, formName) => {
  return state.form[formName] && state.form[formName].values;
};

const getAddedToBagFormValues = (state, formName) => {
  const formValues = getFormValues(state, formName);
  return (
    formValues && {
      ...getFormSKUValue(formValues),
    }
  );
};

export default getAddedToBagFormValues;
