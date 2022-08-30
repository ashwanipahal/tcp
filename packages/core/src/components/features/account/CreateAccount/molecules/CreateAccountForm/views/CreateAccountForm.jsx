import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Button from '@tcp/core/src/components/common/atoms/Button';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Image } from '@tcp/core/src/components/common/atoms';
import ReactTooltip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Styles from '../styles/CreateAccountForm.style';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { getIconPath, isCanada } from '../../../../../../../utils';
import { formatPhoneNumber } from '../../../../../../../utils/formValidation/phoneNumber';
import constants from '../../../CreateAccount.constants';

// eslint-disable-next-line import/no-mutable-exports
let CreateAccountForm = ({
  isMakeDefaultDisabled,
  labels,
  hideShowPwd,
  confirmHideShowPwd,
  handleSubmit,
  onAlreadyHaveAnAccountClick,
  className,
  tooltipContent,
  userplccCardNumber,
  userplccCardId,
}) => {
  const getPlccLbl = getLabelValue(
    labels,
    'lbl_createAccount_plcc_checkbox_Text',
    'registration'
  ).replace('#number', `${userplccCardNumber}`);
  return (
    <div className={`${className} elem-pt-MED`}>
      <form onSubmit={handleSubmit}>
        <Row fullBleed className="row-form-wrapper">
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder={getLabelValue(labels, 'lbl_createAccount_firstName', 'registration')}
              name="firstName"
              id="firstName"
              component={TextBox}
              dataLocator="first-name-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder={getLabelValue(labels, 'lbl_createAccount_lastName', 'registration')}
              name="lastName"
              id="lastName"
              component={TextBox}
              dataLocator="last name-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder={getLabelValue(labels, 'lbl_createAccount_phoneNumber', 'registration')}
              name="phoneNumber"
              id="phoneNumber"
              type="tel"
              component={TextBox}
              maxLength={50}
              dataLocator="phone-number-field"
              enableSuccessCheck={false}
              normalize={formatPhoneNumber}
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder={
                isCanada()
                  ? getLabelValue(labels, 'lbl_addEditAddress_postalCode', 'addEditAddress')
                  : getLabelValue(labels, 'lbl_createAccount_zipCode', 'registration')
              }
              name="noCountryZip"
              id="noCountryZip"
              component={TextBox}
              dataLocator="zip-code-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder={getLabelValue(labels, 'lbl_createAccount_emailAddress', 'registration')}
              name="emailAddress"
              id="emailAddress"
              component={TextBox}
              dataLocator="email-address-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder={getLabelValue(labels, 'lbl_createAccount_confirmEmail', 'registration')}
              name="confirmEmailAddress"
              id="confirmEmailAddress"
              component={TextBox}
              dataLocator="confirm-email-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col className="position-relative" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder={getLabelValue(labels, 'lbl_createAccount_password', 'registration')}
              name="password"
              id="password"
              type={hideShowPwd ? 'text' : 'password'}
              component={TextBox}
              dataLocator="password-field"
              enableSuccessCheck={false}
            />
            <span className="hide-show show-hide-icons">
              <span className="info-icon-img-wrapper">
                <ReactTooltip message={tooltipContent} aligned="right">
                  <Image
                    className="tcp_carousel__play tooltip"
                    src={getIconPath('info-icon')}
                    alt={labels.lbl_info_icon}
                  />
                </ReactTooltip>
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
                  {hideShowPwd
                    ? getLabelValue(labels, 'lbl_createAccount_hide', 'registration')
                    : getLabelValue(labels, 'lbl_createAccount_show', 'registration')}
                </Field>
              </Col>
            </span>
          </Col>
          <Col className="position-relative" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              placeholder={getLabelValue(
                labels,
                'lbl_createAccount_confirmPassword',
                'registration'
              )}
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
                  {confirmHideShowPwd
                    ? getLabelValue(labels, 'lbl_createAccount_hide', 'registration')
                    : getLabelValue(labels, 'lbl_createAccount_show', 'registration')}
                </Field>
              </Col>
            </span>
          </Col>
          {userplccCardNumber && userplccCardId && (
            <Col
              className="plcc_checkbox elem-pb-MED"
              ignoreGutter={{ small: true }}
              colSize={{ small: 6 }}
            >
              <Field
                name="plcc_checkbox"
                component={InputCheckbox}
                dataLocator="plcc_checkbox"
                alignCheckbox="top"
              >
                <BodyCopy fontFamily="secondary" fontSize="fs10">
                  <RichText richTextHtml={getPlccLbl} />
                </BodyCopy>
              </Field>
            </Col>
          )}
          <Col
            className="i-agree-checkbox elem-pb-MED"
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
          >
            <Field
              name="iAgree"
              component={InputCheckbox}
              dataLocator="i-agree-checkbox"
              disabled={isMakeDefaultDisabled}
              alignCheckbox="top"
            >
              <BodyCopy fontFamily="secondary" fontSize="fs10">
                <RichText
                  richTextHtml={`${getLabelValue(
                    labels,
                    'lbl_createAccount_termsConditions',
                    'registration'
                  )} ${getLabelValue(
                    labels,
                    'lbl_createAccount_termsConditions_1',
                    'registration'
                  )}`}
                />
              </BodyCopy>
            </Field>
          </Col>
          <Col className="elem-pb-MED" ignoreGutter={{ small: true }} colSize={{ small: 6 }}>
            <Field
              name="rememberMe"
              component={InputCheckbox}
              dataLocator="remember-me-checkbox"
              disabled={isMakeDefaultDisabled}
            >
              <BodyCopy fontFamily="secondary" className="remember-me-text" fontSize="fs10">
                {getLabelValue(labels, 'lbl_createAccount_rememberMe', 'registration')}
              </BodyCopy>

              <BodyCopy fontFamily="secondary" fontSize="fs10">
                {getLabelValue(labels, 'lbl_createAccount_rememberMeHelpText', 'registration')}
              </BodyCopy>
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
              {getLabelValue(labels, 'lbl_createAccount_createAccount', 'registration')}
            </Button>
          </Col>
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 6 }}
            className="already-account align-center"
          >
            <Anchor
              fontSizeVariation="large"
              className="already-account"
              onClick={onAlreadyHaveAnAccountClick}
            >
              {getLabelValue(labels, 'lbl_createAccount_alreadyAccount', 'registration')}
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
  form: constants.CREATE_ACCOUNT_FORM, // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(CreateAccountForm);

CreateAccountForm.propTypes = {
  isMakeDefaultDisabled: PropTypes.string.isRequired,
  handleSubmit: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
  hideShowPwd: PropTypes.bool.isRequired,
  confirmHideShowPwd: PropTypes.bool.isRequired,
  onAlreadyHaveAnAccountClick: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  tooltipContent: PropTypes.string.isRequired,
  userplccCardNumber: PropTypes.string.isRequired,
  userplccCardId: PropTypes.string.isRequired,
};

export default withStyles(CreateAccountForm, Styles);
export { CreateAccountForm as CreateAccountFormVanilla };
