import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';
import ProfileInfoActionTile from '../../../molecules/ProfileInfoActionTile';
import ProfileProgress from '../../../molecules/ProfileProgress';

import styles from '../styles/ProfileInfoActions.style';
import { getIconPath } from '../../../../../../../utils';

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

export const ProfileInfoActions = ({
  labels,
  className,
  profileCompletion,
  mailingAddress,
  defaultStore,
  userBirthday,
  userSurvey,
  percentageIncrement,
}) => {
  return (
    <MyProfileTile className={className}>
      <div className="profile-wrapper elem-mb-XXXL">
        <div className="profile-message">
          {profileCompletion !== '100' && (
            <BodyCopy
              className="elem-mb-MED"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="extrabold"
            >
              {labels.lbl_profile_Enhance_Experience}
            </BodyCopy>
          )}
          {profileCompletion === '100' ? (
            <>
              <BodyCopy fontSize="fs16" fontFamily="secondary">
                {labels.lbl_profile_profileCompletionExclamation}
              </BodyCopy>
              <BodyCopy fontSize="fs16" fontFamily="secondary">
                {labels.lbl_profile_profileCompletionMessage}
              </BodyCopy>
            </>
          ) : (
            <BodyCopy fontSize="fs16" fontFamily="secondary">
              {labels.lbl_profile_profileInCompleteMessage}
            </BodyCopy>
          )}
        </div>
        {profileCompletion && (
          <div className="progress-image-wrapper">
            <ProfileProgress className="elem-ml-LRG" profileCompletion={profileCompletion} />
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
            redirectTo="/account"
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
            redirectTo="/account"
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
            redirectTo="/account"
          />
        </Col>
      </Row>
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
};

export default withStyles(ProfileInfoActions, styles);
