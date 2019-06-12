import { css } from 'styled-components';

const StyledGrid = css`
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default StyledGrid;
