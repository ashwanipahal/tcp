import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
// import FPO from '../../../../../../common/atoms/FPO';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const ChangePassword = ({ labels }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_password}
      ctaTitle={labels.lbl_profile_change_password}
    >
      <Row>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
        >
          {labels.lbl_profile_change_your_password}
        </Col>
      </Row>
      <Row>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
        >
          <BodyCopy fontSize="fs14">{labels.lbl_profile_password_info_line1}</BodyCopy>
        </Col>
      </Row>
      <Row>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
        >
          <BodyCopy fontSize="fs14">{labels.lbl_profile_password_info_line2}</BodyCopy>
        </Col>
      </Row>
    </MyProfileTile>
  );
};

ChangePassword.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_password: PropTypes.string,
    lbl_profile_change_password: PropTypes.string,
  }),
};

ChangePassword.defaultProps = {
  labels: {
    lbl_profile_password: '',
    lbl_profile_change_password: '',
  },
};

export default ChangePassword;
