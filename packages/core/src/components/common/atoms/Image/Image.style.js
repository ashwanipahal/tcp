import { css } from 'styled-components';

const ImageStyles = css`
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default ImageStyles;
