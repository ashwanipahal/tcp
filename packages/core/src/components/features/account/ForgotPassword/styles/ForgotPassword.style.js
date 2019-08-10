import { css } from 'styled-components';

const styles = css`
  &.forgot-password-form {
    margin: 30px 0;

    .heading-link a {
      color: ${props => props.theme.colorPalette.black};
    }

    .forgot-password-text {
      display: block;
    }

    .elem-mb-SM {
      max-width: 241px;
      margin: 12px auto 25px;
    }
  }
`;

export default styles;
