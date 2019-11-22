import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  .address-form {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
  }

  .shipment-methods-form {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }

  .hide-on-desktop {
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .select__input.select__input {
    font-size: ${props => props.theme.typography.fontSizes.fs13};
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
      ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default styles;
