import { css } from 'styled-components';

export default css`
  .myPreferenceModalWrapper {
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 0 55px;
    }
  }
`;
