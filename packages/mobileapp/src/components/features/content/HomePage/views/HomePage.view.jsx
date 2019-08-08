import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import ModuleN from '@tcp/core/src/components/common/molecules/ModuleN/views/ModuleN.native';
import { SlotA, SlotB, SlotC, SlotD } from '../molecules';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    const { slot_1: slotA, slot_2: slotB, slot_3: slotC, slot_4: slotD, navigation } = this.props;

    return (
      <ScrollView>
        <React.Fragment>
          <ModuleN navigation={navigation} />
          <SlotA {...slotA} navigation={navigation} />
          <SlotB {...slotB} navigation={navigation} />
          <SlotC {...slotC} navigation={navigation} />
          <SlotD {...slotD} navigation={navigation} />
        </React.Fragment>
      </ScrollView>
    );
  }
}

HomePageView.propTypes = {
  slot_1: PropTypes.shape({}).isRequired,
  slot_2: PropTypes.shape({}).isRequired,
  slot_3: PropTypes.shape({}).isRequired,
  slot_4: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default HomePageView;
