import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

const win = Dimensions.get('window');
const paddingAroundImage = 16;
const numberOfColumn = 2;
const imageWidth = win.width / numberOfColumn - paddingAroundImage;
const getImageStyle = () => {
  return `
  width: ${imageWidth};
  height: 205;
  resize-mode: contain;
  `;
};

const ImageContainer = styled.Image`
  ${getImageStyle}
`;
const styles = css`
  ${getImageStyle}
`;

export { styles, ImageContainer };
