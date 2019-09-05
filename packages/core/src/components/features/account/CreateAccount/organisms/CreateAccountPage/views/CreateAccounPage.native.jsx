import React from 'react';
import { View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import { Styles, ErrorWrapper } from '../styles/CreateAccounPage.style.native';
import CreateAccountForm from '../../../molecules/CreateAccountForm';
import CreateAccountTopSection from '../../../molecules/CreateAccountTopSection';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import {
  setUserLoginDetails,
  resetTouchPassword,
  touchIDCheck,
  isSupportedTouch,
} from '../../../../LoginPage/container/loginUtils/keychain.utils.native';

class CreateAccounPage extends React.Component {
  static propTypes = {
    createAccountAction: PropTypes.func,
    labels: {},
    isIAgreeChecked: PropTypes.bool,
    onRequestClose: PropTypes.func,
    error: PropTypes.string,
    showForgotPasswordForm: PropTypes.func,
    showLogin: PropTypes.func.isRequired,
  };

  static defaultProps = {
    createAccountAction: () => {},
    labels: PropTypes.shape({}),
    isIAgreeChecked: false,
    onRequestClose: () => {},
    showForgotPasswordForm: () => {},
    error: {},
  };

  constructor(props) {
    super(props);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.state = { hideShowPwd: false, confirmHideShowPwd: false };
    this.onPwdHideShowClick = this.onPwdHideShowClick.bind(this);
    this.onConfirmPwdHideShowClick = this.onConfirmPwdHideShowClick.bind(this);
  }

  onPwdHideShowClick = value => {
    this.setState({ hideShowPwd: value });
  };

  onConfirmPwdHideShowClick = value => {
    this.setState({ confirmHideShowPwd: value });
  };

  // when account is cceate handle submit will submit the form
  handleSubmitForm(payload) {
    const { createAccountAction } = this.props;
    createAccountAction(payload);
    resetTouchPassword();
    setUserLoginDetails(payload.emailAddress, payload.password);
    isSupportedTouch().then(biometryType => {
      if ((biometryType && payload.useTouchID) || payload.useFaceID) {
        touchIDCheck();
      }
    });
  }

  render() {
    const {
      labels,
      isIAgreeChecked,
      onRequestClose,
      error,
      showForgotPasswordForm,
      showLogin,
    } = this.props;
    const { hideShowPwd, confirmHideShowPwd } = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false} {...this.props}>
        <View>
          <CreateAccountTopSection
            showForgotPasswordForm={showForgotPasswordForm}
            labels={labels}
            showLogin={showLogin}
          />
          {!!error && (
            <ErrorWrapper>
              <BodyCopy
                mobileFontFamily={['secondary']}
                fontWeight="semibold"
                fontSize="fs12"
                color="error"
                text={error}
              />
            </ErrorWrapper>
          )}
          <CreateAccountForm
            labels={labels}
            handleSubmitForm={this.handleSubmitForm}
            onPwdHideShowClick={this.onPwdHideShowClick}
            hideShowPwd={hideShowPwd}
            onConfirmPwdHideShowClick={this.onConfirmPwdHideShowClick}
            confirmHideShowPwd={confirmHideShowPwd}
            isIAgreeChecked={isIAgreeChecked}
            onRequestClose={onRequestClose}
            showLogin={showLogin}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withStyles(CreateAccounPage, Styles);
export { CreateAccounPage as CreateAccounPageVanilla };
