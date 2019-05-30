import styled, { css } from 'styled-components';
import theme from '../../../../../Styles/theme';

// ==============VARIABLES======================//

/*
 * Breakpoint
 * @ Variables
 *
 */

// mobile max
const gridBreakPointsKeys = ['small', 'medium', 'large', 'xlarge'];

const {
  /* numberOfColumnsObj, */ columnWidthObj,
  columnGutterObj,
  gridOffsetObj,
  availableMaxWidthObj,
} = theme.gridDimensions;

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
const getGutter = breakpoint => {
  const availableWidth = availableMaxWidthObj[breakpoint];
  const columnGutter = columnGutterObj[breakpoint];
  const gutter = `${(columnGutter / availableWidth) * 100}%`;

  return gutter;
};

/*
    o/p -
        column width of desired column no in %
    i/p -
        breakpoint : viewport at which width needs to be calculated
        col-count : column no who's width has to be calculated
*/

const getCoulmnWidth = (colCount, breakpoint) => {
  const columnWidth = calculateColumnWidth(
    availableMaxWidthObj[breakpoint],
    columnWidthObj[breakpoint]
  );
  const columnGutter = getGutter(breakpoint);

  return columnWidth * colCount + columnGutter * 2 * (colCount - 1);
};

const calculateOffset = (colCount, breakpoint) => {
  return getCoulmnWidth(colCount, breakpoint) + getGutter(breakpoint) * 3;
};

// returns total width of viewport including margins(offset) on either sides
const getTotalWidth = (availableMaxWidth, gridOffset) => {
  return availableMaxWidth + gridOffset * 2;
};

// Returns max-width in % for a particular viewport
const calculatMaxWidth = breakpoint => {
  const availableMaxWidth = availableMaxWidthObj[breakpoint];
  const gridOffset = gridOffsetObj[breakpoint];

  // total-width is available-max-width + margins(column-offset) on either sides
  const totalWidth = getTotalWidth(availableMaxWidth, gridOffset);
  const maxWidth = (availableMaxWidth / totalWidth) * 100;

  return maxWidth;
};

const StyledGrid = styled.div`
  ${css`
    ${gridBreakPointsKeys.map(
      key => `
    @media ${theme.MEDIA_QUERIES[key]} {
        display: flex;
        margin-right: ${gridOffsetObj[key]}px;
        margin-left: ${gridOffsetObj[key]}px;
        width: ${calculatMaxWidth(key)}%;
    }`
    )}
  `}
  div:last-child {
    margin-right: 0;
  }
`;

export default StyledGrid;
