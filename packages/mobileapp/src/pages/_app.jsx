import React from 'react';
import { StatusBar, StyleSheet, UIManager, Platform } from 'react-native';
import { Box } from '@fabulas/astly';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';
import CookieManager from 'react-native-cookies';
import AsyncStorage from '@react-native-community/async-storage';
import { PropTypes } from 'prop-types';
import NetworkProvider from '@tcp/core/src/components/common/hoc/NetworkProvider.app';
import { SetTcpSegmentMethodCall } from '@tcp/core/src/reduxStore/actions';
import { initAppErrorReporter } from '@tcp/core/src/utils/errorReporter.util.native';
import {
  createAPIConfig,
  switchAPIConfig,
  resetApiConfig,
  isAndroid,
  getAPIConfig,
} from '@tcp/core/src/utils';
import Loader from '@tcp/core/src/components/common/molecules/Loader';
import { getUserInfo } from '@tcp/core/src/components/features/account/User/container/User.actions';
import env from 'react-native-config';
// eslint-disable-next-line
import ReactotronConfig from './Reactotron';
import ThemeWrapperHOC from '../components/common/hoc/ThemeWrapper.container';
import AppNavigator from '../navigation/AppNavigator';
import NavigationService from '../navigation/NavigationService';
import AppSplash from '../navigation/AppSplash';
import { initializeStore } from '../reduxStore/store/initializeStore';
import { APP_TYPE } from '../components/common/hoc/ThemeWrapper.constants';
import AnimatedBrandChangeIcon from '../components/common/atoms/AnimatedBrandChangeIcon/AnimatedBrandChangeIcon.container';
import { updateBrandName } from '../utils/utils';
import {
  AppProvider,
  store,
  useInfoState,
  usePermissionState,
  useLocationState,
  useErrorReporter,
} from '../context';
import { getOnNavigationStateChange } from '../navigation/helpers';
import constants from '../constants/config.constants';
import { UrbanAirship } from 'urbanairship-react-native';

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

  /* eslint-disable-next-line */
  UNSAFE_componentWillMount() {
    this.store = store;
    const { appType } = this.props;

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
    if (Platform.OS === 'ios') {
      this.setCooKies();
    } else {
      this.store.dispatch(getUserInfo());
    }

    UrbanAirship.setUserNotificationsEnabled(true);
    const { apiConfig } = this.state;
    const { RAYGUN_API_KEY, brandId, RWD_APP_VERSION, isErrorReportingActive } = apiConfig;
    codePush.sync({ installMode: codePush.InstallMode.ON_NEXT_RESUME });
    this.store.dispatch(SetTcpSegmentMethodCall()); // this method needs to be exposed and will be called by Adobe target if required. and in fututr a payload neess to be passed in it , for reference please check _app.jsx of web.
    if (isErrorReportingActive) {
      initAppErrorReporter({
        isDevelopment: false,
        raygunApiKey: RAYGUN_API_KEY,
        appType: brandId,
        envId: RWD_APP_VERSION,
      });
    }
  }

  setCooKies = () => {
    const date = new Date();
    const daysAlive = constants.DAYS_ALIVE;
    const expiration = date.setTime(date.getTime() + daysAlive * 24 * 60 * 60 * 1000);
    const { host } = getAPIConfig();

    AsyncStorage.getAllKeys().then(keys => {
      AsyncStorage.multiGet(keys).then(items => {
        const promises = [];
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < items.length; index++) {
          const item = items[index];
          if (item[0].startsWith('WC_')) {
            const cookie = {
              path: '/',
              value: item[1],
              domain: host,
              name: item[0],
              origin: host,
              version: '1',
              expiration,
            };
            promises.push(CookieManager.set(cookie));
          }
        }

        Promise.all(promises).then(() => {
          this.store.dispatch(getUserInfo());
        });
      });
    });
  };

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
      if (Platform.OS === 'ios') {
        this.setCooKies();
      } else {
        this.store.dispatch(getUserInfo());
      }
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
    const { appType, context } = this.props;
    const { isSplashVisible, showBrands, apiConfig } = this.state;
    return (
      <ThemeWrapperHOC appType={appType} switchBrand={this.switchBrand}>
        <Box style={styles.container}>
          {Platform.OS === 'ios' ? (
            <StatusBar barStyle="default" />
          ) : (
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
          )}

          <AppNavigator
            {...getOnNavigationStateChange(this.store)}
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            screenProps={{
              toggleBrandAction: this.toggleBrandAction,
              apiConfig,
            }}
          />
          {isSplashVisible && <AppSplash appType={appType} removeSplash={this.removeSplash} />}
          {showBrands && <AnimatedBrandChangeIcon toggleBrandAction={this.toggleBrandAction} />}
        </Box>
      </ThemeWrapperHOC>
    );
  }
}

App.propTypes = {
  appType: PropTypes.string,
  navigation: PropTypes.shape({}).isRequired,
};

App.defaultProps = {
  appType: APP_TYPE.TCP,
};

App = codePush(App);

function RenderApp(props) {
  const info = useInfoState();
  const { permissions, request, ...rest } = usePermissionState();
  const location = useLocationState();
  const error = useErrorReporter();
  const context = {
    ...info,
    permissions: { ...rest },
    location,
    error,
  };
  // console.log(context);
  const { appName } = context.device;
  const appType = appName === 'Gymboree' ? 'gymboree' : 'tcp';

  return <App context={context} appType={appType} {...props} />;
}

export default props => {
  return (
    <AppProvider>
      <RenderApp {...props} />
    </AppProvider>
  );
};
