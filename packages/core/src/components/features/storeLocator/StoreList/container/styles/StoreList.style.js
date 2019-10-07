import { css } from 'styled-components';

export default css`
  ${props =>
    props.theme.gridDimensions.gridBreakPointsKeys.map(
      key => `
      ${key !== 'small' ? `@media ${props.theme.mediaQuery[key]} {` : ''}
        margin-right: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
        margin-left: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
      ${key !== 'small' ? `}` : ''}`
    )}
`;
