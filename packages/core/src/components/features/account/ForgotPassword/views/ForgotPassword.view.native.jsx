import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { View } from 'react-native';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  FormStyle,
  FormStyleView,
} from '../../LoginPage/molecules/LoginForm/LoginForm.style.native';
import TextBox from '../../../../common/atoms/TextBox';
import styles from '../styles/ForgotPassword.style';
import CustomButton from '../../../../common/atoms/Button';
import Anchor from '../../../../common/atoms/Anchor';
import createValidateMethod from '../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import Notification from '../../../../common/molecules/Notification/views/Notification.native';
import LineComp from '../../../../common/atoms/Line';
import {
  HeadingStyle,
  SubHeadingStyle,
  ForgotHeadingStyle,
  ForgotDescriptionStyle,
} from '../../LoginPage/molecules/LoginTopSection/LoginTopSection.style.native';

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
  /* eslint-disable */
  render() {
    const {
      pristine,
      className,
      showNotification,
      resetForgotPasswordErrorResponse,
      handleSubmit,
      labels,
      successFullResetEmail,
    } = this.props;
    const errorObject =
      resetForgotPasswordErrorResponse && resetForgotPasswordErrorResponse.get('errors');
    const { email } = this.state;
    return (
      <View className={className}>
        <FormStyleView className="border">
          <Anchor
            fontSizeVariation="xlarge"
            anchorVariation="secondary"
            text={labels.FORGOT_PASSWORD_BACK_LOGIN}
            customStyle={styles.forgotPasswordStyle}
            onPress={this.onBackClick}
          />
          {errorObject && showNotification && (
            <Notification
              status="error"
              colSize={{ large: 11, medium: 7, small: 6 }}
              message={labels.FORGOT_PASSWORD_USER_NOT_AVAILABLE}
            />
          )}
          {!successFullResetEmail && (
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
                onChange={this.changeHandler}
              />
              <CustomButton
                color="#FFFFFF"
                fill="BLUE"
                text={labels.FORGOT_PASSWORD_RESET_PASSWORD}
                buttonVariation="variable-width"
                customStyle={styles.createAccountStyle}
                onPress={handleSubmit(this.onFormSubmit)}
              />
            </React.Fragment>
          )}

          {successFullResetEmail && (
            <React.Fragment>
              <HeadingStyle>{labels.FORGOT_PASSWORD_HEADING}</HeadingStyle>
              <SubHeadingStyle>{labels.FORGOT_PASSWORD_HEADING}</SubHeadingStyle>
              <CustomButton
                color="#FFFFFF"
                fill="BLUE"
                text={labels.FORGOT_PASSWORD_RETURN_LOGIN}
                buttonVariation="variable-width"
                customStyle={styles.createAccountStyle}
                onPress={this.onBackClick}
              />
            </React.Fragment>
          )}
          <LineComp marginTop={28} />
        </FormStyleView>
      </View>
    );
  }
}

const validateMethod = createValidateMethod(getStandardConfig(['Email']));

export default reduxForm({
  form: 'ForgotPasswordView',
  enableReinitialize: true,
  ...validateMethod, // a unique identifier for this form
})(withStyles(ForgotPasswordView, FormStyle));
export { ForgotPasswordView as ForgotPasswordViewVanilla };
