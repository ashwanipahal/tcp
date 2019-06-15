import { css } from 'styled-components';

export default css`
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;

  .header-topnav__promo-area--mobile {
    background-color: ${props => props.theme.colors.PRIMARY.NAVY};
    color: ${props => props.theme.colors.WHITE};
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    padding: 8px 0;

    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }

  .TCP_Carousel {
    margin: 0 14px;
    padding: 0 24px;
    line-height: 14px;
    text-align: center;
  }

  .slick-prev {
    background: url(/static/images/carrot-icon-mobile.svg) no-repeat center center;
    background-size: 10px 10px;
    left: 0;
    height: 10px;
    width: 6px;
    transform: rotateY(180deg) translate(0, -50%);
  }

  .slick-next {
    background: url(/static/images/carrot-icon-mobile.svg) no-repeat center center;
    background-size: 6px 10px;
    right: 0;
    height: 10px;
    width: 6px;
    transform: translate(0, -50%);
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .header-topnav__promo-area--tablet {
      display: none;
    }
  }
`;
