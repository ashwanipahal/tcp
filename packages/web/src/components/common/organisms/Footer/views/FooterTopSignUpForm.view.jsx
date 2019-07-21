import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { Grid } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Button, Col, Row, TextBox } from '@tcp/core/src/components/common/atoms';
// import { getLocator } from '@tcp/core/src/utils';
// import { SocialMediaLinks } from '../../../molecules';

import style from '../Footer.style';

class FooterTopEmailSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationStarted: false,
    };
  }

  componentDidUpdate({ isSubscriptionValid: oldIsSubscriptionValid }) {
    const { isSubscriptionValid, openSuccessModal } = this.props;
    if (oldIsSubscriptionValid !== isSubscriptionValid && isSubscriptionValid) {
      openSuccessModal();
    } else if (oldIsSubscriptionValid !== isSubscriptionValid && !isSubscriptionValid) {
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
    const { handleSubmit, onFormSubmit } = this.props;
    handleSubmit(values => {
      onFormSubmit(values.signup);
    })();
  };

  render() {
    const {
      labels,
      pristine,
      invalid,
      asyncValidating,
      submitSucceeded,
      dataLocators,
    } = this.props;
    const { validationStarted = false } = this.state;

    return (
      <form>
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
                placeholder={labels.placeholderText}
                name="signup"
                id="signup"
                type="text"
                component={TextBox}
                onBlur={this.onInputBlur}
                onKeyPress={this.onSignUpInputKeyPress}
                dataLocator={dataLocators.inputField}
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
                  pristine || !validationStarted || asyncValidating || invalid || submitSucceeded
                }
                buttonVariation="variable-width"
                type="button"
                data-locator={dataLocators.submitButton}
                onClick={this.submitForm}
              >
                {labels.submitButtonLabel}
              </Button>
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}

FooterTopEmailSignUpForm.propTypes = {
  labels: PropTypes.shape({
    placeholderText: PropTypes.string,
    validationErrorLabel: PropTypes.string,
    termsTextLabel: PropTypes.string,
    submitButtonLabel: PropTypes.string,
  }),
  dataLocators: PropTypes.shape({
    submitButton: PropTypes.string,
    inputField: PropTypes.string,
  }),
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  asyncValidating: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  isSubscriptionValid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onFormSubmit: PropTypes.func,
  openSuccessModal: PropTypes.func,
  reset: PropTypes.func,
};

FooterTopEmailSignUpForm.defaultProps = {
  labels: {
    placeholderText: 'Enter email address',
    validationErrorLabel: '',
    termsTextLabel: '',
    submitButtonLabel: 'Submit',
  },
  dataLocators: {
    submitButton: 'email_submit_btn',
    inputField: 'enter_email_text_field',
  },
  pristine: false,
  invalid: false,
  asyncValidating: false,
  submitSucceeded: false,
  isSubscriptionValid: false,
  handleSubmit: () => {},
  onFormSubmit: () => {},
  openSuccessModal: () => {},
  reset: () => {},
};

export default withStyles(FooterTopEmailSignUpForm, style);

export { FooterTopEmailSignUpForm as FooterTopEmailSignUpFormVanilla };
