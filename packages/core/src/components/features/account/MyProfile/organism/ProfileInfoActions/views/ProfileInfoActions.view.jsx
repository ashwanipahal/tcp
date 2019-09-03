import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import AboutYouSurveyModal from '@tcp/core/src/components/features/account/MyProfile/molecules/AboutYouSurveyModal';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';
import ProfileInfoActionTile from '../../../molecules/ProfileInfoActionTile';
import ProfileProgress from '../../../molecules/ProfileProgress';
import internalEndpoints from '../../../../common/internalEndpoints';

import styles from '../styles/ProfileInfoActions.style';
import { getIconPath } from '../../../../../../../utils';
import Anchor from '../../../../../../common/atoms/Anchor';
import {
  getMailingAddressState,
  getFavStoreState,
  getUserBirthdayState,
  getAboutYourselfState,
} from '../ProfileInfoActions.utils';

export const ProfileInfoActions = ({
  labels,
  className,
  profileCompletion,
  mailingAddress,
  defaultStore,
  userBirthday,
  userSurvey,
  percentageIncrement,
  mountSurveyModal,
  toggleModalState,
}) => {
  return (
    <MyProfileTile className={className}>
      <div className="profile-wrapper elem-mb-XXXL">
        <div className="profile-message">
          <BodyCopy
            className="elem-mb-MED"
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="extrabold"
            data-locator="enhanceExpHdr"
          >
            {labels.lbl_profile_Enhance_Experience}
          </BodyCopy>
          {profileCompletion === '100' ? (
            <>
              <BodyCopy fontSize="fs16" fontFamily="secondary">
                {labels.lbl_profile_profileCompletionExclamation}
              </BodyCopy>
              <BodyCopy fontSize="fs16" fontFamily="secondary" data-locator="infoAddedTxt">
                {labels.lbl_profile_profileCompletionMessage}
              </BodyCopy>
              <BodyCopy fontSize="fs16" fontFamily="secondary">
                {labels.lbl_profile_getMorePoints}
                <Anchor to="/account" underline fontSizeVariation="xlarge" dataLocator="hereLink">
                  {labels.lbl_profile_getMorePointsLink}
                </Anchor>
                {'?'}
              </BodyCopy>
            </>
          ) : (
            <BodyCopy fontSize="fs16" fontFamily="secondary" data-locator="instructionTxt">
              {labels.lbl_profile_profileInCompleteMessage}
            </BodyCopy>
          )}
        </div>
        {profileCompletion && (
          <div className="elem-pt-MED" data-locator="profileCompletionImg">
            <ProfileProgress
              className="elem-ml-LRG elem-mr-LRG"
              profileCompletion={profileCompletion}
            />
          </div>
        )}
      </div>
      <Row fullBleed>
        <Col
          colSize={{
            small: 3,
            medium: 4,
            large: 6,
          }}
          className="elem-mb-SM"
        >
          <ProfileInfoActionTile
            activityId="mailingAddress"
            activityIcon={getIconPath('mailing-address-icon')}
            activityTitle={`+${percentageIncrement.percentageMailingAddress}%`}
            activityCompletionState={getMailingAddressState(mailingAddress, labels)}
            activityDescription={labels.lbl_profile_mailingAddressDescription}
            redirectTo={internalEndpoints.mailingAddressPage.link}
            redirectAsPath={internalEndpoints.mailingAddressPage.path}
            dataLocatorPrefix="email"
          />
        </Col>
        <Col
          colSize={{
            small: 3,
            medium: 4,
            large: 6,
          }}
          ignoreGutter={{
            small: true,
            medium: true,
            large: true,
          }}
          className="elem-mb-SM"
        >
          <ProfileInfoActionTile
            activityId="favStore"
            activityIcon={getIconPath('fav-store-icon')}
            activityTitle={`+${percentageIncrement.percentageFavStore}%`}
            activityCompletionState={getFavStoreState(defaultStore, labels)}
            activityDescription={labels.lbl_profile_favStoreDescription}
            redirectTo="/account"
            dataLocatorPrefix="favStore"
          />
        </Col>
        <Col
          colSize={{
            small: 3,
            medium: 4,
            large: 6,
          }}
          className="elem-mb-SM"
        >
          <ProfileInfoActionTile
            activityId="userBirthday"
            activityIcon={getIconPath('birthday-icon')}
            activityTitle={`+${percentageIncrement.percentageUserBirthday}%`}
            activityCompletionState={getUserBirthdayState(userBirthday, labels)}
            activityDescription={labels.lbl_profile_userBirthdayDescription}
            redirectTo="/account?id=profile&subSection=edit-personal-info"
            redirectAsPath="/account/profile"
            dataLocatorPrefix="birthday"
          />
        </Col>
        <Col
          colSize={{
            small: 3,
            medium: 4,
            large: 6,
          }}
          ignoreGutter={{
            small: true,
            medium: true,
            large: true,
          }}
          className="elem-mb-SM"
        >
          <ProfileInfoActionTile
            activityId="aboutYourself"
            activityIcon={getIconPath('survey-icon')}
            activityTitle={`+${percentageIncrement.percentageUserSurvey}%`}
            activityCompletionState={getAboutYourselfState(userSurvey, labels)}
            activityDescription={labels.lbl_profile_aboutYourselfDescription}
            redirectTo=""
            redirectAsPath=""
            dataLocatorPrefix="survey"
            onClick={toggleModalState}
            noLink
          />
        </Col>
      </Row>
      <AboutYouSurveyModal
        openState={mountSurveyModal}
        labels={labels}
        toggleModalState={toggleModalState}
        userSurvey={userSurvey}
        className={className}
      />
    </MyProfileTile>
  );
};

ProfileInfoActions.propTypes = {
  labels: PropTypes.shape({}),
  profileCompletion: PropTypes.string,
  className: PropTypes.string,
  mailingAddress: PropTypes.shape({}),
  defaultStore: PropTypes.string,
  userBirthday: PropTypes.string,
  userSurvey: PropTypes.shape([]),
  percentageIncrement: PropTypes.shape({}),
  mountSurveyModal: PropTypes.bool,
  toggleModalState: PropTypes.func,
};

ProfileInfoActions.defaultProps = {
  labels: {},
  profileCompletion: '',
  className: '',
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
  mountSurveyModal: false,
  toggleModalState: () => {},
};

export default withStyles(ProfileInfoActions, styles);
