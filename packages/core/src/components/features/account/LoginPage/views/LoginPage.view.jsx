import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import LoginSection from '../organism/LoginSection';
import PasswordRequirement from '../../ResetPassword/molecules/PasswordRequirement';

const LoginView = ({
  onSubmit,
  labels,
  loginErrorMessage,
  formErrorMessage,
  initialValues,
  showRecaptcha,
  resetLoginState,
  SubmitForgot,
  showNotification,
  successFullResetEmail,
  resetForm,
  resetForgotPasswordErrorResponse,
  openModal,
  currentForm,
  queryParams,
  setLoginModalMountState,
  variation,
  handleContinueAsGuest,
  userplccCardNumber,
  userplccCardId,
  isLoading,
  isRememberedUser,
  userName,
  openOverlay,
  onClose,
  closeModal,
}) => {
  return (
    <LoginSection
      isLoading={isLoading}
      onSubmit={onSubmit}
      labels={labels}
      formErrorMessage={formErrorMessage}
      loginErrorMessage={loginErrorMessage}
      initialValues={initialValues}
      showRecaptcha={showRecaptcha}
      resetLoginState={resetLoginState}
      SubmitForgot={SubmitForgot}
      isRememberedUser={isRememberedUser}
      showNotification={showNotification}
      successFullResetEmail={successFullResetEmail}
      resetForm={resetForm}
      resetForgotPasswordErrorResponse={resetForgotPasswordErrorResponse}
      openModal={openModal}
      currentForm={currentForm}
      queryParams={queryParams}
      setLoginModalMountState={setLoginModalMountState}
      variation={variation}
      handleContinueAsGuest={handleContinueAsGuest}
      tooltipContent={<PasswordRequirement labels={getLabelValue(labels, 'password')} />}
      userplccCardNumber={userplccCardNumber}
      userplccCardId={userplccCardId}
      userName={userName}
      openOverlay={openOverlay}
      onClose={onClose}
      closeModal={closeModal}
    />
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  showRecaptcha: PropTypes.bool,
  resetForgotPasswordErrorResponse: PropTypes.bool.isRequired,
  resetForm: PropTypes.bool.isRequired,
  resetLoginState: PropTypes.bool.isRequired,
  SubmitForgot: PropTypes.bool.isRequired,
  showNotification: PropTypes.bool.isRequired,
  successFullResetEmail: PropTypes.bool.isRequired,
  openModal: PropTypes.func,
  currentForm: PropTypes.string.isRequired,
  queryParams: PropTypes.shape({}).isRequired,
  setLoginModalMountState: PropTypes.bool.isRequired,
  variation: PropTypes.bool.isRequired,
  handleContinueAsGuest: PropTypes.func.isRequired,
  formErrorMessage: PropTypes.shape({}).isRequired,
  userplccCardNumber: PropTypes.string.isRequired,
  userplccCardId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isRememberedUser: PropTypes.bool,
  userName: PropTypes.string,
  onClose: PropTypes.func,
  openOverlay: PropTypes.func,
  closeModal: PropTypes.func,
};

LoginView.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
  openModal: () => {},
  openOverlay: () => {},
  onClose: () => {},
  closeModal: () => {},
  isRememberedUser: false,
  userName: '',
};

export default LoginView;
