import React from 'react';
import { Modal, StatusBar } from 'react-native';
import BodyCopy from '../../../atoms/BodyCopy';
import {
  StyledCrossImage,
  ImageWrapper,
  StyledTouchableOpacity,
  SafeAreaViewStyle,
} from '../Modal.style.native';

// How To use this react native modal
// import this component in your file.
// It takes four properties: isOpen, onRequestClose, heading and children

// @flow

type Props = {
  isOpen: boolean,
  children: node,
};

const closeIcon = require('../../../../../assets/close.png');

type CloseIconProps = {
  onRequestClose: Function,
};

const getCloseIcon = ({ onRequestClose }: CloseIconProps) => {
  return (
    <ImageWrapper>
      <StyledTouchableOpacity onPress={onRequestClose}>
        <StyledCrossImage source={closeIcon} />
      </StyledTouchableOpacity>
    </ImageWrapper>
  );
};

const ModalNative = ({ isOpen, children, ...otherProps }: Props) => {
  const { heading, onRequestClose, animationType, headingAlign } = otherProps;
  return (
    <SafeAreaViewStyle>
      <StatusBar hidden />
      <Modal transparent={false} visible={isOpen} animationType={animationType}>
        {getCloseIcon({ onRequestClose })}
        {heading && (
          <BodyCopy
            fontFamily="primary"
            fontSize="fs28"
            textAlign={headingAlign}
            color="black"
            fontWeight="black"
            text={heading}
          />
        )}
        {children}
      </Modal>
    </SafeAreaViewStyle>
  );
};

export default ModalNative;
