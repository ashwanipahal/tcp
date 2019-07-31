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
  isIAgreeChecked: boolean,
  hideShowPwd: boolean,
  confirmHideShowPwd: boolean,
};

// eslint-disable-next-line import/no-mutable-exports
let CreateAccountForm = ({
  isMakeDefaultDisabled,
  labels,
  isIAgreeChecked,
  hideShowPwd,
  confirmHideShowPwd,
  handleSubmit,
}: Props) => {
  return (
    <div className="parent-wrapper">
      <form onSubmit={handleSubmit}>
        <Row fullBleed className="row-form-wrapper">
          <Col
            className="banner elem-pr-MED elem-pl-MED"
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
          >
            <div className="img-parent align-center">
              <div className="my-rewards-img-wrapper elem-pb-XL">
                <Image className="tcp_carousel__play" src={getIconPath('my-place-rewards')} />
              </div>
            </div>
          </Col>
          <Col
            className="labels elem-pr-MED elem-pl-MED"
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
          >
            <div className="labels-wrapper">
              <div className="elem-pb-XS">
                <span>{labels.CREATE_ACC_LBL_CREATE_A}</span>
                <span className="my-place-rewards">{labels.CREATE_ACC_LBL_MY_PLACE_REWARDS}</span>
                <span>{labels.CREATE_ACC_LBL_EARN_POINTS}</span>
              </div>
              <div className="elem-pb-XS spend-points">
                <p>{labels.CREATE_ACC_LBL_SPEND_POINT}</p>
                <p>{labels.CREATE_ACC_LBL_POINT_REWARD}</p>
              </div>
              <div>
                <p>{labels.CREATE_ACC_LBL_SIGNED_UP}</p>
                <p>{labels.CREATE_ACC_LBL_ONLINE_ACC_CREATED}</p>
                <div className="reset-pwd">
                  <Anchor className="reset-password" to="" target="">
                    {labels.CREATE_ACC_LBL_RESET_PWD}
                  </Anchor>
                </div>
              </div>
            </div>
          </Col>
          <Col className="elem-pt-XXL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="First Name"
              name="firstName"
              component={TextBox}
              dataLocator="first-name-field"
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Last Name"
              name="lastName"
              component={TextBox}
              dataLocator="last name-field"
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Phone Number"
              name="phoneNumber"
              type="tel"
              component={TextBox}
              maxLength={50}
              dataLocator="phone-number-field"
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Zip Code"
              name="noCountryZip"
              component={TextBox}
              dataLocator="zip-code-field"
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Email Address"
              name="emailAddress"
              component={TextBox}
              dataLocator="email-address-field"
            />
          </Col>
          <Col className="elem-pt-XL" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder="Confirm Email Address"
              name="confirmEmailAddress"
              component={TextBox}
              dataLocator="confirm-email-field"
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
              type={hideShowPwd ? 'text' : 'password'}
              component={TextBox}
              dataLocator="password-field"
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
              type={confirmHideShowPwd ? 'text' : 'password'}
              component={TextBox}
              dataLocator="confirm-Password-field"
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
              disabled={!isIAgreeChecked}
            >
              {labels.CREATE_ACC_LBL_CREATE_ACCOUNT}
            </Button>
          </Col>
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
            className="already-account align-center"
          >
            <Anchor className="moduleD_textlink" to="v" target="d">
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
  ])
);

CreateAccountForm = reduxForm({
  form: 'CreateAccountForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(CreateAccountForm);

export default CreateAccountForm;
