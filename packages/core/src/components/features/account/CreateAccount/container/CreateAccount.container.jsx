import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateAccountView from '../views/CreateAccountView';
import { createAccount, resetCreateAccountErr } from './CreateAccount.actions';
import {
  getIAgree,
  getHideShowPwd,
  getConfirmHideShowPwd,
  getError,
  getLabels,
} from './CreateAccount.selectors';
import { openOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';

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
  };

  componentWillUnmount() {
    const { resetAccountError } = this.props;
    resetAccountError();
  }

  onAlreadyHaveAnAccountClick = e => {
    const { openOverlay } = this.props;
    e.preventDefault();
    openOverlay({
      component: 'login',
      variation: 'primary',
    });
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
      />
    );
  }
}

export const mapStateToProps = state => {
  return {
    isIAgreeChecked: getIAgree(state),
    hideShowPwd: getHideShowPwd(state),
    confirmHideShowPwd: getConfirmHideShowPwd(state),
    error: getError(state),
    labels: getLabels(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    createAccountAction: payload => {
      dispatch(createAccount(payload));
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
