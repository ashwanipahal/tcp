import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import { Text } from 'react-native';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    return <Text>Hello App.</Text>;
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
  getBootstrapData: PropTypes.func.isRequired,
};

HomePageView.defaultProps = {
  slot_1: {},
  slot_2: {},
};

export default errorBoundary(HomePageView);
