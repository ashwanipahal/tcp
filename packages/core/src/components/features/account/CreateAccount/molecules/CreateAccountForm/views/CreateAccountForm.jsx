import React from 'react';
import { Field, reduxForm } from 'redux-form';
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
  hideShowPwd: boolean,
  confirmHideShowPwd: boolean,
  onAlreadyHaveAnAccountClick: any,
};

// eslint-disable-next-line import/no-mutable-exports
let CreateAccountForm = ({
  isMakeDefaultDisabled,
  labels,
  hideShowPwd,
  confirmHideShowPwd,
  handleSubmit,
  onAlreadyHaveAnAccountClick,
}: Props) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Row fullBleed className="row-form-wrapper">
          <Col className="elem-pt-XXL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="First Name"
              name="firstName"
              id="firstName"
              component={TextBox}
              dataLocator="first-name-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              component={TextBox}
              dataLocator="last name-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Phone Number"
              name="phoneNumber"
              id="phoneNumber"
              type="tel"
              component={TextBox}
              maxLength={50}
              dataLocator="phone-number-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Zip Code"
              name="noCountryZip"
              id="noCountryZip"
              component={TextBox}
              dataLocator="zip-code-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Email Address"
              name="emailAddress"
              id="emailAddress"
              component={TextBox}
              dataLocator="email-address-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Confirm Email Address"
              name="confirmEmailAddress"
              id="confirmEmailAddress"
              component={TextBox}
              dataLocator="confirm-email-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col
            className="elem-pt-XL position-relative"
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
          >
            <Field
              placeholder="Password"
              name="password"
              id="password"
              type={hideShowPwd ? 'text' : 'password'}
              component={TextBox}
              dataLocator="password-field"
              enableSuccessCheck={false}
            />
            <span className="hide-show show-hide-icons">
              <span className="info-icon-img-wrapper">
                <Image className="tcp_carousel__play" src={getIconPath('info-icon')} />
              </span>
              <Col
                className="checkbox-hide-show"
                ignoreGutter={{ small: true }}
                colSize={{ small: 6 }}
              >
                <Field
                  name="hideShowPwd"
                  component={InputCheckbox}
                  dataLocator="hide-show-checkbox"
                  enableSuccessCheck={false}
                >
                  {hideShowPwd ? labels.CREATE_ACC_LBL_HIDE : labels.CREATE_ACC_LBL_SHOW}
                </Field>
              </Col>
            </span>
          </Col>
          <Col
            className="elem-pt-XL position-relative"
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
          >
            <Field
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              type={confirmHideShowPwd ? 'text' : 'password'}
              component={TextBox}
              dataLocator="confirm-Password-field"
              enableSuccessCheck={false}
            />
            <span className="hide-show confirm-pwd-hide-show">
              <Col
                className="checkbox-hide-show"
                ignoreGutter={{ small: true }}
                colSize={{ small: 6 }}
              >
                <Field
                  name="confirmHideShowPwd"
                  component={InputCheckbox}
                  dataLocator="confirm-hide-show-checkbox"
                  enableSuccessCheck={false}
                >
                  {confirmHideShowPwd ? labels.CREATE_ACC_LBL_HIDE : labels.CREATE_ACC_LBL_SHOW}
                </Field>
              </Col>
            </span>
          </Col>

          {/* CHECKBOXES */}
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              name="myPlace"
              component={InputCheckbox}
              dataLocator="my-place-checkbox"
              disabled={isMakeDefaultDisabled}
            >
              {labels.CREATE_ACC_LBL_SAVE_REWARDS}
            </Field>
          </Col>
          <Col
            className="elem-pt-XL i-agree-checkbox"
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
          >
            <Field
              name="iAgree"
              component={InputCheckbox}
              dataLocator="i-agree-checkbox"
              disabled={isMakeDefaultDisabled}
            >
              {labels.CREATE_ACC_LBL_TERMS_CONDITIONS}
            </Field>
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              name="rememberMe"
              component={InputCheckbox}
              dataLocator="remember-me-checkbox"
              disabled={isMakeDefaultDisabled}
            >
              {labels.CREATE_ACC_LBL_REMEMBER_ME}
            </Field>
          </Col>
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
            className="card__btn--medium create-account-btn"
          >
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              data-locator="create-account-btn"
            >
              {labels.CREATE_ACC_LBL_CREATE_ACCOUNT}
            </Button>
          </Col>
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
            className="already-account align-center"
          >
            <Anchor onClick={onAlreadyHaveAnAccountClick}>
              {labels.CREATE_ACC_LBL_ALREADY_ACCOUNT}
            </Anchor>
          </Col>
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
    'iAgree',
  ])
);

CreateAccountForm = reduxForm({
  form: 'CreateAccountForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(CreateAccountForm);

export default CreateAccountForm;
