import React from 'react';
import { PropTypes } from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { TrackOrderTopSectionView } from '../styles/TrackOrderTopSection.native.style';

/**
 * @function TrackOrderTopSection - renders the top section for track order modal.
 * This component includes the top header view of track header modal.
 * @param {labels} labels object with labels of the header module
 */
const TrackOrderTopSection = ({ labels }) => {
  return (
    <TrackOrderTopSectionView>
      <BodyCopy
        data-locator="trackordermodal-overlayheading"
        id="trackorder__modal__heading"
        mobileFontFamily="secondary"
        fontSize="fs22"
        fontWeight="extrabold"
        text={labels.trackOrder.lbl_trackOrder_header}
      />
      <BodyCopy
        data-locator="trackordermodal-overlaysubheading"
        id="trackorder__modal__subheading"
        text={labels.trackOrder.lbl_trackOrder_subheader}
      />
    </TrackOrderTopSectionView>
  );
};

TrackOrderTopSection.propTypes = {
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
};

export default TrackOrderTopSection;
