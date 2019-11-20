import { connect } from 'react-redux';
import PlaceCashSelector from './PlaceCashBanner.selectors';
import PlaceCashBanner from '../views/PlaceCashBanner.view';

export const mapStateToProps = (state, ownProps) => {
  const isEnabled = PlaceCashSelector.getIsPlaceCashEnabled(state);
  const { isOrderConfirmation, className } = ownProps;
  const formattedPlaceCashLabels = PlaceCashSelector.getPlaceCashBannerLabels(
    state,
    isOrderConfirmation,
    isEnabled
  );

  return {
    labels: formattedPlaceCashLabels,
    isEnabled,
    className,
  };
};

export default connect(mapStateToProps)(PlaceCashBanner);
