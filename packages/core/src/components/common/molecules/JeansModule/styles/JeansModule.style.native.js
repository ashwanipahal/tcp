import styled from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margin, width, itemMargin, itemPadding, itemBackgroundColor } = props;
  return {
    ...(margin && { margin }),
    ...(width && { width }),
    ...(itemMargin && { margin: itemMargin }),
    ...(itemPadding && { padding: itemPadding }),
    ...(itemBackgroundColor && { background: itemBackgroundColor }),
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
