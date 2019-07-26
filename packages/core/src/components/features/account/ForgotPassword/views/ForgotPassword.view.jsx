import React from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import TextBox from '../../../../common/atoms/TextBox';
import styles from '../styles/ForgotPassword.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import Grid from '../../../../common/molecules/Grid';
import Button from '../../../../common/atoms/Button';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import createValidateMethod from '../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import Notification from '../../../../common/molecules/Notification';

// @flow
type Props = {
  pristine: any,
  className: any,
  onSubmitForgot: Object => void,
  showNotification: any,
  showForgotPasswordForm: any,
  resetResponse: any,
  labels: any,
};

type State = {
  country: string,
};
class ForgotPasswordView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  changeHandler = e => {
    this.setState({
      email: e.target.value,
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    const { onSubmitForgot } = this.props;
    onSubmitForgot({
      logonId: email.toUpperCase().trim(),
    });
  };

  onBackClick = () => {
    const { showForgotPasswordForm } = this.props;

    showForgotPasswordForm();
  };

  render() {
    const { pristine, className, showNotification, resetResponse, labels } = this.props;
    const errorObject = resetResponse && resetResponse.get('errors');
    const { email } = this.state;
    return (
      <React.Fragment>
        <Button type="button" onClick={this.onBackClick} className="link-forgot">
          Back to Login In
        </Button>
        {errorObject && !showNotification && (
          <Notification
            status="error"
            colSize={{ large: 11, medium: 7, small: 6 }}
            message={labels.FORGOT_PASSWORD_USER_NOT_AVAILABLE}
          />
        )}

        <form onSubmit={this.onFormSubmit} className={className}>
          <Grid>
            {showNotification && (
              <Row>
                <Col
                  colSize={{
                    large: 12,
                    medium: 12,
                    small: 12,
                  }}
                >
                  <BodyCopy
                    fontFamily="primary"
                    fontSize="fs16"
                    textAlign="center"
                    color="black"
                    fontWeight="black"
                  >
                    Forgot your password? No worries!
                  </BodyCopy>
                </Col>
              </Row>
            )}
            {showNotification && (
              <Row>
                <Col
                  colSize={{
                    large: 12,
                    medium: 12,
                    small: 12,
                  }}
                >
                  <BodyCopy
                    fontFamily="primary"
                    fontSize="fs16"
                    textAlign="center"
                    color="black"
                    fontWeight="black"
                  >
                    {labels.FORGOT_PASSWORD_CHECK_MAIL}
                  </BodyCopy>
                  <BodyCopy fontFamily="primary" fontSize="fs12" textAlign="center" color="black">
                    {labels.FORGOT_PASSWORD_HEADING}
                  </BodyCopy>
                </Col>
              </Row>
            )}
            {!showNotification && (
              <Row fullBleed>
                <Col
                  colSize={{
                    large: 12,
                    medium: 12,
                    small: 12,
                  }}
                >
                  <Field
                    name="Email"
                    id="Email"
                    type="Email"
                    component={TextBox}
                    value={email}
                    onChange={this.changeHandler}
                  />
                </Col>
              </Row>
            )}
            {!showNotification && (
              <Row fullBleed>
                <Col
                  className="AddAddressForm__submit"
                  colSize={{ small: 4, medium: 3, large: 12 }}
                  offsetLeft={{ small: 1 }}
                >
                  <Button
                    fill="BLUE"
                    disabled={pristine}
                    type="submit"
                    buttonVariation="fixed-width"
                  >
                    {labels.FORGOT_PASSWORD_RESET_PASSWORD}
                  </Button>
                </Col>
              </Row>
            )}
            {showNotification && (
              <Button
                fill="BLUE"
                type="button"
                onClick={this.onBackClick}
                buttonVariation="fixed-width"
              >
                {labels.FORGOT_PASSWORD_RETURN_LOGIN}
              </Button>
            )}
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

const validateMethod = createValidateMethod(getStandardConfig(['Email']));

export default reduxForm({
  form: 'ForgotPasswordView',
  enableReinitialize: true,
  ...validateMethod, // a unique identifier for this form
})(withStyles(ForgotPasswordView, styles));
