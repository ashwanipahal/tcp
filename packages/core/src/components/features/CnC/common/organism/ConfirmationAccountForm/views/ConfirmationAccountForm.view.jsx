import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  TextBox,
  Row,
  Col,
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
 * @param {Object} inputColGrid
 * @param {String} placeHolder
 * @returns {JSX}
 */
const renderEmailAddress = (emailAddress, inputColGrid, placeHolder) => {
  return emailAddress ? (
    <Col {...inputColGrid}>
      <BodyCopy component="div" className="email-address">
        <BodyCopy
          component="p"
          textAlign="center"
          fontFamily="secondary"
          fontSize="fs14"
          fontWeight="extrabold"
          color="gray[900]"
          lineHeight="1.71"
        >
          {placeHolder}
        </BodyCopy>
        <BodyCopy
          component="p"
          textAlign="center"
          fontFamily="secondary"
          fontSize="fs14"
          fontWeight="extrabold"
          color="gray[900]"
          lineHeight="1.71"
        >
          {emailAddress}
        </BodyCopy>
      </BodyCopy>
    </Col>
  ) : (
    <Col {...inputColGrid}>
      <Field
        placeholder="Email Address"
        name="emailAddress"
        id="emailAddress"
        component={TextBox}
        dataLocator="email-address-field"
        enableSuccessCheck={false}
      />
    </Col>
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
  className,
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
  const inputColGrid = {
    offsetLeft: { large: 3 },
    offsetRight: { large: 3 },
    ignoreGutter: { small: true },
    colSize: { small: 6, large: 6 },
  };

  return (
    <div className={`${className} elem-pt-MED`}>
      {renderNotification(createAccountSuccess, lblSucccessMsg, createAccountError)}
      <BodyCopy className="heading" fontSize="fs26" color="gray[900]" textAlign="center">
        {lblHeading}
      </BodyCopy>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Row fullBleed className="row-form-wrapper">
          {renderEmailAddress(emailAddress, inputColGrid, lblEmailAddress)}
          {isPromptForUserDetails && (
            <Col {...inputColGrid}>
              <Field
                placeholder={lblFirstName}
                name="firstName"
                id="firstName"
                component={TextBox}
                dataLocator="first-name-field"
                enableSuccessCheck={false}
              />
            </Col>
          )}
          {isPromptForUserDetails && (
            <Col {...inputColGrid}>
              <Field
                placeholder={lblLastName}
                name="lastName"
                id="lastName"
                component={TextBox}
                dataLocator="last name-field"
                enableSuccessCheck={false}
              />
            </Col>
          )}
          <Col className="password-container" {...inputColGrid}>
            <Field
              placeholder={lblPassword}
              name="password"
              id="password"
              type={showPwd ? 'text' : 'password'}
              component={TextBox}
              dataLocator="password-field"
              enableSuccessCheck={false}
            />
            <div className="hide-show">
              <div className="info-icon-img-wrapper">
                <ReactTooltip message={renderTooltip(passwordLabels)} aligned="right">
                  <Image className="tcp_carousel__play tooltip" src={getIconPath('info-icon')} />
                </ReactTooltip>
              </div>
              <Col ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
                <Anchor
                  underline
                  noLink
                  handleLinkClick={event => {
                    event.preventDefault();
                    togglePwd(!showPwd);
                  }}
                  className="hide-show-checkbox"
                  fontSizeVariation="large"
                  anchorVariation="primary"
                  dataLocator="pwd-hide-show-checkbox"
                >
                  {showPwd ? lblHide : lblShow}
                </Anchor>
              </Col>
            </div>
          </Col>
          <Col className="password-container" {...inputColGrid}>
            <Field
              placeholder={lblConfirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              type={showConfirmPwd ? 'text' : 'password'}
              component={TextBox}
              dataLocator="confirm-Password-field"
              enableSuccessCheck={false}
            />
            <div className="hide-show confirm-pwd">
              <Col ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
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
                >
                  {showConfirmPwd ? lblHide : lblShow}
                </Anchor>
              </Col>
            </div>
          </Col>
          {isPromptForUserDetails && (
            <Col {...inputColGrid}>
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
            </Col>
          )}
          {isPromptForUserDetails && (
            <Col {...inputColGrid}>
              <Field
                placeholder={lblZipCode}
                name="noCountryZip"
                id="noCountryZip"
                component={TextBox}
                dataLocator="zip-code-field"
                enableSuccessCheck={false}
              />
            </Col>
          )}
          <Col className="elem-pt-XXL elem-pb-XXL" {...inputColGrid}>
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
          </Col>
          <Col {...inputColGrid} className="elem-pb-XXL">
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              data-locator="create-account-btn"
            >
              {lblSubmitButton}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
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
  className: PropTypes.string,
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
  className: '',
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
