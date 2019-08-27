import { css } from 'styled-components';

const styles = css`
  width: 100%;

  @media ${props => props.theme.mediaQuery.medium} {
    .fieldLastName,
    .fieldNumber {
      margin-right: 0px;
    }
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .fieldFirstName,
    .fieldEmail {
      margin-right: 0px;
    }
    .fieldLastName,
    .fieldNumber {
      margin-right: 0px;
    }
  }
`;

export default styles;
