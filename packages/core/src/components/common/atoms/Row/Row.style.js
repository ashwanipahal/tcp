import { css } from 'styled-components';

const StyledRow = css`
  ${props =>
    props.theme.gridDimensions.gridBreakPointsKeys.map(
      key => `
    @media ${props.theme.mediaQuery[key]} {
      ${
        !props.noFlex
          ? `
        display: flex;
        flex-wrap: wrap;
        `
          : ``
      }
      ${
        !props.fullBleed
          ? `
        margin-right: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
        margin-left: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
        width: calc(100% - ${props.theme.gridDimensions.gridOffsetObj[key] * 2}px);
        `
          : `width: 100%;`
      }
    }`
    )}

  div:last-child {
    padding-right: 0;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default StyledRow;
