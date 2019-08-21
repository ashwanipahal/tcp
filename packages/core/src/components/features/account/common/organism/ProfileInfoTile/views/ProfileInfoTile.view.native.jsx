import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';

import {
  UnderlineStyle,
  ProfileInfoTileContainer,
  ButtonWrapperStyle,
  InfoContainer,
  EmailContainer,
  Row,
  LeftCol,
  RightCol,
} from '../styles/ProfileInfoTile.style.native';

const ProfileInfoTile = ({
  labels,
  handleComponentChange,
  personalInformation,
  mailingAddress,
}) => {
  console.log('labels', labels, personalInformation, mailingAddress);
  return (
    <ProfileInfoTileContainer>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        text={labels.lbl_overview_profileInformationHeading}
        color="black"
      />
      <UnderlineStyle />
      <InfoContainer>
        <Row>
          <LeftCol>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              text="Christine Smith"
              color="gray.900"
            />
          </LeftCol>
          <RightCol>
            <Anchor
              anchorVariation="primary"
              text={labels.lbl_overview_profileInfoEditCTA}
              onPress={() => handleComponentChange('editPersonalInfoMobile')}
              underline
              fontSizeVariation="large"
              noLink
              data-locator="personalInfo-overview-edit"
              color="gray.900"
            />
          </RightCol>
        </Row>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={labels.lbl_overview_profileInfoMember}
          color="gray.900"
        />
      </InfoContainer>
      <EmailContainer>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={labels.lbl_overview_profileInfoEmailAddress}
          color="gray.900"
        />
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text="christine.smith@gmail.com"
          color="gray.900"
        />
      </EmailContainer>
      <UnderlineStyle />
      <InfoContainer>
        <Row>
          <LeftCol>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              text={labels.lbl_overview_profileInfoMailingAddress}
              color="gray.900"
            />
          </LeftCol>
          <RightCol>
            <Anchor
              anchorVariation="primary"
              text={labels.lbl_overview_profileInfoEditCTA}
              onPress={() => handleComponentChange('editMailingAddressMobile')}
              underline
              fontSizeVariation="large"
              noLink
              data-locator="mailingAddress-overview-edit"
              color="gray.900"
            />
          </RightCol>
        </Row>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text="11209"
          color="gray.900"
        />
      </InfoContainer>
      <UnderlineStyle />
      <InfoContainer>
        <Row>
          <LeftCol>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              text={labels.lbl_overview_profileInfoPassword}
              color="gray.900"
            />
          </LeftCol>
          <RightCol>
            <Anchor
              anchorVariation="primary"
              text={labels.lbl_overview_profileInfoChangeCTA}
              onPress={() => handleComponentChange('changePasswordMobile')}
              underline
              fontSizeVariation="large"
              noLink
              data-locator="password-overview-edit"
              color="gray.900"
            />
          </RightCol>
        </Row>
        <BodyCopy fontFamily="secondary" fontSize="fs14" text="**********" color="gray.900" />
      </InfoContainer>
      <ButtonWrapperStyle>
        <CustomButton
          text={labels.lbl_overview_profileInfoViewCTA}
          buttonVariation="variable-width"
          fill="BLUE"
          color="white"
          onPress={() => handleComponentChange('profileInfoMobile')}
        />
      </ButtonWrapperStyle>
    </ProfileInfoTileContainer>
  );
};

ProfileInfoTile.propTypes = {
  labels: PropTypes.shape({}),
  personalInformation: PropTypes.shape({}),
  mailingAddress: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
};

ProfileInfoTile.defaultProps = {
  labels: {
    lbl_overview_profileInformationHeading: '',
    lbl_overview_profileInfoEditCTA: '',
    lbl_overview_profileInfoMember: '',
    lbl_overview_profileInfoEmailAddress: '',
    lbl_overview_profileInfoMailingAddress: '',
    lbl_overview_profileInfoPassword: '',
    lbl_overview_profileInfoChangeCTA: '',
    lbl_overview_profileInfoViewCTA: '',
  },
  personalInformation: {},
  mailingAddress: {},
  handleComponentChange: () => {},
};

export default ProfileInfoTile;
