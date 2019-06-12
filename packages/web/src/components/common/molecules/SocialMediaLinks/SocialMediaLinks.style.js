import { css } from 'styled-components';

export default css`
  font-family: ${props => props.theme.fonts.primaryFontBlackFamily};
  display: flex;

  .social-media-label {
    font-size: 12px;
    font-weight: ${props => props.theme.fonts.fontWeight.black};
    color: ${props => props.theme.colors.TEXT.DARKGRAY};
    padding: 12px 0;
    justify-content: flex-start;
    flex-grow: 1;
  }
  .social-media-pallete {
    justify-content: flex-end;
    flex-grow: 1;
  }
  .social-media-icon {
    width: 42px;
    height: 42px;
    margin-left: 19px;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .social-media-icon {
      width: 38px;
      height: 39px;
      margin-left: 24px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .social-media-label {
      line-height: 2.08;
    }
    .social-media-icon:not(:first) {
      margin-left: 10px;
    }
    .social-media-icon {
      width: 50px;
      height: 50px;
      margin-left: 32px;
    }
  }
`;
