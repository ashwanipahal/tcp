import React from 'react';
import PropTypes from 'prop-types';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import ProfileInfoActionTile from '../../../molecules/ProfileInfoActionTile';
import ProfileProgress from '../../../molecules/ProfileProgress';
import {
  TopRowWrapper,
  ProfileProgressWrapper,
  ProfileTextWrapper,
  ProfileTileWrapper,
} from '../styles/ProfileInfoActions.style.native';
import {
  getMailingAddressState,
  getFavStoreState,
  getUserBirthdayState,
  getAboutYourselfState,
} from '../ProfileInfoActions.utils';

const mailingAddressIcon = require('@tcp/core/src/assets/mailingAddress.png');
const favStoreIcon = require('@tcp/core/src/assets/store.png');
const birthdayIcon = require('@tcp/core/src/assets/birthday.png');
const surveyIcon = require('@tcp/core/src/assets/survey.png');

export const ProfileInfoActions = ({
  labels,
  profileCompletion,
  mailingAddress,
  defaultStore,
  userBirthday,
  userSurvey,
  percentageIncrement,
  handleComponentChange,
}) => {
  return (
    <MyProfileTile>
      <TopRowWrapper>
        <ProfileTextWrapper>
          <BodyCopyWithSpacing
            text={labels.lbl_profile_Enhance_Experience}
            fontSize="fs16"
            fontWeight="semibold"
            spacingStyles="margin-bottom-MED"
          />
          {profileCompletion === '100' ? (
            <>
              <BodyCopy fontSize="fs16" text={labels.lbl_profile_profileCompletionExclamation} />
              <BodyCopy fontSize="fs16" text={labels.lbl_profile_profileCompletionMessage} />
              <BodyCopy fontSize="fs16" text={labels.lbl_profile_getMorePoints} />
            </>
          ) : (
            <BodyCopy fontSize="fs16" text={labels.lbl_profile_profileInCompleteMessage} />
          )}
        </ProfileTextWrapper>
        {!!profileCompletion && (
          <ProfileProgressWrapper>
            <ProfileProgress profileCompletion={profileCompletion} radius={50} borderWidth={10} />
          </ProfileProgressWrapper>
        )}
      </TopRowWrapper>
      <ProfileTileWrapper>
        <ProfileInfoActionTile
          activityId="mailingAddress"
          activityIcon={mailingAddressIcon}
          activityTitle={`+${percentageIncrement.percentageMailingAddress}%`}
          activityCompletionState={getMailingAddressState(mailingAddress, labels)}
          activityDescription={labels.lbl_profile_mailingAddressDescription}
          handleComponentChange={() => handleComponentChange('accountOverviewMobile')}
        />
        <ProfileInfoActionTile
          activityId="favStore"
          activityIcon={favStoreIcon}
          activityTitle={`+${percentageIncrement.percentageFavStore}%`}
          activityCompletionState={getFavStoreState(defaultStore, labels)}
          activityDescription={labels.lbl_profile_favStoreDescription}
          handleComponentChange={() => handleComponentChange('accountOverviewMobile')}
        />
        <ProfileInfoActionTile
          activityId="userBirthday"
          activityIcon={birthdayIcon}
          activityTitle={`+${percentageIncrement.percentageUserBirthday}%`}
          activityCompletionState={getUserBirthdayState(userBirthday, labels)}
          activityDescription={labels.lbl_profile_userBirthdayDescription}
          handleComponentChange={() => handleComponentChange('accountOverviewMobile')}
        />
        <ProfileInfoActionTile
          activityId="aboutYourself"
          activityIcon={surveyIcon}
          activityTitle={`+${percentageIncrement.percentageUserSurvey}%`}
          activityCompletionState={getAboutYourselfState(userSurvey, labels)}
          activityDescription={labels.lbl_profile_aboutYourselfDescription}
          handleComponentChange={() => handleComponentChange('accountOverviewMobile')}
        />
      </ProfileTileWrapper>
    </MyProfileTile>
  );
};

ProfileInfoActions.propTypes = {
  labels: PropTypes.shape({}),
  profileCompletion: PropTypes.string,
  mailingAddress: PropTypes.shape({}),
  defaultStore: PropTypes.string,
  userBirthday: PropTypes.string,
  userSurvey: PropTypes.shape([]),
  percentageIncrement: PropTypes.shape({}),
  handleComponentChange: PropTypes.func.isRequired,
};

ProfileInfoActions.defaultProps = {
  labels: {
    lbl_profile_Enhance_Experience: '',
    lbl_profile_profileInCompleteMessage: '',
  },
  profileCompletion: '',
  mailingAddress: {},
  defaultStore: '',
  userBirthday: '',
  userSurvey: [],
  percentageIncrement: {
    percentageMailingAddress: '20',
    percentageFavStore: '20',
    percentageUserBirthday: '20',
    percentageUserSurvey: '20',
  },
};

export default ProfileInfoActions;
