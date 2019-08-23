import { css } from 'styled-components';

const styles = css`
  &.addEditAddress {
    .select__input {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy4}px;
    }

    .select__label {
      margin-top: 7px;
    }
  }
  .AddAddressForm__ctaContainer {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    .AddAddressForm__cancel {
      order: 2;
    }

    .AddAddressForm__submit {
      order: 1;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .addressBook__addNewCtaContainer {
      text-align: left;
    }
  }

  .AddAddressForm__makeDefault {
    .CheckBox__input:checked[disabled] {
      &:before {
        background: none;
        border: 1px solid ${props => props.theme.colors.CHECKBOX.BORDER};
      }
      &:after {
        border-color: ${props => props.theme.colors.CHECKBOX.BORDER};
      }
    }
  }
`;

export default styles;
