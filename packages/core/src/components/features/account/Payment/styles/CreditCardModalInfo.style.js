import { css } from 'styled-components';

const deleteCreditCardModalStyle = css`
  .CreditCardHeading {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .CreditCardInfo {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .CreditCardAddress {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;

export default deleteCreditCardModalStyle;
