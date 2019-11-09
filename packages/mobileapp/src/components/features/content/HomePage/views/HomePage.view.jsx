import React from 'react';
import { Linking } from 'react-native';
import queryString from 'query-string';
import { LazyloadScrollView } from 'react-native-lazyload-deux';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid/index.native';
import {
  LAZYLOAD_HOST_NAME,
  navigateToNestedRoute,
  resetNavigationStack,
  updateAPIConfigForApp,
} from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import PageSlots from '@tcp/core/src/components/common/molecules/PageSlots';
import { ENV_PREVIEW } from '@tcp/core/src/constants/env.config';
import QuickViewModal from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.container';
import {
  ModuleD,
  ModuleH,
  ModuleK,
  ModuleL,
  ModuleN,
  ModuleA,
  ModuleB,
  ModuleJ,
  ModuleR,
  ModuleQ,
  ModuleS,
} from '@tcp/core/src/components/common/molecules';
import InitialPropsHOC from '@tcp/core/src/components/common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import LoyaltyPromoBanner from '@tcp/core/src/components/common/molecules/LoyaltyPromoBanner';
import ModuleM from '@tcp/core/src/components/common/molecules/ModuleM';
import mock from '@tcp/core/src/services/abstractors/common/moduleM/mock';
import ModuleT from '@tcp/core/src/components/common/molecules/ModuleT';
import HeaderPromo from '../../../../common/molecules/HeaderPromo';
import {
  HeaderPromoContainer,
  TextComponent,
  TextInputComponent,
  ButtonComponent,
} from '../HomePage.style';
import Recommendations from '../../../../common/molecules/Recommendations';

const modulesMap = {
  moduleD: ModuleD,
  moduleH: ModuleH,
  moduleK: ModuleK,
  moduleL: ModuleL,
  moduleN: ModuleN,
  moduleA: ModuleA,
  moduleB: ModuleB,
  moduleJ: ModuleJ,
  moduleR: ModuleR,
  moduleS: ModuleS,
  moduleQ: ModuleQ,
  moduleT: ModuleT,
};

class HomePageView extends React.PureComponent<Props> {
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
    this.navigate(event.url);
  };

  renderGlobalModal = navigation => {
    return <QuickViewModal navigation={navigation} />;
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
    updateAPIConfigForApp();
    this.loadBootstrapData();
    loadNavigationData();
    resetNavigationStack(navigation);
  };

  render() {
    const {
      slots,
      navigation,
      screenProps: { apiConfig },
      headerPromo,
      loyaltyPromoBanner,
    } = this.props;
    const { value } = this.state;
    return (
      <LazyloadScrollView name={LAZYLOAD_HOST_NAME.HOME}>
        <HeaderPromoContainer>
          <HeaderPromo headerPromo={headerPromo} />
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
        <ModuleM navigation={navigation} {...mock.moduleM.composites} />
        <QuickViewModal navigation={navigation} />
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
        {this.renderGlobalModal()}
      </LazyloadScrollView>
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
