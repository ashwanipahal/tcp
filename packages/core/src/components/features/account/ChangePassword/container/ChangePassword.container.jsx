import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import utils from '../../../../../utils';
import { getError, getSuccess, getChangePasswordLabels } from './ChangePassword.selectors';
import ChangePasswordComponent from '../views';
import { changePassword, changeState } from './ChangePassword.actions';

export class ChangePasswordContainer extends PureComponent {
  static propTypes = {
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    changeStateAction: PropTypes.func.isRequired,
    changePasswordAction: PropTypes.func.isRequired,
    backToLoginAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  changePassword = ({ password, oldPassword, confirmPassword }) => {
    const { changePasswordAction } = this.props;
    changePasswordAction({
      currentPassword: oldPassword,
      newPassword: password,
      newPasswordVerify: confirmPassword,
    });
  };

  goBackToProfile = () => {
    utils.routerPush('/account?id=profile', '/account/profile');
    return null;
  };

  backHandler = e => {
    e.preventDefault();
    const { changeStateAction, backToLoginAction } = this.props;
    changeStateAction();
    backToLoginAction();
  };

  render() {
    const { successMessage, errorMessage, labels } = this.props;

    if (successMessage === 'successMessage') {
      return this.goBackToProfile();
    }

    return (
      <ChangePasswordComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.changePassword}
        onBack={this.backHandler}
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
  changeStateAction: () => {
    dispatch(changeState());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordContainer);
