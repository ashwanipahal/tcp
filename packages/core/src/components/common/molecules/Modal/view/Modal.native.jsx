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
    fontSize,
    horizontalBar = true,
    borderColor = 'black',
  } = otherProps;
  return (
    <SafeAreaView>
      <Modal transparent={false} visible={isOpen} animationType={animationType}>
        <StatusBar hidden />
        {heading && (
          <RowWrapper>
            <ModalHeading>
              <BodyCopy
                mobileFontFamily={headingFontFamily || 'primary'}
                fontWeight="extrabold"
                textAlign={headingAlign}
                fontSize={fontSize || 'fs16'}
                text={heading}
              />
            </ModalHeading>
            {getCloseIcon({ onRequestClose, headerStyle })}
          </RowWrapper>
        )}
        {horizontalBar ? (
          <LineWrapper>
            <LineComp marginTop={5} borderWidth={2} borderColor={borderColor} />
          </LineWrapper>
        ) : null}
        {children}
      </Modal>
    </SafeAreaView>
  );
};

export default ModalNative;
