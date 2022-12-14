import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Address from '@tcp/core/src/components/common/molecules/Address';

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

const ProfileInfoTile = ({ labels, handleComponentChange, profileInfo }) => {
  const { firstName, lastName, emailAddress, rewardsAccountNumber, address } = profileInfo;
  return (
    <ProfileInfoTileContainer>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        text={getLabelValue(labels, 'lbl_overview_profileInformationHeading')}
        color="black"
        fontWeight="extrabold"
      />
      <UnderlineStyle />
      <InfoContainer>
        <Row>
          <LeftCol>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="extrabold"
              text={`${firstName} ${lastName}`}
              color="gray.900"
            />
          </LeftCol>
          <RightCol>
            <Anchor
              anchorVariation="primary"
              text={getLabelValue(labels, 'lbl_overview_profileInfoEditCTA')}
              onPress={() => handleComponentChange('profileInformationMobile')}
              underline
              fontSizeVariation="large"
              noLink
              dataLocator="personalInfo-overview-edit"
              color="gray.900"
            />
          </RightCol>
        </Row>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          fontFamily="secondary"
          text={`${getLabelValue(
            labels,
            'lbl_overview_profileInfoMember'
          )} ${rewardsAccountNumber}`}
          color="gray.900"
        />
      </InfoContainer>
      <EmailContainer>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          fontFamily="secondary"
          text={getLabelValue(labels, 'lbl_overview_profileInfoEmailAddress')}
          color="gray.900"
        />
        <BodyCopy
          fontFamily="secondary"
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text={emailAddress}
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
              fontWeight="extrabold"
              text={getLabelValue(labels, 'lbl_overview_profileInfoMailingAddress')}
              color="gray.900"
            />
          </LeftCol>
          <RightCol>
            <Anchor
              anchorVariation="primary"
              text={getLabelValue(labels, 'lbl_overview_profileInfoEditCTA')}
              onPress={() => handleComponentChange('profileInformationMobile')}
              underline
              fontSizeVariation="large"
              noLink
              dataLocator="mailingAddress-overview-edit"
              color="gray.900"
            />
          </RightCol>
        </Row>
        <Address showName={false} showPhone={false} showCountry={false} address={address} />
      </InfoContainer>
      <UnderlineStyle />
      <InfoContainer>
        <Row>
          <LeftCol>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="extrabold"
              text={getLabelValue(labels, 'lbl_overview_profileInfoPassword')}
              color="gray.900"
            />
          </LeftCol>
          <RightCol>
            <Anchor
              anchorVariation="primary"
              text={getLabelValue(labels, 'lbl_overview_profileInfoChangeCTA')}
              onPress={() => handleComponentChange('profileInformationMobile')}
              underline
              fontSizeVariation="large"
              noLink
              dataLocator="password-overview-edit"
              color="gray.900"
            />
          </RightCol>
        </Row>
        <BodyCopy
          fontFamily="secondary"
          fontWeight="extrabold"
          fontSize="fs14"
          text="**********"
          color="gray.900"
        />
      </InfoContainer>
      <ButtonWrapperStyle>
        <CustomButton
          text={getLabelValue(labels, 'lbl_overview_profileInfoViewCTA')}
          fill="BLUE"
          onPress={() => handleComponentChange('profileInformationMobile')}
        />
      </ButtonWrapperStyle>
    </ProfileInfoTileContainer>
  );
};

ProfileInfoTile.propTypes = {
  labels: PropTypes.shape({}),
  profileInfo: PropTypes.shape({}).isRequired,
  handleComponentChange: PropTypes.func.isRequired,
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
};

export default ProfileInfoTile;
