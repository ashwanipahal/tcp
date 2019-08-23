import { css } from 'styled-components';

const ONE_COL_WIDTH = '18%';
const TWO_COL_WIDTH = '26.5%';
const THREE_COL_WIDTH = '38%';

export default css`
  width: ${props =>
    (props.optionsMap.length <= 9 && ONE_COL_WIDTH) ||
    (props.optionsMap.length <= 18 && TWO_COL_WIDTH) ||
    (props.optionsMap.length <= 27 && THREE_COL_WIDTH)};
  position: absolute;
  z-index: 9;
  max-width: none;
  border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG} ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  background-color: #fff;
  text-align: center;
  min-width: 233px;

  .item-list-wrapper {
    max-height: 360px;

    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    text-align: left;
  }

  .item-list-column-wrapper {
    display: inline-block;
  }
  .item-list-common {
    display: flex;
    position: static;

    max-height: 319px;
    max-width: 570px;
  }
  .item-list-column {
    flex-flow: column wrap;
  }
  .item-list-row {
    flex-flow: row wrap;
  }

  .apply-button {
    width: 223px;
  }
`;
