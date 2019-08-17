import { executeStatefulAPICall } from '../../handler';
import { getAPIConfig } from '../../../utils';
import endpoints from '../../endpoints';

export const responseContainsErrors = response => {
  if (!response || !response.body) {
    return false;
  }
  const responseBody = response.body;
  return !!(
    responseBody.errorCode ||
    responseBody.errorMessageKey ||
    responseBody.errorKey ||
    (responseBody.errors && responseBody.errors.length > 0) ||
    (response.body.error && response.body.error.errorCode)
  );
};

export const ADDREESS_TYPE = {
  SHIPPING: 'Shipping',
  BILLING: 'Billing',
  SHIPPINGANDBILLING: 'ShippingAndBilling',
  MAILING: 'Mailing',
};

export const parseBoolean = bool => {
  return bool === true || bool === '1' || (bool || '').toUpperCase() === 'TRUE';
};

/**
 * This function converts string to an array.
 * @param {string} string This param receives parse string
 * @param {string} delimeter This param splits the string using delimeter
 */
export const stringToArray = (string, delimeter) => {
  try {
    const obj = { ...string };
    return Object.keys(obj).map(key => obj[key].split(delimeter));
  } catch (e) {
    return [];
  }
};

export const getDefaultPlccAddress = addressDetails => {
  const plccAddress = addressDetails ? JSON.parse(addressDetails) : null;

  if (plccAddress) {
    return {
      addressId: plccAddress.wicAddressId,
      address: {
        firstName: plccAddress.firstName,
        lastName: plccAddress.lastName,

        addressLine1: plccAddress.addressLine1,
        addressLine2: plccAddress.addressLine2,
        city: plccAddress.city,
        state: plccAddress.state,
        country: plccAddress.country || 'US',
        zipCode: plccAddress.zipCode,
      },
      phoneNumber: plccAddress.phone1,
    };
  }

  return null;
};

export const getProfileAddress = body => ({
  addressId: body.addressId,
  addressKey: body.nickName,
  type: ADDREESS_TYPE.MAILING,
  isComplete: !!(body.city && body.state),
  phoneNumber: body.phone1,
  address: {
    addressLine1: body.addressLine && body.addressLine[0],
    addressLine2: body.addressLine && body.addressLine[1],
    city: body.city,
    state: body.state,
    country: body.country,
    zipCode: body.zipCode,
  },
});

export const getContextAttributes = body => {
  return (
    body.contextAttribute &&
    body.contextAttribute.reduce((obj, item) => {
      const {
        attributeName,
        attributeValue: [
          {
            value: [attrValue],
          },
        ],
      } = item;

      // eslint-disable-next-line no-param-reassign
      obj[attributeName] = attrValue; // Single value since it is an attribute
      return obj;
    }, {})
  );
};

export const getIfUserLoggedIn = body => {
  return parseBoolean(body.x_isRegistered) && !parseBoolean(body.x_isRememberedUser);
};

export const getIfUserRemembered = body => {
  return parseBoolean(body.x_isRegistered) && parseBoolean(body.x_isRememberedUser);
};

export const getSurveyAnswers = body => {
  return body.x_survey ? stringToArray(JSON.parse(body.x_survey), '|') : [];
};

export const formatAddressBookResponse = arr => {
  let containsDefault = false;

  const addresses = (arr || []).map(address => {
    containsDefault = containsDefault || parseBoolean(address.primary);
    return {
      addressId: address.addressId,
      addressKey: address.nickName,
      address: {
        firstName: address.firstName,
        lastName: address.lastName,
        addressLine1: address.addressLine ? address.addressLine[0] : null,
        addressLine2: address.addressLine ? address.addressLine[1] : null,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
      },
      emailAddress: address.email1,
      phoneNumber: address.phone1,
      type: address.addressType,
      isDefault: parseBoolean(address.primary),
    };
  });

  if (!containsDefault && addresses.length) {
    addresses[0].isDefault = true;
  }
  return addresses;
};

export const login = ({
  emailAddress,
  password,
  rememberMe,
  plccCardId,
  recaptchaToken,
  userId,
}) => {
  const apiConfig = getAPIConfig();
  const payload = {
    body: {
      storeId: apiConfig.storeId,
      logonId1: emailAddress.trim(),
      logonPassword1: password,
      rememberCheck: rememberMe || false,
      rememberMe: rememberMe || false,
      requesttype: 'ajax',
      reLogonURL: 'TCPAjaxLogonErrorView',
      URL: 'TCPAjaxLogonSuccessView',
      registryAccessPreference: 'Public',
      calculationUsageId: -1,
      createIfEmpty: 1,
      deleteIfEmpty: '*',
      fromOrderId: '*',
      toOrderId: '.',
      updatePrices: 0,
      xCreditCardId: plccCardId || '',
      reCaptcha: recaptchaToken,
    },
    webService: endpoints.logon,
  };

  if (userId) {
    payload.body.userId = userId;
  }

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        return {
          success: false,
          ...res.body,
        };
      }
      return {
        success: true,
      };
    })
    .catch(err => {
      throw new Error(err);
    });
};

export const getProfile = ({ refreshPoints = true, pageId, source }) => {
  const apiConfig = getAPIConfig();
  const payload = {
    header: {
      'X-Cookie': apiConfig.cookie,
      refreshPoints,
    },
    body: {
      _: new Date().getTime(),
    },
    webService: endpoints.getRegisteredUserDetailsInfo,
  };
  if (pageId) {
    payload.header.pageName = pageId;
  }
  if (source) {
    payload.header.source = source;
  }

  return executeStatefulAPICall(payload)
    .then(res => {
      if (responseContainsErrors(res)) {
        throw new Error(res);
      } else {
        const addressBook = formatAddressBookResponse(res.body.contact);
        const userLoggedIn = getIfUserLoggedIn(res.body);
        const userRemembered = getIfUserRemembered(res.body);
        const surveyAnswers = getSurveyAnswers(res.body);
        const contextAttributes = getContextAttributes(res.body);

        return {
          firstName: res.body.firstName,
          lastName: res.body.lastName,
          userId: res.body.userId,
          phone: res.body.phone1,
          email: res.body.email1,
          isLoggedin: userLoggedIn,
          isRemembered: userRemembered,
          isPlcc: res.body.x_hasPLCC,
          isExpressEligible: parseBoolean(res.body.x_isExpress),
          country: res.body.x_country,
          currency: res.body.x_currency,
          airmilesAccountNumber: res.body.x_airMilesAccount,
          myPlaceNumber: res.body.x_myPlaceAcctNumber,
          plccCardId: res.body.x_wicPlccId,
          plccCardNumber: res.body.x_wicPlccCardNo,
          associateId: res.body.x_associateId,
          hasPreScreenId: res.body.x_preScreenIdAvailability,
          isBopisEnabled: parseBoolean(res.body.x_isBOPISEnabled),
          isBossEnabled: parseBoolean(res.body.x_isBOSSEnabled),
          isRopisEnabled: parseBoolean(res.body.x_isROPISEnabled),
          language: (res.body.x_language || '').substr(0, 2),
          addressBook,
          surveyAnswers,
          userBirthday: res.body.x_userBirthday,
          defaultPlccAddress: getDefaultPlccAddress(res.body.x_wicAddressDetails),
          profileAddress: getProfileAddress(res.body),
          pointsToNextReward: res.body.x_pointsToNextReward || 100,
          currentPoints: res.body.x_currentPoints || 0,
          totalRewards: res.body.x_totalRewards,
          nextMonthRewards: res.body.nextMonthRewards || 0,
          contextAttributes,
          userProfileState: {
            profileCompletion: res.body.x_profilePercentageComplete,
          },
        };
      }
    })
    .catch(err => {
      throw new Error(err);
    });
};
