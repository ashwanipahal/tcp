import { css } from 'styled-components';

const styles = css`
  .bordered {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.BLUE};
  }

  .logo {
    width: 192px;
  }
  .signuptext {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .checkout-border {
    width: 25%;
    margin: 0 auto;
    border-bottom: 2px solid ${props => props.theme.colorPalette.blue[1000]};
  }
  .checkout_modal_heading_2 {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
    }
  }

  .checkout_modal_heading_margin {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }
`;

export default styles;
