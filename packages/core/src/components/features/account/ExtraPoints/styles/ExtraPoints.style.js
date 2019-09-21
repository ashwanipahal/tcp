import { css } from 'styled-components';

export default css`
  .elem-margin-right {
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 0px;
    }
  }

  .extraPointsTileCol {
    @media ${props => props.theme.mediaQuery.small} {
      margin-right: 19px;
    }
  }
`;
