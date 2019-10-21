import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col, BodyCopy, Anchor, Image } from '../../../../../../../../common/atoms';
import internalEndpoints from '../../../../../internalEndpoints';
import { getIconPath } from '../../../../../../../../../utils';

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
    const { labels, socialAccounts } = this.props;
    const socialAccountsObject = this.getSocialAccounts(socialAccounts);
    const addEditText = socialAccountsObject.isSocialConnected
      ? 'lbl_preference_tileEdit'
      : 'lbl_preference_tileAdd';
    return (
      <BodyCopy component="div" className=" elem-pt-LRG">
        <Row fullBleed>
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 6,
            }}
          >
            <BodyCopy component="div" fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
              {getLabelValue(
                labels,
                'lbl_preference_tileConnectedSocialAccountsHeading',
                'preferences'
              )}
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 1,
              large: 2,
              medium: 2,
            }}
          >
            <BodyCopy component="div" textAlign="right" fontSize="fs14" fontFamily="secondary">
              <Anchor
                fontSizeVariation="large"
                underline
                anchorVariation="primary"
                to={internalEndpoints.myPreferencesPage.link}
                asPath={internalEndpoints.myPreferencesPage.path}
              >
                {getLabelValue(labels, addEditText, 'preferences')}
              </Anchor>
            </BodyCopy>
          </Col>
        </Row>
        <Row fullBleed className="elem-mt-XS">
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 7,
            }}
          >
            {socialAccountsObject.isSocialConnected ? (
              <>
                {socialAccountsObject.facebook && (
                  <Image
                    class="elem-pr-SM"
                    width="30"
                    height="30"
                    src={getIconPath('facebook-color-icon')}
                  />
                )}
                {socialAccountsObject.twitter && (
                  <Image
                    class="elem-pr-SM"
                    width="30"
                    height="30"
                    src={getIconPath('twitter-color-icon')}
                  />
                )}
                {socialAccountsObject.instagram && (
                  <Image
                    class="elem-pr-SM"
                    width="30"
                    height="30"
                    src={getIconPath('instagram-color-icon')}
                  />
                )}
              </>
            ) : (
              <BodyCopy fontSize="fs14" fontFamily="secondary">
                {getLabelValue(
                  labels,
                  'lbl_preference_tileConnectedSocialAccountsText',
                  'preferences'
                )}
              </BodyCopy>
            )}
          </Col>
        </Row>
      </BodyCopy>
    );
  }
}

SocialAccountsTileItem.propTypes = {
  labels: PropTypes.shape({}),
  socialAccounts: PropTypes.shape({}),
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
