import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@tcp/core/src/components/common/atoms';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid/index.native';
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
} from '@tcp/core/src/components/common/molecules';
import InitialPropsHOC from '../../../../common/hoc/InitialPropsHOC/InitialPropsHOC';

const modulesMap = {
  moduleD: ModuleD,
  moduleH: ModuleH,
  moduleK: ModuleK,
  moduleL: ModuleL,
  moduleN: ModuleN,
  moduleA: ModuleA,
  moduleB: ModuleB,
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
    } = this.props;
    return (
      <ScrollView>
        <HomePageSlots slots={slots} modules={modulesMap} navigation={navigation} />
        <ModuleB navigation={navigation} />
        <GetCandid apiConfig={apiConfig} />
        <Button
          fullWidth
          buttonVariation="variable-width"
          text="PLP Page"
          onPress={() => navigation.navigate('ProductListingPageContainer')}
          style={buttonMargin}
        />
        <ModuleJ />
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
};

HomePageView.defaultProps = {
  screenProps: {},
};

export { HomePageView };

export default InitialPropsHOC(HomePageView);
