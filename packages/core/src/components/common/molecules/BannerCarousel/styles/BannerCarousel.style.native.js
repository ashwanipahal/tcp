import styled from 'styled-components/native';
import get from 'lodash/get';

const getAdditionalStyle = props => {
  const { itemMargin, itemPadding, itemBackgroundColor, theme } = props;
  const { colorPalette } = theme;
  const bgColor = get(colorPalette, itemBackgroundColor, '#f1f0f0');
  return {
    ...(itemMargin && { margin: itemMargin }),
    ...(itemPadding && { padding: itemPadding }),
    ...(itemBackgroundColor && { background: bgColor }),
  };
};

const getContainerAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const getContentContainerStyle = (listLeftMargin, listRightMargin) => {
  return {
    paddingRight: listRightMargin,
    paddingLeft: listLeftMargin,
  };
};

const ImageTouchableOpacity = styled.TouchableOpacity`
  ${getAdditionalStyle};
`;

const Container = styled.View`
  justify-content: center;
  width: 100%;
  ${getContainerAdditionalStyle};
`;

export { Container, ImageTouchableOpacity, getContentContainerStyle };
