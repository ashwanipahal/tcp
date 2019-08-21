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
            <span className="left-arrow"> </span>
            {labels.password.lbl_forgotPassword_backLogin}
          </Anchor>
        </div>
        <form
          onSubmit={handleSubmit(this.onFormSubmit)}
          className={`${className} forgot-password-form`}
        >
          {showNotification && (
            <Notification
              status="error"
              colSize={{ large: 11, medium: 7, small: 6 }}
              message={
                errorObject
                  ? labels.password.lbl_forgotPassword_userNotAvailable
                  : labels.password.lbl_forgotPassword_apiError
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
                <span className="forgot-password-text">
                  {labels.password.lbl_forgotPassword_content1}
                </span>
                <span>{labels.password.lbl_forgotPassword_content3}</span>
              </BodyCopy>
              <BodyCopy
                fontWeight="semibold"
                fontFamily="secondary"
                textAlign="center"
                className="elem-mb-SM"
                fontSize="fs12"
              >
                {labels.password.lbl_forgotPassword_content2}
              </BodyCopy>
              <BodyCopy component="div" className="elem-mb-LRG">
                <Field
                  name="Email"
                  placeholder={labels.password.lbl_forgotPassword_emailAddress}
                  id="Email"
                  type="text"
                  component={TextBox}
                  value={email}
                />
              </BodyCopy>
              <Button fill="BLUE" disabled={pristine} type="submit" buttonVariation="fixed-width">
                {labels.password.lbl_forgotPassword_resetPassword}
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
                {labels.password.lbl_forgotPassword_checkMail}
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
                  richTextHtml={labels.password.lbl_forgotPassword_heading}
                  dataLocator="forgot-password"
                />

                <RichText
                  className="heading-link"
                  richTextHtml={labels.password.lbl_forgotPassword_subHeading}
                  dataLocator="forgot-password"
                />
              </BodyCopy>
              <Button
                fill="BLUE"
                type="button"
                onClick={this.onBackClick}
                buttonVariation="fixed-width"
              >
                {labels.password.lbl_forgotPassword_returnLogin}
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
