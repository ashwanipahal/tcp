import { css } from 'styled-components';

export default css`
  .profileInfoCol {
    display: flex;
  }
  .profileInfoSeparator {
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  }
`;
