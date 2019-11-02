import React from 'react';
import { Linking } from 'react-native';
import queryString from 'query-string';
import { LazyloadScrollView } from 'react-native-lazyload-deux';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid/index.native';
import { LAZYLOAD_HOST_NAME, navigateToNestedRoute } from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import HomePageSlots from '@tcp/core/src/components/common/molecules/HomePageSlots';

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
import moduleGMock from '@tcp/core/src/services/abstractors/common/moduleG/mock';
import moduleTMock from '@tcp/core/src/services/abstractors/common/moduleT/mock';
import ModuleG from '@tcp/core/src/components/common/molecules/ModuleG';
import ModuleT from '@tcp/core/src/components/common/molecules/ModuleT';
import HeaderPromo from '../../../../common/molecules/HeaderPromo';
import { HeaderPromoContainer } from '../HomePage.style';
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
};

class HomePageView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      handeOpenURLRegister: false,
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
        modules: ['labels'],
      },
      apiConfig
    );
  };

  handleOpenURL = event => {
    this.navigate(event.url);
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

  render() {
    const {
      slots,
      navigation,
      screenProps: { apiConfig },
      headerPromo,
    } = this.props;
    return (
      <LazyloadScrollView name={LAZYLOAD_HOST_NAME.HOME}>
        <HeaderPromoContainer>
          <HeaderPromo headerPromo={headerPromo} />
        </HeaderPromoContainer>
        <HomePageSlots slots={slots} modules={modulesMap} navigation={navigation} />
        <GetCandid apiConfig={apiConfig} navigation={navigation} />
        <Recommendations navigation={navigation} showButton variation="moduleO,moduleP" />
        <ModuleG navigation={navigation} {...moduleGMock.moduleG.composites} />
        <ModuleT navigation={navigation} {...moduleTMock.moduleT.composites} />
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
