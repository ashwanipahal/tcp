import { css } from 'styled-components';

const styles = css`
  .border {
    border-top: 1px solid ${props => props.theme.colors.BORDER.BLUE};
  }
  .remember-me-text {
    display: block;
  }
`;

export default styles;
