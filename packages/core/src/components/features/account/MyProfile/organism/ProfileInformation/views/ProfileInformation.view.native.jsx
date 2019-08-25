import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { UrlHandler } from '../../../../../../../utils/utils.app';
import ProfileInfoActions from '../../ProfileInfoActions';
import PersonalInformation from '../../PersonalInformation';
import ChangePasswordInfo from '../../ChangePasswordInfo';
import BirthdaySaving from '../../BirthdaySaving';
import { StyledAnchorWrapper, AnchorLeftMargin } from '../../../../common/styledWrapper';

export const ProfileInformation = ({ labels, handleComponentChange }) => {
  return (
    <>
      <ProfileInfoActions labels={labels} handleComponentChange={handleComponentChange} />
      <PersonalInformation labels={labels} handleComponentChange={handleComponentChange} />
      <ChangePasswordInfo labels={labels} handleComponentChange={handleComponentChange} />
      <BirthdaySaving labels={labels} handleComponentChange={handleComponentChange} />
      <StyledAnchorWrapper>
        <Anchor
          fontSizeVariation="medium"
          underline
          onPress={() => {
            UrlHandler('https://www.childrensplace.com/us/content/myplace-rewards-page');
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
              UrlHandler('https://www.childrensplace.com/us/help-center/#termsAndConditionsli');
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
};

ProfileInformation.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
};

export default ProfileInformation;
