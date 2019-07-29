import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import TextBox from '../../../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import Notification from '../../../../../../common/molecules/Notification';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import PasswordField from '../../PasswordField';
import Anchor from '../../../../../../common/atoms/Anchor';

export const LoginForm = ({ handleSubmit, labels, loginErrorMessage, className }) => {
  return  (
    <form name="LoginForm" onSubmit={handleSubmit} noValidate className={className}>
      {loginErrorMessage && (
        <Notification
          status="error"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={loginErrorMessage}
        />
      )}
      <Row fullBleed>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          <Field
            id="emailAddress"
            placeholder={labels.ACC_LBL_LOGIN_EMAIL}
            name="emailAddress"
            component={TextBox}
            dataLocator=""
          />
        </Col>
      </Row>
      <Row fullBleed>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          <Field
            id="password"
            placeholder={labels.ACC_LBL_LOGIN_PASSWORD}
            name="password"
            component={PasswordField}
            dataLocator=""
          />
        </Col>
      </Row>
      <Row fullBleed>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          <Field
            name="rememberMe"
            component={InputCheckbox}
            dataLocator=""
          >
            {labels.ACC_LBL_LOGIN_REMEMBER_ME}
          </Field>
        </Col>
      </Row>
      <Row fullBleed>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          <Field
            name="savePlcc"
            component={InputCheckbox}
            dataLocator=""
          >
            {labels.ACC_LBL_LOGIN_SAVE_MY_PLACE}
          </Field>
        </Col>
      </Row>
      <Row fullBleed className="elem-mb-XS">
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          <Button
            fill="BLUE"
            type="submit"
            buttonVariation="fixed-width"
            data-locator=""
          >
            {labels.ACC_LBL_LOGIN_CTA}
          </Button>
        </Col>
      </Row>
      <Row fullBleed>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
          className="textCenter"
        >
          <Anchor
            to="/"
          >
            {labels.ACC_LBL_LOGIN_FORGET_PASSWORD_CTA}
          </Anchor>
        </Col>
      </Row>
    </form>
    )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  loginErrorMessage: PropTypes.string,
}

LoginForm.defaultProps = {
  className: '',
  loginErrorMessage: ''
}


const validateMethod = createValidateMethod(
  getStandardConfig([
    {'emailAddress': 'emailAddressNoAsync'},
    {'password': 'legacyPassword'},
    'recaptchaToken'
  ])
);

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(LoginForm);
