import { css } from 'styled-components';

export default css`
  display: flex;
  height: auto;
  justify-content: center;
  margin-bottom: 40px;

  .moduleN {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-height: 541px;
  }

  @media ${props => props.theme.mediaQuery.mediumMax} {
    .moduleH {
      margin-bottom: 32px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    > div:first-child {
      margin-right: 30px;
    }

    .moduleH,
    .moduleN {
      margin: 0;
      width: 100%;
    }
  }
`;
