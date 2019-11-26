import React from 'react';
import SizeChart from '../views';

class SizeChartContainer extends React.PureComponent {
  render() {
    const { sizeChartDetails } = this.props;
    return <SizeChart sizeChartDetails={sizeChartDetails} />;
  }
}

export default SizeChartContainer;
