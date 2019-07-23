import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { SlotA, SlotB } from '../molecules';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    const { slot_1: slotA, slot_2: slotB } = this.props;
    const { navigation } = this.props;
    return (
      <ScrollView>
        <React.Fragment>
          <Anchor
            url="https://www.google.com/p/Rainbow--The-Birthday-Girl--Graphic-Tee"
            navigation={navigation}
            text="click Me"
          />
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
  navigation: PropTypes.node,
};

HomePageView.defaultProps = {
  navigation: null,
};

export default errorBoundary(HomePageView);
