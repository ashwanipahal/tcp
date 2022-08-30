import { css } from 'styled-components';

const styles = css`
  .top-order-links {
    text-align: left;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.medium} {
      text-align: right;
      margin-bottom: 0;
    }
  }
`;

export default styles;
