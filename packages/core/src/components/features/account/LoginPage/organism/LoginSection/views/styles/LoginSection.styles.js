import { css } from 'styled-components';

const styles = css`
  .border {
    border-top: 1px solid ${props => props.theme.colors.BORDER.BLUE};
  }
  .create-acc-cta {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
`;

export default styles;
