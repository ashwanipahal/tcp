import { css } from 'styled-components';

export default css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};

  .wrapper {
    position: relative;
    overflow: hidden;
  }

  .moduleG__carousel-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};

    .slick-list {
      margin-right: -22%;
      box-sizing: border-box;
      width: 100%;

      @media ${props => props.theme.mediaQuery.medium} {
        margin-right: -15%;
      }

      @media ${props => props.theme.mediaQuery.large} {
        margin-right: auto;
      }
    }
  }

  .focusAreaView {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px 2px;
    z-index: 1;
    height: calc(100% - 32px);
    padding: 12px 10px;

    @media ${props => props.theme.mediaQuery.small} {
      width: 60%;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      width: 21.1%;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 15%;
    }
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 24px);
      height: 1px;
      background: ${props => props.theme.colors.BLACK};
      @media ${props => props.theme.mediaQuery.medium} {
        width: calc(100% - 16px);
      }
      @media ${props => props.theme.mediaQuery.large} {
        width: calc(100% - 32px);
      }
    }
    .focusArea-plus {
      width: 31px;
      height: 31px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${props => props.theme.colors.WHITE};
      border-radius: 50%;
      border: 0.5px solid #000;
      padding: 7px;
      box-sizing: border-box;
    }
  }

  .image-link {
    display: flex;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: calc(100% - 15px);
    padding: 13px 11px;
    @media ${props => props.theme.mediaQuery.medium} {
      max-width: calc(100% - 27px);
      padding: 9px 7px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      max-width: calc(100% - 15px);
      padding: 10px 8px;
    }
    @media ${props => props.theme.mediaQuery.xlarge} {
      max-width: calc(100% - 25px);
      padding: 12px 10px;
    }
  }
  .carousel-bottom-link {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    text-align: center;
  }

  .promo-header a:nth-child(1) {
    > .link-text {
      margin-bottom: 0;
    }
  }

  .shopall_footerlink {
    font-size: ${props => props.theme.fonts.fontSize.promo1.small}px;
  }

  .right_chevron_arrow {
    margin-left: 9px;
  }

  .promo-header a:nth-child(2) {
    > .link-text {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }
`;
