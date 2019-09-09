import styled from 'styled-components/native';

const getImageStyle = props => {
  const { theme, selected, width, height, resizeMode, borderWidth, borderRadius } = props;
  const { colorPalette } = theme;
  const borderColor = selected ? colorPalette.gray[900] : colorPalette.gray[1100];
  return `
    width: ${width};
    height: ${height};
    resize-mode: ${resizeMode};
    border-color: ${borderColor};
    border-width: ${borderWidth};
    border-radius: ${borderRadius};
  `;
};

const ImageComp = styled.Image`
  ${getImageStyle}
`;

export default ImageComp;
