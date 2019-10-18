import { formValueSelector } from 'redux-form';
import MyPreferenceConst from '../MyPrefrence.constants';

export const getIsTcpSubscribe = state => {
  const selector = formValueSelector(MyPreferenceConst.MY_PREFERENCE_FORM);
  return selector(state, 'primary3');
};

export default getIsTcpSubscribe;
