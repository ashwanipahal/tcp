import React from 'react';
import PropTypes from 'prop-types';
import FPO from '../../../../../../common/atoms/FPO';

import MyProfileTile from '../../../../../../common/molecules/MyProfileTile';

const ChangePassword = ({ labels }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_password}
      ctaTitle={labels.lbl_profile_change_password}
    >
      <FPO />
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
