import React from 'react';
import { Modal, StatusBar, SafeAreaView } from 'react-native';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import BodyCopy from '../../../atoms/BodyCopy';
import {
  StyledCrossImage,
  StyledTouchableOpacity,
  ModalHeading,
  LineWrapper,
  RowWrapper,
  ModalHeadingWrapper,
  ImageWrapper,
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
  headerStyle: Object,
};

const getCloseIcon = ({ onRequestClose, headerStyle }: CloseIconProps) => {
  return (
    <ImageWrapper style={headerStyle}>
      <StyledTouchableOpacity onPress={onRequestClose}>
        <StyledCrossImage source={closeIcon} />
      </StyledTouchableOpacity>
    </ImageWrapper>
  );
};

const ModalNative = ({ isOpen, children, ...otherProps }: Props) => {
  const {
    heading,
    onRequestClose,
    animationType,
    headingAlign,
    headingFontFamily,
    headerStyle,
  } = otherProps;
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <Modal style={{ zIndex: -1 }} transparent={false} visible={isOpen} animationType={animationType}>
        {heading && (
          <RowWrapper>
            <ModalHeadingWrapper>
              <ModalHeading>
                <BodyCopy
                  mobileFontFamily={headingFontFamily || 'primary'}
                  fontWeight="black"
                  textAlign={headingAlign}
                  fontSize="fs16"
                  text={heading}
                />
              </ModalHeading>
            </ModalHeadingWrapper>
            {getCloseIcon({ onRequestClose, headerStyle })}
          </RowWrapper>
        )}
        <LineWrapper>
          <LineComp marginTop={5} borderWidth={1} borderColor="black" />
        </LineWrapper>
        {children}
      </Modal>
    </SafeAreaView>
  );
};

export default ModalNative;
