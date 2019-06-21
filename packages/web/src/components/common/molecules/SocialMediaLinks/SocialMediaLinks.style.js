import { css } from 'styled-components';

export default css`
  font-family: ${props => props.theme.fonts.primaryFontBlackFamily};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;

  .social-media-label {
    font-size: 12px;
    font-weight: ${props => props.theme.fonts.fontWeight.black};
    color: ${props => props.theme.colors.TEXT.DARKGRAY};
    padding: 0 0 12px 0;
  }
  .social-media-icon {
    width: 42px;
    height: 42px;
  }
  a {
    margin-right: 19px;
  }
  a:last-child {
    margin-right: 0;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .social-media-label {
      font-size: 10.7px;
    }
    .social-media-icon {
      width: 38px;
      height: 39px;
    }
    a {
      margin-right: 24px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .social-media-label {
      line-height: 2;
    }
    .social-media-icon {
      width: 50px;
      height: 50px;
    }
    a {
      margin-right: 32px;
    }
  }
`;
