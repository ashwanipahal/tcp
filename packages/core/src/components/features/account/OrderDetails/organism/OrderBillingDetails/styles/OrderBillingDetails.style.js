import { css } from 'styled-components';

const styles = css`
  .card-details {
    display: flex;
    align-items: center;
    margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
  }
`;

export default styles;
