import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import AboutYouSurveyModal from '@tcp/core/src/components/features/account/MyProfile/molecules/AboutYouSurveyModal';
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
  handleComponentChange,
  mountSurveyModal,
  toggleModalState,
}) => {
  return (
    <MyProfileTile>
      <TopRowWrapper>
        <ProfileTextWrapper>
          <BodyCopyWithSpacing
            text={getLabelValue(labels, 'lbl_profile_Enhance_Experience')}
            fontSize="fs16"
            fontWeight="semibold"
            spacingStyles="margin-bottom-MED"
          />
          {profileCompletion === '100' ? (
            <>
              <BodyCopy
                fontSize="fs16"
                text={getLabelValue(labels, 'lbl_profile_profileCompletionExclamation')}
              />
              <BodyCopy
                fontSize="fs16"
                text={getLabelValue(labels, 'lbl_profile_profileCompletionMessage')}
              />
              <BodyCopy fontSize="fs16" text={getLabelValue(labels, 'lbl_profile_getMorePoints')} />
            </>
          ) : (
            <BodyCopy
              fontSize="fs16"
              text={getLabelValue(labels, 'lbl_profile_profileInCompleteMessage')}
            />
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
          activityTitle={getLabelValue(labels, 'lbl_profile_activityPercentage')}
          activityCompletionState={getMailingAddressState(mailingAddress, labels)}
          activityDescription={getLabelValue(labels, 'lbl_profile_mailingAddressDescription')}
          handleComponentChange={() => toggleModalState('mountMailingAddressModal')}
        />
        <ProfileInfoActionTile
          activityId="favStore"
          activityIcon={favStoreIcon}
          activityTitle={getLabelValue(labels, 'lbl_profile_activityPercentage')}
          activityCompletionState={getFavStoreState(defaultStore, labels)}
          activityDescription={getLabelValue(labels, 'lbl_profile_favStoreDescription')}
          handleComponentChange={() => handleComponentChange('accountOverviewMobile')}
        />
        <ProfileInfoActionTile
          activityId="userBirthday"
          activityIcon={birthdayIcon}
          activityTitle={getLabelValue(labels, 'lbl_profile_activityPercentage')}
          activityCompletionState={getUserBirthdayState(userBirthday, labels)}
          activityDescription={getLabelValue(labels, 'lbl_profile_userBirthdayDescription')}
          handleComponentChange={() => handleComponentChange('accountOverviewMobile')}
        />
        <ProfileInfoActionTile
          activityId="aboutYourself"
          activityIcon={surveyIcon}
          activityTitle={getLabelValue(labels, 'lbl_profile_activityPercentage')}
          activityCompletionState={getAboutYourselfState(userSurvey, labels)}
          activityDescription={getLabelValue(labels, 'lbl_profile_aboutYourselfDescription')}
          handleComponentChange={() => toggleModalState('mountSurveyModal')}
        />
      </ProfileTileWrapper>
      <AboutYouSurveyModal
        openState={mountSurveyModal}
        labels={labels}
        toggleModalState={toggleModalState}
        userSurvey={userSurvey}
      />
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
  handleComponentChange: PropTypes.func.isRequired,
  mountSurveyModal: PropTypes.bool,
  toggleModalState: PropTypes.func,
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
  mountSurveyModal: false,
  toggleModalState: () => {},
};

export default ProfileInfoActions;
