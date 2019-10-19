import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col, BodyCopy, Anchor, Image } from '../../../../../../../../common/atoms';
import internalEndpoints from '../../../../../internalEndpoints';
import { getIconPath } from '../../../../../../../../../utils';

const ContactPreferencesTileItem = ({ labels, isContactAdded }) => {
  const addEditText = isContactAdded ? 'lbl_preference_tileEdit' : 'lbl_preference_tileAdd';
  return (
    <BodyCopy component="div" className="heading elem-pt-LRG">
      <Row fullBleed>
        <Col
          colSize={{
            small: 5,
            large: 10,
            medium: 6,
          }}
        >
          <Row fullBleed>
            <Col
              colSize={{
                small: 3,
                large: 6,
                medium: 5,
              }}
            >
              <BodyCopy
                component="div"
                fontSize="fs14"
                fontWeight="extrabold"
                fontFamily="secondary"
              >
                {getLabelValue(labels, 'lbl_preference_tileContactPreference', 'preferences')}
              </BodyCopy>
            </Col>
            <Col
              colSize={{
                small: 3,
                large: 6,
                medium: 3,
              }}
            >
              {isContactAdded ? (
                <Row fullBleed>
                  <Col
                    colSize={{
                      small: 3,
                      large: 6,
                      medium: 4,
                    }}
                  >
                    <Image
                      className="elem-pr-SM"
                      width="30"
                      height="30"
                      src={getIconPath('sms-enabled')}
                    />
                    <BodyCopy
                      component="span"
                      fontSize="fs10"
                      fontWeight="extrabold"
                      fontFamily="secondary"
                    >
                      {getLabelValue(labels, 'lbl_preference_tileTextText', 'preferences')}
                    </BodyCopy>
                  </Col>
                  <Col
                    colSize={{
                      small: 3,
                      large: 6,
                      medium: 4,
                    }}
                  >
                    <Image
                      className="elem-pr-SM"
                      width="30"
                      height="30"
                      src={getIconPath('push-enabled')}
                    />
                    <BodyCopy
                      className="elem-pl-XXXS"
                      component="span"
                      fontSize="fs10"
                      fontWeight="extrabold"
                      fontFamily="secondary"
                    >
                      {getLabelValue(labels, 'lbl_preference_tileAppText', 'preferences')}
                    </BodyCopy>
                  </Col>
                </Row>
              ) : (
                <Row fullBleed>
                  <Col
                    colSize={{
                      small: 3,
                      large: 6,
                      medium: 4,
                    }}
                  >
                    <Image
                      className="elem-pr-SM"
                      width="30"
                      height="30"
                      src={getIconPath('sms-disabled')}
                    />
                    <BodyCopy
                      component="span"
                      fontSize="fs10"
                      fontWeight="semibold"
                      fontFamily="secondary"
                    >
                      {getLabelValue(labels, 'lbl_preference_tileTextText', 'preferences')}
                    </BodyCopy>
                  </Col>
                  <Col
                    colSize={{
                      small: 3,
                      large: 6,
                      medium: 4,
                    }}
                  >
                    <Image
                      className="elem-pr-SM"
                      width="30"
                      height="30"
                      src={getIconPath('push-disabled')}
                    />
                    <BodyCopy
                      className="elem-pl-XXXS"
                      component="span"
                      fontSize="fs10"
                      fontWeight="semibold"
                      fontFamily="secondary"
                    >
                      {getLabelValue(labels, 'lbl_preference_tileAppText', 'preferences')}
                    </BodyCopy>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
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
    </BodyCopy>
  );
};

ContactPreferencesTileItem.propTypes = {
  labels: PropTypes.shape({}),
  isContactAdded: PropTypes.bool,
};

ContactPreferencesTileItem.defaultProps = {
  labels: {
    lbl_preference_tileContactPreference: '',
    lbl_preference_tileAdd: '',
    lbl_preference_tileEdit: '',
    lbl_preference_tileTextText: '',
    lbl_preference_tileAppText: '',
  },
  isContactAdded: false,
};

export default ContactPreferencesTileItem;
