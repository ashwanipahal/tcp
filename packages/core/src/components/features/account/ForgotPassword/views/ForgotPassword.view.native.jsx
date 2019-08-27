import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import {
  FormStyle,
  FormStyleView,
  HeadingStyle,
  SubHeadingStyle,
  SubHeadingSectionStyle,
  ForgotHeadingStyle,
  ForgotDescriptionStyle,
  FloatWrapper,
} from '../../LoginPage/molecules/LoginForm/LoginForm.style.native';
import TextBox from '../../../../common/atoms/TextBox';
import styles from '../styles/ForgotPassword.style';
import CustomButton from '../../../../common/atoms/Button';
import Anchor from '../../../../common/atoms/Anchor';
import createValidateMethod from '../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import Notification from '../../../../common/molecules/Notification/views/Notification.native';
import LineComp from '../../../../common/atoms/Line';

const colorPallete = createThemeColorPalette();
class ForgotPasswordView extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  // Form submit user will submit the form with email id with right format else formsubmit will not trigger
  //  due to ( redux form )
  onFormSubmit = formData => {
    const { SubmitForgot } = this.props;
    SubmitForgot({
      logonId: formData.Email.toUpperCase().trim(),
    });
  };

  // onclick back button user will redirect to the login page
  onBackClick = () => {
    const { showLogin } = this.props;
    showLogin();
  };

  // inital state of forgot password reset email form
  showResetEmailSection = () => {
    const { labels, handleSubmit } = this.props;
    const { email } = this.state;
    return (
      <React.Fragment>
        <ForgotHeadingStyle>{`Forgot your password? \n No worries!`}</ForgotHeadingStyle>
        <ForgotDescriptionStyle>
          {labels.password.lbl_forgotPassword_content2}
        </ForgotDescriptionStyle>

        <Field
          label="Email Address"
          name="Email"
          id="Email"
          type="Email"
          component={TextBox}
          value={email}
        />
        <CustomButton
          color={colorPallete.white}
          fill="BLUE"
          text={labels.password.lbl_forgotPassword_resetPassword}
          buttonVariation="variable-width"
          customStyle={styles.createAccountStyle}
          onPress={handleSubmit(this.onFormSubmit)}
        />
      </React.Fragment>
    );
  };

  // section visible if user will get the email successfully
  showSuccessullEmail = () => {
    const { labels } = this.props;
    return (
      <React.Fragment>
        <HeadingStyle>{labels.password.lbl_forgotPassword_checkMail}</HeadingStyle>
        <SubHeadingStyle>{labels.password.lbl_forgotPassword_heading}</SubHeadingStyle>
        <SubHeadingSectionStyle>
          {labels.password.lbl_forgotPassword_subHeading}
        </SubHeadingSectionStyle>
        <CustomButton
          color={colorPallete.white}
          fill="BLUE"
          text={labels.password.lbl_forgotPassword_returnLogin}
          buttonVariation="variable-width"
          customStyle={styles.createAccountStyle}
          onPress={this.onBackClick}
        />
      </React.Fragment>
    );
  };

  render() {
    const {
      showNotification,
      resetForgotPasswordErrorResponse,
      labels,
      successFullResetEmail,
    } = this.props;
    const errorObject =
      resetForgotPasswordErrorResponse && resetForgotPasswordErrorResponse.get('errors');
    return (
      <View>
        <FormStyleView>
          <FloatWrapper>
            <Anchor
              fontSizeVariation="xlarge"
              anchorVariation="secondary"
              text={labels.password.lbl_forgotPassword_backLogin}
              customStyle={styles.forgotPasswordStyle}
              onPress={this.onBackClick}
              className="floatLt"
            />
          </FloatWrapper>
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
          {successFullResetEmail ? this.showSuccessullEmail() : this.showResetEmailSection()}
          <LineComp marginTop={28} />
        </FormStyleView>
      </View>
    );
  }
}

ForgotPasswordView.propTypes = {
  SubmitForgot: PropTypes.string.isRequired,
  showNotification: PropTypes.string.isRequired,
  resetForgotPasswordErrorResponse: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
  successFullResetEmail: PropTypes.string.isRequired,
  handleSubmit: PropTypes.string.isRequired,
};

const validateMethod = createValidateMethod(getStandardConfig(['Email']));

export default reduxForm({
  form: 'ForgotPasswordView',
  enableReinitialize: true,
  ...validateMethod, // a unique identifier for this form
})(withStyles(ForgotPasswordView, FormStyle));
export { ForgotPasswordView as ForgotPasswordViewVanilla };
