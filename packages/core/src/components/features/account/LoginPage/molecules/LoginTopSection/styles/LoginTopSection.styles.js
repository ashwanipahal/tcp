import { css } from 'styled-components';

const styles = css`
  .bordered {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.BLUE};
  }

  .logo {
    width: 192px;
  }
  .signuptext {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default styles;
