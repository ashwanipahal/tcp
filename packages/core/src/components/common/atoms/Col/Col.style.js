import { css } from 'styled-components';
// TODO - Revisit the function comments and change as per the project
// ==============FUNCTIONS ====================== //

/*
    i/p -
        available-maxwidth : maximum available width
        column-width : width of 1 column
        col-count : column no who's width has to be calculated
    o/p -
        column width of desired column no in %
    example -
        available-max-width = 13200 , column-width = 12
        avl width = 1320px = 100%
        width of 1px in % = 100 *(1 / 1320px)
        1 col-width in % = col-width * width of 1px in %
        86px(col-width) in % = 86 * (100 *(1 / 1320px)) = 6.51515%
*/

const calculateColumnWidth = (availableMaxWidth, columnWidth) => {
  const singleColWidth = `${(columnWidth / availableMaxWidth) * 100}%`;
  return singleColWidth;
};

/*
    o/p -
        returns value of gutter for 1 column in % as per the viewport
    i/p -
        breakpoint : breakpoint at which width needs to be calculated
*/
const getGutter = (breakpoint, gridDimensions) => {
  const availableWidth = gridDimensions.availableMaxWidthObj[breakpoint];
  const columnGutter = gridDimensions.columnGutterObj[breakpoint];
  const gutter = `${(columnGutter / availableWidth) * 100}`;

  return gutter;
};

/**
 * Default colsize
 */

/*
    o/p -
        column width of desired column no in %
    i/p -
        breakpoint : viewport at which width needs to be calculated
        col-count : column no who's width has to be calculated
*/

const getColumnWidth = (colCount, breakpoint, gridDimensions) => {
  const columnWidth = calculateColumnWidth(
    gridDimensions.availableMaxWidthObj[breakpoint],
    gridDimensions.columnWidthObj[breakpoint]
  );
  const columnGutter = getGutter(breakpoint, gridDimensions);
  return parseFloat(columnWidth) * colCount + parseFloat(columnGutter) * (colCount - 1);
};

const calculateOffset = (colCount, breakpoint, gridDimensions) => {
  return (
    getColumnWidth(colCount, breakpoint, gridDimensions) + getGutter(breakpoint, gridDimensions) * 1
  );
};

const StyledCol = css`
  ${props =>
    props.theme.gridDimensions.gridBreakPointsKeys.map(
      key => `
      @media ${props.theme.mediaQuery[`${key}Only`]} {
        ${props.hideCol && props.hideCol[key] ? 'display: none' : ''};
      }
      @media ${props.theme.mediaQuery[key]} {
          ${!props.isNotInlineBlock ? 'display: inline-block' : ''};
          ${
            !(props.ignoreGutter && props.ignoreGutter[key])
              ? `padding-right: ${getGutter(key, props.theme.gridDimensions)}%`
              : ''
          };
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
`;

export default StyledCol;
