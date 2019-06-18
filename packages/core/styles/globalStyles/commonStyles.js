import { css } from 'styled-components';
import theme from '../themes/TCP';

const { fonts, breakpoints } = theme;
export default css`
  body {
    font-family: ${fonts.primaryFontFamily};
    overflow-x: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    max-width: ${breakpoints.xlarge};
    margin: 0 auto;
  }

  input[type='text']::-ms-clear {
    display: none;
  }

  .right {
    float: right;
  }

  .left {
    float: left;
  }

  .clearfix {
    clear: both;
  }

  &.focus-styling {
    &:focus {
      outline: 1px dashed black;
    }

    &:focus:not(.focus-visible) {
      outline: none;
    }
  }

  .is-hidden {
    display: none !important;
  }

  .is-visible {
    display: block;
  }

  .visually-hidden {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    padding: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
  }

  figure {
    margin: 0;
    padding: 0;
  }

  img {
    max-width: 100%;
  }

  .full-bleed {
    width: 100%;
  }

  .margin-none {
    margin: 0;
  }

  .header-promo-item__contents span:first-child {
    margin-right: 5px;
  }

  .header-promo-area--mobile {
    display: block;
    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }

    & .slick-slider {
      margin: 0 !important;
      padding: 0 !important;
    }

    & .slick-prev {
      z-index: 20;
    }

    & .slick-next {
      z-index: 20;
    }
  }

  .header-promo-item__icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-promo-item__icon--slot1 {
    background-color: ${props => props.theme.colors.BRAND.BOYS};
  }

  .header-promo-item__icon--slot2 {
    background-color: ${props => props.theme.colors.PRIMARY.GREEN};
  }

  .header-promo-item__icon--slot3 {
    background-color: ${props => props.theme.colors.BRAND.PRIMARY};
  }

  .header-promo-area--desktop {
    display: none;
    @media ${props => props.theme.mediaQuery.large} {
      display: block;
    }
  }
`;
