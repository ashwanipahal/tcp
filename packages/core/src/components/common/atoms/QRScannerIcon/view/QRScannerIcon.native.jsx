import React from 'react';
import PropType from 'prop-types';
import CustomIcon from '../../Icon';

import { ICON_NAME, ICON_FONT_CLASS } from '../../Icon/Icon.constants';

const onQRIconFocus = (navigation, closeModal) => {
  if (navigation) {
    navigation.navigate('QRScanner');
  }
  if (closeModal) {
    closeModal();
  }
};

const QRScannerIcon = ({ navigation, closeModal, style, size }) => {
  return (
    <CustomIcon
      onPress={() => onQRIconFocus(navigation, closeModal)}
      iconFontName={ICON_FONT_CLASS.Icomoon}
      name={ICON_NAME.qrcode}
      size={size}
      color="gray.600"
      accessibilityLabel="barcode"
      style={style}
      isButton
    />
  );
};

QRScannerIcon.propTypes = {
  navigation: PropType.shape({}).isRequired,
  closeModal: PropType.func,
  style: PropType.shape({}),
  size: PropType.string,
};

QRScannerIcon.defaultProps = {
  closeModal: () => {},
  style: {},
  size: '',
};

export default QRScannerIcon;
