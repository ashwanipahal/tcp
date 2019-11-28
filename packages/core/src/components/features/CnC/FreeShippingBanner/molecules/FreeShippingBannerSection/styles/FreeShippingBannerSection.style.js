import { css } from 'styled-components';

const Styles = css`
  .free-shipping-banner-section-wrapper {
    display: flex;
    justify-content: center;
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      display: inline-block;
      text-align: center;
      span:not(.free-shipping-details) {
        display: inherit;
        vertical-align: top;
      }
    }
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
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
