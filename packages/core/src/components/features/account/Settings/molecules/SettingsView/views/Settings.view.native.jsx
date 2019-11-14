import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  checkNotificationPermission,
  changeNotificationSetting,
} from 'react-native-check-notification-permission';
import { Switch, AppState } from 'react-native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import AsyncStorage from '@react-native-community/async-storage';
import Prompt from '@tcp/core/src/components/common/atoms/Prompt';
import { getLabelValue } from '../../../../../../../utils';
import { Row, AboutWrapper } from '../styles/Settings.style.native';
import {
  resetTouchPassword,
  isSupportedTouch,
  getUserLoginDetails,
  setUserLoginDetails,
} from '../../../../LoginPage/container/loginUtils/keychain.utils.native';
import SETTINGS_CONSTANTS from '../../../Settings.constants';

/**
 * This component will render Settings component
 */
class SettingsView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      touchIdValue: false,
      faceIdValue: false,
      pushNotificationValue: false,
      biometryType: null,
      appState: AppState.currentState,
      promptVisible: false,
    };
    this.username = null;
    this.password = null;
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    // set default options
    const { isUserLoggedIn } = this.props;
    if (isUserLoggedIn) {
      getUserLoginDetails().then(credentials => {
        const { username, password } = credentials;
        if (username && password) {
          AsyncStorage.setItem('username', username);
          AsyncStorage.setItem('password', password);
          this.setState({
            touchIdValue: true,
            faceIdValue: true,
          });
        }
      });
    }

    isSupportedTouch().then(value => {
      // it returns true for android and touch id is enable for android
      if (value) {
        this.setState({ biometryType: SETTINGS_CONSTANTS.SETTINGS_TOUCH_ID });
      } else {
        this.setState({ biometryType: value });
      }
    });

    checkNotificationPermission().then(result => {
      this.setState({ pushNotificationValue: result });
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    const { appState } = this.state;
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      checkNotificationPermission().then(result => {
        this.setState({ pushNotificationValue: result });
      });
    }
    this.setState({ appState: nextAppState });
  };

  handleTouchId = value => {
    if (!value) {
      resetTouchPassword();
      this.setState({ touchIdValue: value });
    } else {
      this.setState({ promptVisible: true });
    }
  };

  handleFaceId = value => {
    if (!value) {
      resetTouchPassword();
      this.setState({ faceIdValue: value });
    } else {
      this.setState({ promptVisible: true });
    }
  };

  prompt = () => {
    const { labels } = this.props;
    const { promptVisible } = this.state;

    AsyncStorage.getItem('username').then(result => {
      this.username = result;
    });
    AsyncStorage.getItem('password').then(result => {
      this.password = result;
    });

    return (
      <Prompt
        title={getLabelValue(labels, 'lbl_overview_enter_password')}
        placeholder={getLabelValue(labels, 'lbl_overview_password')}
        visible={promptVisible}
        onCancel={() =>
          this.setState({
            promptVisible: false,
          })
        }
        onSubmit={value => {
          if (value === this.password) {
            this.setState({
              promptVisible: false,
            });
            setUserLoginDetails(this.username, this.password);
            this.setState({
              touchIdValue: true,
              faceIdValue: true,
            });
          }
        }}
      />
    );
  };

  render() {
    const { labels } = this.props;
    const {
      touchIdValue,
      faceIdValue,
      pushNotificationValue,
      biometryType,
      promptVisible,
    } = this.state;
    return (
      <>
        <ViewWithSpacing spacingStyles="margin-left-LRG margin-right-LRG">
          {biometryType && biometryType === SETTINGS_CONSTANTS.SETTINGS_TOUCH_ID && (
            <Row>
              <BodyCopy
                fontSize="fs13"
                fontFamily="secondary"
                fontWeight="regular"
                text={getLabelValue(labels, 'lbl_overview_touch_id')}
              />
              <Switch value={touchIdValue} onValueChange={value => this.handleTouchId(value)} />
            </Row>
          )}
          {biometryType && biometryType === SETTINGS_CONSTANTS.SETTINGS_FACE_ID && (
            <Row>
              <BodyCopy
                fontSize="fs13"
                fontFamily="secondary"
                fontWeight="regular"
                text={getLabelValue(labels, 'lbl_overview_face_id')}
              />
              <Switch value={faceIdValue} onValueChange={value => this.handleFaceId(value)} />
            </Row>
          )}
          <Row>
            <BodyCopy
              fontSize="fs13"
              fontFamily="secondary"
              fontWeight="regular"
              text={getLabelValue(labels, 'lbl_overview_push_notifications')}
            />
            <Switch
              value={pushNotificationValue}
              onValueChange={() => changeNotificationSetting()}
            />
          </Row>
          <AboutWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="bold"
              color="gray.900"
              text={getLabelValue(labels, 'lbl_overview_about')}
            />
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              color="gray.900"
              text={getLabelValue(labels, 'lbl_overview_app_version')}
            />
          </AboutWrapper>
          {promptVisible && this.prompt()}
        </ViewWithSpacing>
      </>
    );
  }
}

SettingsView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default SettingsView;
