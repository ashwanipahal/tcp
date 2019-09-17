import { css } from 'styled-components';

export default css`
  margin-bottom: 12px;
  .selected-image {
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  }
  .image-wrapper {
    display: inline-flex;
    padding: 5px;
  }
`;
