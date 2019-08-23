import { css } from 'styled-components';

export default css`
  .profileInfoCol {
    display: flex;
  }

  .profileInformationCol {
    display: flex;
    flex-direction: column;
  }
  .profileInfoSeparator {
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  }
`;
