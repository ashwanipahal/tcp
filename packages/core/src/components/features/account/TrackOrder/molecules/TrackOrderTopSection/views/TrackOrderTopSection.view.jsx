import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/TrackOrderTopSection.style';

// @flow
type Props = {
  labels: object,
  className: string,
};

/**
 * @function TrackOrderTopSection - renders the top section for track order modal.
 * This component includes the top header view of track header modal.
 * @param {labels} labels object with labels of the header module
 * @param {className} className css to apply
 */
const TrackOrderTopSection = ({ labels, className }: Props) => {
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
        {labels.trackOrder.lbl_header_trackOrderOverlay_header}
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
        {labels.trackOrder.lbl_header_trackOrderOverlay_subheader}
      </BodyCopy>
    </BodyCopy>
  );
};

export default withStyles(TrackOrderTopSection, styles);
export { TrackOrderTopSection as TrackOrderTopSectionVanilla };
