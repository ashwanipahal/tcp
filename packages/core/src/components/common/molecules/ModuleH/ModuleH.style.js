import { css } from 'styled-components';

export default css`
  height: 425px;
  margin-bottom: 32px;
  margin-top: 32px;
  overflow: hidden;
  position: relative;

  img {
    height: 425px;

    @media ${props => props.theme.mediaQuery.large} {
      height: 541px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    height: 541px;
    margin-bottom: 48px;
    margin-top: 48px;
  }

  .moduleH__header--wrapper {
    margin-top: 38px;
    position: absolute;
    z-index: ${props => props.theme.zindex.zindex.zDrawer};

    @media ${props => props.theme.mediaQuery.smallMax} {
      margin: 18px 0 0 11px;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 26px;
    }
  }

  .moduleH__header {
    color: ${props => props.theme.colors.WHITE};
    font-family: ${props => props.theme.fonts.primaryFontBlackFamily};
    line-height: 34px;
    margin: 0px;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.fonts.fontSize.heading.large.h2}px;
      line-height: 52px;
    }
  }

  .moduleH__CTALink {
    color: ${props => props.theme.colors.WHITE};
    display: block;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy6}px;
    letter-spacing: -0.1px;
    line-height: 20px;
    opacity: 0.8;
  }

  .moduleH__CTALink--partial {
    margin-top: 38px;
  }

  .moduleH__CTALink--full {
    margin-top: 22px;
  }

  .moduleH__CTALink--active {
    font-family: ${props => props.theme.fonts.secondaryFontBlackFamily};
    opacity: 1;
  }
`;
