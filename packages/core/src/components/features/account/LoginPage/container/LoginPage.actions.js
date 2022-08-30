import LOGINPAGE_CONSTANTS from '../LoginPage.constants';

export const login = (payload, afterLoginHandler) => {
  return {
    type: LOGINPAGE_CONSTANTS.LOGIN,
    payload,
    afterLoginHandler,
  };
};

export const setLoginModalMountedState = payload => {
  return {
    type: LOGINPAGE_CONSTANTS.LOGIN_MODAL_MOUNTED_STATE,
    payload,
  };
};
export const setLoginLoadingState = payload => {
  return {
    payload,
    type: LOGINPAGE_CONSTANTS.SET_LOGIN_LOADING_STATE,
  };
};
export const resetLoginInfo = payload => {
  return {
    type: LOGINPAGE_CONSTANTS.RESET_LOGIN_INFO,
    payload,
  };
};

export const setCheckoutModalMountedState = payload => {
  return {
    type: LOGINPAGE_CONSTANTS.CHECKOUT_MODAL_MOUNTED_STATE,
    payload,
  };
};

export const setLoginInfo = payload => {
  return {
    type: LOGINPAGE_CONSTANTS.SET_LOGIN_INFO,
    payload,
  };
};

export const getUserInfoPOC = () => {
  return {
    type: 'GET_USER_DETAIL_POC',
  };
};

export const getOrderDetail = () => {
  return {
    type: 'GET_ORDER_DETAIL',
  };
};
