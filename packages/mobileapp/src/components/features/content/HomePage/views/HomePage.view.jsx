import React from 'react';
import { LazyloadScrollView } from 'react-native-lazyload-deux';
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
import ModuleG from '@tcp/core/src/components/common/molecules/ModuleG/view/ModuleG.native';
import ModuleT from '@tcp/core/src/components/common/molecules/ModuleT/views/ModuleT.native';
import moduleGMock from '@tcp/core/src/services/abstractors/common/moduleG/mock';
import moduleTMock from '@tcp/core/src/services/abstractors/common/moduleT/mock';
import HeaderPromo from '../../../../common/molecules/HeaderPromo';
import { HeaderPromoContainer } from '../HomePage.style';

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
class HomePageView extends React.PureComponent<Props> {
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
      <LazyloadScrollView name={LAZYLOAD_HOST_NAME.HOME}>
        <HeaderPromoContainer>
          <HeaderPromo headerPromo={headerPromo} />
        </HeaderPromoContainer>
        <HomePageSlots slots={slots} modules={modulesMap} navigation={navigation} />
        <GetCandid apiConfig={apiConfig} navigation={navigation} />
        <Button
          text="Outfit Page"
          onPress={() =>
            navigation.navigate('OutfitDetail', {
              title: 'COMPLETE THE LOOK',
              outfitId: '151896',
              vendorColorProductIdsList: '2084546_IV-2044422_10-2009561_DB-2042327_IV',
            })
          }
          style={buttonMargin}
        />
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
