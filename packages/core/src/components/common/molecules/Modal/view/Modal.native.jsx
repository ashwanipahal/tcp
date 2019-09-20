import React from 'react';
import { Modal, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import {
  StyledCrossImage,
  StyledTouchableOpacity,
  ModalHeading,
  LineWrapper,
  RowWrapper,
  ImageWrapper,
} from '../Modal.style.native';
import BodyCopy from '../../../atoms/BodyCopy';

// How To use this react native modal
// import this component in your file.
// It takes four properties: isOpen, onRequestClose, heading and children

// @flow

type Props = {
  isOpen: boolean,
  children: node,
};

const closeIcon = require('../../../../../assets/close.png');
const arrowIcon = require('../../../../../assets/carrot-large-left.png');

type CloseIconProps = {
  onRequestClose: Function,
  headerStyle: Object,
  iconType: String,
};

const getCloseIcon = ({ onRequestClose, headerStyle, iconType }: CloseIconProps) => {
  return (
    <ImageWrapper style={headerStyle}>
      <StyledTouchableOpacity onPress={onRequestClose}>
        <StyledCrossImage source={iconType === 'arrow' ? arrowIcon : closeIcon} />
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
    headingFontWeight,
    fontSize,
    horizontalBar = true,
    borderColor = 'black',
    iconType,
    fullWidth,
  } = otherProps;
  return (
    <SafeAreaView>
      <Modal
        transparent={false}
        visible={isOpen}
        animationType={animationType}
        onRequestClose={onRequestClose}
      >
        <ToastContainer />
        <StatusBar hidden />
        <RowWrapper>
          {heading && (
            <ModalHeading fullWidth={fullWidth}>
              <BodyCopy
                mobileFontFamily={headingFontFamily || 'primary'}
                fontWeight={headingFontWeight || 'extrabold'}
                textAlign={headingAlign}
                fontSize={fontSize || 'fs16'}
                text={heading}
              />
            </ModalHeading>
          )}
          {getCloseIcon({ onRequestClose, headerStyle, iconType })}
        </RowWrapper>
        {horizontalBar ? (
          <LineWrapper>
            <LineComp marginTop={5} borderWidth={2} borderColor={borderColor} />
          </LineWrapper>
        ) : null}
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default ModalNative;
