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
  ModalCustomWrapper,
} from '../Modal.style.native';
import BodyCopy from '../../../atoms/BodyCopy';

// How To use this react native modal
// import this component in your file.
// It takes four properties: isOpen, onRequestClose, heading and children

// @flow

type Props = {
  isOpen: boolean,
  children: node,
  isOverlay?: boolean,
};

const closeIcon = require('../../../../../assets/close.png');
const arrowIcon = require('../../../../../assets/carrot-large-left.png');

type CloseIconProps = {
  onRequestClose: Function,
  headerStyle: Object,
  iconType: String,
  isOverlay: Boolean,
};

const getCloseIcon = ({
  onRequestClose,
  headerStyle,
  iconType,
  isOverlay,
}: CloseIconProps) => {
  return (
    <ImageWrapper style={headerStyle}>
      <StyledTouchableOpacity
        onPress={onRequestClose}
        accessibilityRole="button"
        accessibilityLabel="close"
        isOverlay={isOverlay}
      >
        <StyledCrossImage
          source={iconType === 'arrow' ? arrowIcon : closeIcon}
        />
      </StyledTouchableOpacity>
    </ImageWrapper>
  );
};



const ModalNative = ({ isOpen, children, isOverlay, ...otherProps }: Props) => {
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
    customTransparent,
    transparentModal,
  } = otherProps;
  return (
    <SafeAreaView>
      <Modal
        transparent={customTransparent || false}
        visible={isOpen}
        animationType={animationType}
        onRequestClose={onRequestClose}
      >
        {!customTransparent && (
          <ModalCustomWrapper transparentModal={transparentModal}>
            <ToastContainer />
            <StatusBar hidden />
            <RowWrapper isOverlay={isOverlay}>
              {heading && transparentModal !== 'transparent-captcha' && (
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
              {getCloseIcon({
                onRequestClose,
                headerStyle,
                iconType,
                isOverlay,
              })}
            </RowWrapper>
            {horizontalBar && transparentModal !== 'transparent-captcha' ? (
              <LineWrapper>
                <LineComp
                  marginTop={5}
                  borderWidth={2}
                  borderColor={borderColor}
                />
              </LineWrapper>
            ) : null}
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          </ModalCustomWrapper>
        )}
        {customTransparent && children}
      </Modal>
    </SafeAreaView>
  );
};

ModalNative.defaultProps = {
  isOverlay: false,
};

export default ModalNative;
