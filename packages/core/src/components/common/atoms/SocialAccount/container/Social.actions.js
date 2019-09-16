import SOCIAL_CONSTANTS from '../social.constants';

const socialAccountLoad = () => {
  return {
    type: SOCIAL_CONSTANTS.SOCIAL_LOAD,
  };
};

const currentSocialInfo = payload => {
  return {
    type: SOCIAL_CONSTANTS.SOCIAL_LOAD_DATA,
    payload,
  };
};

const savesocialAccount = payload => {
  return {
    type: SOCIAL_CONSTANTS.SOCIAL_ACCOUNT_SAVE,
    payload,
  };
};

export { socialAccountLoad, savesocialAccount, currentSocialInfo };
