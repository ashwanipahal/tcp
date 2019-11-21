import { css } from 'styled-components';

export default css`
  .message-txt-field {
    width: 100%;
    min-height: 200px;
    border: 1px solid ${props => props.theme.colors.BUTTON.WHITE.BORDER};
  }
`;
