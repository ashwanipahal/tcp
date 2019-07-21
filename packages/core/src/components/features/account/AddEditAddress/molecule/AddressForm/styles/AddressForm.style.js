import { css } from 'styled-components';

const styles = css`
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
`;

export default styles;
