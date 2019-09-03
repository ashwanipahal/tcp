import React from 'react';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { TrackOrderTopSectionView, ModalHeader } from '../styles/TrackOrderTopSection.native.style';

// @flow
type Props = {
  labels: object,
};

/**
 * @function TrackOrderTopSection - renders the top section for track order modal.
 * This component includes the top header view of track header modal.
 * @param {labels} labels object with labels of the header module
 */
const TrackOrderTopSection = ({ labels }: Props) => {
  return (
    <TrackOrderTopSectionView>
      <ModalHeader>
        <BodyCopy
          data-locator="trackordermodal-overlayheading"
          id="trackorder__modal__heading"
          text={labels.trackOrder.lbl_header_trackOrderOverlay_header}
        />
      </ModalHeader>
      <BodyCopy
        data-locator="trackordermodal-overlaysubheading"
        id="trackorder__modal__subheading"
        text={labels.trackOrder.lbl_header_trackOrderOverlay_subheader}
      />
    </TrackOrderTopSectionView>
  );
};

export default TrackOrderTopSection;
