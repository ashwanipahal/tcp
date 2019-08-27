import { css } from 'styled-components';

const ONE_COL_WIDTH = '18%';
const TWO_COL_WIDTH = '26%';
const THREE_COL_WIDTH = '39.5%';
const ONE_COL_OPTION_COUNT = 9;
const TWO_COL_OPTION_COUNT = 18;
const THREE_COL_OPTION_COUNT = 27;

export default css`
  width: ${props =>
    (props.optionsMap.length <= ONE_COL_OPTION_COUNT && ONE_COL_WIDTH) ||
    (props.optionsMap.length <= TWO_COL_OPTION_COUNT && TWO_COL_WIDTH) ||
    (props.optionsMap.length <= THREE_COL_OPTION_COUNT && THREE_COL_WIDTH)};
  position: absolute;
  z-index: ${props => props.theme.zindex.zPLPFilterDropDown};
  border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  background-color: ${props => props.theme.colors.WHITE};
  text-align: center;
  min-width: 233px;

  .item-list-wrapper {
    max-height: 430px;
    text-align: center;
  }

  .item-list-column-wrapper {
    display: inline-block;
  }
  .item-list-common {
    display: flex;
    position: static;
    max-height: 352px;
    max-width: 570px;
    overflow: scroll;
  }
  .item-list-column {
    flex-flow: column wrap;
  }
  .item-list-row {
    flex-flow: row wrap;
  }
  .apply-button {
    width: 210px;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;
