import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeMiniBag } from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import { closeAddedToBag } from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.actions';

import {
  resetPassword,
  resetLoginForgotPasswordState,
} from '../../ForgotPassword/container/ForgotPassword.actions';
import {
  getShowNotificationState,
  getResetEmailResponse,
  toggleSuccessfulEmailSection,
} from '../../ForgotPassword/container/ForgotPassword.selectors';
import { login, resetLoginInfo } from './LoginPage.actions';
import {
  closeOverlayModal,
  openOverlayModal,
} from '../../OverlayModal/container/OverlayModal.actions';
import { getFormValidationErrorMessages } from '../../Account/container/Account.selectors';
import {
  getLoginError,
  shouldShowRecaptcha,
  getLoginErrorMessage,
  getLabels,
  getLoadingState,
} from './LoginPage.selectors';
import {
  getUserLoggedInState,
  getplccCardId,
  getplccCardNumber,
  isRememberedUser,
  getUserEmail,
  getUserName,
} from '../../User/container/User.selectors';
import { toastMessageInfo } from '../../../../common/atoms/Toast/container/Toast.actions.native';

import LoginView from '../views';

class LoginPageContainer extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const {
      isUserLoggedIn,
      closeOverlay,
      closeModal,
      variation,
      toastMessage,
      loginErrorMessage,
      loginError,
    } = this.props;
    if (!prevProps.loginError && loginError) {
      toastMessage(loginErrorMessage);
    }
    if (!prevProps.isUserLoggedIn && isUserLoggedIn) {
      if (variation === 'checkout') {
        closeModal();
      }

      closeOverlay();
    }
  }

  componentWillUnmount() {
    const { resetLoginState, loginError, resetAccountOverViewState } = this.props;
    if (loginError) {
      resetLoginState();
    }

    if (resetAccountOverViewState) {
      resetAccountOverViewState();
    }
  }

  openModal = params => {
    const { openOverlay, setLoginModalMountState } = this.props;
    if (setLoginModalMountState) {
      setLoginModalMountState(params);
    } else {
      openOverlay(params);
    }
  };

  closeBagModal = e => {
    if (e) e.preventDefault();
    const { closeMiniBagDispatch, closeAddedToBagModal } = this.props;
    closeMiniBagDispatch();
    closeAddedToBagModal();
  };

  render() {
    const {
      onSubmit,
      loginError,
      loginErrorMessage,
      showRecaptcha,
      resetForm,
      getUserInfoAction,
      labels,
      resetLoginState,
      SubmitForgot,
      showNotification,
      successFullResetEmail,
      currentForm,
      queryParams,
      setLoginModalMountState,
      onRequestClose,
      variation,
      handleContinueAsGuest,
      formErrorMessage,
      showCheckoutModal,
      showLogin,
      userplccCardNumber,
      userplccCardId,
      updateHeader,
      navigation,
      toastMessage,
      resetChangePasswordState,
      isLoading,
      rememberedUserFlag,
      userEmail,
      userName,
      openOverlay,
      closeModal,
    } = this.props;
    const errorMessage = loginError ? loginErrorMessage : '';
    const initialValues = {
      rememberMe: true,
      savePlcc: true,
      emailAddress: rememberedUserFlag ? userEmail : '',
    };
    return (
      <LoginView
        onSubmit={onSubmit}
        labels={labels}
        loginErrorMessage={errorMessage}
        initialValues={initialValues}
        showRecaptcha={showRecaptcha}
        resetForm={resetForm}
        getUserInfo={getUserInfoAction}
        openModal={this.openModal}
        resetLoginState={resetLoginState}
        SubmitForgot={SubmitForgot}
        showNotification={showNotification}
        successFullResetEmail={successFullResetEmail}
        currentForm={currentForm}
        queryParams={queryParams}
        setLoginModalMountState={setLoginModalMountState}
        onRequestClose={onRequestClose}
        variation={variation}
        handleContinueAsGuest={handleContinueAsGuest}
        loginError={loginError}
        formErrorMessage={formErrorMessage}
        showCheckoutModal={showCheckoutModal}
        showLogin={showLogin}
        userplccCardNumber={userplccCardNumber}
        userplccCardId={userplccCardId}
        updateHeader={updateHeader}
        navigation={navigation}
        toastMessage={toastMessage}
        isRememberedUser={rememberedUserFlag}
        resetChangePasswordState={resetChangePasswordState}
        isLoading={isLoading}
        userName={userName}
        openOverlay={openOverlay}
        onClose={this.closeBagModal}
        closeModal={closeModal}
      />
    );
  }
}

LoginPageContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  resetLoginState: PropTypes.func,
  isUserLoggedIn: PropTypes.bool,
  closeOverlay: PropTypes.func,
  loginError: PropTypes.bool,
  loginErrorMessage: PropTypes.string,
  showRecaptcha: PropTypes.bool,
  resetForm: PropTypes.bool.isRequired,
  getUserInfoAction: PropTypes.bool.isRequired,
  openOverlay: PropTypes.func,
  navigation: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  SubmitForgot: PropTypes.bool.isRequired,
  showNotification: PropTypes.bool.isRequired,
  successFullResetEmail: PropTypes.bool.isRequired,
  currentForm: PropTypes.string,
  queryParams: PropTypes.shape({}),
  onRequestClose: PropTypes.shape({}).isRequired,
  setLoginModalMountState: PropTypes.bool.isRequired,
  closeModal: PropTypes.bool.isRequired,
  variation: PropTypes.bool.isRequired,
  handleContinueAsGuest: PropTypes.func,
  toastMessage: PropTypes.string.isRequired,
  formErrorMessage: PropTypes.shape({}).isRequired,
  showCheckoutModal: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
  resetAccountOverViewState: PropTypes.func,
  userplccCardNumber: PropTypes.string.isRequired,
  userplccCardId: PropTypes.string.isRequired,
  updateHeader: PropTypes.func.isRequired,
  resetChangePasswordState: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  rememberedUserFlag: PropTypes.bool,
  userEmail: PropTypes.string,
  userName: PropTypes.string,
  closeMiniBagDispatch: PropTypes.func,
  closeAddedToBagModal: PropTypes.func,
};

LoginPageContainer.defaultProps = {
  showRecaptcha: false,
  loginError: false,
  loginErrorMessage: '',
  resetLoginState: () => {},
  closeOverlay: () => {},
  openOverlay: () => {},
  handleContinueAsGuest: () => {},
  isUserLoggedIn: false,
  navigation: {},
  currentForm: '',
  queryParams: {},
  resetAccountOverViewState: () => {},
  resetChangePasswordState: () => {},
  rememberedUserFlag: false,
  userEmail: '',
  userName: '',
  closeMiniBagDispatch: () => {},
  closeAddedToBagModal: () => {},
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: payload => {
      dispatch(login(payload, props.handleAfterLogin));
    },
    resetForm: payload => {
      dispatch(resetLoginForgotPasswordState(payload));
    },
    resetLoginState: () => {
      dispatch(resetLoginInfo());
    },
    SubmitForgot: payload => {
      dispatch(resetPassword(payload));
    },
    closeOverlay: () => {
      dispatch(closeOverlayModal());
    },
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
    toastMessage: palyoad => {
      dispatch(toastMessageInfo(palyoad));
    },
    closeMiniBagDispatch: () => {
      dispatch(closeMiniBag());
    },
    closeAddedToBagModal: () => {
      dispatch(closeAddedToBag());
    },
  };
};

const mapStateToProps = state => {
  return {
    isLoading: getLoadingState(state),
    showNotification: getShowNotificationState(state),
    resetForgotPasswordErrorResponse: getResetEmailResponse(state),
    successFullResetEmail: toggleSuccessfulEmailSection(state),
    isUserLoggedIn: getUserLoggedInState(state),
    loginError: getLoginError(state),
    loginErrorMessage: getLoginErrorMessage(state),
    showRecaptcha: shouldShowRecaptcha(state),
    labels: getLabels(state),
    formErrorMessage: getFormValidationErrorMessages(state),
    userplccCardNumber: getplccCardNumber(state),
    userplccCardId: getplccCardId(state),
    rememberedUserFlag: isRememberedUser(state),
    userEmail: getUserEmail(state),
    userName: getUserName(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
