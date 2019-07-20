import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { HeaderPromo } from '@tcp/core/src/components/common/molecules/';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import { SlotA, SlotB } from '../molecules';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    const { slot_1: slotA, slot_2: slotB } = this.props;
    return (
      <ScrollView>
        <HeaderPromo />
        <React.Fragment>
          <SlotA {...slotA} />
          <SlotB {...slotB} />
        </React.Fragment>
      </ScrollView>
    );
  }
}

HomePageView.propTypes = {
  slot_1: PropTypes.shape({}).isRequired,
  slot_2: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
};

export default errorBoundary(HomePageView);
