import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import { SlotA, SlotB, SlotC, SlotD } from '../molecules';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    const { slot_1: slotA, slot_2: slotB, slot_3: slotC, slot_4: slotD } = this.props;

    return (
      <ScrollView>
        <React.Fragment>
          <SlotA {...slotA} />
          <SlotB {...slotB} />
          <SlotC {...slotC} />
          <SlotD {...slotD} />
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
};

export default errorBoundary(HomePageView);
