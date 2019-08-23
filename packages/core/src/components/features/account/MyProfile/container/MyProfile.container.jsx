import React, { PureComponent } from 'react';
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
import { changePasswordSuccess } from '../../ChangePassword/container/ChangePassword.actions';

const getMyProfileInfoLabels = labels => {
  return (labels && labels.profile) || {};
};

export class MyProfileContainer extends PureComponent {
  componentWillUnmount() {
    const { messageSateChangeAction } = this.props;
    messageSateChangeAction(null);
  }

  render() {
    const { labels, ...otherProps } = this.props;
    const profileInfoLabels = getMyProfileInfoLabels(labels);
    return <MyProfile labels={profileInfoLabels} {...otherProps} />;
  }
}

MyProfileContainer.propTypes = {
  labels: PropTypes.shape({}),
  messageSateChangeAction: PropTypes.func.isRequired,
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

export const mapDispatchToProps = dispatch => ({
  messageSateChangeAction: payload => {
    dispatch(changePasswordSuccess(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfileContainer);
