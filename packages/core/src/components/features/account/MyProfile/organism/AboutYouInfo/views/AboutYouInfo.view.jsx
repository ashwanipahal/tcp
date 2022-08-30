import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col } from '@tcp/core/src/components/common/atoms';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/AboutYouInfo.style';

/**
 * This is a functional component for read view of survey information.
 * @param {obejct} labels - account profile labels
 * @param {object} userSurvey - saved user survey state from the backend.
 */
export const AboutYouInfo = ({ labels, userSurvey, className }) => {
  const answer1 = (userSurvey && userSurvey.size && userSurvey.getIn([0, 0])) || '';
  const answer2Array = userSurvey && userSurvey.size && userSurvey.get(1);
  const answer2 = answer2Array && answer2Array.size ? answer2Array.join(', ') : '';

  return (
    <MyProfileTile
      title={getLabelValue(labels, 'lbl_profile_about_you_title')}
      ctaTitle={getLabelValue(labels, 'lbl_profile_update_info')}
      ctaPath="/account/profile"
      ctaLink="/account?id=profile&subSection=edit-aboutyou-info"
      dataLocator="moreaboutyou"
      className={className}
    >
      <BodyCopy component="div">
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
            className="aboutyou-text"
          >
            <BodyCopy
              data-locator="moreaboutyou-describetext"
              fontSize="fs13"
              fontFamily="secondary"
            >
              {`${getLabelValue(labels, 'lbl_profile_about_you_describe')}: ${answer1}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
            className="aboutyou-text"
          >
            {answer2 && (
              <BodyCopy
                data-locator="moreaboutyou-shoppingfortext"
                fontSize="fs13"
                fontFamily="secondary"
              >
                {`${getLabelValue(labels, 'lbl_profile_about_you_shopping')}: ${answer2}`}
              </BodyCopy>
            )}
          </Col>
        </Row>
      </BodyCopy>
    </MyProfileTile>
  );
};

AboutYouInfo.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_about_you_title: PropTypes.string,
    lbl_profile_about_you_describe: PropTypes.string,
    lbl_profile_about_you_shopping: PropTypes.string,
    lbl_profile_update_info: PropTypes.string,
  }),
  userSurvey: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

AboutYouInfo.defaultProps = {
  labels: {
    lbl_profile_about_you_title: '',
    lbl_profile_about_you_describe: '',
    lbl_profile_about_you_shopping: '',
    lbl_profile_update_info: '',
  },
  className: '',
};

export default withStyles(AboutYouInfo, styles);
