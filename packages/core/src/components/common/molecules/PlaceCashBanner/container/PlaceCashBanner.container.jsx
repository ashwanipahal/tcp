import { connect } from 'react-redux';
import {
  getPlaceCashBannerLabels,
  getIsPlaceCashEnabled,
  getPlaceDetailsContent,
} from './PlaceCashBanner.selectors';
import PlaceCashBanner from '../views/PlaceCashBanner.view';

export const mapStateToProps = (state, ownProps) => {
  const isEnabled = getIsPlaceCashEnabled(state);

  const formattedPlaceCashLabels = getPlaceCashBannerLabels(state, ownProps.isOrderConfirmation);
  const showDetailsRichText = getPlaceDetailsContent(state);
  const updatedLabels = {
    ...formattedPlaceCashLabels,
    SHOW_DETAILS_RICH_TEXT: showDetailsRichText,
  };

  return {
    labels: updatedLabels,
    isEnabled,
  };
};

export default connect(mapStateToProps)(PlaceCashBanner);
