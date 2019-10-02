import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBirthDateOptionMap, routerPush, isMobileApp } from '@tcp/core/src/utils';
import {
  getError,
  getIsEmployee,
  getProfileLabels,
  getPersonalInfoErrorMessage,
} from './AddEditPersonalInformation.selectors';
import { getSuccess } from '../../MyProfile/container/MyProfile.selectors';
import AddEditPersonalInformationComponent from '../views';
import { updateProfile, updateProfileError } from './AddEditPersonalInformation.actions';
import internalEndpoints from '../../common/internalEndpoints';
import { updateProfileSuccess } from '../../MyProfile/container/MyProfile.actions';
import {
  getUserBirthday,
  getUserName,
  getUserLastName,
  getUserEmail,
  getUserPhoneNumber,
  getAssociateId,
  getAirmilesDetails,
} from '../../User/container/User.selectors';
import { toastMessageInfo } from '../../../../common/atoms/Toast/container/Toast.actions.native';

import { getFormValidationErrorMessages } from '../../Account/container/Account.selectors';

export class AddEditPersonalInformationContainer extends PureComponent {
  static propTypes = {
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    updateProfileAction: PropTypes.func.isRequired,
    messageStateChangeAction: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    isEmployee: PropTypes.string.isRequired,
    formErrorMessage: PropTypes.shape({}).isRequired,
    onRequestClose: PropTypes.func.isRequired,
    messageSuccessStateChangeAction: PropTypes.func.isRequired,
    toastMessage: PropTypes.func,
    personalInfoErrorMessage: PropTypes.string,
  };

  static defaultProps = {
    toastMessage: () => {},
    personalInfoErrorMessage: '',
  };

  constructor(props) {
    super(props);
    this.yearOptionsMap = getBirthDateOptionMap();
    const { labels, messageSuccessStateChangeAction, ...otherProps } = this.props;
    messageSuccessStateChangeAction(null);
    this.initialValues = this.getInitialValues(otherProps);
  }

  componentDidUpdate() {
    const { successMessage, errorMessage, onRequestClose, toastMessage } = this.props;
    if (successMessage === 'successMessage') {
      if (isMobileApp()) {
        onRequestClose();
      } else this.goBackToProfile();
    }

    if (errorMessage && isMobileApp()) {
      toastMessage(errorMessage);
    }
  }

  componentWillUnmount() {
    const { messageStateChangeAction } = this.props;
    messageStateChangeAction(null);
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
    isEmployee,
  }) => {
    const { updateProfileAction } = this.props;
    const newUserBirthday =
      userBirthMonth && userBirthYear ? `${userBirthMonth}|${userBirthYear}` : '';
    const associateIdValue = isEmployee && associateId ? associateId : null;
    updateProfileAction({
      firstName,
      lastName,
      email: Email,
      phone: phoneNumber,
      associateId: associateIdValue,
      userBirthday: newUserBirthday,
      airmiles: airMilesAccountNumber,
    });
  };

  goBackToProfile = () => {
    routerPush(internalEndpoints.profilePage.link, internalEndpoints.profilePage.path);
    return null;
  };

  getInitialValues = props => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      associateId,
      userBirthday,
      airMilesAccountNumber,
    } = props;
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
    const {
      successMessage,
      errorMessage,
      onRequestClose,
      labels,
      isEmployee,
      formErrorMessage,
      toastMessage,
      personalInfoErrorMessage,
    } = this.props;

    return (
      <AddEditPersonalInformationComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={this.updateProfileInformation}
        onCancel={onRequestClose}
        labels={labels}
        toastMessage={toastMessage}
        isEmployee={isEmployee}
        birthMonthOptionsMap={this.yearOptionsMap.monthsMap}
        birthYearOptionsMap={this.yearOptionsMap.yearsMap}
        initialValues={this.initialValues}
        formErrorMessage={formErrorMessage}
        personalInfoErrorMessage={personalInfoErrorMessage}
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
  airMilesAccountNumber: getAirmilesDetails(state),
  formErrorMessage: getFormValidationErrorMessages(state),
  personalInfoErrorMessage: getPersonalInfoErrorMessage(state),
});

export const mapDispatchToProps = dispatch => ({
  updateProfileAction: payload => {
    dispatch(updateProfile(payload));
  },
  messageSuccessStateChangeAction: payload => {
    dispatch(updateProfileSuccess(payload));
  },
  messageStateChangeAction: payload => {
    dispatch(updateProfileError(payload));
  },
  toastMessage: errorMessage => {
    dispatch(toastMessageInfo(errorMessage));
    dispatch(updateProfileError(null));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditPersonalInformationContainer);
