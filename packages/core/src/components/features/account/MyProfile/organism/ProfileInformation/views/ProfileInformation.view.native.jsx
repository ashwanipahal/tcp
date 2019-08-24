import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ProfileInfoActions from '../../ProfileInfoActions';
import PersonalInformation from '../../PersonalInformation';
import ChangePasswordInfo from '../../ChangePasswordInfo';
import BirthdaySaving from '../../BirthdaySaving';

const ProfileInformation = ({
  labels,
  profileCompletion,
  mailingAddress,
  userBirthday,
  userSurvey,
  percentageIncrement,
  defaultStore,
}) => {
  return (
    <View>
      <ProfileInfoActions
        labels={labels}
        profileCompletion={profileCompletion}
        defaultStore={defaultStore}
        mailingAddress={mailingAddress}
        userBirthday={userBirthday}
        userSurvey={userSurvey}
        percentageIncrement={percentageIncrement}
      />
      <PersonalInformation
        labels={labels}
      />
      <ChangePasswordInfo
        labels={labels}
      />
      <BirthdaySaving
        labels={labels}
      />
    </View>
  );
};

ProfileInformation.propTypes = {
  labels: PropTypes.shape({}),
  profileCompletion: PropTypes.string,
  mailingAddress: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  userSurvey: PropTypes.shape([]),
  percentageIncrement: PropTypes.shape({}),
  defaultStore: PropTypes.string,
};

ProfileInformation.defaultProps = {
  labels: {},
  profileCompletion: '',
  mailingAddress: {},
  userBirthday: '',
  userSurvey: [],
  percentageIncrement: {},
  defaultStore: '',
};

export default ProfileInformation;
