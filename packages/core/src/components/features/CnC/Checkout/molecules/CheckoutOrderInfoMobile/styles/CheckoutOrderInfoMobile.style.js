import { css } from 'styled-components';

const styles = css`
  @media ${props => props.theme.mediaQuery.medium} {
    display: none;
  }
  .order-summary {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
`;

export default styles;
