import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import ModuleD from '@tcp/core/src/components/common/molecules';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    const { moduleD: data } = this.props;

    return (
      <ScrollView>
        <React.Fragment>
          <ModuleD {...data} />
        </React.Fragment>
      </ScrollView>
    );
  }
}

HomePageView.propTypes = {
  moduleD: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
};

export default errorBoundary(HomePageView);
