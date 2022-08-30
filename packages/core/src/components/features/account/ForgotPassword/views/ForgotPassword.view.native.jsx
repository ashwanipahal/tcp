import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  FormStyle,
  HeadingStyle,
  SubHeadingStyle,
  SubHeadingSectionStyle,
  ForgotHeadingStyle,
  ForgotDescriptionStyle,
  FloatWrapper,
  CustomIconWrapper,
  ForgotPasswordWrapper,
} from '../../LoginPage/molecules/LoginForm/LoginForm.style.native';
import TextBox from '../../../../common/atoms/TextBox';
import styles from '../styles/ForgotPassword.style';
import CustomButton from '../../../../common/atoms/Button';
import Anchor from '../../../../common/atoms/Anchor';
import createValidateMethod from '../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import LineComp from '../../../../common/atoms/Line';
import CustomIcon from '../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../common/atoms/Icon/Icon.constants';

const colorPallete = createThemeColorPalette();
class ForgotPasswordView extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  componentDidUpdate() {
    const { showNotification, labels, resetForgotPasswordErrorResponse, toastMessage } = this.props;
    const errorObject =
      resetForgotPasswordErrorResponse && resetForgotPasswordErrorResponse.get('errors');
    if (showNotification) {
      toastMessage(
        errorObject
          ? getLabelValue(labels, 'lbl_forgotPassword_userNotAvailable', 'password')
          : getLabelValue(labels, 'lbl_forgotPassword_apiError', 'password')
      );
    }
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
    const { showForgotPasswordForm, showLogin } = this.props;
    showForgotPasswordForm();
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
          {getLabelValue(labels, 'lbl_forgotPassword_content2', 'password')}
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
          text={getLabelValue(labels, 'lbl_forgotPassword_resetPassword', 'password')}
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
        <HeadingStyle>
          {getLabelValue(labels, 'lbl_forgotPassword_checkMail', 'password')}
        </HeadingStyle>
        <SubHeadingStyle>
          {getLabelValue(labels, 'lbl_forgotPassword_heading', 'password')}
        </SubHeadingStyle>
        <SubHeadingSectionStyle>
          {getLabelValue(labels, 'lbl_forgotPassword_subHeading', 'password')}
        </SubHeadingSectionStyle>
        <CustomButton
          fill="BLUE"
          text={getLabelValue(labels, 'lbl_forgotPassword_returnLogin', 'password')}
          buttonVariation="variable-width"
          customStyle={styles.createAccountStyle}
          onPress={this.onBackClick}
        />
      </React.Fragment>
    );
  };

  render() {
    const { labels, successFullResetEmail, updateHeader } = this.props;
    if (updateHeader) updateHeader(); // remove the header and border line of the modal
    return (
      <View>
        <ForgotPasswordWrapper>
          <FloatWrapper>
            <CustomIconWrapper>
              <CustomIcon
                name={ICON_NAME.chevronLeft}
                size="fs14"
                color="blue.800"
                isButton
                onPress={() => this.onBackClick()}
              />
            </CustomIconWrapper>
            <Anchor
              fontSizeVariation="xlarge"
              anchorVariation="secondary"
              text={getLabelValue(labels, 'lbl_forgotPassword_backLogin', 'password')}
              customStyle={styles.forgotPasswordStyle}
              onPress={this.onBackClick}
              className="floatLt"
            />
          </FloatWrapper>
          {successFullResetEmail ? this.showSuccessullEmail() : this.showResetEmailSection()}
          <LineComp marginTop={28} />
        </ForgotPasswordWrapper>
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
  toastMessage: PropTypes.func,
};

ForgotPasswordView.defaultProps = {
  toastMessage: () => {},
};

const validateMethod = createValidateMethod(getStandardConfig(['Email']));

export default reduxForm({
  form: 'ForgotPasswordView',
  enableReinitialize: true,
  ...validateMethod, // a unique identifier for this form
})(withStyles(ForgotPasswordView, FormStyle));
export { ForgotPasswordView as ForgotPasswordViewVanilla };
