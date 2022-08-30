import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

const win = Dimensions.get('window');
const paddingAroundImage = 24;
const numberOfColumn = 2;
const imageWidth = win.width / numberOfColumn - paddingAroundImage;
const getImageStyle = () => {
  return `
  height: 205;
  resize-mode: contain;
  `;
};

const ImageContainer = styled.Image`
  ${getImageStyle}
  width: ${props => props.width || imageWidth}
`;
const styles = css`
  ${getImageStyle}
`;

export { styles, ImageContainer };
