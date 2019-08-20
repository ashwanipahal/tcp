import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const ChangePassword = ({ labels }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_password}
      ctaTitle={labels.lbl_profile_change_password}
      ctaPath="/account/profile"
      ctaLink="/account?id=profile&subSection=change-password"
    >
      <BodyCopy component="div">
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            <BodyCopy className="elem-pb-SM" fontSize="fs16" fontFamily="secondary">
              {labels.lbl_profile_change_your_password}
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
          >
            <BodyCopy fontSize="fs14" fontFamily="secondary">
              {labels.lbl_profile_password_info_line1}
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
          >
            <BodyCopy fontSize="fs14" fontFamily="secondary">
              {labels.lbl_profile_password_info_line2}
            </BodyCopy>
          </Col>
        </Row>
      </BodyCopy>
    </MyProfileTile>
  );
};

ChangePassword.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_password: PropTypes.string,
    lbl_profile_change_password: PropTypes.string,
    lbl_profile_change_your_password: PropTypes.string,
    lbl_profile_password_info_line1: PropTypes.string,
    lbl_profile_password_info_line2: PropTypes.string,
  }),
};

ChangePassword.defaultProps = {
  labels: {
    lbl_profile_password: '',
    lbl_profile_change_password: '',
    lbl_profile_change_your_password: '',
    lbl_profile_password_info_line1: '',
    lbl_profile_password_info_line2: '',
  },
};

export default ChangePassword;
