import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import utils from '../../../../../utils';
import { getError, getSuccess, getChangePasswordLabels } from './ChangePassword.selectors';
import ChangePasswordComponent from '../views';
import {
  changePassword,
  changePasswordSuccess,
  changePasswordError,
} from './ChangePassword.actions';

export class ChangePasswordContainer extends PureComponent {
  static propTypes = {
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    changePasswordAction: PropTypes.func.isRequired,
    messageSateChangeAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  componentDidUpdate() {
    const { successMessage } = this.props;
    if (successMessage === 'successMessage') {
      this.goBackToProfile();
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
    const { successMessage, errorMessage, labels } = this.props;
    return (
      <ChangePasswordComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.changePassword}
        labels={labels}
      />
    );
  }
}

export const mapStateToProps = state => ({
  successMessage: getSuccess(state),
  errorMessage: getError(state),
  labels: getChangePasswordLabels(state),
});

export const mapDispatchToProps = dispatch => ({
  changePasswordAction: payload => {
    dispatch(changePassword(payload));
  },
  messageSateChangeAction: payload => {
    dispatch(changePasswordSuccess(payload));
    dispatch(changePasswordError(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordContainer);
