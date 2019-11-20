import { css } from 'styled-components';

export default css`
  .seo-text {
    padding-bottom: 24px;
    padding-left: 14px;
    padding-right: 14px;
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: 35px;
      padding-left: 19px;
      padding-right: 15px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-bottom: 24px;
      padding-left: 40px;
      padding-right: 40px;
    }
  }
`;
