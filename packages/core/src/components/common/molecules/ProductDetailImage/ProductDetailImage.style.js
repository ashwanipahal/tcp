import { css } from 'styled-components';

const styles = css`
  img {
    max-height: 427px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    img {
      max-height: 436px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    img {
      max-height: 703px;
    }
  }
`;

export default styles;
