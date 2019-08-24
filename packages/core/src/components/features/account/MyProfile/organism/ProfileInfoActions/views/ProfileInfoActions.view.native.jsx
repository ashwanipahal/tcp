import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

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

export const ProfileInfoActions = ({
  labels,
}) => {
  return (
    <MyProfileTile>
      <Text>{labels.lbl_profile_Enhance_Experience}</Text>
      <Text>{labels.lbl_profile_profileInCompleteMessage}</Text>
    </MyProfileTile>
  );
};

ProfileInfoActions.propTypes = {
  labels: PropTypes.shape({}),
};

ProfileInfoActions.defaultProps = {
  labels: {},
};

export default ProfileInfoActions;
