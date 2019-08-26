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
  profileInfoTile,
  userEmail,
  userBirthday,
  userFullName,
  userPhoneNumber,
  airMiles,
  myPlaceNumber,
}) => {
  return (
    <>
      <ProfileInfoActions labels={labels} handleComponentChange={handleComponentChange} />
      <PersonalInformation
        labels={labels}
        handleComponentChange={handleComponentChange}
        profileInfoTile={profileInfoTile}
        userEmail={userEmail}
        userBirthday={userBirthday}
        userFullName={userFullName}
        userPhoneNumber={userPhoneNumber}
        airMiles={airMiles}
        myPlaceNumber={myPlaceNumber}
      />
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
  profileInfoTile: PropTypes.shape({}),
  userBirthday: PropTypes.string,
  userEmail: PropTypes.string,
  airMiles: PropTypes.string,
  myPlaceNumber: PropTypes.string,
  userFullName: PropTypes.string,
  userPhoneNumber: PropTypes.number,
};

ProfileInformation.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  profileInfoTile: {},
  userBirthday: '',
  userEmail: '',
  userFullName: '',
  userPhoneNumber: '',
  airMiles: '',
  myPlaceNumber: '',
};

export default ProfileInformation;
