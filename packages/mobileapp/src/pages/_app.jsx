import React from 'react';
import { Platform, StatusBar, StyleSheet, View, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import NetworkProvider from '@tcp/core/src/components/common/hoc/NetworkProvider.app';
import { createAPIConfig, switchAPIConfig, resetApiConfig } from '@tcp/core/src/utils';
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

export class App extends React.PureComponent {
  state = {
    isSplashVisible: true,
    showBrands: false,
    apiConfig: null,
  };

  componentWillMount() {
    this.store = initializeStore();
    const { appType } = this.props;

    // create and save api configs for tcp and gymboree in app
    updateBrandName(appType);
    const apiConfig = createAPIConfig(env, appType);
    this.setState({ apiConfig });

    // Enable Layout animations for android
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
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
    this.setState({ showBrands: !showBrands });
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
          <ThemeWrapperHOC appType={appType} switchBrand={this.switchBrand}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator
                screenProps={{ toggleBrandAction: this.toggleBrandAction, apiConfig }}
              />
              {isSplashVisible && <AppSplash appType={appType} removeSplash={this.removeSplash} />}
              {showBrands && <AnimatedBrandChangeIcon toggleBrandAction={this.toggleBrandAction} />}
            </View>
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
