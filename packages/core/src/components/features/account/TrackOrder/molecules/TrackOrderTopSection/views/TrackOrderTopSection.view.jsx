import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/TrackOrderTopSection.style';

/**
 * @function TrackOrderTopSection - renders the top section for track order modal.
 * This component includes the top header view of track header modal.
 * @param {labels} labels object with labels of the header module
 * @param {className} className css to apply
 */
const TrackOrderTopSection = ({ labels, className }) => {
  return (
    <BodyCopy className={className} component="div">
      <BodyCopy
        fontSize="fs22"
        fontWeight="extrabold"
        fontFamily="secondary"
        className="trackorder__modal__overlayheading"
        component="h2"
        id="trackorder__modal__heading"
      >
        {getLabelValue(labels, 'lbl_trackOrder_header', 'trackOrder')}
      </BodyCopy>
      <BodyCopy
        fontSize="fs16"
        fontWeight="regular"
        fontFamily="secondary"
        className="trackorder__modal__overlaysubheading"
        data-locator="trackordermodal-overlaysubheading"
        component="p"
        id="trackorder__modal__subheading"
      >
        {getLabelValue(labels, 'lbl_trackOrder_subheader', 'trackOrder')}
      </BodyCopy>
    </BodyCopy>
  );
};

TrackOrderTopSection.propTypes = {
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(TrackOrderTopSection, styles);
export { TrackOrderTopSection as TrackOrderTopSectionVanilla };
