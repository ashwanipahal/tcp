import React from 'react';
import PropTypes from 'prop-types';
import SizeChart from '../views';

class SizeChartContainer extends React.PureComponent {
  render() {
    const { sizeChartDetails } = this.props;
    return <SizeChart sizeChartDetails={sizeChartDetails} />;
  }
}

SizeChartContainer.propTypes = {
  sizeChartDetails: PropTypes.string,
};

SizeChartContainer.defaultProps = {
  sizeChartDetails: '',
};

export default SizeChartContainer;
