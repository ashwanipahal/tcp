import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  .address-form {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
  }
`;

export default styles;
