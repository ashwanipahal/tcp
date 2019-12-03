// @flow
import React from 'react';
import { ScrollView, Linking, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
// import { Box, Text } from '@fabulas/astly';
// import {LazyloadScrollView} from 'react-native-lazyload-deux';

import queryString from 'query-string';

import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid/index.native';
import {
  LAZYLOAD_HOST_NAME,
  navigateToNestedRoute,
  resetNavigationStack,
} from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import PageSlots from '@tcp/core/src/components/common/molecules/PageSlots';
import { ENV_PREVIEW } from '@tcp/core/src/constants/env.config';
import QuickViewModal from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.container';
import UserOnBoardingScreen from '@tcp/core/src/components/common/molecules/UserOnboardingScreen/container';
import {
  ModuleD,
  ModuleH,
  ModuleK,
  ModuleL,
  ModuleM,
  ModuleN,
  ModuleA,
  ModuleB,
  ModuleJ,
  ModuleR,
  ModuleQ,
  ModuleS,
  ModuleE,
  ModuleG,
} from '@tcp/core/src/components/common/molecules';
import LocationAccessPrompt from '@tcp/core/src/components/common/molecules/LocationAccess';
// import mockS from '@tcp/core/src/services/abstractors/common/moduleS/mock-v1';
import InitialPropsHOC from '@tcp/core/src/components/common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import LoyaltyPromoBanner from '@tcp/core/src/components/common/molecules/LoyaltyPromoBanner';
import ModuleT from '@tcp/core/src/components/common/molecules/ModuleT';
import AddedToBagContainer from '@tcp/core/src/components/features/CnC/AddedToBag';
import HeaderPromo from '../../../../common/molecules/HeaderPromo';
import {
  HeaderPromoContainer,
  TextComponent,
  TextInputComponent,
  ButtonComponent,
} from '../HomePage.style';
import Recommendations from '../../../../common/molecules/Recommendations';
import withErrorBoundary from '../../../../common/hoc/ErrorBoundary';

const modulesMap = {
  moduleD: ModuleD,
  moduleH: ModuleH,
  moduleK: ModuleK,
  moduleL: ModuleL,
  moduleM: ModuleM,
  moduleN: ModuleN,
  moduleA: ModuleA,
  moduleB: ModuleB,
  moduleJ: ModuleJ,
  moduleR: ModuleR,
  moduleS: ModuleS,
  moduleQ: ModuleQ,
  moduleT: ModuleT,
  moduleE: ModuleE,
  moduleG: ModuleG,
};

const modulesMapWithErrorBoundary = Object.keys(modulesMap).reduce((modulesMapObj, key) => {
  const modulesMapWithErrorsBoundary = modulesMapObj;
  const Module = modulesMap[key];
  modulesMapWithErrorsBoundary[key] = props => withErrorBoundary(Module)(props);
  return modulesMapWithErrorsBoundary;
}, {});

class HomePageView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.submitDate = this.submitDate.bind(this);
    this.state = {
      handeOpenURLRegister: false,
      value: '',
    };
  }

  componentDidMount() {
    this.loadBootstrapData();

    const { loadNavigationData } = this.props;
    loadNavigationData();
    const { handeOpenURLRegister } = this.state;

    if (!handeOpenURLRegister) {
      this.setState({ handeOpenURLRegister: true });
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
    this.setState({ handeOpenURLRegister: false });
  }

  static getDerivedStateFromProps(props) {
    const {
      navigation,
      screenProps: {
        network: { isConnected },
      },
    } = props;
    if (navigation && !isConnected) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'NoInternet' })],
      });
      navigation.dispatch(resetAction);
    }
  }

  /**
   * @function loadBootstrapData
   * Loads bootstrap data
   *
   * @memberof HomePageView
   */
  loadBootstrapData = () => {
    const {
      getBootstrapData,
      screenProps: { apiConfig },
    } = this.props;
    getBootstrapData(
      {
        name: 'homepage',
        modules: ['labels', 'header'],
      },
      apiConfig
    );
  };

  renderGlobalModal = (navigation, isUserLoggedIn, labels) => {
    return (
      <View>
        <QuickViewModal navigation={navigation} />
        <AddedToBagContainer navigation={navigation} />
        <LocationAccessPrompt
          navigation={navigation}
          isUserLoggedIn={isUserLoggedIn}
          labels={labels}
        />
      </View>
    );
  };

  navigate = url => {
    const { navigation } = this.props;
    if (url) {
      const parsedURL = queryString.parseUrl(url);
      if (parsedURL && parsedURL.url.indexOf('change-password') !== -1) {
        const {
          query: { logonPasswordOld, em },
        } = parsedURL;

        const oldPassword = logonPasswordOld.replace(/\s/g, '+');

        navigateToNestedRoute(navigation, 'AccountStack', 'Account', {
          component: 'change-password',
          logonPasswordOld: oldPassword,
          em,
        });
      }
    }
  };

  /**
   * @function submitDate
   * Submit date for scheduled preview and it
   * will be submitted to graphql along with query
   *
   * @memberof HomePageView
   */
  submitDate = () => {
    const { loadNavigationData, navigation, updatePreviewDate } = this.props;
    const { value } = this.state;
    updatePreviewDate(value);
    this.loadBootstrapData();
    loadNavigationData();
    resetNavigationStack(navigation);
  };

  render() {
    const {
      slots,
      navigation,
      screenProps: { apiConfig },
      loyaltyPromoBanner,
      isUserLoggedIn,
      labels,
      headerPromo,
      promoHtmlBannerCarousel,
    } = this.props;
    const { value } = this.state;

    return (
      <ScrollView name={LAZYLOAD_HOST_NAME.HOME}>
        <HeaderPromoContainer>
          <HeaderPromo
            headerPromo={headerPromo}
            promoHtmlBannerCarousel={promoHtmlBannerCarousel}
          />
        </HeaderPromoContainer>
        {loyaltyPromoBanner.length > 0 && <LoyaltyPromoBanner richTextList={loyaltyPromoBanner} />}
        <PageSlots slots={slots} modules={modulesMapWithErrorBoundary} navigation={navigation} />
        {/* <ModuleS {...mockS.moduleS.composites} /> */}
        <GetCandid apiConfig={apiConfig} navigation={navigation} />
        <Recommendations
          navigation={navigation}
          showButton
          variation="moduleO,moduleP"
          page="homepageTest"
        />
        {apiConfig.previewEnvId === ENV_PREVIEW ? (
          <>
            <TextComponent>Select scheduled preview date</TextComponent>
            <TextInputComponent
              placeholder="Type date here"
              onChangeText={text => this.setState({ value: text })}
              value={value}
              keyboardType="default"
            />
            <ButtonComponent
              fill="BLUE"
              type="submit"
              color="white"
              text="Submit"
              width="40%"
              onPress={this.submitDate}
            />
          </>
        ) : null}
        {this.renderGlobalModal(navigation, isUserLoggedIn, labels)}
        <UserOnBoardingScreen navigation={navigation} />
      </ScrollView>
    );
  }
}

HomePageView.propTypes = {
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      contentId: PropTypes.string,
      data: PropTypes.shape({}),
      moduleName: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
  screenProps: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  loadNavigationData: PropTypes.func,
  updatePreviewDate: PropTypes.func,
  loyaltyPromoBanner: PropTypes.shape([]),
  isUserLoggedIn: PropTypes.bool,
  headerPromo: PropTypes.shape({}),
  promoHtmlBannerCarousel: PropTypes.shape([]),
};

HomePageView.defaultProps = {
  screenProps: {},
  loadNavigationData: () => {},
  updatePreviewDate: () => {},
  loyaltyPromoBanner: [],
  isUserLoggedIn: false,
  headerPromo: {},
  promoHtmlBannerCarousel: [],
};

export { HomePageView };

export default InitialPropsHOC(HomePageView);
