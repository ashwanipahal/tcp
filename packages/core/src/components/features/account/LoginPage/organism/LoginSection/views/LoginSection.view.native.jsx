import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CustomButton from '../../../../../../common/atoms/Button';
import LoginForm from '../../../molecules/LoginForm';
import LoginTopSection from '../../../molecules/LoginTopSection';
import ForgotPasswordView from '../../../../ForgotPassword/views/ForgotPassword.view';
import {
  FormStyle,
  FormStyleView,
  DescriptionStyle,
} from '../../../molecules/LoginForm/LoginForm.style.native';

const colorPallete = createThemeColorPalette();
class LoginSection extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      resetPassword: false,
    };
  }

  showForgotPassword = () => {
    const { resetPassword } = this.state;
    this.setState({
      resetPassword: !resetPassword,
    });
  };

  render() {
    const {
      onSubmit,
      labels,
      loginErrorMessage,
      initialValues,
      showRecaptcha,
      loginInfo,
      getUserInfo,
      SubmitForgot,
      showNotification,
      resetLoginState,
      successFullResetEmail,
      resetForm,
      resetForgotPasswordErrorResponse,
      onCreateAccountClick,
    } = this.props;

    const { resetPassword } = this.state;
    return (
      <View>
        {!resetPassword && (
          <Fragment>
            <LoginTopSection labels={labels} />
            <LoginForm
              onSubmit={onSubmit}
              labels={labels}
              loginErrorMessage={loginErrorMessage}
              initialValues={initialValues}
              showRecaptcha={showRecaptcha}
              showForgotPasswordForm={this.showForgotPassword}
              resetForm={resetForm}
            />
          </Fragment>
        )}

        {resetPassword && (
          <ForgotPasswordView
            SubmitForgot={SubmitForgot}
            loginInfo={loginInfo}
            getUserInfo={getUserInfo}
            showNotification={showNotification}
            showForgotPasswordForm={this.showForgotPassword}
            resetForgotPasswordErrorResponse={resetForgotPasswordErrorResponse}
            labels={labels}
            resetPassword={resetPassword}
            resetLoginState={resetLoginState}
            successFullResetEmail={successFullResetEmail}
          />
        )}
        <FormStyleView>
          <DescriptionStyle>
            <Text>{labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_HELP}</Text>
          </DescriptionStyle>
          <CustomButton
            color={colorPallete.white}
            fill="BLUE"
            type="submit"
            buttonVariation="variable-width"
            data-locator=""
            text={labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_CTA}
            onClick={onCreateAccountClick}
          />
        </FormStyleView>
      </View>
    );
  }
}

LoginSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
};

LoginSection.defaultProps = {
  loginErrorMessage: '',
};

export default withStyles(LoginSection, FormStyle);
