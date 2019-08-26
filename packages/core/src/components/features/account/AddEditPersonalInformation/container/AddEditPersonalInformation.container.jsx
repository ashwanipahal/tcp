import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import utils, { getCreditCardExpirationOptionMap } from '../../../../../utils';
import {
  getError,
  getSuccess,
  getProfileLabels,
} from './AddEditPersonalInformation.selectors';
import AddEditPersonalInformationComponent from '../views';
import { changePassword, changePasswordError } from './AddEditPersonalInformation.actions';

export class AddEditPersonalInformationContainer extends PureComponent {
  static propTypes = {
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    changePasswordAction: PropTypes.func.isRequired,
    messageSateChangeAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.creditCardExpirationOptionMap = getCreditCardExpirationOptionMap();
  }

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
      <AddEditPersonalInformationComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.changePassword}
        labels={labels}
        expMonthOptionsMap={this.creditCardExpirationOptionMap.monthsMap}
        expYearOptionsMap={this.creditCardExpirationOptionMap.yearsMap}
      />
    );
  }
}

export const mapStateToProps = state => ({
  successMessage: getSuccess(state),
  errorMessage: getError(state),
  labels: getProfileLabels(state),
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
)(AddEditPersonalInformationContainer);
