// @flow
import React from 'react';
import { ScrollView, Linking, View } from 'react-native';
// import { Box, Text } from '@fabulas/astly';
// import {LazyloadScrollView} from 'react-native-lazyload-deux';
import { Button } from '@tcp/core/src/components/common/atoms';

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
import RichText from '@tcp/core/src/components/common/atoms/RichText/views/RichText.native';

const source = `
<style>
.header-loyalty-banner-wrapper {
  height: 23px;
  display: flex;
  justify-content: space-between;
}

.header-loyalty-banner-wrapper__item {
  display: flex;
  align-items: center;
}

.header-loyalty-banner-wrapper__divider {
  width: 1px;
  height: 100%;
  background-color: #d8d8d8;
  margin: 0 8px;
}

.header-loyalty-banner-wrapper__text-content {
  font-family: Arial;
  font-size: 12px;
  text-align: center;
  color: #d8d8d8;
}

.content-3X {
  width: auto;
  font-size: 22px;
  font-weight: bold;
  padding: 0 8px;
}

.the-my-place-rewards {
  width: 240px;
  font-size: 10px;
  line-height: 1.04;
  text-align: left;
  padding-right: 15px;
}

.header-loyalty-banner-wrapper__img {
  height: 100%;
  margin-right: 4px;
}
.header-loyalty-banner-wrapper__img img {
  height: 100%;
}

@media (max-width: 767px) {
  .hide-on-mobile {
    display: none;
  }
}

@media (min-width: 768px) {
  .header-loyalty-banner-wrapper__divider {
    margin: 0 14px;
  }
  .the-my-place-rewards {
    width: 320px;
    font-size: 13px;
  }
  .header-loyalty-banner-wrapper__img {
    height: 23px;
    margin-right: 4px;
  }
}

@media (min-width: 1200px) {

  .header-loyalty-banner-wrapper__divider {
    margin: 0 22px;
  }
  .header-loyalty-banner-wrapper {
    height: 45px;
  }
  .header-loyalty-banner-wrapper__text-content {
    font-size: 22px;
  }

  .content-3X {
    font-size: 58px;
  }

  .the-my-place-rewards {
    width: 570px;
    font-size: 22px;
  }
  .header-loyalty-banner-wrapper__img {
    height: 44px;
    margin-right: 8px;
  }

}
  </style>


<div class="header-loyalty-banner-wrapper">
  <div class="header-loyalty-banner-wrapper__item hide-on-mobile">
    <div class="header-loyalty-banner-wrapper__text-content">
      BONUS POINTS EVENTS
    </div>
  </div>

  <div class="header-loyalty-banner-wrapper__divider hide-on-mobile"></div>

  <div class="header-loyalty-banner-wrapper__item hide-on-mobile">
    <div class="header-loyalty-banner-wrapper__text-content">
      MARCH 7-APRIL 21, 2020
    </div>
  </div>
  <div class="header-loyalty-banner-wrapper__divider hide-on-mobile"></div>
  <div class="header-loyalty-banner-wrapper__item">
    <div class="header-loyalty-banner-wrapper__img">
          <img src="https://test5.childrensplace.com/image/upload//v1571658182/tcp-loyality.png" alt="Rewards">
    </div>
    <div class="header-loyalty-banner-wrapper__text-content content-3X">
        3X
  </div>
  <div class="header-loyalty-banner-wrapper__text-content the-my-place-rewards">
  THE MY PLACE REWARDS POINTS
ON ALL EASTER DRESS UPS & MATCHING FAMILY STYLES
</div>

  </div>

</div>
`;

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

const buttonMargin = { margin: 30 };
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

  handleOpenURL = event => {
    // this.navigate(event.url);
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
        <LoyaltyPromoBanner richTextList={loyaltyPromoBanner} />
        <PageSlots slots={slots} modules={modulesMap} navigation={navigation} />
        <GetCandid apiConfig={apiConfig} navigation={navigation} />
        <Recommendations
          navigation={navigation}
          showButton
          variation="moduleO,moduleP"
          page="homepageTest"
        />
        <RichText source={source} isNativeView />
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
};

HomePageView.defaultProps = {
  screenProps: {},
};

export { HomePageView };

export default InitialPropsHOC(HomePageView);
