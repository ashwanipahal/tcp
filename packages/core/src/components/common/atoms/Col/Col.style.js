import { css } from 'styled-components';

/**
 * function calculateColumnWidth
 * params - availableMaxWidth - maximum available width excluding the offset.
 * params - columnWidth - width of 1 column at the breakpoint
 * returns - singleColWidth - column width of desired column no in %
 */

const calculateColumnWidth = (availableMaxWidth, columnWidth) => {
  const singleColWidth = `${(columnWidth / availableMaxWidth) * 100}%`;
  return singleColWidth;
};

/* function getGutter
 * params - breakpoint -  breakpoint at which width needs to be calculated
 * gridDimensions - The grid dimension object from the theme, contains all the hardcoded values of the grid.
 * returns - value of gutter for 1 column in % as per the viewport
 */
const getGutter = (breakpoint, gridDimensions) => {
  const availableWidth = gridDimensions.availableMaxWidthObj[breakpoint];
  const columnGutter = gridDimensions.columnGutterObj[breakpoint];
  const gutter = `${(columnGutter / availableWidth) * 100}`;

  return gutter;
};

/**
 * function getColumnWidth
 * params - colCount - number of columns that it would occupy.
 * params - breakpoint - viewport at which width needs to be calculated
 * params  - gridDimensions - The grid dimension object from the theme,
 * contains all the hardcoded values of the grid.
 * returns - columnWidth - column width of desired column no in %
 */

const getColumnWidth = (colCount, breakpoint, gridDimensions) => {
  const columnWidth = calculateColumnWidth(
    gridDimensions.availableMaxWidthObj[breakpoint],
    gridDimensions.columnWidthObj[breakpoint]
  );
  const columnGutter = getGutter(breakpoint, gridDimensions);
  return parseFloat(columnWidth) * colCount + parseFloat(columnGutter) * (colCount - 1);
};

/**
 * function calculateOffset
 * params - colCount - number of columns that it would occupy.
 * params - breakpoint - viewport at which width needs to be calculated
 * params  - gridDimensions - The grid dimension object from the theme,
 * contains all the hardcoded values of the grid.
 * returns - offsetOfColumn - total width of the columns that needs to be left blank on left/right side.
 */
const calculateOffset = (colCount, breakpoint, gridDimensions) => {
  return (
    getColumnWidth(colCount, breakpoint, gridDimensions) + getGutter(breakpoint, gridDimensions) * 1
  );
};

const StyledCol = css`
  ${props =>
    props.theme.gridDimensions.gridBreakPointsKeys.map(
      key => `
      @media ${props.theme.mediaQuery[key]} {
          ${!props.isNotInlineBlock ? 'display: inline-block;' : ''}
          padding-right: ${getGutter(key, props.theme.gridDimensions)}%;
          margin-left: ${
            props.offsetLeft && props.offsetLeft[key]
              ? calculateOffset(props.offsetLeft[key], key, props.theme.gridDimensions)
              : '0'
          }%;
          margin-right: ${
            props.offsetRight && props.offsetRight[key]
              ? calculateOffset(props.offsetRight[key], key, props.theme.gridDimensions)
              : '0'
          }%;
          width: ${getColumnWidth(props.colSize[key], key, props.theme.gridDimensions)}%;
      }`
    )}
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default StyledCol;
