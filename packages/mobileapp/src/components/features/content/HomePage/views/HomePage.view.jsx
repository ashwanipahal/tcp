import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import ModuleD from '@tcp/core/src/components/common/molecules/ModuleD/view/ModuleD.native';

class HomePageView extends React.Component {
  componentDidMount() {
    const { getBootstrapData } = this.props;
    getBootstrapData({ name: 'homepage' });
  }

  render() {
    const { moduleD: data } = this.props;

    return <ModuleD {...data} />;
  }
}

HomePageView.propTypes = {
  moduleD: PropTypes.shape({}).isRequired,
  getBootstrapData: PropTypes.func.isRequired,
};

export default errorBoundary(HomePageView);
