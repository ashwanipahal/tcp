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

const { columnWidthObj, columnGutterObj, availableMaxWidthObj } = theme.gridDimensions;

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
  return parseFloat(columnWidth) * colCount + parseFloat(columnGutter) * 2 * (colCount - 1);
};

const StyledGrid = styled.div`
  ${props => css`
    ${gridBreakPointsKeys.map(
      key => `
      @media ${theme.MEDIA_QUERIES[key]} {
          margin-right: ${columnGutterObj[key]}px;
          width: ${getCoulmnWidth(props.config.colCount[key], key)}%
      }`
    )}
  `}
`;

export default StyledGrid;
