import { css } from 'styled-components';

export default css`
  .copy-success-txt {
    p {
      color: ${props => props.theme.colors.TEXT.RED};
    }
  }
  .copy-link-textbox {
    input[type='text'] {
      padding-top: 0;
    }
  }
`;
