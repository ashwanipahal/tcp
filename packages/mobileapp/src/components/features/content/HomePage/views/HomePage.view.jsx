// @flow
import React from 'react';
import { ScrollView } from 'react-native';
// import {LazyloadScrollView} from 'react-native-lazyload-deux';
import { Button } from '@tcp/core/src/components/common/atoms';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid/index.native';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';
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

const buttonMargin = { margin: 30 };
class HomePageView extends React.PureComponent {
  componentDidMount() {
    this.loadBootstrapData();

    const { loadNavigationData } = this.props;
    loadNavigationData();
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

  render() {
    const {
      slots,
      navigation,
      screenProps: { apiConfig },
      headerPromo,
    } = this.props;
    return (
      <ScrollView name={LAZYLOAD_HOST_NAME.HOME}>
        {/* <HeaderPromoContainer>
          <HeaderPromo headerPromo={headerPromo} />
        </HeaderPromoContainer> */}
        {/* <HomePageSlots slots={slots} modules={modulesMap} navigation={navigation} /> */}
        {/* <GetCandid apiConfig={apiConfig} navigation={navigation} /> */}
        {/* <Button
          fullWidth
          buttonVariation="variable-width"
          text="PLP Page"
          onPress={() => navigation.navigate('ProductListingPageContainer')}
          style={buttonMargin}
        /> */}
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
