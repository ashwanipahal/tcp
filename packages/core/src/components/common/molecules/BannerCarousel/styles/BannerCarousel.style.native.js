import styled from 'styled-components/native';

const getAdditionalStyle = props => {
  const { itemMargin, itemPadding, itemBackgroundColor } = props;
  return {
    ...(itemMargin && { margin: itemMargin }),
    ...(itemPadding && { padding: itemPadding }),
    ...(itemBackgroundColor && { background: itemBackgroundColor }),
  };
};

const getContentContainerStyle = () => {
  return {
    paddingRight: 30,
    paddingLeft: 8,
  };
};

const ImageTouchableOpacity = styled.TouchableOpacity`
  ${getAdditionalStyle}
`;

const Container = styled.View`
  justify-content: center;
  width: 100%;
`;

export { Container, ImageTouchableOpacity, getContentContainerStyle };
