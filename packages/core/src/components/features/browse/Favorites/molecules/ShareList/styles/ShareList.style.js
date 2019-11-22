import { css } from 'styled-components';

export default css`
  .message-txt-field {
    width: 100%;
    min-height: 200px;
    border: 1px solid ${props => props.theme.colors.BUTTON.WHITE.BORDER};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }
  .share-list-form {
    input.subject-field input {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
  }
`;
