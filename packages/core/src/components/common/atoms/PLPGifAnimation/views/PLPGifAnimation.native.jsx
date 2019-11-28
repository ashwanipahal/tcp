import React from 'react';
import { PropTypes } from 'prop-types';
import { Dimensions } from 'react-native';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import FastImageNative from '../../../../../../../mobileapp/src/components/common/molecules/FastImage';

const closeIcon = require('@tcp/core/src/assets/close.png');

const closeIconAction = (navigation, closeModal) => {
  if (navigation) {
    navigation.navigate('QRScanner');
  }
  if (closeModal) {
    closeModal();
  }
};

const win = Dimensions.get('screen');
const fastImageStyle = {
  width: win.width - 28,
  height: win.height - 290,
  marginTop: 100,
  marginRight: 'auto',
  marginBottom: 100,
  marginLeft: 'auto',
};

const PLPGifAnimation = ({ url, navigation, resetCustomLoader, isOpen }) => {
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

PLPGifAnimation.propTypes = {
  url: PropTypes.string,
  navigation: PropTypes.shape({}),
  resetCustomLoader: PropTypes.func,
  isOpen: PropTypes.bool,
};

PLPGifAnimation.defaultProps = {
  url: '',
  navigation: {},
  resetCustomLoader: () => {},
  isOpen: false,
};

export default PLPGifAnimation;
