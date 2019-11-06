import { css } from 'styled-components';

const Styles = css`
  .free-shipping-banner-section-wrapper {
    display: flex;
    justify-content: center;
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
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .fast-shipping {
    height: 18px;
    width: 20px;
    @media ${props => props.theme.mediaQuery.large} {
      height: 23px;
      width: 25px;
    }
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default Styles;
