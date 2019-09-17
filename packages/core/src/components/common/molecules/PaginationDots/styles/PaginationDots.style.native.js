import styled from 'styled-components/native';

const DotContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  margin-top: ${props => props.marginTop};
`;

const DotTouchableOpacity = styled.TouchableOpacity`
  padding: 1px;
`;

const calculateDotStyle = props => {
  const { theme } = props;
  const { colorPalette } = theme;
  const width = !props.size ? 8 : props.size;
  const height = !props.size ? 8 : props.size;
  const background = !props.backgroundColor ? colorPalette.gray[700] : props.backgroundColor;
  const borderColor = !props.borderColor ? colorPalette.white : props.borderColor;
  const borderRadius = !props.borderRadius ? 4 : props.borderRadius;
  const borderWidth = !props.borderWidth ? 1 : props.borderWidth;
  return { width, height, background, borderColor, borderRadius, borderWidth };
};

const calculateSelectedDotStyle = props => {
  const { theme } = props;
  const { colorPalette } = theme;
  const width = !props.selectedSize ? 10 : props.selectedSize;
  const height = !props.selectedSize ? 10 : props.selectedSize;
  const background = !props.selectedBackgroundColor
    ? colorPalette.gray[700]
    : props.selectedBackgroundColor;
  const borderColor = !props.selectedBorderColor
    ? colorPalette.gray[700]
    : props.selectedBorderColor;
  const borderRadius = !props.selectedBorderRadius ? 4 : props.selectedBorderRadius;
  const borderWidth = !props.selectedBorderWidth ? 2 : props.selectedBorderWidth;
  return { width, height, background, borderColor, borderRadius, borderWidth };
};

const getDotStyle = props => {
  const { selected, theme } = props;
  const { spacing } = theme;
  const dotLeftMargin = !props.dotLeftMargin ? spacing.ELEM_SPACING.XXXS : props.dotLeftMargin;
  const dotRightMargin = !props.dotRightMargin ? spacing.ELEM_SPACING.XXXS : props.dotRightMargin;

  const values = selected ? calculateSelectedDotStyle(props) : calculateDotStyle(props);
  return `
    width: ${values.width};
    height: ${values.height};
    border-radius: ${values.borderRadius};
    background: ${values.background};
    border-width: ${values.borderWidth};
    border-color: ${values.borderColor};
    margin-left: ${dotLeftMargin};
    margin-right: ${dotRightMargin};
`;
};

const DotComp = styled.View`
  ${getDotStyle}
`;

export { DotContainer, DotTouchableOpacity, DotComp };
