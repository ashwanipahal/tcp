import React from 'react';
import PropTypes from 'prop-types';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
// import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { fromJS } from 'immutable';
import ProfileInfoActionTile from '../../../molecules/ProfileInfoActionTile';
import ProfileProgress from '../../../molecules/ProfileProgress';
import { TopRowWrapper, ProfileProgressWrapper, ProfileTextWrapper, ProfileTileWrapper } from '../styles/ProfileInfoActions.style.native';
import {
  getMailingAddressState,
  getFavStoreState,
  getUserBirthdayState,
  getAboutYourselfState
} from '../ProfileInfoActions.utils';

const mailingAddressIcon = 'mailingAddress.jpg';
const favStoreIcon = 'store.jpg';
const birthdayIcon = 'birthday.jpg';
const surveyIcon = 'survey.png';

export const ProfileInfoActions = ({
  labels,
  profileCompletion,
  mailingAddress,
  defaultStore,
  userBirthday,
  userSurvey,
  percentageIncrement,
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
              <BodyCopy
                fontSize="fs16"
                text={labels.lbl_profile_profileCompletionExclamation}
              />
              <BodyCopy
                fontSize="fs16"
                text={labels.lbl_profile_profileCompletionMessage}
              />
              <BodyCopy
                fontSize="fs16"
                text={labels.lbl_profile_getMorePoints}
              />
            </>
          ) : (
            <BodyCopy
              fontSize="fs16"
              text={labels.lbl_profile_profileInCompleteMessage}
            />
          )}
        </ProfileTextWrapper>
        <ProfileProgressWrapper>
          {profileCompletion && (
            <ProfileProgress
              profileCompletion={profileCompletion}
            />
          )}
        </ProfileProgressWrapper>
      </TopRowWrapper>
      <ProfileTileWrapper>
        <ProfileInfoActionTile
          activityId="mailingAddress"
          activityIcon={mailingAddressIcon}
          activityTitle={`+${percentageIncrement.percentageMailingAddress}%`}
          activityCompletionState={getMailingAddressState(mailingAddress, labels)}
          activityDescription={labels.lbl_profile_mailingAddressDescription}
          redirectTo="/account"
          dataLocatorPrefix="email"
        />
        <ProfileInfoActionTile
          activityId="favStore"
          activityIcon={favStoreIcon}
          activityTitle={`+${percentageIncrement.percentageFavStore}%`}
          activityCompletionState={getFavStoreState(defaultStore, labels)}
          activityDescription={labels.lbl_profile_favStoreDescription}
          redirectTo="/account"
          dataLocatorPrefix="favStore"
        />
        <ProfileInfoActionTile
          activityId="userBirthday"
          activityIcon={birthdayIcon}
          activityTitle={`+${percentageIncrement.percentageUserBirthday}%`}
          activityCompletionState={getUserBirthdayState(userBirthday, labels)}
          activityDescription={labels.lbl_profile_userBirthdayDescription}
          redirectTo="/account"
          dataLocatorPrefix="birthday"
        />
        <ProfileInfoActionTile
          activityId="aboutYourself"
          activityIcon={surveyIcon}
          activityTitle={`+${percentageIncrement.percentageUserSurvey}%`}
          activityCompletionState={getAboutYourselfState(userSurvey, labels)}
          activityDescription={labels.lbl_profile_aboutYourselfDescription}
          redirectTo="/account"
          dataLocatorPrefix="survey"
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
};

ProfileInfoActions.defaultProps = {
  labels: {
    lbl_profile_Enhance_Experience: '',
    lbl_profile_profileInCompleteMessage: '',
  },
  profileCompletion: '40',
  mailingAddress: fromJS({}),
  defaultStore: '',
  userBirthday: '',
  userSurvey: fromJS([]),
  percentageIncrement: {
    percentageMailingAddress: '20',
    percentageFavStore: '20',
    percentageUserBirthday: '20',
    percentageUserSurvey: '20',
  },
};

export default ProfileInfoActions;
