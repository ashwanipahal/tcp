import styled, { css } from 'styled-components';

const StyledRow = styled.div`
  ${props => css`
    ${props.theme.gridDimensions.gridBreakPointsKeys.map(
      key => `
    @media ${props.theme.mediaQuery[key]} {
        ${!props.noflex ? 'display: flex; flex-wrap: wrap;' : ''}
        margin-right: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
        margin-left: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
        width: calc(100% - ${props.theme.gridDimensions.gridOffsetObj[key] * 2}px);
    }`
    )}
  `}
  div:last-child {
    padding-right: 0;
  }
  div:first-child {
    padding-left: 0;
  }
`;

export default StyledRow;
