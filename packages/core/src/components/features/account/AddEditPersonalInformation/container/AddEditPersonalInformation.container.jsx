import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import utils, { getBirthDateOptionMap } from '../../../../../utils';
import { getError, getSuccess, getProfileLabels } from './AddEditPersonalInformation.selectors';
import AddEditPersonalInformationComponent from '../views';
import { changePassword, changePasswordError } from './AddEditPersonalInformation.actions';
import {
  getUserBirthday,
  getUserName,
  getUserLastName,
  getUserEmail,
  getUserPhoneNumber,
  getAssociateId,
} from '../../User/container/User.selectors';

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
    this.yearOptionsMap = getBirthDateOptionMap();
    this.yearOptionsMap.yearsMap.unshift({ id: '0', displayName: 'Year' });
    this.yearOptionsMap.monthsMap.unshift({ id: 'MM', displayName: 'Month' });
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

  changePassword = ({
    firstName,
    lastName,
    associateId,
    email,
    phoneNumber,
    birthMonth,
    birthYear,
    isEmployee,
  }) => {
    const { changePasswordAction } = this.props;
    const newUserBirthday = birthMonth && birthYear ? `${birthMonth}|${birthYear}` : '';
    changePasswordAction({
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      associateId,
      isEmployee,
      userBirthday: newUserBirthday,
    });
  };

  goBackToProfile = () => {
    utils.routerPush('/account?id=profile', '/account/profile');
    return null;
  };

  getInitialValues = props => {
    const { firstName, lastName, email, phoneNumber, associateId, userBirthday } = props;
    const birthdayArray = userBirthday ? userBirthday.split('|') : [];

    return {
      firstName,
      lastName,
      email,
      phoneNumber,
      associateId,
      birthMonth: birthdayArray[0],
      birthYear: birthdayArray[1],
    };
  };

  render() {
    const { successMessage, errorMessage, labels, ...otherProps } = this.props;
    this.initialValues = this.getInitialValues(otherProps);
    return (
      <AddEditPersonalInformationComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.changePassword}
        labels={labels}
        birthMonthOptionsMap={this.yearOptionsMap.monthsMap}
        birthYearOptionsMap={this.yearOptionsMap.yearsMap}
        initialValues={this.initialValues}
      />
    );
  }
}

export const mapStateToProps = state => ({
  successMessage: getSuccess(state),
  errorMessage: getError(state),
  firstName: getUserName(state),
  lastName: getUserLastName(state),
  userBirthday: getUserBirthday(state),
  email: getUserEmail(state),
  phoneNumber: getUserPhoneNumber(state),
  associateId: getAssociateId(state),
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
