import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
// import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import {
  SocialAccountsTileItemContainer,
  LeftContainer,
  RightContainer,
} from '../styles/SocialAccountsTileItem.style.native';

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
          <View style={LeftContainer}>
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
          </View>
          <View style={RightContainer}>
            <Anchor
              anchorVariation="primary"
              text={getLabelValue(labels, addEditText, 'preferences')}
              onPress={() => handleComponentChange('myPreferencePageMobile')}
              underline
              fontSizeVariation="large"
              noLink
              dataLocator="addressbook-overview-edit"
              color="gray.900"
            />
          </View>
        </SocialAccountsTileItemContainer>
        <SocialAccountsTileItemContainer>
          {socialAccountsObject.isSocialConnected ? (
            <>
              {socialAccountsObject.facebook && (
                <ImageComp
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwjPBkluzNkBYfy99tEVqZSdAMnpezBIfIOn2LeEzUSQN-d0qd',
                  }}
                  width={30}
                  height={30}
                />
              )}
              {socialAccountsObject.twitter && (
                <ImageComp
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwjPBkluzNkBYfy99tEVqZSdAMnpezBIfIOn2LeEzUSQN-d0qd',
                  }}
                  width={30}
                  height={30}
                />
              )}
              {socialAccountsObject.instagram && (
                <ImageComp
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwjPBkluzNkBYfy99tEVqZSdAMnpezBIfIOn2LeEzUSQN-d0qd',
                  }}
                  width={30}
                  height={30}
                />
              )}
            </>
          ) : (
            <BodyCopy
              mobileFontFamily="secondary"
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
