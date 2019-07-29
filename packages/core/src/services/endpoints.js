import { API_METHODS } from './api.constants';

const endpoints = {
  graphQL: {
    int: 'https://niebw6f7lfeorgk6adlvicfnca.appsync-api.us-east-2.amazonaws.com/graphql',
    uat: 'https://vftt2fuvm5eu5jat3ounglwv3a.appsync-api.us-east-2.amazonaws.com/graphql',
    perf: 'https://563k2dzbojbsvnaaljusrz4y44.appsync-api.us-east-2.amazonaws.com/graphql',
    sandbox: 'https://lwmlzhk7g5grdgtbzozpgsb3lm.appsync-api.us-east-2.amazonaws.com/graphql',
  },
  getAddressList: {
    method: API_METHODS.GET,
    URI: 'v2/account/getAddressFromBook',
  },
  verifyAddress: {
    method: API_METHODS.GET,
    // TODO - Use MELISSA_KEY from config file
    URI: 'https://personator.melissadata.net/v3/WEB/ContactVerify/doContactVerify',
  },
  emailVerification: {
    method: API_METHODS.GET,
    URI: 'https://bpi.briteverify.com/emails.json',
    JSONP: true,
    reqTimeout: 2000,
  },
  getOrderDetails: {
    method: API_METHODS.GET,
    URI: 'v2/checkout/getOrderDetails',
  },
  addCreditCard: {
    method: API_METHODS.POST,
    URI: 'v2/account/addCreditCardDetails',
  },
  updateCreditCard: {
    method: API_METHODS.POST,
    URI: 'v2/account/modifyCreditCardDetails',
  },
  updateMultiSelectItemsToRemove: {
    method: 'PUT',
    URI: 'v2/cart/deleteMultipleOrderItems',
  },
  logon: {
    method: API_METHODS.POST,
    URI: 'v2/account/logon'
  },
  getRegisteredUserDetailsInfo: {
    method: API_METHODS.GET,
    URI: 'v2/account/getRegisteredUserInfo'
  }
};

export default endpoints;
