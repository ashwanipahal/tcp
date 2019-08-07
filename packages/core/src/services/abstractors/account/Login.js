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

export const parseBoolean = bool => {
  return bool === true || bool === '1' || (bool || '').toUpperCase() === 'TRUE';
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
        const userLoggedIn =
          parseBoolean(res.body.x_isRegistered) && !parseBoolean(res.body.x_isRememberedUser);
        const userRemembered =
          parseBoolean(res.body.x_isRegistered) && parseBoolean(res.body.x_isRememberedUser);

        return {
          firstName: res.body.firstName,
          lastName: res.body.lastName,
          userId: res.body.userId,
          phone: res.body.phone1,
          email: res.body.email1,
          isLoggedin: userLoggedIn,
          isRemembered: userRemembered,
          country: res.body.x_country,
          currency: res.body.x_currency,
          addressBook: addressBook.length > 0 ? addressBook : null,
          userBirthday: res.body.x_userBirthday,
          pointsToNextReward: res.body.x_pointsToNextReward || 100,
          currentPoints: res.body.x_currentPoints || 0,
          totalRewards: res.body.x_totalRewards,
        };
      }
    })
    .catch(err => {
      throw new Error(err);
    });
};
