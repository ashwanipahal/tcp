import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyProfile from '../views/MyProfile.view';
import {
  getUserContactInfo,
  getMailingAddress,
  getUserBirthday,
  getAnswersList,
  getProfileCompletion,
  getPercentageIncrement,
  getDefaultStore,
} from '../../User/container/User.selectors';

import { getSuccess } from '../../ChangePassword/container/ChangePassword.selectors';

const getMyProfileInfoLabels = labels => {
  return (labels && labels.profile) || {};
};

export const MyProfileContainer = ({ labels, ...otherProps }) => {
  const profileInfoLabels = getMyProfileInfoLabels(labels);
  return <MyProfile labels={profileInfoLabels} {...otherProps} />;
};

MyProfileContainer.propTypes = {
  labels: PropTypes.shape({}),
};

MyProfileContainer.defaultProps = {
  labels: {},
};

const mapStateToProps = state => {
  return {
    personalInformation: getUserContactInfo(state),
    mailingAddress: getMailingAddress(state),
    userBirthday: getUserBirthday(state),
    userSurvey: getAnswersList(state),
    profileCompletion: getProfileCompletion(state),
    percentageIncrement: getPercentageIncrement(state),
    defaultStore: getDefaultStore(state),
    successMessage: getSuccess(state),
  };
};

export default connect(mapStateToProps)(MyProfileContainer);
