import constants from '../MailingAddress.constants';

export const addMailingAddressSuccess = payload => {
  return {
    type: constants.ADD_MAILING_ADDRESS_SUCCESS,
    payload,
  };
};
export const addMailingAddressFail = payload => {
  return {
    type: constants.MAILING_ADDRESS_ERR,
    payload,
  };
};

export const addMailingAddress = payload => {
  return {
    type: constants.ADD_MAILING_ADDRESS,
    payload,
  };
};
