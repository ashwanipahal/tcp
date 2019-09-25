import { css } from 'styled-components';

const styles = css`
  .payment-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    border-top: 1px solid ${props => props.theme.colors.TEXT.DARKGRAY};
  }
`;

export default styles;
