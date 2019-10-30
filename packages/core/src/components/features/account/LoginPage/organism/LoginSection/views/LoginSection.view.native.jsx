import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import CustomButton from '../../../../../../common/atoms/Button';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import LoginForm from '../../../molecules/LoginForm';
import LoginTopSection from '../../../molecules/LoginTopSection';
import ForgotPasswordView from '../../../../ForgotPassword/views/ForgotPassword.view';
import ResetPassword from '../../../../ResetPassword';
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
      newPassword: false,
    };
    this.queryParams = {};
  }

  componentDidUpdate() {
    this.navigateToResetPassword();
  }

  navigateToResetPassword = () => {
    try {
      const { navigation } = this.props;
      const {
        state: {
          params: { component, logonPasswordOld, em },
        },
      } = navigation;
      if (component && component === 'change-password') {
        this.showNewPassword();
        this.queryParams = {
          logonPasswordOld,
          em,
        };
        navigation.setParams({ component: null, logonPasswordOld: null, em: null }); // reset the params
      }
    } catch (e) {
      // nested variable might not available always
    }
  };

  toggleCheckoutModal = () => {
    const { showCheckoutModal } = this.props;
    showCheckoutModal();
  };

  showForgotPassword = () => {
    const { resetPassword } = this.state;
    this.setState({
      resetPassword: !resetPassword,
    });
  };

  showNewPassword = () => {
    const { newPassword, resetPassword } = this.state;
    this.setState({
      newPassword: !newPassword,
    });
    if (resetPassword) this.showForgotPassword(); // if user is on forgot password then dismiss it
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
      handleContinueAsGuest,
      loginError,
      showLogin,
      setEmailid,
      getTouchStatus,
      userplccCardNumber,
      userplccCardId,
      updateHeader,
      toastMessage,
      resetChangePasswordState,
    } = this.props;

    const { resetPassword, newPassword } = this.state;

    return (
      <View>
        {!resetPassword && !newPassword && (
          <Fragment>
            <LoginTopSection
              showForgotPasswordForm={this.showForgotPassword}
              variation={variation}
              labels={labels}
              updateHeader={updateHeader}
            />
            <LoginForm
              getTouchStatus={getTouchStatus}
              setEmailid={setEmailid}
              onSubmit={onSubmit}
              labels={labels}
              loginError={loginError}
              loginErrorMessage={loginErrorMessage}
              initialValues={initialValues}
              showRecaptcha={showRecaptcha}
              showForgotPasswordForm={this.showForgotPassword}
              resetForm={resetForm}
              variation={variation}
              navigation={navigation}
              handleContinueAsGuest={handleContinueAsGuest}
              userplccCardNumber={userplccCardNumber}
              userplccCardId={userplccCardId}
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
            showLogin={showLogin}
            updateHeader={updateHeader}
            toastMessage={toastMessage}
          />
        )}

        {newPassword && (
          <ResetPassword
            labels={labels.password}
            queryParams={this.queryParams}
            showLogin={showLogin}
            showNewPassword={this.showNewPassword}
            updateHeader={updateHeader}
            resetChangePasswordState={resetChangePasswordState}
          />
        )}
        <FormStyleView>
          <DescriptionStyle>
            <BodyCopy
              fontFamily="secondary"
              fontWeight="regular"
              fontSize="fs12"
              color="gray.900"
              text={getLabelValue(labels, 'lbl_login_createAccountHelp_1', 'login')}
            />
            <BodyCopy
              fontFamily="secondary"
              fontWeight="regular"
              fontSize="fs12"
              color="gray.900"
              text={getLabelValue(labels, 'lbl_login_createAccountHelp_2', 'login')}
            />
          </DescriptionStyle>
          <CustomButton
            color={colorPallete.text.secondary}
            fill="WHITE"
            type="submit"
            data-locator=""
            text={getLabelValue(labels, 'lbl_login_createAccountCTA', 'login')}
            onPress={this.toggleCheckoutModal}
          />
        </FormStyleView>
      </View>
    );
  }
}

LoginSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  userplccCardNumber: PropTypes.string,
  userplccCardId: PropTypes.string,
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
  userplccCardNumber: '',
  userplccCardId: '',
};

export default withStyles(LoginSection, FormStyle);
