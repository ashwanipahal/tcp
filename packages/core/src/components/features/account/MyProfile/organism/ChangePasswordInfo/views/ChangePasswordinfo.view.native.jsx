import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const ChangePassword = ({ labels }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_password}
      ctaTitle={labels.lbl_profile_change_password}
    >
      <BodyCopy fontSize="fs16" text={labels.lbl_profile_change_your_password} />
      <BodyCopy fontSize="fs14" text={labels.lbl_profile_password_info_line1} />
      <BodyCopy fontSize="fs14" text={labels.lbl_profile_password_info_line2} />
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
