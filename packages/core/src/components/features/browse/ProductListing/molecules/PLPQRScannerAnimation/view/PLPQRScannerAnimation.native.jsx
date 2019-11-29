import React from 'react';
import { PropTypes } from 'prop-types';
import { Dimensions } from 'react-native';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import FastImageNative from '../../../../../../../../../mobileapp/src/components/common/molecules/FastImage';

const closeIcon = require('@tcp/core/src/assets/close.png');

/**
 *
 * @param {*} navigation
 * @param {*} closeModal
 *
 * closeIconAction calls when user click on close icon of modal
 * navigation is used to take user to back on scanner page while
 * closeModal close the modal.
 *
 */
const closeIconAction = (navigation, closeModal) => {
  if (navigation) {
    navigation.navigate('QRScanner');
  }
  if (closeModal) {
    closeModal();
  }
};

const dimensions = Dimensions.get('screen');

/**
 * Fast image not render style component. Hence passing as style object
 */
const fastImageStyle = {
  width: dimensions.width - 28,
  height: dimensions.height - 290,
  marginTop: 100,
  marginRight: 'auto',
  marginBottom: 100,
  marginLeft: 'auto',
};

/**
 *
 * @param {*} url
 * @param {*} navigation
 * @param {*} resetCustomLoader
 * @param {*} isOpen
 *
 * This function render Given image URL in modal.
 * When user click on close icon it will take user to QRScanner page.
 */
const PLPQRScannerAnimation = ({ url, navigation, resetCustomLoader, isOpen }) => {
  return (
    <ModalNative
      rightAlignCrossIcon
      isOpen={isOpen}
      fullWidth
      horizontalBar={false}
      onRequestClose={() => closeIconAction(navigation, resetCustomLoader)}
      stickyCloseIcon
    >
      <FastImageNative url={url} style={fastImageStyle} />
    </ModalNative>
  );
};

PLPQRScannerAnimation.propTypes = {
  url: PropTypes.string,
  navigation: PropTypes.shape({}),
  resetCustomLoader: PropTypes.func,
  isOpen: PropTypes.bool,
};

PLPQRScannerAnimation.defaultProps = {
  url: '',
  navigation: {},
  resetCustomLoader: () => {},
  isOpen: false,
};

export default PLPQRScannerAnimation;
