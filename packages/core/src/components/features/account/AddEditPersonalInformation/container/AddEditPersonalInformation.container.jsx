import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import utils, { getBirthDateOptionMap } from '../../../../../utils';
import { getError, getSuccess, getIsEmployee, getProfileLabels } from './AddEditPersonalInformation.selectors';
import AddEditPersonalInformationComponent from '../views';
import { updateProfile, updateProfileError } from './AddEditPersonalInformation.actions';
import {
  getUserBirthday,
  getUserName,
  getUserLastName,
  getUserEmail,
  getUserPhoneNumber,
  getAssociateId,
  getAirmilesDetails
} from '../../User/container/User.selectors';

export class AddEditPersonalInformationContainer extends PureComponent {
  static propTypes = {
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    updateProfileAction: PropTypes.func.isRequired,
    messageSateChangeAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    isEmployee: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.yearOptionsMap = getBirthDateOptionMap();
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

  updateProfileInformation = ({
    firstName,
    lastName,
    associateId,
    Email,
    phoneNumber,
    userBirthMonth,
    userBirthYear,
    airMilesAccountNumber,
  }) => {
    const { updateProfileAction, } = this.props;
    const newUserBirthday = userBirthMonth && userBirthYear ? `${userBirthMonth}|${userBirthYear}` : '';
    updateProfileAction({
      firstName,
      lastName,
      email: Email,
      phone: phoneNumber,
      associateId,
      userBirthday: newUserBirthday,
      airmiles: airMilesAccountNumber,
    });
  };

  goBackToProfile = () => {
    utils.routerPush('/account?id=profile', '/account/profile');
    return null;
  };

  getInitialValues = props => {
    const { firstName, lastName, email, phoneNumber, associateId, userBirthday,airMilesAccountNumber } = props;
    const birthdayArray = userBirthday ? userBirthday.split('|') : [];

    return {
      firstName,
      lastName,
      Email: email,
      phoneNumber,
      associateId,
      airMilesAccountNumber,
      isEmployee: !!associateId,
      userBirthMonth: birthdayArray[0],
      userBirthYear: birthdayArray[1],
    };
  };

  render() {
    const { successMessage, errorMessage, labels, isEmployee, ...otherProps } = this.props;
    this.initialValues = this.getInitialValues(otherProps);
    return (
      <AddEditPersonalInformationComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.updateProfileInformation}
        labels={labels}
        isEmployee={isEmployee}
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
  isEmployee: getIsEmployee(state),
  airMilesAccountNumber: getAirmilesDetails(state)
});

export const mapDispatchToProps = dispatch => ({
  updateProfileAction: payload => {
    dispatch(updateProfile(payload));
  },
  messageSateChangeAction: payload => {
    dispatch(updateProfileError(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditPersonalInformationContainer);
