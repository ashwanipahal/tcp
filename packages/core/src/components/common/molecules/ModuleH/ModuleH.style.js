import { css } from 'styled-components';
import config from './config';

export default css`
  height: ${config.MODULE_STYLE.height}px;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
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
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  }

  .moduleH__header--wrapper {
    margin-top: 38px;
    position: absolute;
    z-index: ${props => props.theme.zindex.zModule};

    @media ${props => props.theme.mediaQuery.smallMax} {
      margin: 18px 0 0 11px;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .moduleH__header {
    .link-text {
      text-align: left;

      span {
        display: block;
      }
    }
  }

  .moduleH__header-link {
    color: ${props => props.theme.colors.WHITE};
    font-family: ${props => props.theme.fonts.primaryFontBlackFamily};
  }

  .moduleH__CTALink {
    color: ${props => props.theme.colors.WHITE};
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy9}px;
    line-height: 20px;
    opacity: 0.8;

    &:hover {
      font-family: ${props => props.theme.fonts.secondaryFontBlackFamily};
      opacity: 1;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy7}px;
    }

    @media ${props => props.theme.mediaQuery.smallOnly} {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy7}px;
    }
  }

  .moduleH__listItem-partial {
    margin-top: 38px;
  }

  .moduleH__listItem-full {
    margin-top: 22px;
  }

  .moduleH__CTALink--active {
    font-family: ${props => props.theme.fonts.secondaryFontBlackFamily};
    opacity: 1;
  }

  .moduleH_carousel .tcp_carousel .slick-list .slick-track {
    left: 0 !important;
  }
`;
