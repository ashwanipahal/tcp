import { css } from 'styled-components';

const styles = css`
  input {
    background-color: ${props => props.theme.colorPalette.white};
  }

  .zip-code {
    .address-field {
      top: 2px;
    }
  }
`;

export default styles;
