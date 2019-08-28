import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routerPush } from '../../../../../utils';
import CreateAccountView from '../views/CreateAccountView';
import { createAccount, resetCreateAccountErr } from './CreateAccount.actions';
import {
  getIAgree,
  getHideShowPwd,
  getConfirmHideShowPwd,
  getLabels,
  getErrorMessage,
} from './CreateAccount.selectors';
import { getUserLoggedInState } from '../../User/container/User.selectors';
import {
  closeOverlayModal,
  openOverlayModal,
} from '../../../OverlayModal/container/OverlayModal.actions';

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
    showLogin: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    createAccountAction: () => {},
    hideShowPwd: false,
    confirmHideShowPwd: false,
    error: {},
    openOverlay: () => {},
    onRequestClose: () => {},
    isIAgreeChecked: false,
    resetAccountError: () => {},
    labels: {},
    closeOverlay: () => {},
    isUserLoggedIn: false,
    navigation: {},
    showLogin: () => {},
  };

  constructor(props) {
    super(props);
    import('../../../../../utils')
      .then(({ isMobileApp, navigateToNestedRoute }) => {
        this.hasMobileApp = isMobileApp;
        this.hasNavigateToNestedRoute = navigateToNestedRoute;
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  componentDidUpdate(prevProps) {
    const { isUserLoggedIn, closeOverlay, onRequestClose } = this.props;
    if (!prevProps.isUserLoggedIn && isUserLoggedIn) {
      if (this.hasMobileApp()) {
        onRequestClose({ getComponentId: { login: '', createAccount: '' } });
      } else {
        closeOverlay();
        routerPush('/', '/home');
      }
    }
  }

  componentWillUnmount() {
    const { resetAccountError } = this.props;
    resetAccountError();
  }

  onAlreadyHaveAnAccountClick = e => {
    const { openOverlay, setLoginModalMountState } = this.props;
    e.preventDefault();
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
    error: getErrorMessage(state),
    labels: getLabels(state),
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountContainer);
