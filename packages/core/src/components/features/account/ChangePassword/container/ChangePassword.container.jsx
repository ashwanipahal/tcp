import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logger from '@tcp/core/src/utils/loggerInstance';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import utils from '../../../../../utils';
import {
  getError,
  getChangePasswordLabels,
  getChangeErrorMessage,
} from './ChangePassword.selectors';
import { getSuccess } from '../../MyProfile/container/MyProfile.selectors';
import ChangePasswordComponent from '../views';
import { changePassword, changePasswordError } from './ChangePassword.actions';
import { getFormValidationErrorMessages } from '../../Account/container/Account.selectors';

export class ChangePasswordContainer extends PureComponent {
  static propTypes = {
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    changePasswordAction: PropTypes.func.isRequired,
    messageSateChangeAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    onClose: PropTypes.func,
    formErrorMessage: PropTypes.shape({}).isRequired,
    toastMessage: PropTypes.string.isRequired,
    changeErrorMessage: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onClose: () => {},
  };

  constructor(props) {
    super(props);
    import('../../../../../utils')
      .then(({ isMobileApp }) => {
        this.hasMobileApp = isMobileApp;
      })
      .catch(error => {
        logger.error('error: ', error);
      });
  }

  componentDidUpdate() {
    const { successMessage, changeErrorMessage, toastMessage } = this.props;
    const { onClose } = this.props;
    if (successMessage === 'successMessage') {
      if (this.hasMobileApp()) {
        onClose();
      } else {
        this.goBackToProfile();
      }
    }
    if (this.hasMobileApp() && changeErrorMessage) {
      toastMessage(changeErrorMessage);
    }
  }

  componentWillUnmount() {
    const { messageSateChangeAction } = this.props;
    messageSateChangeAction(null);
  }

  changePassword = ({ password, currentPassword, confirmPassword }) => {
    const { changePasswordAction } = this.props;
    changePasswordAction({
      currentPassword,
      newPassword: password,
      newPasswordVerify: confirmPassword,
    });
  };

  goBackToProfile = () => {
    utils.routerPush('/account?id=profile', '/account/profile');
    return null;
  };

  render() {
    const {
      successMessage,
      errorMessage,
      labels,
      onClose,
      formErrorMessage,
      changeErrorMessage,
    } = this.props;
    return (
      <ChangePasswordComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.changePassword}
        labels={labels}
        onClose={onClose}
        formErrorMessage={formErrorMessage}
        changeErrorMessage={changeErrorMessage}
      />
    );
  }
}

export const mapStateToProps = state => ({
  successMessage: getSuccess(state),
  errorMessage: getError(state),
  labels: getChangePasswordLabels(state),
  formErrorMessage: getFormValidationErrorMessages(state),
  changeErrorMessage: getChangeErrorMessage(state),
});

export const mapDispatchToProps = dispatch => ({
  changePasswordAction: payload => {
    dispatch(changePassword(payload));
  },
  messageSateChangeAction: payload => {
    dispatch(changePasswordError(payload));
  },
  toastMessage: palyoad => {
    dispatch(toastMessageInfo(palyoad));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordContainer);
