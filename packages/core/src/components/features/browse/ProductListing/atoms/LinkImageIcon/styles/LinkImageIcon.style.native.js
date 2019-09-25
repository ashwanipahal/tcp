import styled from 'styled-components/native';

const getImageStyle = props => {
  const { width, height, resizeMode, borderRadius } = props;
  return `
    width: ${width};
    height: ${height};
    resize-mode: ${resizeMode};
    border-width: 0;
    border-radius: ${borderRadius};
  `;
};
const getImageBorderStyle = props => {
  const { theme, selected, width, height, borderWidth, borderRadius } = props;
  const { colorPalette } = theme;
  const borderColor = selected ? colorPalette.gray[900] : colorPalette.gray[1300];
  return `
    align-items: center;
    justify-content: center;
    width: ${width + 1};
    height: ${height + 1};
    border-color: ${borderColor};
    border-width: ${borderWidth};
    border-radius: ${borderRadius + 1};
  `;
};

const ImageTouchableOpacity = styled.TouchableOpacity`
  ${getImageBorderStyle}
`;

const ImageComp = styled.Image`
  ${getImageStyle}
`;

export { ImageComp, ImageTouchableOpacity };
