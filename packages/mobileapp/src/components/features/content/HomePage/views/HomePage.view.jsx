import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import HomePageSlots from '@tcp/core/src/components/common/molecules/HomePageSlots';
import {
  ModuleD,
  ModuleH,
  ModuleK,
  ModuleL,
  ModuleN,
  ModuleA,
} from '@tcp/core/src/components/common/molecules';
import InitialPropsHOC from '../../../../common/hoc/InitialPropsHOC/InitialPropsHOC';

const modulesMap = {
  moduleD: ModuleD,
  moduleH: ModuleH,
  moduleK: ModuleK,
  moduleL: ModuleL,
  moduleN: ModuleN,
  moduleA: ModuleA,
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
    const { slots, navigation } = this.props;

    return (
      <ScrollView>
        <HomePageSlots slots={slots} modules={modulesMap} navigation={navigation} />
        <Button
          fullWidth
          buttonVariation="variable-width"
          text="PLP Page"
          onPress={() => navigation.navigate('ProductListingPageContainer')}
          style={buttonMargin}
        />
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
