import { css } from 'styled-components';

const styles = css`
  input {
    background-color: ${props =>
      props.variation === 'secondary' ? props.theme.colorPalette.gray[300] : ''};
  }
  .phone-field-wrapper {
    position: relative;
  }
  .phone-prefix {
    position: absolute;
    top: 23px;
    z-index: 1;
  }
  .phone-field {
    left: 30px;
  }
`;

export default styles;
