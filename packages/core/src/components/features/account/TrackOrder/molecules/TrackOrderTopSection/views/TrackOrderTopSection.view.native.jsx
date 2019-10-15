import React from 'react';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
        data-locator="trackordermodal-overlaysubheading"
        id="trackorder__modal__subheading"
        text={getLabelValue(labels, 'lbl_trackOrder_subheader', 'trackOrder')}
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
