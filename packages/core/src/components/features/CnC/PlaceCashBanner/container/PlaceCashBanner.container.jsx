import { connect } from 'react-redux';
import PlaceCashSelector from './PlaceCashBanner.selectors';
import PlaceCashBanner from '../views/PlaceCashBanner.view';

export const mapStateToProps = (state, ownProps) => {
  const isEnabled = PlaceCashSelector.getIsPlaceCashEnabled(state);
  const formattedPlaceCashLabels = PlaceCashSelector.getPlaceCashBannerLabels(
    state,
    ownProps.isOrderConfirmation
  );

  return {
    labels: formattedPlaceCashLabels,
    isEnabled,
  };
};

export default connect(mapStateToProps)(PlaceCashBanner);
