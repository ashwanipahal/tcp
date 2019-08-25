import React from 'react';
import PropTypes from 'prop-types';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

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

export const ProfileInfoActions = ({ labels }) => {
  return (
    <MyProfileTile>
      <BodyCopyWithSpacing
        text={labels.lbl_profile_Enhance_Experience}
        fontSize="fs16"
        fontWeight="semibold"
        spacingStyles="margin-bottom-MED"
      />
      <BodyCopyWithSpacing
        text={labels.lbl_profile_profileInCompleteMessage}
        fontSize="fs16"
        spacingStyles="margin-bottom-MED"
      />
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
