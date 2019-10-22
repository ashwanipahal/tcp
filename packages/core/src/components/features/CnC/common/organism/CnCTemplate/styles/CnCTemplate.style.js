import { css } from 'styled-components';

const styles = css`
  ${props => `
  background: ${props.theme.colors.PRIMARY.PALEGRAY};
  padding: ${props.theme.spacing.ELEM_SPACING.XXXS};
  margin-bottom: 3px;
  padding-top:${props.isConfirmationPage ? props.theme.spacing.ELEM_SPACING.MED : 0}`}

  .right-sec {
    margin-bottom: ${props => (props.marginTop ? props.theme.spacing.LAYOUT_SPACING.MED : 0)};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => (props.marginTop ? props.theme.spacing.LAYOUT_SPACING.SM : 0)};
      margin-bottom: 0;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-top: ${props => (props.marginTop ? props.theme.spacing.LAYOUT_SPACING.XS : 0)};
      margin-bottom: 0;
    }
  }

  .hide-mobile {
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }

  .placeholder-right div {
    background: ${props => props.theme.colorPalette.white};
    padding: 10px 0;
    margin-bottom: 5px;
    text-align: center;
  }

  .checkout-page-error {
    span {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    }
  }
`;

export default styles;
