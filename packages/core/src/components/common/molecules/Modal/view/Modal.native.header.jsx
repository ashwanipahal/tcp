import React from 'react';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import {
  StyledCrossImage,
  StyledTouchableOpacity,
  ModalHeading,
  LineWrapper,
  RowWrapper,
  ImageWrapper,
  Heading,
} from '../Modal.style.native';
import BodyCopy from '../../../atoms/BodyCopy';

// @flow

type Props = {
  isOpen: boolean,
  stickyCloseIcon: boolean,
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
  rightAlignCrossIcon: Boolean,
  stickyCloseIcon: Boolean,
};

const getCloseIcon = ({
  stickyCloseIcon,
  onRequestClose,
  headerStyle,
  iconType,
  isOverlay,
  rightAlignCrossIcon,
}: CloseIconProps) => {
  return (
    <ImageWrapper stickyCloseIcon={stickyCloseIcon} style={headerStyle}>
      <StyledTouchableOpacity
        onPress={onRequestClose}
        accessibilityRole="button"
        accessibilityLabel="close"
        isOverlay={isOverlay}
      >
        <StyledCrossImage
          rightAlignCrossIcon={rightAlignCrossIcon}
          source={iconType === 'arrow' ? arrowIcon : closeIcon}
        />
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

const ModalHeaderNative = ({ isOverlay, ...otherProps }: Props) => {
  const {
    heading,
    onRequestClose,
    headingAlign,
    headingFontFamily,
    headerStyle,
    headingFontWeight,
    fontSize,
    iconType,
    fullWidth,
    stickyCloseIcon,
    horizontalBar = true,
    borderColor = 'black',
    rightAlignCrossIcon,
    customHeaderMargin,
    modalHeadingMargin,
  } = otherProps;

  return (
    <Heading>
      <ToastContainer shouldShowSafeArea={false} />
      <RowWrapper
        stickyCloseIcon={stickyCloseIcon}
        isOverlay={isOverlay}
        customHeaderMargin={customHeaderMargin}
      >
        {heading && (
          <ModalHeading
            stickyCloseIcon={stickyCloseIcon}
            fullWidth={fullWidth}
            modalHeadingMargin={modalHeadingMargin}
          >
            <BodyCopy
              mobileFontFamily={headingFontFamily || 'primary'}
              fontWeight={headingFontWeight || 'extrabold'}
              textAlign={headingAlign}
              fontSize={fontSize || 'fs16'}
              text={heading}
              numberOfLines={1}
            />
          </ModalHeading>
        )}
        {getCloseIcon({
          onRequestClose,
          headerStyle,
          iconType,
          isOverlay,
          stickyCloseIcon,
          rightAlignCrossIcon,
        })}
      </RowWrapper>
      {geLine(horizontalBar, borderColor)}
    </Heading>
  );
};

ModalHeaderNative.defaultProps = {
  isOverlay: false,
  inheritedStyles: '',
};

export default ModalHeaderNative;
