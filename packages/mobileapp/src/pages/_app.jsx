import React from 'react';
import { Platform, StatusBar, StyleSheet, View, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import NetInfo from '@react-native-community/netinfo';

import ThemeWrapperHOC from '../components/common/hoc/ThemeWrapper.container';
import AppNavigator from '../navigation/AppNavigator';
import AppSplash from '../navigation/AppSplash';

import { initializeStore } from '../reduxStore/store/initializeStore';
import { APP_TYPE } from '../components/common/hoc/ThemeWrapper.constants';

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export class App extends React.PureComponent {
  state = {
    isSplashVisible: true,
    // eslint-disable-next-line react/no-unused-state
    internetAvailable: false,
  };

  componentWillMount() {
    this.store = initializeStore();

    // Enable Layout animations for android
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    // Subscribe to net information status
    this.subscribeNetInfo();
  }

  componentWillUnmount() {
    // unsubscribe net info subscription from app on unmount
    this.unsubscribeNetInfo();
  }

  removeSplash = () => {
    this.setState({ isSplashVisible: false });
  };

  /**
   * @function subscribeNetInfo
   * This method checks current internet state and adds an event listener for checking if internet is available in future
   *
   * @memberof App
   */
  subscribeNetInfo = () => {
    // fetch current connection state
    NetInfo.fetch().then(connectionState => {
      this.updateConnectionState(connectionState);
    });

    // Subscribe to net info
    this.unsubscribeNetInfo = NetInfo.addEventListener(connectionState => {
      this.updateConnectionState(connectionState);
    });
  };

  /**
   * @function updateConnectionState
   * This method stores the connection state from netinfo in state
   * @param connectionState
   *
   * @memberof App
   */
  updateConnectionState = connectionState => {
    const { isConnected } = connectionState;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ internetAvailable: isConnected });
  };

  render() {
    const { appType } = this.props;
    const { isSplashVisible } = this.state;
    return (
      <Provider store={this.store}>
        <ThemeWrapperHOC appType={appType}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
            {isSplashVisible && <AppSplash appType={appType} removeSplash={this.removeSplash} />}
          </View>
        </ThemeWrapperHOC>
      </Provider>
    );
  }
}

App.propTypes = {
  appType: PropTypes.string,
};

App.defaultProps = {
  appType: APP_TYPE.TCP,
};

export default App;
