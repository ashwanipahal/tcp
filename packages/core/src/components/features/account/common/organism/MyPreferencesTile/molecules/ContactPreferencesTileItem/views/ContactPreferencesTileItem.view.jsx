import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col, BodyCopy, Anchor, Image } from '../../../../../../../../common/atoms';
import internalEndpoints from '../../../../../internalEndpoints';
import { getIconPath } from '../../../../../../../../../utils';

const ContactPreferencesTileItem = ({ labels, customerPreferences }) => {
  const { placeRewardsPush, placeRewardsSms } = customerPreferences;
  const addEditText =
    placeRewardsPush || placeRewardsSms ? 'lbl_preference_tileEdit' : 'lbl_preference_tileAdd';
  return (
    <BodyCopy component="div" className="heading elem-pt-LRG">
      <Row fullBleed>
        <Col
          colSize={{
            small: 3,
            large: 6,
            medium: 4,
          }}
        >
          <BodyCopy component="div" fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
            {getLabelValue(labels, 'lbl_preference_tileContactPreference', 'preferences')}
          </BodyCopy>
        </Col>
        <Col
          colSize={{
            small: 3,
            large: 6,
            medium: 4,
          }}
        >
          <Row fullBleed>
            <Col
              colSize={{
                small: 2,
                large: 5,
                medium: 2,
              }}
            >
              {placeRewardsSms ? (
                <Image
                  className="elem-pr-SM"
                  width="30"
                  height="30"
                  src={getIconPath('sms-enabled')}
                />
              ) : (
                <Image
                  className="elem-pr-SM"
                  width="30"
                  height="30"
                  src={getIconPath('sms-disabled')}
                />
              )}
              <BodyCopy
                component="div"
                fontSize="fs10"
                fontWeight="extrabold"
                fontFamily="secondary"
              >
                {getLabelValue(labels, 'lbl_preference_tileTextText', 'preferences')}
              </BodyCopy>
            </Col>
            <Col
              colSize={{
                small: 2,
                large: 5,
                medium: 2,
              }}
            >
              {placeRewardsPush ? (
                <Image
                  className="elem-pr-SM"
                  width="30"
                  height="30"
                  src={getIconPath('push-enabled')}
                />
              ) : (
                <Image
                  className="elem-pr-SM"
                  width="30"
                  height="30"
                  src={getIconPath('push-disabled')}
                />
              )}
              <BodyCopy
                className="elem-pl-XXXS"
                component="div"
                fontSize="fs10"
                fontWeight="extrabold"
                fontFamily="secondary"
              >
                {getLabelValue(labels, 'lbl_preference_tileAppText', 'preferences')}
              </BodyCopy>
            </Col>
            <Col
              colSize={{
                small: 2,
                large: 2,
                medium: 4,
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
        </Col>
      </Row>
    </BodyCopy>
  );
};

ContactPreferencesTileItem.propTypes = {
  labels: PropTypes.shape({}),
  customerPreferences: PropTypes.shape({}),
};

ContactPreferencesTileItem.defaultProps = {
  labels: {
    lbl_preference_tileContactPreference: '',
    lbl_preference_tileAdd: '',
    lbl_preference_tileEdit: '',
    lbl_preference_tileTextText: '',
    lbl_preference_tileAppText: '',
  },
  customerPreferences: {},
};

export default ContactPreferencesTileItem;
