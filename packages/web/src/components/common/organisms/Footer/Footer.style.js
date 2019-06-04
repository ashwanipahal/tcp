import { css } from 'styled-components';

export default css`
  .footer-top {
    border-bottom: 2px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  }
  .footer-bottom {
    flex-direction: column-reverse;
    background: ${props => props.theme.colors.BRAND.PRIMARY};
  }
  .footer-top .slot-1 {
    order: 2;
  }
  .footer-top .slot-2 {
    order: 1;
  }
  @media ${props => props.theme.mediaQueries.large} {
    .footer-top .slot-1 {
      order: 1;
    }
    .footer-top .slot-2 {
      order: 2;
    }
    .footer-bottom {
      flex-direction: row;
      background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
    }
  }
`;
