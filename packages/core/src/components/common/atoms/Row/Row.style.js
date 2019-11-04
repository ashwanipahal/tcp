import { css } from 'styled-components';

const StyledRow = css`
  ${props =>
    props.theme.gridDimensions.gridBreakPointsKeys.map(
      key => `
      ${key !== 'small' ? `@media ${props.theme.mediaQuery[key]} {` : ''}
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
          ? `width: 100%;
            margin-right: 0;
            margin-left: 0;
          `
          : `
          margin-right: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
          margin-left: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
          width: calc(100% - ${props.theme.gridDimensions.gridOffsetObj[key] * 2}px);
          `
      }
      ${key !== 'small' ? `}` : ''}`
    )}

  ${props =>
    props.noLastMargin
      ? ``
      : `
        > *:last-child {
          margin-right: 0;
        }
  `}
  &.content-wrapper {
    margin: 0 auto;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default StyledRow;
