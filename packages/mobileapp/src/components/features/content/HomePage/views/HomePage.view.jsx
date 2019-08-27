import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import { SlotA, SlotB, SlotC, SlotD, SlotE, SlotF } from '../molecules';

class HomePageView extends React.Component {
  componentDidMount() {
    this.loadBootstrapData();
  }

  componentWillReceiveProps(nextProps) {
    const { navigation: prevNav } = this.props;
    const { navigation } = nextProps;
    const prevShouldRefresh = prevNav.getParam('refresh', false);
    const shouldRefresh = navigation.getParam('refresh', false);

    // refresh page data on navigation refresh
    if (shouldRefresh && prevShouldRefresh !== shouldRefresh) {
      this.loadBootstrapData();
      navigation.setParams({ refresh: false });
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

  render() {
    const {
      slot_1: slotA,
      slot_2: slotB,
      slot_3: slotC,
      slot_4: slotD,
      slot_5: slotE,
      slot_6: slotF,
      navigation,
    } = this.props;
    return (
      <ScrollView>
        <React.Fragment>
          <Button
            fullWidth
            buttonVariation="variable-width"
            text="PLP Page"
            onPress={() => navigation.navigate('Checkout')}
          />
          {slotA && <SlotA {...slotA} navigation={navigation} />}
          {slotB && <SlotB {...slotB} navigation={navigation} />}
          {slotC && <SlotC {...slotC} navigation={navigation} />}
          {slotD && <SlotD {...slotD} navigation={navigation} />}
          {slotE && <SlotE {...slotE} navigation={navigation} />}
          {slotF && <SlotF {...slotF} navigation={navigation} />}
        </React.Fragment>
      </ScrollView>
    );
  }
}

HomePageView.propTypes = {
  slot_1: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_2: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_3: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_4: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_6: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  slot_5: PropTypes.shape({
    composites: PropTypes.shape({}),
    name: PropTypes.string,
    type: PropTypes.string,
    contentId: PropTypes.string,
  }),
  navigation: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
  appType: PropTypes.string.isRequired,
  screenProps: PropTypes.shape({}),
};

HomePageView.defaultProps = {
  slot_1: {},
  slot_2: {},
  slot_3: {},
  slot_4: {},
  slot_5: {},
  slot_6: {},
  screenProps: {},
};

export default HomePageView;
