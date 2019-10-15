import { formValueSelector } from 'redux-form';
import MyPrefrenceConst from '../MyPrefrence.constants';

export const getIsTcpSubscribe = state => {
  const selector = formValueSelector(MyPrefrenceConst.MY_PREFRENCE_FORM);
  return selector(state, 'primary3');
};

export default getIsTcpSubscribe;
