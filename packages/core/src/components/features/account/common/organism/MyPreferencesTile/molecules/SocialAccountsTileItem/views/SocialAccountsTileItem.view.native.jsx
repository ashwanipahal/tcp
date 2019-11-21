import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import {
  SocialAccountsTileItemContainer,
  LeftContainer,
  RightContainer,
  ImageWrapper,
} from '../styles/SocialAccountsTileItem.style.native';

const InstagramIcon = require('../../../../../../../../../assets/instagram_share.png');
const TwitterIcon = require('../../../../../../../../../assets/twitter_share.png');
const FacebookIcon = require('../../../../../../../../../assets/facebook_share.png');

class SocialAccountsTileItem extends React.PureComponent {
  getSocialAccounts = socialAccounts => {
    const { facebook, instagram, twitter } = socialAccounts;
    const isFacebookConnected = facebook && facebook.accessToken;
    const isInstagramConnected = instagram && instagram.accessToken;
    const isTwitterConnected = twitter && twitter.accessToken;
    const isSocialConnected = isFacebookConnected || isTwitterConnected || isInstagramConnected;
    return {
      facebook: isFacebookConnected,
      instagram: isInstagramConnected,
      twitter: isTwitterConnected,
      isSocialConnected,
    };
  };

  render() {
    const { labels, socialAccounts, handleComponentChange } = this.props;
    const socialAccountsObject = this.getSocialAccounts(socialAccounts);
    const addEditText = socialAccountsObject.isSocialConnected
      ? 'lbl_preference_tileEdit'
      : 'lbl_preference_tileAdd';
    return (
      <>
        <SocialAccountsTileItemContainer>
          <LeftContainer>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              text={getLabelValue(
                labels,
                'lbl_preference_tileConnectedSocialAccountsHeading',
                'preferences'
              )}
              color="black"
            />
          </LeftContainer>
          <RightContainer>
            <Anchor
              anchorVariation="primary"
              text={getLabelValue(labels, addEditText, 'preferences')}
              onPress={() => handleComponentChange('myPreferencePageMobile')}
              underline
              fontSizeVariation="large"
              noLink
              dataLocator=""
              color="gray.900"
            />
          </RightContainer>
        </SocialAccountsTileItemContainer>
        <SocialAccountsTileItemContainer>
          {socialAccountsObject.isSocialConnected ? (
            <>
              {socialAccountsObject.facebook && (
                <ImageWrapper>
                  <ImageComp source={FacebookIcon} width={30} height={30} />
                </ImageWrapper>
              )}
              {socialAccountsObject.twitter && (
                <ImageWrapper>
                  <ImageComp source={TwitterIcon} width={30} height={30} />
                </ImageWrapper>
              )}
              {socialAccountsObject.instagram && (
                <ImageWrapper>
                  <ImageComp source={InstagramIcon} width={30} height={30} />
                </ImageWrapper>
              )}
            </>
          ) : (
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              text={getLabelValue(
                labels,
                'lbl_preference_tileConnectedSocialAccountsText',
                'preferences'
              )}
              color="gray.900"
              fontWeight="regular"
            />
          )}
        </SocialAccountsTileItemContainer>
      </>
    );
  }
}

SocialAccountsTileItem.propTypes = {
  labels: PropTypes.shape({}),
  socialAccounts: PropTypes.shape({}),
  handleComponentChange: PropTypes.func.isRequired,
};

SocialAccountsTileItem.defaultProps = {
  labels: {
    lbl_preference_tileConnectedSocialAccountsHeading: '',
    lbl_preference_tileConnectedSocialAccountsText: '',
    lbl_prefrence_tileFavoriteStore: '',
    lbl_prefrence_tile_access_buy_online_pickup: '',
    lbl_preference_tileAdd: '',
    lbl_preference_tileEdit: '',
  },
  socialAccounts: {},
};

export default SocialAccountsTileItem;
