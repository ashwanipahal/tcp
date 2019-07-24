import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import TextBox from '../../../../../../common/atoms/TextBox';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import Anchor from '../../../../../../common/atoms/Anchor';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { Image } from '../../../../../../common/atoms';
import { getIconPath } from '../../../../../../../utils';

// @flow
type Props = {
  isMakeDefaultDisabled: string,
  handleSubmit: string,
  labels: string,
  isIAgreeField: string,
};

const handleSubmitForm = data => {
  const { createAccountAction } = this.props;
  createAccountAction(data);
};

// const showHideFunction = e => {
//   const { showPassword } = this.state;
//   this.setState({
//     showPassword: !showPassword,
//     passwordType: showPassword ? 'password' : 'text',
//   });
// };

// eslint-disable-next-line import/no-mutable-exports
let CreateAccountForm = ({ isMakeDefaultDisabled, handleSubmit, labels, isIAgreeField }: Props) => {
  return (
    <div>
      <form onSubmit={handleSubmit(() => handleSubmitForm)}>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <div className="my-rewards-img-wrapper">
              <Image className="tcp_carousel__play" src={getIconPath('my-place-rewards')} />
            </div>
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <div className="labels-wrapper">
              <div>
                <span>{labels.CREATE_ACC_LBL_CREATE_A}</span>
                <span>{labels.CREATE_ACC_LBL_MY_PLACE_REWARDS}</span>
                <span>{labels.CREATE_ACC_LBL_EARN_POINTS}</span>
              </div>
              <div>{labels.CREATE_ACC_LBL_SPEND_POINT}</div>
              <div>{labels.CREATE_ACC_LBL_POINT_REWARD}</div>
              <div>{labels.CREATE_ACC_LBL_SIGNED_UP}</div>
              <div>{labels.CREATE_ACC_LBL_ONLINE_ACC_CREATED}</div>
              <div>
                <Anchor className="reset_password" to="" target="">
                  {labels.CREATE_ACC_LBL_RESET_PWD}
                </Anchor>
              </div>
            </div>
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              placeholder="First Name"
              name="firstName"
              component={TextBox}
              dataLocator="first-name-field"
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              placeholder="Last Name"
              name="lastName"
              component={TextBox}
              dataLocator="last name-field"
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              placeholder="Phone Number"
              name="phoneNumber"
              type="tel"
              component={TextBox}
              maxLength={50}
              dataLocator="phone-number-field"
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              placeholder="Zip Code"
              name="noCountryZip"
              component={TextBox}
              dataLocator="zip-code-field"
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              placeholder="Email Address"
              name="emailAddress"
              component={TextBox}
              dataLocator="email-address-field"
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              placeholder="Confirm Email Address"
              name="confirmEmailAddress"
              component={TextBox}
              dataLocator="confirm-email-field"
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              placeholder="Password"
              name="password"
              type="password"
              component={TextBox}
              dataLocator="password-field"
            />
            <div className="info-icon-img-wrapper">
              <Image className="tcp_carousel__play" src={getIconPath('info-icon')} />
            </div>
            {/* <Anchor className="type_password" to="" target="" onClick={showHideFunction}>
              {labels.CREATE_ACC_LBL_HIDE}
            </Anchor> */}
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              component={TextBox}
              dataLocator="confirm-Password-field"
            />
            {/* <Anchor
              className="confirm_password"
              to=""
              target=""
              onClick={showHideConfirmFunction}
            >
              {labels.CREATE_ACC_LBL_HIDE}
            </Anchor> */}
          </Col>

          {/* CHECKBOXES */}
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              name="myPlace"
              component={InputCheckbox}
              dataLocator="my-place-checkbox"
              disabled={isMakeDefaultDisabled}
            >
              {labels.CREATE_ACC_LBL_SAVE_REWARDS}
            </Field>
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              name="iAgree"
              component={InputCheckbox}
              dataLocator="i-agree-checkbox"
              disabled={isMakeDefaultDisabled}
            >
              {labels.CREATE_ACC_LBL_TERMS_CONDITIONS}
            </Field>
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }}>
            <Field
              name="rememberMe"
              component={InputCheckbox}
              dataLocator="remember-me-checkbox"
              disabled={isMakeDefaultDisabled}
            >
              {labels.CREATE_ACC_LBL_REMEMBER_ME}
            </Field>
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 12 }} className="card__btn--medium">
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              data-locator="create-account-btn"
              disabled={!isIAgreeField}
            >
              {labels.CREATE_ACC_LBL_CREATE_ACCOUNT}
            </Button>
          </Col>
          <Anchor className="moduleD_textlink" to="v" target="d">
            {labels.CREATE_ACC_LBL_ALREADY_ACCOUNT}
          </Anchor>
        </Row>
      </form>
    </div>
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

CreateAccountForm = reduxForm({
  form: 'CreateAccountForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(CreateAccountForm);

const formState = formValueSelector('CreateAccountForm');

CreateAccountForm = connect(state => {
  const isIAgreeField = formState(state, 'iAgree');
  return {
    isIAgreeField,
  };
})(CreateAccountForm);

export default CreateAccountForm;
