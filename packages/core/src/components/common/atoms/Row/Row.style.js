import { css } from 'styled-components';

const StyledRow = css`
  ${props =>
    !props.noFlex
      ? `
      display: flex;
      flex-wrap: wrap;
    `
      : ``}
  ${props =>
    !props.fullBleed
      ? `
    margin-right: ${props.theme.gridDimensions.gridOffsetObj.small}px;
    margin-left: ${props.theme.gridDimensions.gridOffsetObj.small}px;
    width: calc(100% - ${props.theme.gridDimensions.gridOffsetObj.small * 2}px);
    `
      : `width: 100%;`}

  @media ${props => props.theme.mediaQuery.medium} {
    ${props =>
      !props.fullBleed
        ? `
      margin-right: ${props.theme.gridDimensions.gridOffsetObj.medium}px;
      margin-left: ${props.theme.gridDimensions.gridOffsetObj.medium}px;
      width: calc(100% - ${props.theme.gridDimensions.gridOffsetObj.medium * 2}px);
      `
        : `width: 100%;`}
  }

  @media ${props => props.theme.mediaQuery.large} {
    ${props =>
      !props.fullBleed
        ? `
      margin-right: ${props.theme.gridDimensions.gridOffsetObj.large}px;
      margin-left: ${props.theme.gridDimensions.gridOffsetObj.large}px;
      width: calc(100% - ${props.theme.gridDimensions.gridOffsetObj.large * 2}px);
      `
        : `width: 100%;`}
  }

  div:last-child {
    padding-right: 0;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default StyledRow;
