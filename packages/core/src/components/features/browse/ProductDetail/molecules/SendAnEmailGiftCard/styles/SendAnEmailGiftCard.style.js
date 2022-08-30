import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  .send-email-card-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .promo-label {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    display: flex;
    justify-content: center;
  }
`;

export default styles;
