import React from 'react';
import { View } from 'react-native';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/TrackOrderTopSection.style';

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
    <View>
      <BodyCopy
        data-locator="trackordermodal-overlaysubheading"
        id="trackorder__modal__subheading"
        text={labels.trackOrder.lbl_header_trackOrderOverlay_subheader}
      />
    </View>
  );
};

export default withStyles(TrackOrderTopSection, styles);
export { TrackOrderTopSection as TrackOrderTopSectionVanilla };
