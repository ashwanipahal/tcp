import { css } from 'styled-components';

export default css`
  margin-bottom: 12px;
  .selected-image {
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  }
  /* stylelint-disable-next-line*/
  _:-ms-fullscreen,
  .image-wrapper img {
    max-height: 100%;
  }
  .image-wrapper {
    display: inline-flex;
    height: 111px;
    width: 90px;
  }
`;
