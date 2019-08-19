/**
 * @module ProfileInfoActions
 * This module displays the profile information completion
 * and the activities that can earn extra points for the user.
 * It also displays the points earned for each of the
 * acitivity and the status of the activity
 * and percentage completion of the activities.
 * @author Ipsita Basak <ipsbasak@publicisgroupe.net>
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import ProfileInfoActionTile from './ProfileInfoActionTile';
import {
  PROFILE_INFO_ACTIVITIES as profileInfoActionsObj,
  PROFILE_ACTIVITY_COMPLETE_TEXT,
} from './Constants';

if (DESKTOP) {
  // eslint-disable-line
  require('./_d.profile-info-actions.scss');
} else {
  require('./_m.profile-info-actions.scss');
}

const ProfileInfoActions = props => {
  const {
    onEditPersonalInfo,
    onEditMailingAddress,
    profileCompletion,
    mailingAddress,
    defaultStore,
    userBirthday,
    userSurvey,
    toggleModalState,
    percentageIncrement,
    isMobile,
  } = props;

  // Update the state of profile information activity states
  profileInfoActionsObj.mailingAddress.activityCompletionState =
    mailingAddress && mailingAddress.isComplete ? PROFILE_ACTIVITY_COMPLETE_TEXT.ADDED : '';
  profileInfoActionsObj.favStore.activityCompletionState = defaultStore
    ? PROFILE_ACTIVITY_COMPLETE_TEXT.ADDED
    : '';
  profileInfoActionsObj.userBirthday.activityCompletionState = userBirthday
    ? PROFILE_ACTIVITY_COMPLETE_TEXT.ADDED
    : '';
  profileInfoActionsObj.aboutYourself.activityCompletionState =
    userSurvey && userSurvey[0] && userSurvey[1] && userSurvey[0][0] && userSurvey[1][0]
      ? PROFILE_ACTIVITY_COMPLETE_TEXT.DONE
      : '';

  profileInfoActionsObj.mailingAddress.activityTitle = `+${
    percentageIncrement.percentageMailingAddress
  }%`;
  profileInfoActionsObj.favStore.activityTitle = `+${percentageIncrement.percentageUserSurvey}%`;
  profileInfoActionsObj.userBirthday.activityTitle = `+${
    percentageIncrement.percentageUserBirthday
  }%`;
  profileInfoActionsObj.aboutYourself.activityTitle = `+${percentageIncrement.percentageFavStore}%`;

  return (
    <div className="profile-progress-trigger pi-wrapper">
      <div className="profile-info-progress-wrapper">
        <div className="profile-info-wrapper">
          {!(isMobile && profileCompletion === '100') && (
            <h4 className="pi-heading">Complete your profile</h4>
          )}
          {profileCompletion === '100' ? (
            <div>
              <p>
                Yay!
                <br />
                Your profile is 100% complete.
              </p>
            </div>
          ) : (
            <div className="profile-info-intro">
              Make your shopping experience even better by completing your profile.
            </div>
          )}
        </div>
        {profileCompletion && (
          <div className="progress-image-wrapper">
            <div className={`progress-animation level${Math.floor(profileCompletion / 20)}`}>
              <div className="completion-text">{`${profileCompletion}%`}</div>
              <div className="outer-shadow" />
              <div className="inner-shadow">
                <img
                  alt="Completion"
                  className="progress-image"
                  src="/wcsstore/static/images/smiley-icon.png"
                  title="profile completion"
                />
              </div>
              <div className="hold left">
                <div className="fill" />
              </div>
              <div className="hold right">
                <div className="fill" />
              </div>
            </div>
          </div>
        )}
      </div>
      {!(isMobile && profileCompletion === '100') && (
        <div className="profile-info-actions">
          <ProfileInfoActionTile
            {...profileInfoActionsObj.mailingAddress}
            onClick={onEditMailingAddress}
          />
          <ProfileInfoActionTile {...profileInfoActionsObj.favStore} redirectTo="storeLocator" />
          <ProfileInfoActionTile
            {...profileInfoActionsObj.userBirthday}
            onClick={onEditPersonalInfo}
          />
          <ProfileInfoActionTile
            {...profileInfoActionsObj.aboutYourself}
            onClick={toggleModalState}
          />
        </div>
      )}
      <span className="pi-divider">Divider</span>
    </div>
  );
};

ProfileInfoActions.propTypes = {
  profileCompletion: PropTypes.string.isRequired,
  onEditPersonalInfo: PropTypes.func.isRequired,
  onEditMailingAddress: PropTypes.func.isRequired,
  mailingAddress: PropTypes.string.isRequired,
  defaultStore: PropTypes.string.isRequired,
  userBirthday: PropTypes.string.isRequired,
  userSurvey: PropTypes.string.isRequired,
  toggleModalState: PropTypes.func.isRequired,
  percentageIncrement: PropTypes.shape({
    percentageMailingAddress: PropTypes.string.isRequired,
    percentageUserSurvey: PropTypes.string.isRequired,
    percentageUserBirthday: PropTypes.string.isRequired,
    percentageFavStore: PropTypes.string.isRequired,
  }),
};

ProfileInfoActions.defaultProps = {
  percentageIncrement: {
    percentageMailingAddress: '20',
    percentageUserSurvey: '20',
    percentageUserBirthday: '20',
    percentageFavStore: '20',
  },
};

export default ProfileInfoActions;
