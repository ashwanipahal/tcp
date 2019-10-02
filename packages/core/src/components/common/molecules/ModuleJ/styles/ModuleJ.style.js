import { css } from 'styled-components';

export default css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};

  .topview {
    position: relative;
  }

  .promo-alt {
    background-color: ${props => (props.bgColor ? props.bgColor : props.theme.colorPalette.white)};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0;
  }

  .topbar {
    border-top: 3px solid ${props => props.theme.colorPalette.gray['500']};
    position: absolute;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};

    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .promo-header-wrapper {
    ${props =>
      !props.promoBanner
        ? `
      margin-bottom: ${props.theme.spacing.ELEM_SPACING.LRG};

      @media ${props.theme.mediaQuery.medium} {
        margin-bottom: 92px;
      }

      @media ${props.theme.mediaQuery.large} {
        margin-bottom: 130px;
      }
    `
        : ``};
  }

  .promo {
    position: relative;
    text-align: center;
  }

  .link-text {
    margin-bottom: 0;
  }

  .promoBanner {
    margin: ${props => props.theme.spacing.ELEM_SPACING.SM} auto;
  }

  .promo-header-wrapper:first-child {
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.LRG};
    display: inline-block;
    ${props =>
      props.layout === 'default' ? `background-color: ${props.theme.colorPalette.white}` : ''}
  }

  &.layout-default .promo-text {
    display: block;
  }

  &.layout-alt .promoBanner {
    margin: ${props => props.theme.spacing.ELEM_SPACING.SM} auto 0;
    width: auto;
  }

  .promo-image-left {
    margin-top: 30px;
  }

  .promo-image-right {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    @media ${props => props.theme.mediaQuery.medium} {
      text-align: right;
      margin-top: 30px;
    }
  }

  .promo-text:nth-child(2) {
    line-height: 64px;
    margin-top: -4px;
  }

  &.layout-default .promo-text:nth-child(2) {
    line-height: normal;
    margin-top: -15px;
  }

  &.layout-alt .promo-text:nth-child(2) {
    line-height: 48px;
    margin-top: -4px;
  }

  .promo-img {
    width: 100%;

    @media ${props => props.theme.mediaQuery.medium} {
      width: auto;
    }
  }

  .moduleJ__carousel-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};

    .slick-list {
      margin-right: -22%;

      @media ${props => props.theme.mediaQuery.medium} {
        margin-right: -15%;
      }

      @media ${props => props.theme.mediaQuery.large} {
        margin-right: auto;
      }
    }
  }

  &.layout-alt .moduleJ__carousel-wrapper {
    margin-top: 0;
  }

  .image-link {
    display: flex;
    align-items: center;
    width: 89px;
    height: 110px;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 146px;
      height: 180px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 142px;
      height: 175px;
    }

    @media ${props => props.theme.mediaQuery.xlarge} {
      width: 175px;
      height: 217px;
    }
  }

  .cta-btn {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;
