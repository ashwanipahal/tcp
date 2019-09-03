import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logger from '@tcp/core/src/utils/loggerInstance';
import utils from '../../../../../utils';
import { getError, getChangePasswordLabels } from './ChangePassword.selectors';
import { getSuccess } from '../../MyProfile/container/MyProfile.selectors';
import ChangePasswordComponent from '../views';
import { changePassword, changePasswordError } from './ChangePassword.actions';

export class ChangePasswordContainer extends PureComponent {
  static propTypes = {
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    changePasswordAction: PropTypes.func.isRequired,
    messageSateChangeAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    onClose: PropTypes.func,
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
    const { successMessage } = this.props;
    const { onClose } = this.props;
    if (successMessage === 'successMessage') {
      if (this.hasMobileApp()) {
        onClose();
      } else {
        this.goBackToProfile();
      }
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
    const { successMessage, errorMessage, labels, onClose } = this.props;
    return (
      <ChangePasswordComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.changePassword}
        labels={labels}
        onClose={onClose}
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
    dispatch(changePasswordError(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordContainer);
