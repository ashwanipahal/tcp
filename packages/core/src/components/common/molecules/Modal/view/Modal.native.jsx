import React from 'react';
import { Modal, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { ModalCustomWrapper } from '../Modal.style.native';
import ModalNativeHeader from './Modal.native.header';

// How To use this react native modal
// import this component in your file.
// It takes four properties: isOpen, onRequestClose, heading and children

// @flow

type Props = {
  isOpen: boolean,
  stickyCloseIcon: boolean,
  children: node,
  isOverlay?: boolean,
  inheritedStyles?: String,
  noHeader?: boolean,
};

const ModalNative = ({ isOpen, children, isOverlay, inheritedStyles, ...otherProps }: Props) => {
  const {
    heading,
    onRequestClose,
    animationType = 'slide',
    headingAlign,
    headingFontFamily,
    headerStyle,
    headingFontWeight,
    fontSize,
    iconType,
    fullWidth,
    customTransparent,
    stickyCloseIcon,
    transparentModal,
    horizontalBar = true,
    borderColor = 'black',
    rightAlignCrossIcon,
    noscroll,
    customHeaderMargin,
    noHeader,
  } = otherProps;
  let behavior = null;
  let keyboardVerticalOffset = 0;
  if (Platform.OS === 'ios') {
    behavior = 'padding';
    keyboardVerticalOffset = 64;
  }

  let Component = ScrollView;
  if (noscroll) {
    Component = View;
  }

  return (
    <Modal
      transparent={customTransparent || false}
      visible={isOpen}
      animationType={animationType}
      onRequestClose={onRequestClose}
    >
      {!customTransparent && (
        <ModalCustomWrapper transparentModal={transparentModal} inheritedStyles={inheritedStyles}>
          <KeyboardAvoidingView
            behavior={behavior}
            keyboardVerticalOffset={keyboardVerticalOffset}
            enabled
          >
            <Component
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              stickyHeaderIndices={[0]}
            >
              {noHeader ? null : (
                <ModalNativeHeader
                  heading={heading}
                  onRequestClose={onRequestClose}
                  headingAlign={headingAlign}
                  headingFontFamily={headingFontFamily}
                  headerStyle={headerStyle}
                  headingFontWeight={headingFontWeight}
                  fontSize={fontSize}
                  iconType={iconType}
                  fullWidth={fullWidth}
                  stickyCloseIcon={stickyCloseIcon}
                  horizontalBar={horizontalBar}
                  borderColor={borderColor}
                  rightAlignCrossIcon={rightAlignCrossIcon}
                  customHeaderMargin={customHeaderMargin}
                />
              )}
              {children}
            </Component>
          </KeyboardAvoidingView>
        </ModalCustomWrapper>
      )}
      {customTransparent && children}
    </Modal>
  );
};

ModalNative.defaultProps = {
  isOverlay: false,
  inheritedStyles: '',
  noHeader: false,
};

export default ModalNative;
