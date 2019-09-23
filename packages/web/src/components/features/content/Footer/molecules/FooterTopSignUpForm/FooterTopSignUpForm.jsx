import React from 'react';
import PropTypes from 'prop-types';
import { Field, SubmissionError } from 'redux-form';

import { Grid } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Button, Col, Row, TextBox } from '@tcp/core/src/components/common/atoms';

import style from '../../Footer.style';

class FooterTopSignUpForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      validationStarted: false,
    };
  }

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

  onInputBlur = () => {
    this.setState({
      validationStarted: true,
    });
  };

  cleanUpForm = () => {
    const { reset } = this.props;
    reset();
    this.setState({
      validationStarted: false,
    });
  };

  submitForm = () => {
    const { handleSubmit, onFormSubmit, fieldName } = this.props;

    handleSubmit(values => {
      return new Promise((resolve, reject) => {
        this.formSubmitPromise = { resolve, reject };
        onFormSubmit(values[fieldName]);
      }).catch(() => {
        const {
          labels: { validationErrorLabel },
        } = this.props;
        const error = { [fieldName]: validationErrorLabel };
        throw new SubmissionError({ ...error, _error: error });
      });
    })();
  };

  render() {
    const {
      labels,
      pristine,
      invalid,
      asyncValidating,
      submitting,
      submitSucceeded,
      dataLocators,
      fieldName,
      fieldProps,
    } = this.props;
    const { validationStarted = false } = this.state;

    return (
      <form className="footer_top__signup_form">
        <Grid>
          <Row fullBleed>
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
                onBlur={this.onInputBlur}
                onKeyPress={this.onSignUpInputKeyPress}
                dataLocator={dataLocators.inputField}
                errorDataLocator={dataLocators.errorDataLocator}
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
                disabled={
                  pristine ||
                  !validationStarted ||
                  asyncValidating ||
                  invalid ||
                  submitSucceeded ||
                  submitting
                }
                buttonVariation="fixed-width"
                type="button"
                data-locator={dataLocators.submitButton}
                onClick={this.submitForm}
                className="candidate_a_form_button"
              >
                {labels.lbl_SignUp_submitButtonLabel}
              </Button>
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
  }),
  dataLocators: PropTypes.shape({
    submitButton: PropTypes.string,
    inputField: PropTypes.string,
  }),
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  asyncValidating: PropTypes.oneOf(PropTypes.bool, PropTypes.string),
  submitSucceeded: PropTypes.bool,
  submitting: PropTypes.bool,
  subscription: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  onFormSubmit: PropTypes.func,
  openSuccessModal: PropTypes.func,
  reset: PropTypes.func,
  fieldName: PropTypes.string,
  fieldProps: PropTypes.shape({}),
};

FooterTopSignUpForm.defaultProps = {
  labels: {
    lbl_SignUp_placeholderText: 'Enter email address',
    validationErrorLabel: '',
    lbl_SignUp_termsTextLabel: '',
    lbl_SignUp_submitButtonLabel: 'Submit',
  },
  dataLocators: {
    submitButton: 'email_submit_btn',
    inputField: 'enter_email_text_field',
  },
  pristine: false,
  invalid: false,
  asyncValidating: false,
  submitSucceeded: false,
  submitting: false,
  subscription: {},
  handleSubmit: () => {},
  onFormSubmit: () => {},
  openSuccessModal: () => {},
  reset: () => {},
  fieldName: 'signup',
  fieldProps: {},
};

export default withStyles(FooterTopSignUpForm, style);

export { FooterTopSignUpForm as FooterTopSignUpFormVanilla };
