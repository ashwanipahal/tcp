import { css } from 'styled-components';

const styles = css`
  .payment-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    height: 546px;
    border-top: 1px solid ${props => props.theme.colors.TEXT.DARKGRAY};
    @media ${props => props.theme.mediaQuery.medium} {
      height: 560px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      height: 571px;
    }
  }
`;

export default styles;
