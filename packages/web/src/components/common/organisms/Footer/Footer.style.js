import { css } from 'styled-components';

export default css`
  .footer-top {
  }
  .footer-bottom {
    flex-direction: column-reverse;
  }
  .footer-top .footer-top__slot--1 {
    order: 2;
  }
  .footer-top .footer-top__slot-2 {
    order: 1;
  }
`;
