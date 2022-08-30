import { connect } from 'react-redux';
import { getLabelValue } from '@tcp/core/src/utils';
import CarouselView from '../views';

const mapStateToProps = state => {
  return {
    labels: {
      accessibility: {
        ariaNext: getLabelValue(state.Labels, 'nextIconButton', 'accessibility', 'global'),
        ariaPrevious: getLabelValue(state.Labels, 'previousButton', 'accessibility', 'global'),
      },
    },
  };
};

export default connect(mapStateToProps)(CarouselView);
