import React from 'react';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import { RichText } from '../../../../common/atoms';
import { RichTextContainer } from '../styles/PlaceCashBanner.style.native';

class PlaceCashDetailsModal extends React.PureComponent<Props> {
  render() {
    const { openState, onRequestClose, labels, heading } = this.props;
    return (
      <ModalNative
        isOpen={openState}
        onRequestClose={onRequestClose}
        heading={heading}
        headingFontFamily="secondary"
        fontSize="fs16"
      >
        <RichTextContainer>
          <RichText source={{ html: labels.SHOW_DETAILS_RICH_TEXT }} />
        </RichTextContainer>
      </ModalNative>
    );
  }
}

export default PlaceCashDetailsModal;
