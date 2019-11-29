import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import CreateAccounPage from '../../../organisms/CreateAccountPage';
import ForgotPasswordContainer from '../../../../ForgotPassword/container/ForgotPassword.container';
import { Styles } from '../styles/CreateAccount.style.native';
import {
  FormStyleView,
  DescriptionStyle,
} from '../../../../LoginPage/molecules/LoginForm/LoginForm.style.native';
import CustomButton from '../../../../../../common/atoms/Button';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
// @flow
type Props = {};
const colorPallete = createThemeColorPalette();

class CreateAccount extends React.Component<Props> {
  static propTypes = {
    className: PropTypes.string,
    createAccountAction: PropTypes.func,
    isIAgreeChecked: PropTypes.string,
    hideShowPwd: PropTypes.string,
    confirmHideShowPwd: PropTypes.string,
    labels: {},
    error: {},
    onAlreadyHaveAnAccountClick: PropTypes.func,
    onRequestClose: PropTypes.func,
    showLogin: PropTypes.func.isRequired,
    userplccCardNumber: PropTypes.string,
    userplccCardId: PropTypes.string,
    toastMessage: PropTypes.func,
    passwordLabels: PropTypes.shape({}).isRequired,
    updateHeader: PropTypes.func,
    showCheckoutModal: PropTypes.func,
  };

  static defaultProps = {
    isIAgreeChecked: '',
    className: '',
    confirmHideShowPwd: '',
    createAccountAction: '',
    hideShowPwd: '',
    labels: PropTypes.shape({}),
    error: {},
    onAlreadyHaveAnAccountClick: () => {},
    onRequestClose: () => {},
    userplccCardNumber: '',
    userplccCardId: '',
    toastMessage: () => {},
    updateHeader: () => {},
    showCheckoutModal: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      resetPassword: false,
    };
  }

  showForgotPasswordForm = () => {
    const { resetPassword } = this.state;
    this.setState({
      resetPassword: !resetPassword,
    });
  };

  toggleCheckoutModal = () => {
    const { showCheckoutModal } = this.props;
    showCheckoutModal();
    this.showForgotPasswordForm();
  };

  render() {
    const {
      className,
      createAccountAction,
      isIAgreeChecked,
      hideShowPwd,
      confirmHideShowPwd,
      labels,
      error,
      onAlreadyHaveAnAccountClick,
      onRequestClose,
      showLogin,
      userplccCardNumber,
      userplccCardId,
      toastMessage,
      passwordLabels,
      updateHeader,
    } = this.props;
    const { resetPassword } = this.state;
    return (
      <View className={className}>
        {!resetPassword && (
          <CreateAccounPage
            className={className}
            createAccountAction={createAccountAction}
            labels={labels}
            isIAgreeChecked={isIAgreeChecked}
            hideShowPwd={hideShowPwd}
            confirmHideShowPwd={confirmHideShowPwd}
            error={error}
            onAlreadyHaveAnAccountClick={onAlreadyHaveAnAccountClick}
            onRequestClose={onRequestClose}
            showForgotPasswordForm={this.showForgotPasswordForm}
            showLogin={showLogin}
            userplccCardNumber={userplccCardNumber}
            userplccCardId={userplccCardId}
            toastMessage={toastMessage}
            passwordLabels={passwordLabels}
          />
        )}
        {resetPassword && (
          <>
            <ForgotPasswordContainer
              showForgotPasswordForm={this.showForgotPasswordForm}
              labels={labels}
              showLogin={showLogin}
              updateHeader={updateHeader}
            />
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
          </>
        )}
      </View>
    );
  }
}

export default withStyles(CreateAccount, Styles);
export { CreateAccount as CreateAccountVanilla };
