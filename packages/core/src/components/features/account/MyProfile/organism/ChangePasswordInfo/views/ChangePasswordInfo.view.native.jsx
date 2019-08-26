import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';

export const ChangePassword = ({ labels, handleComponentChange }) => {
  return (
    <MyProfileTile
      title={labels.lbl_profile_password}
      ctaTitle={labels.lbl_profile_change_password}
      handleComponentChange={handleComponentChange}
    >
      <BodyCopyWithSpacing
        fontSize="fs16"
        spacingStyles="margin-bottom-MED"
        text={labels.lbl_profile_change_your_password}
      />
      <BodyCopyWithSpacing
        fontSize="fs14"
        spacingStyles="margin-bottom-MED"
        text={labels.lbl_profile_password_info_line1}
      />
      <BodyCopyWithSpacing fontSize="fs14" text={labels.lbl_profile_password_info_line2} />
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
  handleComponentChange: PropTypes.func.isRequired,
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
