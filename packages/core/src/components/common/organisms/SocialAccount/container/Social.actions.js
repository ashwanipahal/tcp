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

const showPointModalDetails = payload => {
  return {
    type: SOCIAL_CONSTANTS.POINT_MODAL_MOUNT_STATE,
    payload,
  };
};

export { getSocialAccount, saveSocialAccount, setSocialAccount, showPointModalDetails };
