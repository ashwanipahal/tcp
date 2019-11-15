import React from 'react';
import PropTypes from 'prop-types';
import { Field, SubmissionError } from 'redux-form';

import { Grid } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Button, Col, Row, TextBox } from '@tcp/core/src/components/common/atoms';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { isGymboree } from '@tcp/core/src/utils/utils';

import style from '../../Footer.style';

class FooterTopSignUpForm extends React.PureComponent {
  componentDidUpdate({ submitSucceeded: oldSubmitSucceeded }) {
    const { subscription, submitSucceeded, openSuccessModal } = this.props;

    if ((subscription.error || subscription.success) && this.formSubmitPromise) {
      if (subscription.error) {
        this.formSubmitPromise.reject();
      } else {
        this.formSubmitPromise.resolve();
      }
      this.formSubmitPromise = null;
    }
    if (oldSubmitSucceeded !== submitSucceeded && submitSucceeded) {
      openSuccessModal();
      this.cleanUpForm();
    }
  }

  onSignUpInputKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      this.submitForm();
    }
  };

  cleanUpForm = () => {
    const { reset } = this.props;
    reset();
  };

  submitForm = values => {
    const {
      onFormSubmit,
      validateForm,
      labels: { validationErrorLabel },
      fieldName,
    } = this.props;

    return validateForm(values)
      .then(subscription => {
        if (subscription.error) {
          return Promise.reject();
        }

        return new Promise((resolve, reject) => {
          this.formSubmitPromise = { resolve, reject };
          onFormSubmit(values);
        });
      })
      .catch(() => {
        const error = { [fieldName]: validationErrorLabel };
        throw new SubmissionError({ ...error, _error: error });
      });
  };

  render() {
    const {
      labels,
      pristine,
      submitting,
      handleSubmit,
      dataLocators,
      fieldName,
      secondFieldName,
      fieldProps,
    } = this.props;

    const isGym = isGymboree();

    return (
      <form className="footer_top__signup_form" onSubmit={handleSubmit(this.submitForm)}>
        <Grid>
          <Row fullBleed className="footer_top__signup_form_row">
            <Col
              className=""
              colSize={{
                large: 8,
                medium: 4,
                small: 4,
              }}
              ignoreGutter={{
                small: false,
              }}
            >
              <Field
                placeholder={labels.lbl_SignUp_placeholderText}
                name={fieldName}
                id={fieldName}
                type="text"
                component={TextBox}
                dataLocator={dataLocators.inputField}
                errorDataLocator={dataLocators.errorDataLocator}
                enableSuccessCheck={false}
                {...fieldProps}
              />
            </Col>
            <Col
              colSize={{
                large: 4,
                medium: 4,
                small: 2,
              }}
              ignoreGutter={{
                small: true,
              }}
              className="candidate_a_inline_container_button"
            >
              <Button
                disabled={pristine || submitting}
                buttonVariation="fixed-width"
                type="submit"
                data-locator={dataLocators.submitButton}
                className="candidate_a_form_button"
              >
                {labels.lbl_SignUp_submitButtonLabel}
              </Button>
            </Col>
          </Row>

          <Row fullBleed className="footer_top__signup_form_row">
            <Col
              colSize={{
                large: 12,
                medium: 12,
                small: 12,
              }}
              ignoreGutter={{
                small: false,
              }}
            >
              <Field
                name={secondFieldName}
                id={secondFieldName}
                component={InputCheckbox}
                dataLocator={isGym ? dataLocators.checkBox_tcp : dataLocators.checkBox_gym}
                type="checkbox"
              >
                {isGym ? labels.lbl_SignUp_tcpSignUpLabel : labels.lbl_SignUp_gymSignUpLabel}
              </Field>
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}

FooterTopSignUpForm.propTypes = {
  labels: PropTypes.shape({
    lbl_SignUp_placeholderText: PropTypes.string,
    validationErrorLabel: PropTypes.string,
    lbl_SignUp_termsTextLabel: PropTypes.string,
    lbl_SignUp_submitButtonLabel: PropTypes.string,
    lbl_SignUp_gymSignUpLabel: PropTypes.string,
    lbl_SignUp_tcpSignUpLabel: PropTypes.string,
  }),
  dataLocators: PropTypes.shape({
    submitButton: PropTypes.string,
    inputField: PropTypes.string,
    checkBox_gym: PropTypes.string,
    checkBox_tcp: PropTypes.string,
  }),
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  validateForm: PropTypes.func,
  submitSucceeded: PropTypes.bool,
  submitting: PropTypes.bool,
  subscription: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  onFormSubmit: PropTypes.func,
  openSuccessModal: PropTypes.func,
  reset: PropTypes.func,
  fieldName: PropTypes.string,
  fieldProps: PropTypes.shape({}),
  secondFieldName: PropTypes.string,
};

FooterTopSignUpForm.defaultProps = {
  labels: {
    lbl_SignUp_placeholderText: 'Enter email address',
    validationErrorLabel: '',
    lbl_SignUp_termsTextLabel: '',
    lbl_SignUp_submitButtonLabel: 'Submit',
    lbl_SignUp_gymSignUpLabel: '',
    lbl_SignUp_tcpSignUpLabel: '',
  },
  dataLocators: {
    submitButton: 'email_submit_btn',
    inputField: 'enter_email_text_field',
    checkBox_gym: '',
    checkBox_tcp: '',
  },
  pristine: false,
  invalid: false,
  validateForm: () => {},
  submitSucceeded: false,
  submitting: false,
  subscription: {},
  handleSubmit: () => {},
  onFormSubmit: () => {},
  openSuccessModal: () => {},
  reset: () => {},
  fieldName: 'signup',
  fieldProps: {},
  secondFieldName: '',
};

export default withStyles(FooterTopSignUpForm, style);

export { FooterTopSignUpForm as FooterTopSignUpFormVanilla };
