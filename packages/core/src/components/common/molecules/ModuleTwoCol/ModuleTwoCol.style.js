import { css } from 'styled-components';

export default css`
  display: flex;
  height: auto;
  justify-content: center;
  margin-bottom: 40px;

  @media ${props => props.theme.mediaQuery.mediumMax} {
    > div:nth-child(1) {
      margin-bottom: 32px;
    }
  }

  .moduleN {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-height: 541px;
  }

  .moduleH,
  .moduleN {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
