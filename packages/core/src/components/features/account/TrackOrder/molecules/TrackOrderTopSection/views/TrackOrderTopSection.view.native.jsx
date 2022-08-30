import React from 'react';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import { BodyCopy } from '../../../../../../common/atoms';
import {
  TrackOrderTopSectionView,
  TrackOrderTopHeader,
  ModalHeader,
  TrackOrderSubHeader,
  ImageWrapper,
  StyledTouchableOpacity,
  StyledCrossImage,
} from '../styles/TrackOrderTopSection.native.style';

const closeIcon = require('../../../../../../../assets/close.png');

/**
 * @function TrackOrderTopSection - renders the top section for track order modal.
 * This component includes the top header view of track header modal.
 * @param {labels} labels object with labels of the header module
 */
const TrackOrderTopSection = ({ labels, onRequestClose }) => {
  return (
    <TrackOrderTopSectionView>
      <TrackOrderTopHeader>
        <ModalHeader>
          <BodyCopy
            data-locator="trackordermodal-overlayheading"
            id="trackorder__modal__subheading"
            text={getLabelValue(labels, 'lbl_header_trackOrderOverlay_appHeader', 'trackOrder')}
            fontSize="fs16"
            fontWeight="extrabold"
          />
        </ModalHeader>
        <ImageWrapper>
          <StyledTouchableOpacity
            onPress={onRequestClose}
            accessibilityRole="button"
            accessibilityLabel="close"
          >
            <StyledCrossImage source={closeIcon} />
          </StyledTouchableOpacity>
        </ImageWrapper>
      </TrackOrderTopHeader>
      <LineComp marginTop={5} borderWidth={2} borderColor="black" />
      <TrackOrderSubHeader>
        <BodyCopy
          data-locator="trackordermodal-overlaysubheading"
          text={getLabelValue(labels, 'lbl_trackOrder_subheader', 'trackOrder')}
        />
      </TrackOrderSubHeader>
    </TrackOrderTopSectionView>
  );
};

TrackOrderTopSection.propTypes = {
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default TrackOrderTopSection;
