import styled, { css } from 'styled-components';

const getTotalWidth = (availableMaxWidth, gridOffset) => {
  return availableMaxWidth + gridOffset * 2;
};

// Returns max-width in % for a particular viewport
const calculatMaxWidth = (breakpoint, gridDimensions) => {
  const availableMaxWidth = gridDimensions.availableMaxWidthObj[breakpoint];
  const gridOffset = gridDimensions.gridOffsetObj[breakpoint];

  // total-width is available-max-width + margins(column-offset) on either sides
  const totalWidth = getTotalWidth(availableMaxWidth, gridOffset, gridDimensions);
  const maxWidth = (availableMaxWidth / totalWidth) * 100;

  return maxWidth;
};

const StyledRow = styled.div`
  ${props => css`
    ${props.theme.gridDimensions.gridBreakPointsKeys.map(
      key => `
    @media ${props.theme.mediaQueries[key]} {
        ${!props.noFlex ? 'display: flex;' : ''}
        margin-right: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
        margin-left: ${props.theme.gridDimensions.gridOffsetObj[key]}px;
        width: calc(100% - ${props.theme.gridDimensions.gridOffsetObj[key]*2}px);
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
