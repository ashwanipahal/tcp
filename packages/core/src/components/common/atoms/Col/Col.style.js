import { css } from 'styled-components';

/**
 * @function calculateColumnWidth
 * @param {number} availableMaxWidth - maximum available width excluding the offset.
 * @param {number} columnWidth - width of 1 column at the breakpoint
 * @returns {string} singleColWidth - column width of desired column no in %
 */

const calculateColumnWidth = (availableMaxWidth, columnWidth) => {
  return `${(columnWidth / availableMaxWidth) * 100}%`;
};

/** @function getGutter
 * @param {string} breakpoint -  breakpoint at which width needs to be calculated
 * @param {object} gridDimensions - The grid dimension object from the theme, contains all the hardcoded values of the grid.
 * @returns value of gutter for 1 column in % as per the viewport
 */
const getGutter = (breakpoint, gridDimensions) => {
  const availableWidth = gridDimensions.availableMaxWidthObj[breakpoint];
  const columnGutter = gridDimensions.columnGutterObj[breakpoint];
  return `${(columnGutter / availableWidth) * 100}`;
};

/**
 * @function getColumnWidth
 * @param {number} colCount - number of columns that it would occupy.
 * @param {string} breakpoint - viewport at which width needs to be calculated
 * @param {object} gridDimensions - The grid dimension object from the theme,
 * contains all the hardcoded values of the grid.
 * @returns {number} columnWidth - column width of desired column no in %
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
 * @function calculateOffset
 * @param {number} colCount - number of columns that it would occupy.
 * @param {string} breakpoint - viewport at which width needs to be calculated
 * @param {object} gridDimensions - The grid dimension object from the theme,
 * contains all the hardcoded values of the grid.
 * @returns {string} offsetOfColumn - total width of the columns that needs to be left blank on left/right side.
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
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default StyledCol;
