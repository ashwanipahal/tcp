import React from 'react';
import PropTypes from 'prop-types';
import { getScreenHeight } from '@tcp/core/src/utils';
import ModalNative from '../../Modal';
import { RichText } from '../../../atoms';
import { ModalViewWrapper } from '../styles/WebViewModal.style.native';

const WebViewModal = ({ openState, toggleModalHandler, webViewProps }) => (
  <ModalNative
    isOpen={openState}
    onRequestClose={toggleModalHandler}
    horizontalBar={false}
    fullWidth
    stickyCloseIcon
  >
    <ModalViewWrapper height={getScreenHeight()}>
      <RichText {...webViewProps} />
    </ModalViewWrapper>
  </ModalNative>
);

WebViewModal.propTypes = {
  openState: PropTypes.bool,
  toggleModalHandler: PropTypes.func,
  webViewProps: PropTypes.shape({}),
};

WebViewModal.defaultProps = {
  openState: false,
  toggleModalHandler: () => false,
  webViewProps: {},
};

export default WebViewModal;
