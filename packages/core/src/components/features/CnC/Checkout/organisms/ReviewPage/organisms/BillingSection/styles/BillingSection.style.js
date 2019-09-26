import { css } from 'styled-components';

export default css`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};

  .sub-heading {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    line-height: 0.94;
  }

  .cardImage-card-number {
    padding: 7px 10px;
  }

  .cardImage-img-wrapper {
    display: flex;
    margin-bottom: auto;
    border: 1px solid ${props => props.theme.colorPalette.gray[500]};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XS};
    background-color: ${props => props.theme.colors.WHITE};
  }

  .cardImage-wrapper {
    display: flex;
    margin-top: 0;
  }

  .review-billing-address {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .venmo-payment-method-wrapper {
    display: none;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .venmo-save-wrapper {
    display: none;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }
`;
