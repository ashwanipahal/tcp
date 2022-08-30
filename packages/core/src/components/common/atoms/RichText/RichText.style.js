import { css } from 'styled-components';

const RichTextStyles = css`
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default RichTextStyles;
