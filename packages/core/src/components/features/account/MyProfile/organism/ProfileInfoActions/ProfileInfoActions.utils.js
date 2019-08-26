export const getMailingAddressState = (mailingAddress, labels) => {
  if (mailingAddress && mailingAddress.get('isComplete')) {
    return labels.lbl_profile_profileActivityCompleted;
  }
  return '';
};

export const getFavStoreState = (defaultStore, labels) => {
  if (defaultStore) {
    return labels.lbl_profile_profileActivityCompleted;
  }
  return '';
};

export const getUserBirthdayState = (userBirthday, labels) => {
  if (userBirthday) {
    return labels.lbl_profile_profileActivityCompleted;
  }
  return '';
};

export const getAboutYourselfState = (userSurvey, labels) => {
  if (userSurvey && userSurvey.getIn(['0', '0']) && userSurvey.getIn(['1', '0'])) {
    return labels.lbl_profile_profileActivityCompleted;
  }
  return '';
};
