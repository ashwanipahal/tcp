import React from 'react';
import { Modal, StatusBar, SafeAreaView } from 'react-native';
import BodyCopy from '../../../atoms/BodyCopy';
import { StyledCrossImage, ImageWrapper, StyledTouchableOpacity } from '../Modal.style.native';

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
    <SafeAreaView>
      <StatusBar hidden />
      <Modal transparent={false} visible={isOpen} animationType={animationType}>
        {getCloseIcon({ onRequestClose })}
        {heading && (
          <BodyCopy
            fontSize="fs16"
            fontFamily="primary"
            textAlign={headingAlign}
            text={heading}
            className="modalHeading"
            component="span"
            color="#000000"
          />
        )}
        {children}
      </Modal>
    </SafeAreaView>
  );
};

export default ModalNative;
