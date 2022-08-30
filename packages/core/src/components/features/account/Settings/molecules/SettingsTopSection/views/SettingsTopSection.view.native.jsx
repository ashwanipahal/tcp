import React from 'react';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import { BodyCopy } from '../../../../../../common/atoms';
import {
  SettingsTopSectionView,
  SettingsTopHeader,
  ModalHeader,
  ImageWrapper,
  StyledTouchableOpacity,
  StyledCrossImage,
} from '../styles/SettingsTopSection.style.native';

const closeIcon = require('../../../../../../../assets/close.png');

const SettingsTopSection = ({ labels, onRequestClose }) => {
  return (
    <SettingsTopSectionView>
      <SettingsTopHeader>
        <ModalHeader>
          <BodyCopy
            text={getLabelValue(labels, 'lbl_overview_app_settings_title')}
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
      </SettingsTopHeader>
      <LineComp marginTop={5} borderWidth={2} borderColor="black" />
    </SettingsTopSectionView>
  );
};

SettingsTopSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default SettingsTopSection;
