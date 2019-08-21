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

const ProfileInfoTile = ({ handleComponentChange }) => {
  return (
    <ProfileInfoTileContainer>
      <BodyCopy fontFamily="secondary" fontSize="fs16" text="Profile Information" color="black" />
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
              text="Edit"
              onPress={() => handleComponentChange('addressBookMobile')}
              underline
              fontSizeVariation="large"
              noLink
              data-locator="addressbook-overview-edit"
              color="gray.900"
            />
          </RightCol>
        </Row>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text="Member #"
          color="gray.900"
        />
      </InfoContainer>
      <EmailContainer>
        <BodyCopy
          fontWeight="regular"
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          text="Email Address:"
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
              text="Mailing Address:"
              color="gray.900"
            />
          </LeftCol>
          <RightCol>
            <Anchor
              anchorVariation="primary"
              text="Edit"
              onPress={() => handleComponentChange('addressBookMobile')}
              underline
              fontSizeVariation="large"
              noLink
              data-locator="addressbook-overview-edit"
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
            <BodyCopy fontFamily="secondary" fontSize="fs14" text="Password" color="gray.900" />
          </LeftCol>
          <RightCol>
            <Anchor
              anchorVariation="primary"
              text="Change"
              onPress={() => handleComponentChange('addressBookMobile')}
              underline
              fontSizeVariation="large"
              noLink
              data-locator="addressbook-overview-edit"
              color="gray.900"
            />
          </RightCol>
        </Row>
        <BodyCopy fontFamily="secondary" fontSize="fs14" text="**********" color="gray.900" />
      </InfoContainer>
      <ButtonWrapperStyle>
        <CustomButton
          text="View Profile"
          buttonVariation="variable-width"
          fill="BLUE"
          color="white"
          onPress={() => handleComponentChange('addressBookMobile')}
        />
      </ButtonWrapperStyle>
    </ProfileInfoTileContainer>
  );
};

ProfileInfoTile.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
};

ProfileInfoTile.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
};

export default ProfileInfoTile;
