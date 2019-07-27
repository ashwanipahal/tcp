import { css } from 'styled-components';

export default css`
  font-family: ${props => props.theme.fonts.primaryFontBlackFamily};
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: center;
  padding: 12px 0 20px;

  .social-media-label {
    padding: 15px 0;
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
    padding: 0;
    .social-media-icon {
      width: 38px;
      height: 39px;
    }
    a {
      margin-right: 24px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    flex-direction: column;
    padding: 0 0 5px 0;
    .social-media-label {
      padding: 0 0 5px 0;
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy2}px;
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
