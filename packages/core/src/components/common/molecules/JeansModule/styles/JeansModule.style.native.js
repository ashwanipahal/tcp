import styled from 'styled-components/native';
import get from 'lodash/get';

const getAdditionalStyle = props => {
  const { margin, width, itemMargin, itemPadding, itemBackgroundColor, theme } = props;
  const { colorPalette } = theme;
  const bgColor = get(colorPalette, itemBackgroundColor, '#f1f0f0');
  return {
    ...(margin && { margin }),
    ...(width && { width }),
    ...(itemMargin && { margin: itemMargin }),
    ...(itemPadding && { padding: itemPadding }),
    ...(itemBackgroundColor && { background: bgColor }),
  };
};

const getVerticalTextStyle = () => {
  return {
    width: 312,
    height: 18,
    textAlign: 'center',
    transform: [{ rotate: '-90deg' }],
    justifyContent: 'center',
  };
};

const Container = styled.View`
  flex-direction: row;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const VerticalBanner = styled.View`
  width: 30;
  height: 312;
  background: #1a1a1a;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ImageTouchableOpacity = styled.TouchableOpacity`
  ${getAdditionalStyle}
`;

export { Container, VerticalBanner, getVerticalTextStyle, ImageTouchableOpacity };
