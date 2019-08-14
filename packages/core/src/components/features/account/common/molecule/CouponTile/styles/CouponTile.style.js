import { css } from 'styled-components';

const styles = css`
  display: flex;

  .coupon-reward {
    background-color: ${props => props.theme.colorPalette.orange[700]};
    width: 85px;
    height: 42px;
    line-height: 42px;
  }
`;

export default styles;
