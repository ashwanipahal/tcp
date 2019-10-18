import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col, BodyCopy, Anchor, Image } from '../../../../../../../../common/atoms';
import internalEndpoints from '../../../../../internalEndpoints';
import { getIconPath } from '../../../../../../../../../utils';

const getSocialAccounts = getSocialAcc => {
  const { facebook, instagram, twitter } = getSocialAcc;
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

const SocialAccountsTileItem = ({ labels, getSocialAcc }) => {
  const socialAccounts = getSocialAccounts(getSocialAcc);
  const addEditText = socialAccounts.isSocialConnected
    ? 'lbl_prefrence_tile_edit'
    : 'lbl_prefrence_tile_add';
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
              'lbl_prefrence_tile_connected_social_accounts_heading',
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
          {socialAccounts.isSocialConnected ? (
            <>
              {socialAccounts.facebook && (
                <Image
                  class="elem-pr-SM"
                  width="30"
                  height="30"
                  src={getIconPath('facebook-color-icon')}
                />
              )}
              {socialAccounts.twitter && (
                <Image
                  class="elem-pr-SM"
                  width="30"
                  height="30"
                  src={getIconPath('twitter-color-icon')}
                />
              )}
              {socialAccounts.instagram && (
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
                'lbl_prefrence_tile_connected_social_accounts_text',
                'preferences'
              )}
            </BodyCopy>
          )}
        </Col>
      </Row>
    </BodyCopy>
  );
};

SocialAccountsTileItem.propTypes = {
  labels: PropTypes.shape({}),
  getSocialAcc: PropTypes.shape({}),
};

SocialAccountsTileItem.defaultProps = {
  labels: {
    lbl_prefrence_tile_connected_social_accounts_heading: '',
    lbl_prefrence_tile_connected_social_accounts_text: '',
    lbl_prefrence_favorite_store: '',
    lbl_prefrence_tile_access_buy_online_pickup: '',
    lbl_prefrence_tile_add: '',
  },
  getSocialAcc: {},
};

export default SocialAccountsTileItem;
