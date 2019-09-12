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
  getUserFullName,
  getUserEmail,
  getUserPhoneNumber,
  getAirmilesDetails,
  getMyPlaceNumber,
  getProfileInfoTileData,
  getChildren,
} from '../../User/container/User.selectors';

import { getSuccess } from './MyProfile.selectors';
import { updateProfileSuccess } from './MyProfile.actions';

const getMyProfileInfoLabels = labels => {
  return (labels && labels.profile) || {};
};

class MyProfileContainer extends PureComponent {
  componentWillUnmount() {
    const { messageSateChangeAction } = this.props;
    messageSateChangeAction(null);
  }

  render() {
    const { labels, ...otherProps } = this.props;
    const profileInfoLabels = getMyProfileInfoLabels(labels);
    return <MyProfile labelsObj={labels} labels={profileInfoLabels} {...otherProps} />;
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
    userFullName: getUserFullName(state),
    userEmail: getUserEmail(state),
    userPhoneNumber: getUserPhoneNumber(state),
    airMiles: getAirmilesDetails(state),
    myPlaceNumber: getMyPlaceNumber(state),
    profileInfoTile: getProfileInfoTileData(state),
    childrenBirthdays: getChildren(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  messageSateChangeAction: payload => {
    dispatch(updateProfileSuccess(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfileContainer);
