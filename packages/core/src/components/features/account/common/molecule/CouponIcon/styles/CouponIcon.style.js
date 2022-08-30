import { css } from 'styled-components';

const styles = css`
  width: 86px;
  height: 42px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &.coupon-reward {
    background-color: ${props => props.theme.colorPalette.orange[800]};
  }

  &.coupon-saving {
    background-color: ${props => props.theme.colorPalette.purple};
  }

  &.coupon-placecash {
    background-color: ${props => props.theme.colorPalette.green[300]};
  }
`;

export default styles;
