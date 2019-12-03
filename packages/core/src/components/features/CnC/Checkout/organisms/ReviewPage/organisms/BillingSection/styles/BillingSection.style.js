import { css } from 'styled-components';

export default css`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  input {
    background-color: ${props => props.theme.colorPalette.gray[300]};
  }
  .billing-items {
    display: flex;
    justify-content: space-between;
  }
  .sub-heading {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    line-height: 0.94;
  }

  .card-skeleton-wrapper {
    width: 300px;
    height: 25px;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 180px;
      height: 25px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 300px;
      height: 25px;
    }
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
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }

  .venmo-save-wrapper {
    display: none;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .venmo-save-checkbox .CheckBox__text {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .cvvCode {
    position: relative;
    width: 100px;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    .TextBox__label {
      top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      font-size: ${props => props.theme.typography.fontSizes.fs10};
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    }
  }

  .cvv-icon {
    position: absolute;
    right: 0;
    width: 30px;
    top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .cardImage-card-number {
      width: 100%;
      padding: 0px;
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
      font-size: ${props => props.theme.typography.fontSizes.fs13};
    }
  }

  @media ${props => props.theme.mediaQuery.small} {
    .cardImage-card-number {
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
  }
`;
