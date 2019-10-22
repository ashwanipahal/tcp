import { css } from 'styled-components';

const styles = css`
  .border {
    border-top: 1px solid ${props => props.theme.colors.BORDER.BLUE};
  }
  .remember-me-text {
    display: block;
  }
  .save-my-plcc {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .richTextColor a {
    color: ${props => props.theme.colorPalette.red[500]};
  }
`;

export default styles;
