import { css } from 'styled-components';

const styles = css`
  display: flex;

  .coupon-reward {
    background-color: ${props => props.theme.colorPalette.orange[700]};
    min-width: 86px;
    height: 42px;
    line-height: 42px;
  }

  .coupon-saving {
    background-color: ${props => props.theme.colorPalette.blue[500]};
    min-width: 86px;
    height: 42px;
    line-height: 42px;
  }

  .coupon-placecash {
    background-color: ${props => props.theme.colorPalette.green[500]};
    min-width: 86px;
    height: 42px;
    line-height: 42px;
  }
`;

export default styles;
