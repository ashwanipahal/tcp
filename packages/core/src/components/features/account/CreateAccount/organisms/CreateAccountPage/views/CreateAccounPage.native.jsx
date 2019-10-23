import React from 'react';
import { View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import { Styles } from '../styles/CreateAccounPage.style.native';
import CreateAccountForm from '../../../molecules/CreateAccountForm';
import CreateAccountTopSection from '../../../molecules/CreateAccountTopSection';
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
    userplccCardNumber: PropTypes.string,
    userplccCardId: PropTypes.string,
    toastMessage: PropTypes.func,
  };

  static defaultProps = {
    createAccountAction: () => {},
    labels: PropTypes.shape({}),
    isIAgreeChecked: false,
    onRequestClose: () => {},
    showForgotPasswordForm: () => {},
    error: {},
    userplccCardNumber: '',
    userplccCardId: '',
    toastMessage: () => {},
  };

  constructor(props) {
    super(props);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.state = { hideShowPwd: false, confirmHideShowPwd: false, getTouchStatus: false };
    this.onPwdHideShowClick = this.onPwdHideShowClick.bind(this);
    this.onConfirmPwdHideShowClick = this.onConfirmPwdHideShowClick.bind(this);
    isSupportedTouch().then(biometryType => {
      this.setState({ getTouchStatus: biometryType });
    });
  }

  componentDidUpdate() {
    const { error, toastMessage } = this.props;
    if (error) {
      toastMessage(error);
    }
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
      showForgotPasswordForm,
      showLogin,
      userplccCardNumber,
      userplccCardId,
    } = this.props;
    const { hideShowPwd, confirmHideShowPwd, getTouchStatus } = this.state;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        {...this.props}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <CreateAccountTopSection
            showForgotPasswordForm={showForgotPasswordForm}
            labels={labels}
            showLogin={showLogin}
          />

          <CreateAccountForm
            getTouchStatus={getTouchStatus}
            labels={labels}
            handleSubmitForm={this.handleSubmitForm}
            onPwdHideShowClick={this.onPwdHideShowClick}
            hideShowPwd={hideShowPwd}
            onConfirmPwdHideShowClick={this.onConfirmPwdHideShowClick}
            confirmHideShowPwd={confirmHideShowPwd}
            isIAgreeChecked={isIAgreeChecked}
            onRequestClose={onRequestClose}
            showLogin={showLogin}
            userplccCardNumber={userplccCardNumber}
            userplccCardId={userplccCardId}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withStyles(CreateAccounPage, Styles);
export { CreateAccounPage as CreateAccounPageVanilla };
