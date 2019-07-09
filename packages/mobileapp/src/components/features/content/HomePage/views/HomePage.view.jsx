import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    return <Text>Home Page</Text>;
  }
}

HomePageView.propTypes = {
  getBootstrapData: PropTypes.func.isRequired,
};

export default errorBoundary(HomePageView);
