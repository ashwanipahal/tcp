import { css } from 'styled-components';

export default css`
  .moduleJ-cta-btn {
    width: 225px;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 161px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
    }
  }
`;
