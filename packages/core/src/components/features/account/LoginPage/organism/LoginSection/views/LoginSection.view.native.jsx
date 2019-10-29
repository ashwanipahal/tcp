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
    } = this.props;

    const { resetPassword } = this.state;
    return (
      <View>
        {!resetPassword && (
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
