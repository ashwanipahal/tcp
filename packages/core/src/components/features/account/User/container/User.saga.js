import { all, call, takeLatest, put } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { submitUserSurvey } from '@tcp/core/src/services/abstractors/account/UpdateProfileInfo';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import { updateProfileSuccess } from '@tcp/core/src/components/features/account/MyProfile/container/MyProfile.actions';
import countryListAbstractor from '../../../../../services/abstractors/bootstrap/countryList';
import {
  setCountry,
  setCurrency,
  setLanguage,
  setBossBopisFlags,
  setCountryName,
} from '../../../../../reduxStore/actions';
import CONSTANTS from '../User.constants';
import { setUserInfo, setIsRegisteredUserCallDone } from './User.actions';
import { getProfile } from '../../../../../services/abstractors/account';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { getSiteId, isMobileApp, routerPush } from '../../../../../utils';
import { API_CONFIG } from '../../../../../services/config';
import { setAddressList } from '../../AddressBook/container/AddressBook.actions';
import { defaultCountries, defaultCurrencies } from '../../../../../constants/site.constants';

// eslint-disable-next-line complexity
export function* getUserInfoSaga() {
  try {
    const response = yield call(getProfile, {
      pageId: 'myAccount',
      source: 'login',
    });
    const siteId = getSiteId();
    const { CA_CONFIG_OPTIONS: apiConfig, siteIds } = API_CONFIG;
    const { country, currency, language, bossBopisFlags } = response;
    const dataSetActions = [];
    const [us, ca] = defaultCountries;
    const [currencyAttributesUS, currencyAttributesCA] = defaultCurrencies;

    if (country) {
      dataSetActions.push(put(setCountry(country)));
    }

    dataSetActions.push(
      put(setCurrency({ currency })),
      put(setUserInfo(response)),
      put(setAddressList(response.contactList, true)),
      put(setBossBopisFlags(bossBopisFlags)),
      put(setIsRegisteredUserCallDone())
    );

    yield all(dataSetActions);

    /**
     * Below code is to get currency attributes based on
     * current country returned from getRegisteredUserInfo API
     */
    if (!isMobileApp()) {
      let currencyAttributes = {};
      let countryAttributes = {};
      if (country === us.id) {
        currencyAttributes = currencyAttributesUS;
        countryAttributes = us;
      } else if (country === ca.id) {
        currencyAttributes = currencyAttributesCA;
        countryAttributes = ca;
      } else {
        const res = yield call(countryListAbstractor.getData, country);
        const countryList = res && res.data.countryList;
        const currentCountry = countryList.length && countryList[0];

        const { country: countryObj, currency: currencyObj, exchangeRate } = currentCountry;
        currencyAttributes = { ...currencyObj, ...exchangeRate };
        countryAttributes = countryObj;
      }

      yield put(
        setCurrency({
          currency,
          currencyAttributes,
        })
      );
      yield put(setCountryName((countryAttributes && countryAttributes.displayName) || ''));
    }

    if (language) {
      yield put(setLanguage(language));
    }

    if (!isMobileApp() && country === siteIds.ca.toUpperCase() && siteId !== apiConfig.siteId) {
      routerPush(window.location, '/home', null, siteId);
    }
  } catch (err) {
    yield put(setIsRegisteredUserCallDone());
    logger.error('Error: error in fetching user profile information');
  }
}

function* setSurveyAnswersSaga(data) {
  yield put(setLoaderState(true));
  try {
    yield call(submitUserSurvey, data);
    yield call(getUserInfoSaga);
    yield put(updateProfileSuccess('successMessage'));
    yield put(setLoaderState(false));
  } catch (err) {
    yield put(setLoaderState(false));
    yield null;
  }
}

export function* UserSaga() {
  const cachedUserInfo = validateReduxCache(getUserInfoSaga);
  yield takeLatest(CONSTANTS.GET_USER_INFO, cachedUserInfo);
  yield takeLatest(CONSTANTS.SET_SURVEY_ANSWERS, setSurveyAnswersSaga);
}

export default UserSaga;
