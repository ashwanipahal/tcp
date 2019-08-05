import React from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import TextBox from '../../../../common/atoms/TextBox';
import styles from '../styles/ForgotPassword.style';
import Anchor from '../../../../common/atoms/Anchor';
import RichText from '../../../../common/atoms/RichText';
import Button from '../../../../common/atoms/Button';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import createValidateMethod from '../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import Notification from '../../../../common/molecules/Notification';

// @flow
type Props = {
  pristine: any,
  className: any,
  SubmitForgot: Object => void,
  showNotification: any,
  showForgotPasswordForm: any,
  resetForgotPasswordErrorResponse: any,
  labels: any,
  resetLoginState: any,
  successFullResetEmail: any,
  handleSubmit: string,
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

  onFormSubmit = formData => {
    const { SubmitForgot } = this.props;
    SubmitForgot({
      logonId: formData.Email.toUpperCase().trim(),
    });
  };

  onBackClick = e => {
    e.preventDefault();
    const { showForgotPasswordForm, resetLoginState } = this.props;
    resetLoginState();
    showForgotPasswordForm();
  };

  render() {
    const {
      pristine,
      className,
      showNotification,
      resetForgotPasswordErrorResponse,
      labels,
      successFullResetEmail,
      handleSubmit,
    } = this.props;
    const errorObject =
      resetForgotPasswordErrorResponse && resetForgotPasswordErrorResponse.get('errors');
    const { email } = this.state;
    return (
      <React.Fragment className={className}>
        <div>
          <Anchor
            onClick={this.onBackClick}
            className="elem-pb-SM"
            fontSizeVariation="xlarge"
            anchorVariation="secondary"
            to="/account?id=address-book"
            data-locator="addnewaddress-back"
          >
            {labels.FORGOT_PASSWORD_BACK_LOGIN}
          </Anchor>
        </div>
        <form onSubmit={handleSubmit(this.onFormSubmit)} className={className}>
          {showNotification && (
            <Notification
              status="error"
              colSize={{ large: 11, medium: 7, small: 6 }}
              message={
                errorObject
                  ? labels.FORGOT_PASSWORD_USER_NOT_AVAILABLE
                  : labels.FORGOT_PASSWORD_API_ERROR
              }
            />
          )}

          {!successFullResetEmail && (
            <React.Fragment>
              <BodyCopy
                fontSize="fs16"
                fontWeight="extrabold"
                color="gray.700"
                fontFamily="secondary"
                textAlign="center"
              >
                {labels.FORGOT_PASSWORD_CONTENT_1}
              </BodyCopy>
              <BodyCopy
                fontWeight="semibold"
                fontFamily="secondary"
                textAlign="center"
                className="elem-mb-SM"
                fontSize="fs12"
              >
                {labels.FORGOT_PASSWORD_CONTENT_2}
              </BodyCopy>
              <BodyCopy component="div" className="elem-mb-LRG">
                <Field
                  name="Email"
                  placeholder="Email"
                  id="Email"
                  type="text"
                  component={TextBox}
                  value={email}
                />
              </BodyCopy>
              <Button fill="BLUE" disabled={pristine} type="submit" buttonVariation="fixed-width">
                {labels.FORGOT_PASSWORD_RESET_PASSWORD}
              </Button>
            </React.Fragment>
          )}

          {successFullResetEmail && (
            <React.Fragment>
              <BodyCopy
                fontSize="fs16"
                fontWeight="extrabold"
                fontFamily="secondary"
                textAlign="center"
              >
                {labels.FORGOT_PASSWORD_CHECK_MAIL}
              </BodyCopy>

              <BodyCopy
                fontWeight="semibold"
                fontFamily="secondary"
                textAlign="center"
                className="elem-mb-SM"
                fontSize="fs12"
              >
                <RichText
                  className="heading-link"
                  richTextHtml={labels.FORGOT_PASSWORD_HEADING}
                  dataLocator="forgot-password"
                />
              </BodyCopy>
              <Button
                fill="BLUE"
                type="button"
                onClick={this.onBackClick}
                buttonVariation="fixed-width"
              >
                {labels.FORGOT_PASSWORD_RETURN_LOGIN}
              </Button>
            </React.Fragment>
          )}
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
export { ForgotPasswordView as ForgotPasswordViewVanilla };
