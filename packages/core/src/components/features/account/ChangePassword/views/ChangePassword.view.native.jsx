import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ChangePasswordForm from '../molecules/ChangePasswordForm';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Anchor from '../../../../common/atoms/Anchor';

export const ChangePassword = ({ labels }) => {
  return (
    <View>
      <BodyCopy text="cp" />
    </View>
  );
};

ChangePassword.propTypes = {
  labels: PropTypes.shape({
    lbl_changePassword_back: PropTypes.string,
    lbl_changePassword_heading: PropTypes.string,
    lbl_changePassword_password_info: PropTypes.string,
  }),
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ChangePassword.defaultProps = {
  labels: {
    lbl_changePassword_back: '',
    lbl_changePassword_heading: '',
    lbl_changePassword_password_info: '',
  },
};
export default ChangePassword;
