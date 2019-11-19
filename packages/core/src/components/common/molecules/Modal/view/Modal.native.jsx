import React from 'react';
import { Modal, KeyboardAvoidingView, Platform } from 'react-native';
import {
  ModalCustomWrapper,
  ViewContainer,
  ScrollView,
  ChildrenContainer,
} from '../Modal.style.native';
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
    modalHeadingMargin,
    margins,
    paddings,
    childrenMargins,
  } = otherProps;
  let behavior = null;
  let keyboardVerticalOffset = 0;
  if (Platform.OS === 'ios') {
    behavior = 'padding';
    keyboardVerticalOffset = 64;
  }

  let Component = ScrollView;
  if (noscroll) {
    Component = ViewContainer;
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
              margins={margins}
              paddings={paddings}
            >
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
                modalHeadingMargin={modalHeadingMargin}
              />
              <ChildrenContainer childrenMargins={childrenMargins}>{children}</ChildrenContainer>
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
};

export default ModalNative;
