import { css } from 'styled-components';

const styles = css`
  display: flex;

  .coupon {
    width: 86px;
    height: 42px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .coupon-reward {
    background-color: ${props => props.theme.colorPalette.orange[700]};
  }

  .coupon-saving {
    background-color: ${props => props.theme.colorPalette.blue[500]};
  }

  .coupon-placecash {
    background-color: ${props => props.theme.colorPalette.green[300]};
  }
`;

export default styles;
