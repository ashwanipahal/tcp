import { css } from 'styled-components/native';

const ImageStyle = css`
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '100px'};
`;

export default ImageStyle;
