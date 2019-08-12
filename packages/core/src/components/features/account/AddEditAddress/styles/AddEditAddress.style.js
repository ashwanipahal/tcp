import { css } from 'styled-components';

const styles = css`
  .addAddress__separator {
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
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
