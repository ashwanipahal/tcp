import React from 'react';
import { ScrollView } from 'react-native';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/BagPage/organisms/OrderLedger';
import PropTypes from 'prop-types';
import { SlotA, SlotB, SlotC } from '../molecules';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    const { slot_1: slotA, slot_2: slotB, slot_3: slotC, navigation } = this.props;

    return (
      <ScrollView>
        <React.Fragment>
          <OrderLedgerContainer />
          <SlotA {...slotA} navigation={navigation} />
          <SlotB {...slotB} navigation={navigation} />
          <SlotC {...slotC} navigation={navigation} />
        </React.Fragment>
      </ScrollView>
    );
  }
}

HomePageView.propTypes = {
  slot_1: PropTypes.shape({}).isRequired,
  slot_2: PropTypes.shape({}).isRequired,
  slot_3: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default HomePageView;
