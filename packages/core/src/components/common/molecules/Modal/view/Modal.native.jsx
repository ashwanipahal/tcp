import React from 'react';
import { Modal, StatusBar, SafeAreaView } from 'react-native';
import BodyCopy from '../../../atoms/BodyCopy';
import {
  StyledCrossImage,
  ImageWrapper,
  StyledTouchableOpacity,
  ModalHeadingWrapper,
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
  const { heading, onRequestClose, animationType, headingAlign, headingFontFamily } = otherProps;
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <Modal transparent={false} visible={isOpen} animationType={animationType}>
        {getCloseIcon({ onRequestClose })}
        {heading && (
          <ModalHeadingWrapper>
            <BodyCopy
              fontSize="fs16"
              mobileFontFamily={headingFontFamily || 'primary'}
              fontWeight="extrabold"
              textAlign={headingAlign}
              text={heading}
              className="modalHeading"
              color="#000000"
            />
          </ModalHeadingWrapper>
        )}
        {children}
      </Modal>
    </SafeAreaView>
  );
};

export default ModalNative;
