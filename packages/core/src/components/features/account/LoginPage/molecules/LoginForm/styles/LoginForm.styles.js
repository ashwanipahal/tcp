import { css } from 'styled-components';

const styles = css`
  .border {
    border-top: 1px solid ${props => props.theme.colors.BORDER.BLUE};
  }
  .remember-me-text {
    display: block;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  }
  .remember-me-help-text,
  .save-my-place-reward {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  }
  .richTextColor a {
    color: ${props => props.theme.colorPalette.red[500]};
  }
`;

export default styles;
