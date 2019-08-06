import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import TextBox from '../../../../../../common/atoms/TextBox';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  Styles,
  ParentView,
  ButtonWrapper,
  AlreadyAccountWrapper,
} from '../styles/CreateAccountForm.style.native';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import CustomButton from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

const onSaveMyPlaceRewards = value => {
  console.log('onSaveMyPlaceRewards: ', value);
};
const onTnC = value => {
  console.log('onTnC: ', value);
};
const onUseTouchID = value => {
  console.log('onUseTouchID: ', value);
};
const onUseFaceID = value => {
  console.log('onUseFaceID: ', value);
};

const CreateAccountForm = props => {
  const { labels, handleSubmit, handleSubmitForm } = props;
  return (
    <View {...props}>
      <ParentView>
        <Field
          label={labels.registration.lbl_createAccount_firstName}
          name="firstName"
          id="firstName"
          type="text"
          component={TextBox}
          dataLocator="firstName"
        />
        <Field
          label={labels.registration.lbl_createAccount_lastName}
          name="lastName"
          id="lastName"
          type="text"
          component={TextBox}
          dataLocator="lastName"
        />
        <Field
          label={labels.registration.lbl_createAccount_phoneNumber}
          name="phoneNumber"
          id="phoneNumber"
          type="text"
          component={TextBox}
          dataLocator="phoneNumber"
        />
        <Field
          label={labels.registration.lbl_createAccount_zipCode}
          name="noCountryZip"
          id="ZipCode"
          type="text"
          component={TextBox}
          dataLocator="Zip-Code"
        />
        <Field
          label={labels.registration.lbl_createAccount_emailAddress}
          name="emailAddress"
          id="emailAddress"
          type="text"
          component={TextBox}
          dataLocator="emailAddress"
        />
        <Field
          label={labels.registration.lbl_createAccount_confirmEmail}
          name="confirmEmailAddress"
          id="confirmEmailAddress"
          type="text"
          component={TextBox}
          dataLocator="confirmEmailAddress"
        />
        <Field
          label={labels.registration.lbl_createAccount_password}
          name="password"
          id="password"
          type="text"
          component={TextBox}
          dataLocator="password"
        />
        <Field
          label={labels.registration.lbl_createAccount_confirmPassword}
          name="confirmPassword"
          id="confirmPassword"
          type="text"
          component={TextBox}
          dataLocator="confirmPassword"
        />
        <Field
          name="saveMyPlaceRewards"
          component={InputCheckbox}
          dataLocator="saveMyPlaceRewards"
          disabled={false}
          rightText={labels.registration.lbl_createAccount_saveRewards}
          onClick={onSaveMyPlaceRewards}
        />
        <Field
          name="TnC"
          component={InputCheckbox}
          dataLocator="TnC"
          disabled={false}
          rightText={labels.registration.lbl_createAccount_termsConditions}
          marginTop={13}
          onClick={onTnC}
        />
        <Field
          name="useTouchID"
          component={InputCheckbox}
          dataLocator="useTouchID"
          disabled={false}
          rightText={labels.registration.lbl_createAccount_useTouchId}
          onClick={onUseTouchID}
        />
        <Field
          name="useFaceID"
          component={InputCheckbox}
          dataLocator="useFaceID"
          disabled={false}
          rightText={labels.registration.lbl_createAccount_useFaceId}
          marginTop={13}
          onClick={onUseFaceID}
        />
        <ButtonWrapper>
          <CustomButton
            text={labels.registration.lbl_createAccount_createAccount}
            buttonVariation="variable-width"
            onPress={handleSubmit(handleSubmitForm)}
            fill="BLUE"
            color="white"
          />
        </ButtonWrapper>
        <AlreadyAccountWrapper>
          <Anchor
            fontSizeVariation="xlarge"
            anchorVariation="secondary"
            text={labels.registration.lbl_createAccount_alreadyAccount}
          />
        </AlreadyAccountWrapper>
      </ParentView>
    </View>
  );
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'phoneNumber',
    'noCountryZip',
    'emailAddress',
    'confirmEmailAddress',
    'password',
    'confirmPassword',
  ])
);

CreateAccountForm.propTypes = {
  labels: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    rememberMe: PropTypes.string,
    saveMyRewards: PropTypes.string,
    login: PropTypes.string,
    createAccount: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  handleSubmitForm: PropTypes.func,
};

CreateAccountForm.defaultProps = {
  labels: {
    lbl_createAccount_firstName: 'First Name',
    lbl_createAccount_lastName: 'Last Name',
    lbl_createAccount_phoneNumber: 'Phone Number',
    lbl_createAccount_zipCode: 'Zip Code',
    lbl_createAccount_emailAddress: 'Email Address',
    lbl_createAccount_confirmEmail: 'Confirm Email Address',
    lbl_createAccount_password: 'Password',
    lbl_createAccount_confirmPassword: 'Confirm Password',
    lbl_createAccount_useTouchId: 'Use Touch ID',
    lbl_createAccount_useFaceId: 'Use Face ID',
  },
  handleSubmit: () => {},
  handleSubmitForm: () => {},
};

export default reduxForm({
  form: 'myCreateAccountForm',
  ...validateMethod,
  enableReinitialize: true,
})(withStyles(CreateAccountForm, Styles));
export { CreateAccountForm as CreateAccountFormVanilla };
