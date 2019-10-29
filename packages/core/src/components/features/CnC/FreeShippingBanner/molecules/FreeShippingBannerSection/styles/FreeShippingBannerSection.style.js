import { css } from 'styled-components';

const Styles = css`
  .free-shipping-banner-section-wrapper {
    text-align: center;
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    @media ${props => props.theme.mediaQuery.medium} {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
    }
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
  }
  .shippingNew {
    color: ${props => props.theme.colorPalette.blue[800]};
  }
  .free-shipping-details {
    font-weight: 600;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default Styles;
