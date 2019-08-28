import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, SafeAreaView } from 'react-native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CustomButton from '../../../../../../common/atoms/Button';
import LoginForm from '../../../molecules/LoginForm';
import LoginTopSection from '../../../molecules/LoginTopSection';
import ForgotPasswordView from '../../../../ForgotPassword/views/ForgotPassword.view';
import ToastView from '../../../../../../../../../mobileapp/src/components/common/atoms/Toast/views/Toast.view';
import {
  FormStyle,
  FormStyleView,
  DescriptionStyle,
  ModalViewWrapper,
} from '../../../molecules/LoginForm/LoginForm.style.native';
import ModalNative from '../../../../../../common/molecules/Modal';
import CreateAccount from '../../../../CreateAccount';

const colorPallete = createThemeColorPalette();
class LoginSection extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      resetPassword: false,
      showModal: false,
    };
  }

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

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
      navigation,
      variation,
      loginError,
    } = this.props;

    const { resetPassword, showModal } = this.state;
    return (
      <View>
        {!resetPassword && (
          <Fragment>
            <ToastView loginError={loginError} loginErrorMessage={loginErrorMessage} />
            <LoginTopSection variation={variation} labels={labels} />
            <LoginForm
              onSubmit={onSubmit}
              labels={labels}
              loginError={loginError}
              loginErrorMessage={loginErrorMessage}
              initialValues={initialValues}
              showRecaptcha={showRecaptcha}
              showForgotPasswordForm={this.showForgotPassword}
              resetForm={resetForm}
              variation={variation}
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
            <Text>{labels.login.lbl_login_createAccountHelp_1}</Text>
            <Text>{labels.login.lbl_login_createAccountHelp_2}</Text>
          </DescriptionStyle>
          <CustomButton
            color={colorPallete.text.secondary}
            fill="WHITE"
            type="submit"
            buttonVariation="variable-width"
            data-locator=""
            text={labels.login.lbl_login_createAccountCTA}
            onPress={this.toggleModal}
          />
        </FormStyleView>
        {showModal && (
          <ModalNative
            heading="CREATE ACCOUNT"
            isOpen={showModal}
            onRequestClose={this.toggleModal}
          >
            <SafeAreaView>
              <ModalViewWrapper>
                <CreateAccount navigation={navigation} onRequestClose={this.toggleModal} />
              </ModalViewWrapper>
            </SafeAreaView>
          </ModalNative>
        )}
      </View>
    );
  }
}

LoginSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
};

LoginSection.defaultProps = {
  loginErrorMessage: '',
  labels: {
    login: {
      lbl_login_createAccountCTA: '',
      lbl_login_createAccountHelp: '',
      lbl_login_createAccountHelp_1: 'Don\u0027t have an account? Create one now to',
      lbl_login_createAccountHelp_2: 'start earning points!',
    },
  },
};

export default withStyles(LoginSection, FormStyle);
