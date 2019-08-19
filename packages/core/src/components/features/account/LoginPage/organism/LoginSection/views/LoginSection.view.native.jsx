import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, SafeAreaView } from 'react-native';
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
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
} from '../../../molecules/LoginForm/LoginForm.style.native';
import ModalNative from '../../../../../../common/molecules/Modal';
import CreateAccount from '../../../../CreateAccount';
import LineComp from '../../../../../../common/atoms/Line';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

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
    } = this.props;

    const { resetPassword, showModal } = this.state;
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
          <ModalNative isOpen={showModal} onRequestClose={this.toggleModal}>
            <ModalHeading>
              <BodyCopy
                mobileFontFamily={['secondary']}
                fontWeight="extrabold"
                fontSize="fs16"
                text="CREATE ACCOUNT"
              />
            </ModalHeading>
            <LineWrapper>
              <LineComp marginTop={5} borderWidth={2} borderColor="black" />
            </LineWrapper>
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
  labels: { login: { lbl_login_createAccountCTA: '', lbl_login_createAccountHelp: '' } },
};

export default withStyles(LoginSection, FormStyle);
