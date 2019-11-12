import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logger from '@tcp/core/src/utils/loggerInstance';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import { isMobileApp } from '@tcp/core/src/utils';

import { routerPush } from '../../../../../utils';
import CreateAccountView from '../views/CreateAccountView';
import { createAccount, resetCreateAccountErr } from './CreateAccount.actions';
import {
  getIAgree,
  getHideShowPwd,
  getConfirmHideShowPwd,
  getLabels,
  getErrorMessage,
  getPasswordLabels,
} from './CreateAccount.selectors';
import {
  getUserLoggedInState,
  getplccCardId,
  getplccCardNumber,
} from '../../User/container/User.selectors';
import { API_CONFIG } from '../../../../../services/config';
import {
  closeOverlayModal,
  openOverlayModal,
} from '../../OverlayModal/container/OverlayModal.actions';

import { getFormValidationErrorMessages } from '../../Account/container/Account.selectors';

const noop = () => {};

export class CreateAccountContainer extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    createAccountAction: PropTypes.func,
    hideShowPwd: PropTypes.bool,
    confirmHideShowPwd: PropTypes.bool,
    error: PropTypes.string,
    openOverlay: PropTypes.func,
    onRequestClose: PropTypes.func,
    isIAgreeChecked: PropTypes.bool,
    resetAccountError: PropTypes.func,
    labels: PropTypes.shape({}),
    isUserLoggedIn: PropTypes.bool,
    closeOverlay: PropTypes.func,
    navigation: PropTypes.shape({}),
    setLoginModalMountState: PropTypes.bool.isRequired,
    showLogin: PropTypes.func.isRequired,
    formErrorMessage: PropTypes.shape({}).isRequired,
    userplccCardNumber: PropTypes.string.isRequired,
    userplccCardId: PropTypes.string.isRequired,
    toastMessage: PropTypes.func,
    passwordLabels: PropTypes.shape({}).isRequired,
    updateHeader: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    createAccountAction: noop,
    hideShowPwd: false,
    confirmHideShowPwd: false,
    error: '',
    openOverlay: noop,
    onRequestClose: noop,
    isIAgreeChecked: false,
    resetAccountError: noop,
    labels: {},
    closeOverlay: noop,
    isUserLoggedIn: false,
    navigation: {},
    toastMessage: () => {},
    updateHeader: () => {},
  };

  constructor(props) {
    super(props);
    import('../../../../../utils')
      .then(({ navigateToNestedRoute }) => {
        this.hasMobileApp = isMobileApp;
        this.hasNavigateToNestedRoute = navigateToNestedRoute;
      })
      .catch(error => {
        logger.error('error: ', error);
      });
  }

  componentDidUpdate(prevProps) {
    const { isUserLoggedIn, closeOverlay, onRequestClose } = this.props;
    if (!prevProps.isUserLoggedIn && isUserLoggedIn) {
      if (this.hasMobileApp()) {
        onRequestClose({ getComponentId: { login: '', createAccount: '' } });
      } else {
        setTimeout(() => closeOverlay(), API_CONFIG.overlayTimeout);
        routerPush('/', '/home');
      }
    }
  }

  componentWillUnmount() {
    const { resetAccountError } = this.props;
    resetAccountError();
  }

  onAlreadyHaveAnAccountClick = e => {
    e.preventDefault();
    const { openOverlay, setLoginModalMountState } = this.props;
    if (setLoginModalMountState) {
      setLoginModalMountState({
        component: 'login',
      });
    } else {
      openOverlay({
        component: 'login',
        variation: 'primary',
      });
    }
  };

  openModal = params => {
    const { openOverlay, setLoginModalMountState } = this.props;
    if (setLoginModalMountState) {
      setLoginModalMountState(params);
    } else {
      openOverlay(params);
    }
  };

  render() {
    const {
      className,
      createAccountAction,
      isIAgreeChecked,
      hideShowPwd,
      confirmHideShowPwd,
      error,
      onRequestClose,
      labels,
      showLogin,
      isUserLoggedIn,
      formErrorMessage,
      userplccCardNumber,
      userplccCardId,
      toastMessage,
      passwordLabels,
      updateHeader,
    } = this.props;
    return (
      <CreateAccountView
        className={className}
        createAccountAction={createAccountAction}
        labels={labels}
        isIAgreeChecked={isIAgreeChecked}
        hideShowPwd={hideShowPwd}
        confirmHideShowPwd={confirmHideShowPwd}
        error={error}
        onAlreadyHaveAnAccountClick={this.onAlreadyHaveAnAccountClick}
        onRequestClose={onRequestClose}
        openModal={this.openModal}
        showLogin={showLogin}
        isUserLoggedIn={isUserLoggedIn}
        formErrorMessage={formErrorMessage}
        userplccCardNumber={userplccCardNumber}
        userplccCardId={userplccCardId}
        toastMessage={toastMessage}
        passwordLabels={passwordLabels}
        updateHeader={updateHeader}
      />
    );
  }
}

export const mapStateToProps = state => {
  return {
    isIAgreeChecked: getIAgree(state),
    hideShowPwd: getHideShowPwd(state),
    confirmHideShowPwd: getConfirmHideShowPwd(state),
    isUserLoggedIn: getUserLoggedInState(state),
    userplccCardNumber: getplccCardNumber(state),
    userplccCardId: getplccCardId(state),
    error: getErrorMessage(state),
    labels: getLabels(state),
    formErrorMessage: getFormValidationErrorMessages(state),
    passwordLabels: getPasswordLabels(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    createAccountAction: payload => {
      dispatch(createAccount(payload));
    },
    closeOverlay: () => {
      dispatch(closeOverlayModal());
    },
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
    resetAccountError: () => {
      dispatch(resetCreateAccountErr());
    },
    toastMessage: error => {
      dispatch(toastMessageInfo(error));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountContainer);
