import React from 'react';
import PropTypes from 'prop-types';
import ResetPasswordTopSection from '../molecules/ResetPasswordTopSection';
import ResetPasswordForm from '../molecules/ResetPasswordForm';
import LineComp from '../../../../common/atoms/Line';
import ContainerWrapper from './styles/ResetPassword.style.native';

export const ResetPassword = ({
  labels,
  onBackClick,
  updateHeader,
  successMessage,
  errorMessage,
  onSubmit,
  showNotification,
  resetPasswordErrorMessage,
  onPwdHideShowClick,
  onConfirmPwdHideShowClick,
  hideShowPwd,
  confirmHideShowPwd,
}) => {
  if (updateHeader) updateHeader(); // hide the title and rule
  return (
    <ContainerWrapper>
      <ResetPasswordTopSection labels={labels} onBackClick={onBackClick} />
      <ResetPasswordForm
        labels={labels}
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        onBackClick={onBackClick}
        resetPasswordErrorMessage={resetPasswordErrorMessage}
        showNotification={showNotification}
        onPwdHideShowClick={onPwdHideShowClick}
        onConfirmPwdHideShowClick={onConfirmPwdHideShowClick}
        hideShowPwd={hideShowPwd}
        confirmHideShowPwd={confirmHideShowPwd}
      />
      <LineComp marginTop={28} />
    </ContainerWrapper>
  );
};

ResetPassword.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  onBackClick: PropTypes.func.isRequired,
  updateHeader: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  resetPasswordErrorMessage: PropTypes.string.isRequired,
  showNotification: PropTypes.bool.isRequired,
  onPwdHideShowClick: PropTypes.func,
  hideShowPwd: PropTypes.bool,
  onConfirmPwdHideShowClick: PropTypes.func,
  confirmHideShowPwd: PropTypes.func,
};

ResetPassword.defaultProps = {
  onPwdHideShowClick: () => {},
  hideShowPwd: false,
  onConfirmPwdHideShowClick: () => {},
  confirmHideShowPwd: false,
};

export default ResetPassword;
