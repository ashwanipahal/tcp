import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import { ModuleD, ModuleH } from '@tcp/core/src/components/common/molecules';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    const { slot_1: slot1Data, slot_2: slot2Data } = this.props;

    return (
      <ScrollView>
        <React.Fragment>
          <ModuleH {...slot2Data} />
          <ModuleD {...slot1Data} />
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
