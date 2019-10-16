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
}) => {
  return (
    <LoginSection
      onSubmit={onSubmit}
      labels={labels}
      formErrorMessage={formErrorMessage}
      loginErrorMessage={loginErrorMessage}
      initialValues={initialValues}
      showRecaptcha={showRecaptcha}
      resetLoginState={resetLoginState}
      SubmitForgot={SubmitForgot}
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
};

LoginView.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
  openModal: () => {},
};

export default LoginView;
