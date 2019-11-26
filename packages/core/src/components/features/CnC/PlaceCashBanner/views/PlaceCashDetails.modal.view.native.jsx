import React from 'react';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import { RichText } from '../../../../common/atoms';

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
        <RichText source={{ html: labels.SHOW_DETAILS_RICH_TEXT }} />
      </ModalNative>
    );
  }
}

export default PlaceCashDetailsModal;
