import SOCIAL_CONSTANTS from '../social.constants';

const getSocialAccount = () => {
  return {
    type: SOCIAL_CONSTANTS.GET_SOCIAL_LOAD,
  };
};

const setSocialAccount = payload => {
  return {
    type: SOCIAL_CONSTANTS.SET_SOCIAL_LOAD,
    payload,
  };
};

const saveSocialAccount = payload => {
  return {
    type: SOCIAL_CONSTANTS.SAVE_SOCIAL_LOAD,
    payload,
  };
};

export { getSocialAccount, saveSocialAccount, setSocialAccount };
