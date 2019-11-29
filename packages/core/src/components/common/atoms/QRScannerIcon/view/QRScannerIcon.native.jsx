import React from 'react';
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

export default QRScannerIcon;
