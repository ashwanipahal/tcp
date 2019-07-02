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
        props.centered
          ? `
        justify-content: center;
        `
          : ``
      }
      ${
        props.fullBleed === true || (props.fullBleed && props.fullBleed[key])
          ? `width: 100%;`
          : `
          margin-right: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
          margin-left: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
          width: calc(100% - ${props.theme.gridDimensions.gridOffsetObj[key] * 2}px);
          overflow: hidden;
          `
      }
    }`
    )}

  > div:last-child {
    padding-right: 0;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
  @media ${props => props.theme.mediaQuery.large} {
    overflow: unset;
  }
`;

export default StyledRow;
