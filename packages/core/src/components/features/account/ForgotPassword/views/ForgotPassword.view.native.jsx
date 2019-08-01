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

  onFormSubmit = formData => {
    const { SubmitForgot } = this.props;
    SubmitForgot({
      logonId: formData.Email.toUpperCase().trim(),
    });
  };

  onBackClick = () => {
    const { showForgotPasswordForm, resetLoginState } = this.props;
    resetLoginState();
    showForgotPasswordForm();
  };

  showResetEmailSection = () => {
    const { labels, handleSubmit } = this.props;
    const { email } = this.state;
    return (
      <React.Fragment>
        <ForgotHeadingStyle>{labels.FORGOT_PASSWORD_CONTENT_1}</ForgotHeadingStyle>
        <ForgotDescriptionStyle>{labels.FORGOT_PASSWORD_CONTENT_2}</ForgotDescriptionStyle>

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
          text={labels.FORGOT_PASSWORD_RESET_PASSWORD}
          buttonVariation="variable-width"
          customStyle={styles.createAccountStyle}
          onPress={handleSubmit(this.onFormSubmit)}
        />
      </React.Fragment>
    );
  };

  showSuccessullEmail = () => {
    const { labels } = this.props;
    return (
      <React.Fragment>
        <HeadingStyle>{labels.FORGOT_PASSWORD_HEADING}</HeadingStyle>
        <SubHeadingStyle>{labels.FORGOT_PASSWORD_HEADING}</SubHeadingStyle>
        <CustomButton
          color={colorPallete.white}
          fill="BLUE"
          text={labels.FORGOT_PASSWORD_RETURN_LOGIN}
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
              text={labels.FORGOT_PASSWORD_BACK_LOGIN}
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
                  ? labels.FORGOT_PASSWORD_USER_NOT_AVAILABLE
                  : labels.FORGOT_PASSWORD_API_ERROR
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
  showForgotPasswordForm: PropTypes.string.isRequired,
  resetForgotPasswordErrorResponse: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
  resetLoginState: PropTypes.string.isRequired,
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
