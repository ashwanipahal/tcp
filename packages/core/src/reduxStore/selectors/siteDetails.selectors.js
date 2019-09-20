import { SESSIONCONFIG_REDUCER_KEY } from '../../constants/reducer.constants';
import { defaultCountries } from '../../constants/site.constants';

export /**
 *
 * @function getCurrentCountry
 * @param {*} state
 * @description this selector gives current country selected.
 */
const getCurrentCountry = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'country'])
  );
};

export /**
 *
 * @function getIsInternationalShipping
 * @param {*} state
 * @description this selector gives whether current country is other than US/CA.
 */
const getIsInternationalShipping = state => {
  return (
    getCurrentCountry(state) !== defaultCountries[0].id &&
    getCurrentCountry(state) !== defaultCountries[1].id
  );
};
