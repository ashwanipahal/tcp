import React from 'react';
import {
  Modal,
  StatusBar,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
  Heading,
} from '../Modal.style.native';
import BodyCopy from '../../../atoms/BodyCopy';

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

const closeIcon = require('../../../../../assets/close.png');
const arrowIcon = require('../../../../../assets/carrot-large-left.png');

type CloseIconProps = {
  onRequestClose: Function,
  headerStyle: Object,
  iconType: String,
  isOverlay: Boolean,
  stickyCloseIcon: Boolean,
};

const getCloseIcon = ({
  stickyCloseIcon,
  onRequestClose,
  headerStyle,
  iconType,
  isOverlay,
}: CloseIconProps) => {
  return (
    <ImageWrapper stickyCloseIcon={stickyCloseIcon} style={headerStyle}>
      <StyledTouchableOpacity
        onPress={onRequestClose}
        accessibilityRole="button"
        accessibilityLabel="close"
        isOverlay={isOverlay}
      >
        <StyledCrossImage source={iconType === 'arrow' ? arrowIcon : closeIcon} />
      </StyledTouchableOpacity>
    </ImageWrapper>
  );
};

const geLine = (horizontalBar, borderColor) => {
  return (
    <>
      {horizontalBar ? (
        <LineWrapper>
          <LineComp marginTop={5} borderWidth={2} borderColor={borderColor} />
        </LineWrapper>
      ) : null}
    </>
  );
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
  } = otherProps;
  let behavior = null;
  let keyboardVerticalOffset = 0;
  if (Platform.OS === 'ios') {
    behavior = 'padding';
    keyboardVerticalOffset = 64;
  }

  return (
    <SafeAreaView>
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                stickyHeaderIndices={[0]}
              >
                <Heading>
                  <ToastContainer />
                  <StatusBar hidden />
                  <RowWrapper stickyCloseIcon={stickyCloseIcon} isOverlay={isOverlay}>
                    {heading && (
                      <ModalHeading stickyCloseIcon={stickyCloseIcon} fullWidth={fullWidth}>
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
                      stickyCloseIcon,
                    })}
                  </RowWrapper>
                  {geLine(horizontalBar, borderColor)}
                </Heading>
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
          </ModalCustomWrapper>
        )}
        {customTransparent && children}
      </Modal>
    </SafeAreaView>
  );
};

ModalNative.defaultProps = {
  isOverlay: false,
  inheritedStyles: '',
};

export default ModalNative;
