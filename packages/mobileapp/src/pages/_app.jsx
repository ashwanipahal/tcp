import React from 'react';
import { StatusBar, StyleSheet, UIManager, Platform } from 'react-native';
import { Box } from '@fabulas/astly';
import { Provider } from 'react-redux';

import { PropTypes } from 'prop-types';
import NetworkProvider from '@tcp/core/src/components/common/hoc/NetworkProvider.app';
import { createAPIConfig, switchAPIConfig, resetApiConfig, isAndroid } from '@tcp/core/src/utils';
import { getUserInfo } from '@tcp/core/src/components/features/account/User/container/User.actions';
import env from 'react-native-config';
// eslint-disable-next-line
import ReactotronConfig from './Reactotron';

import ThemeWrapperHOC from '../components/common/hoc/ThemeWrapper.container';
import AppNavigator from '../navigation/AppNavigator';
import AppSplash from '../navigation/AppSplash';
import { initializeStore } from '../reduxStore/store/initializeStore';
import { APP_TYPE } from '../components/common/hoc/ThemeWrapper.constants';
import AnimatedBrandChangeIcon from '../components/common/atoms/AnimatedBrandChangeIcon/AnimatedBrandChangeIcon.container';
import { updateBrandName } from '../utils/utils';

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

const { store } = initializeStore();

export class App extends React.PureComponent {
  state = {
    isSplashVisible: true,
    showBrands: false,
    apiConfig: null,
  };

  UNSAFE_componentWillMount() {
    this.store = store;
    const { appType } = this.props;
    console.log(this.props);

    // create and save api configs for tcp and gymboree in app
    updateBrandName(appType);
    const apiConfig = createAPIConfig(env, appType);
    this.setState({ apiConfig });

    // Enable Layout animations for android
    if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    this.store.dispatch(getUserInfo());
  }

  removeSplash = () => {
    this.setState({ isSplashVisible: false });
  };

  /**
   * @function toggleBrandAction
   * This method toggles showBrands value in state, on the basis of which brand switch option is displayed on screen
   *
   * @memberof App
   */
  toggleBrandAction = () => {
    const { showBrands } = this.state;
    this.setState({ showBrands: !showBrands }, () => {
      this.store.dispatch(getUserInfo());
    });
  };
  /**
   * @function switchBrand
   * This methods current app type in utils and switches apiConfig in app
   *
   * @memberof App
   */

  switchBrand = appType => {
    resetApiConfig();
    updateBrandName(appType);
    const apiConfig = switchAPIConfig(env);
    this.setState({ apiConfig });
  };

  render() {
    const { appType } = this.props;
    const { isSplashVisible, showBrands, apiConfig } = this.state;
    return (
      <Provider store={this.store}>
        <NetworkProvider>
          <ThemeWrapperHOC appType={appType || 'gym'} switchBrand={this.switchBrand}>
            <Box style={styles.container}>
              {Platform.OS === 'ios' ? (
                <StatusBar barStyle="default" />
              ) : (
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
              )}

              <AppNavigator
                screenProps={{
                  toggleBrandAction: this.toggleBrandAction,
                  apiConfig,
                }}
              />
              {isSplashVisible && <AppSplash appType={appType} removeSplash={this.removeSplash} />}
              {showBrands && <AnimatedBrandChangeIcon toggleBrandAction={this.toggleBrandAction} />}
            </Box>
          </ThemeWrapperHOC>
        </NetworkProvider>
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
