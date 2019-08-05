import { css } from 'styled-components';

const styles = css`
  .couponCard__container {
    border: solid 0.8px #595959;
    border-style: dashed;
    margin-bottom: 25px;
  }
  .couponCard__header {
    background: #7dc24c;
    padding: 5px 0px 5px 15px;
  }
  .couponCard__body {
    padding: 5px 15px 5px 15px;
  }
  .couponCard__row {
    display: flex;
    margin-top: 17px;
    margin-bottom: 19px;
  }
  .couponCard__col {
    flex: 1;
  }
  .coupon__button {
    background-color: #000;
    color: #fff;
    font-size: 10px;
  }
`;

export default styles;
