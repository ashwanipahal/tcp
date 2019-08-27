import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { UrlHandler } from '../../../../../../../utils/utils.app';
import ProfileInfoActions from '../../ProfileInfoActions';
import PersonalInformation from '../../PersonalInformation';
import ChangePasswordInfo from '../../ChangePasswordInfo';
import BirthdaySaving from '../../BirthdaySaving';
import { StyledAnchorWrapper, AnchorLeftMargin } from '../../../../common/styledWrapper';
import endpoints from '../../../../common/externalEndpoints';

export const ProfileInformation = ({
  labels,
  handleComponentChange,
  profileCompletion,
  defaultStore,
  mailingAddress,
  userBirthday,
  userSurvey,
  percentageIncrement,
}) => {
  return (
    <>
      <ProfileInfoActions
        labels={labels}
        handleComponentChange={handleComponentChange}
        profileCompletion={profileCompletion}
        defaultStore={defaultStore}
        mailingAddress={mailingAddress}
        userBirthday={userBirthday}
        userSurvey={userSurvey}
        percentageIncrement={percentageIncrement}
      />
      <PersonalInformation labels={labels} handleComponentChange={handleComponentChange} />
      <ChangePasswordInfo labels={labels} handleComponentChange={handleComponentChange} />
      <BirthdaySaving labels={labels} handleComponentChange={handleComponentChange} />
      <StyledAnchorWrapper>
        <Anchor
          fontSizeVariation="medium"
          underline
          onPress={() => {
            UrlHandler(endpoints.myPlaceRewardsPage);
          }}
          anchorVariation="primary"
          data-locator="my-rewards-program-details"
          text={labels.lbl_profile_program_details}
        />
        <AnchorLeftMargin>
          <Anchor
            fontSizeVariation="medium"
            underline
            noLink
            onPress={() => {
              UrlHandler(endpoints.termsAndConditionsPage);
            }}
            anchorVariation="primary"
            data-locator="my-rewards-tnc"
            text={labels.lbl_profile_terms_condition}
          />
        </AnchorLeftMargin>
      </StyledAnchorWrapper>
    </>
  );
};

ProfileInformation.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  profileCompletion: PropTypes.string,
  mailingAddress: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  userSurvey: PropTypes.shape([]),
  percentageIncrement: PropTypes.shape({}),
  defaultStore: PropTypes.string,
};

ProfileInformation.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  profileCompletion: '',
  mailingAddress: {},
  userSurvey: [],
  percentageIncrement: {},
  defaultStore: '',
  userBirthday: '',
};

export default ProfileInformation;
