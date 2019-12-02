import { css } from 'styled-components';

export default css`
  font-family: ${props => props.theme.fonts.primaryFontBlackFamily};
  display: flex;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  padding: 12px 0 0;

  .social-media-label {
    padding: 15px 0;
    margin-right: 16px;
  }
  .social-media-icon {
    width: 42px;
    height: 42px;
  }
  .social-media-pallete {
    display: flex;
    justify-content: center;

    ul {
      display: inherit;
      li {
        margin-right: 19px;
      }
      li:last-child {
        margin-right: 0;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    padding: 0;
    .social-media-icon {
      width: 38px;
      height: 39px;
    }
    .social-media-pallete ul li {
      margin-right: 24px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    flex-direction: column;
    padding: 0 0 5px 0;

    .social-media-label {
      padding: 0 0 12px 0;
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy2}px;
      line-height: 0.8;
      margin-right: 0;
    }
    .social-media-icon {
      width: 50px;
      height: 50px;
    }
    .social-media-pallete ul li {
      margin-right: 32px;
    }
  }
`;
