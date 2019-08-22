import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const BirthdaySaving = ({ labels }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_birthday_savings}
      ctaTitle={labels.lbl_profile_add_birthday_info}
      dataLocator="pi-addbirthdayinfo"
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
            <BodyCopy fontSize="fs14" fontFamily="secondary">
              {labels.lbl_profile_birthday_saving_info}
            </BodyCopy>
          </Col>
        </Row>
      </BodyCopy>
    </MyProfileTile>
  );
};

BirthdaySaving.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_birthday_savings: PropTypes.string,
    lbl_profile_add_birthday_info: PropTypes.string,
    lbl_profile_birthday_saving_info: PropTypes.string,
  }),
};

BirthdaySaving.defaultProps = {
  labels: {
    lbl_profile_birthday_savings: '',
    lbl_profile_add_birthday_info: '',
    lbl_profile_birthday_saving_info: '',
  },
};

export default BirthdaySaving;
