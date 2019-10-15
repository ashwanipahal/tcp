import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  TextBox,
  Button,
  BodyCopy,
  RichText,
  Image,
  Anchor,
} from '@tcp/core/src/components/common/atoms';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import ReactTooltip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import { getIconPath } from '@tcp/core/src/utils';
import PasswordRequirement from '@tcp/core/src/components/features/account/ResetPassword/molecules/PasswordRequirement';
import styles from '../styles/ConfirmationAccountForm.style';

/**
 * @function renderTooltip
 * @param {Object} labels
 * @returns Password Requirement component to be shown in tooltip
 */
const renderTooltip = labels => <PasswordRequirement labels={labels} />;

/**
 * @function renderEmailAddress
 * @param {String} emailAddress
 * @param {String} placeHolder
 * @returns {JSX}
 */
const renderEmailAddress = (emailAddress, placeHolder) => {
  return emailAddress ? (
    <>
      <BodyCopy
        textAlign="center"
        fontFamily="secondary"
        fontSize="fs14"
        fontWeight="extrabold"
        color="gray[900]"
        lineHeight="1.71"
        text={placeHolder}
      />
      <BodyCopy
        textAlign="center"
        fontFamily="secondary"
        fontSize="fs14"
        fontWeight="extrabold"
        color="gray[900]"
        lineHeight="1.71"
        text={emailAddress}
      />
    </>
  ) : (
    <>
      <Field
        placeholder="Email Address"
        name="emailAddress"
        id="emailAddress"
        component={TextBox}
        dataLocator="email-address-field"
        enableSuccessCheck={false}
      />
    </>
  );
};

/**
 * @function renderNotification
 * @param {Boolean} success
 * @param {String} successMsg
 * @param {String} error
 * @returns {JSX} Notification component with error or success state as provided in the input params.
 */
const renderNotification = (success, successMsg, error) => {
  return (
    (error || success) && (
      <Notification status={error ? 'error' : 'success'} message={error || successMsg} />
    )
  );
};

/**
 * @function ConfirmationCreateAccountForm
 * @param {Object} Props
 * @returns {JSX} Render method
 */
const ConfirmationCreateAccountForm = ({
  isPromptForUserDetails,
  emailAddress,
  userInformation,
  handleSubmit,
  createAccountSubmit,
  createAccountSuccess,
  createAccountError,
  resetAccountErrorState,
  labels: {
    lbl_createAccount_emailAddress: lblEmailAddress,
    lbl_createAccount_password: lblPassword,
    lbl_createAccount_confirmPassword: lblConfirmPassword,
    lbl_createAccount_firstName: lblFirstName,
    lbl_createAccount_lastName: lblLastName,
    lbl_createAccount_phoneNumber: lblPhoneNumber,
    lbl_createAccount_zipCode: lblZipCode,
    lbl_createAccount_createAccount: lblSubmitButton,
    lbl_createAccount_termsConditions: lblTermsAndConditions1,
    lbl_createAccount_termsConditions_1: lblTermsAndConditions2,
    lbl_createAccount_show: lblShow,
    lbl_createAccount_hide: lblHide,
    lbl_createAccount_heading: lblHeading,
    lbl_createAccount_succcessMsg: lblSucccessMsg,
  },
  passwordLabels,
}) => {
  /* Added istanbul, as method is called via redux form */
  /* istanbul ignore next */
  const formSubmit = formValues => {
    resetAccountErrorState();
    createAccountSubmit({
      isOrderConfirmation: true,
      ...userInformation,
      ...formValues,
    });
  };

  const [showPwd, togglePwd] = useState(false);
  const [showConfirmPwd, toggleConfirmPwd] = useState(false);

  return (
    <>
      {renderNotification(createAccountSuccess, lblSucccessMsg, createAccountError)}
      <BodyCopy text={lblHeading} />
      <form onSubmit={handleSubmit(formSubmit)}>
        <>
          {renderEmailAddress(emailAddress, lblEmailAddress)}
          {isPromptForUserDetails && (
            <>
              <Field
                placeholder={lblFirstName}
                name="firstName"
                id="firstName"
                component={TextBox}
                dataLocator="first-name-field"
                enableSuccessCheck={false}
              />
            </>
          )}
          {isPromptForUserDetails && (
            <>
              <Field
                placeholder={lblLastName}
                name="lastName"
                id="lastName"
                component={TextBox}
                dataLocator="last name-field"
                enableSuccessCheck={false}
              />
            </>
          )}
          <>
            <Field
              placeholder={lblPassword}
              name="password"
              id="password"
              type={showPwd ? 'text' : 'password'}
              component={TextBox}
              dataLocator="password-field"
              enableSuccessCheck={false}
            />
            <>
              <>
                <ReactTooltip message={renderTooltip(passwordLabels)} aligned="right">
                  <Image className="tcp_carousel__play tooltip" source={getIconPath('info-icon')} />
                </ReactTooltip>
              </>
              <>
                <Anchor
                  underline
                  noLink
                  handleLinkClick={event => {
                    event.preventDefault();
                    togglePwd(!showPwd);
                  }}
                  fontSizeVariation="large"
                  anchorVariation="primary"
                  dataLocator="pwd-hide-show-checkbox"
                >
                  {showPwd ? lblHide : lblShow}
                </Anchor>
              </>
            </>
          </>
          <>
            <Field
              placeholder={lblConfirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              type={showConfirmPwd ? 'text' : 'password'}
              component={TextBox}
              dataLocator="confirm-Password-field"
              enableSuccessCheck={false}
            />
            <>
              <>
                <Anchor
                  underline
                  noLink
                  handleLinkClick={event => {
                    event.preventDefault();
                    toggleConfirmPwd(!showConfirmPwd);
                  }}
                  className="hide-show-checkbox"
                  fontSizeVariation="large"
                  anchorVariation="primary"
                  dataLocator="confirm-hide-show-checkbox"
                  text={showConfirmPwd ? lblHide : lblShow}
                />
              </>
            </>
          </>
          {isPromptForUserDetails && (
            <>
              <Field
                placeholder={lblPhoneNumber}
                name="phoneNumber"
                id="phoneNumber"
                type="tel"
                component={TextBox}
                maxLength={50}
                dataLocator="phone-number-field"
                enableSuccessCheck={false}
              />
            </>
          )}
          {isPromptForUserDetails && (
            <>
              <Field
                placeholder={lblZipCode}
                name="noCountryZip"
                id="noCountryZip"
                component={TextBox}
                dataLocator="zip-code-field"
                enableSuccessCheck={false}
              />
            </>
          )}
          <>
            <Field
              name="iAgree"
              component={InputCheckbox}
              dataLocator="i-agree-checkbox"
              alignCheckbox="top"
            >
              <BodyCopy fontFamily="secondary" fontSize="fs10">
                <RichText richTextHtml={`${lblTermsAndConditions1} ${lblTermsAndConditions2}`} />
              </BodyCopy>
            </Field>
          </>
          <>
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              data-locator="create-account-btn"
              text={lblSubmitButton}
            />
          </>
        </>
      </form>
    </>
  );
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'emailAddress',
    'firstName',
    'lastName',
    'phoneNumber',
    'noCountryZip',
    'password',
    'confirmPassword',
    'iAgree',
  ])
);

ConfirmationCreateAccountForm.propTypes = {
  isPromptForUserDetails: PropTypes.bool,
  emailAddress: PropTypes.string.isRequired,
  userInformation: PropTypes.shape({}),
  handleSubmit: PropTypes.func.isRequired,
  createAccountSubmit: PropTypes.func.isRequired,
  createAccountSuccess: PropTypes.bool,
  createAccountError: PropTypes.string,
  resetAccountErrorState: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    lbl_createAccount_emailAddress: PropTypes.string,
    lbl_createAccount_password: PropTypes.string,
    lbl_createAccount_confirmPassword: PropTypes.string,
    lbl_createAccount_firstName: PropTypes.string,
    lbl_createAccount_lastName: PropTypes.string,
    lbl_createAccount_phoneNumber: PropTypes.string,
    lbl_createAccount_zipCode: PropTypes.string,
    lbl_createAccount_createAccount: PropTypes.string,
    lbl_createAccount_termsConditions: PropTypes.string,
    lbl_createAccount_termsConditions_1: PropTypes.string,
    lbl_createAccount_show: PropTypes.string,
    lbl_createAccount_hide: PropTypes.string,
    lbl_createAccount_heading: PropTypes.string,
  }),
  passwordLabels: PropTypes.shape({}),
};

ConfirmationCreateAccountForm.defaultProps = {
  isPromptForUserDetails: false,
  userInformation: {},
  createAccountSuccess: null,
  createAccountError: '',
  labels: {
    lbl_createAccount_emailAddress: '',
    lbl_createAccount_password: '',
    lbl_createAccount_confirmPassword: '',
    lbl_createAccount_firstName: '',
    lbl_createAccount_lastName: '',
    lbl_createAccount_phoneNumber: '',
    lbl_createAccount_zipCode: '',
    lbl_createAccount_createAccount: '',
    lbl_createAccount_termsConditions: '',
    lbl_createAccount_termsConditions_1: '',
    lbl_createAccount_show: '',
    lbl_createAccount_hide: '',
    lbl_createAccount_heading: '',
  },
  passwordLabels: {},
};

/**
 * Redux Form HOC
 */
const withReduxForm = reduxForm({
  form: 'ConfirmationCreateAccountForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(ConfirmationCreateAccountForm);

export default withStyles(withReduxForm, styles);
export { ConfirmationCreateAccountForm as ConfirmationCreateAccountFormVanilla };
