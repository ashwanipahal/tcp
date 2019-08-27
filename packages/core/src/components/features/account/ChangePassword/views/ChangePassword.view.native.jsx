import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ChangePasswordForm from '../molecules/ChangePasswordForm';
import BodyCopy from '../../../../common/atoms/BodyCopy';

export class ChangePassword extends React.PureComponent {
  render() {
    const { labels, successMessage, errorMessage, onSubmit, onClose } = this.props;

    return (
      <View>
        <BodyCopy
          data-locator="passwordInstructionTxt"
          fontSize="fs14"
          fontFamily="secondary"
          fontWeight="regular"
          text={labels.lbl_changePassword_password_info}
        />
        <ChangePasswordForm
          labels={labels}
          successMessage={successMessage}
          errorMessage={errorMessage}
          onSubmit={onSubmit}
          onClose={onClose}
          onShowHidePassword={this.onShowHidePassword}
        />
      </View>
    );
  }
}

ChangePassword.propTypes = {
  labels: PropTypes.shape({
    lbl_changePassword_back: PropTypes.string,
    lbl_changePassword_heading: PropTypes.string,
    lbl_changePassword_password_info: PropTypes.string,
  }),
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

ChangePassword.defaultProps = {
  labels: {
    lbl_changePassword_back: '',
    lbl_changePassword_heading: '',
    lbl_changePassword_password_info: '',
  },
  onClose: () => {},
};
export default ChangePassword;
