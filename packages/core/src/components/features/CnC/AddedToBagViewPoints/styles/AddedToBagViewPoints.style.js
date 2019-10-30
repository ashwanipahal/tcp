import { css } from 'styled-components';

const styles = css`
  margin-top: 10px;
  .text-value {
    text-align: right;
  }
  .row-padding {
    padding-bottom: 9px;
  }
  .divided-line {
    height: 1px;
    background-color: ${props => props.theme.colors.PRIMARY.DARK};
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .promo-color {
    color: ${props => props.theme.colors.PROMO.YELLOW};
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default styles;
