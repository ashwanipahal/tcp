import React from 'react';
import { LazyloadScrollView } from 'react-native-lazyload-deux';
import { Button } from '@tcp/core/src/components/common/atoms';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid/index.native';
import { redirectToBilling } from '@tcp/core/src/components/features/CnC/Checkout/util/utility';
import { LAZYLOAD_HOST_NAME } from '@tcp/core/src/utils';

import PropTypes from 'prop-types';
import HomePageSlots from '@tcp/core/src/components/common/molecules/HomePageSlots';
import moduleJMock from '@tcp/core/src/components/common/molecules/ModuleJ/mock';

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
} from '@tcp/core/src/components/common/molecules';
import InitialPropsHOC from '../../../../common/hoc/InitialPropsHOC/InitialPropsHOC';
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
};

const buttonMargin = { margin: 30 };
class HomePageView extends React.PureComponent<Props> {
  componentDidMount() {
    this.loadData();
  }

  /**
   * @function loadData
   * Loads bootstrap data
   *
   * @memberof HomePageView
   */
  loadData = () => {
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
        <Button
          fullWidth
          buttonVariation="variable-width"
          text="PLP Page"
          onPress={() => navigation.navigate('ProductListingPageContainer')}
          style={buttonMargin}
        />
        <Button
          fullWidth
          buttonVariation="variable-width"
          text="GoTOBilling"
          onPress={() => navigation.navigate('CheckoutBilling')}
          style={buttonMargin}
        />
        <HeaderPromoContainer>
          <HeaderPromo headerPromo={headerPromo} />
        </HeaderPromoContainer>
        <HomePageSlots slots={slots} modules={modulesMap} navigation={navigation} />
        <GetCandid apiConfig={apiConfig} navigation={navigation} />

        <ModuleJ navigation={navigation} {...moduleJMock.moduleJ.composites} />

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
};

HomePageView.defaultProps = {
  screenProps: {},
};

export { HomePageView };

export default InitialPropsHOC(HomePageView);
