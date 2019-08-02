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
          label={labels.CREATE_ACC_LBL_FIRST_NAME}
          name="firstName"
          id="firstName"
          type="text"
          component={TextBox}
          dataLocator="firstName"
        />
        <Field
          label={labels.CREATE_ACC_LBL_LAST_NAME}
          name="lastName"
          id="lastName"
          type="text"
          component={TextBox}
          dataLocator="lastName"
        />
        <Field
          label={labels.CREATE_ACC_LBL_PHONE_NUMBER}
          name="phoneNumber"
          id="phoneNumber"
          type="text"
          component={TextBox}
          dataLocator="phoneNumber"
        />
        <Field
          label={labels.CREATE_ACC_LBL_ZIP_CODE}
          name="noCountryZip"
          id="ZipCode"
          type="text"
          component={TextBox}
          dataLocator="Zip-Code"
        />
        <Field
          label={labels.CREATE_ACC_LBL_EMAIL_ADDRESS}
          name="emailAddress"
          id="emailAddress"
          type="text"
          component={TextBox}
          dataLocator="emailAddress"
        />
        <Field
          label={labels.CREATE_ACC_LBL_CONFIRM_EMAIL}
          name="confirmEmailAddress"
          id="confirmEmailAddress"
          type="text"
          component={TextBox}
          dataLocator="confirmEmailAddress"
        />
        <Field
          label={labels.CREATE_ACC_LBL_PASSWORD}
          name="password"
          id="password"
          type="text"
          component={TextBox}
          dataLocator="password"
        />
        <Field
          label={labels.CREATE_ACC_LBL_CONFIRM_PASSWORD}
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
          rightText={labels.CREATE_ACC_LBL_SAVE_REWARDS}
          onClick={onSaveMyPlaceRewards}
        />
        <Field
          name="TnC"
          component={InputCheckbox}
          dataLocator="TnC"
          disabled={false}
          rightText={labels.CREATE_ACC_LBL_TERMS_CONDITIONS}
          marginTop={13}
          onClick={onTnC}
        />
        <Field
          name="useTouchID"
          component={InputCheckbox}
          dataLocator="useTouchID"
          disabled={false}
          rightText={labels.CREATE_ACC_LBL_USE_TOUCH_ID}
          onClick={onUseTouchID}
        />
        <Field
          name="useFaceID"
          component={InputCheckbox}
          dataLocator="useFaceID"
          disabled={false}
          rightText={labels.CREATE_ACC_LBL_USE_FACE_ID}
          marginTop={13}
          onClick={onUseFaceID}
        />
        <ButtonWrapper>
          <CustomButton
            text={labels.CREATE_ACC_LBL_CREATE_ACCOUNT}
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
            text={labels.CREATE_ACC_LBL_ALREADY_ACCOUNT}
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
    CREATE_ACC_LBL_FIRST_NAME: 'First Name',
    CREATE_ACC_LBL_LAST_NAME: 'Last Name',
    CREATE_ACC_LBL_PHONE_NUMBER: 'Phone Number',
    CREATE_ACC_LBL_ZIP_CODE: 'Zip Code',
    CREATE_ACC_LBL_EMAIL_ADDRESS: 'Email Address',
    CREATE_ACC_LBL_CONFIRM_EMAIL: 'Confirm Email Address',
    CREATE_ACC_LBL_PASSWORD: 'Password',
    CREATE_ACC_LBL_CONFIRM_PASSWORD: 'Confirm Password',
    CREATE_ACC_LBL_USE_TOUCH_ID: 'Use Touch ID',
    CREATE_ACC_LBL_USE_FACE_ID: 'Use Face ID',
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
