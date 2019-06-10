import { css } from 'styled-components';

const StyledGrid = css`
  max-width: ${props => props.theme.breakpoints.xlarge};
  margin: 0 auto;
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default StyledGrid;
