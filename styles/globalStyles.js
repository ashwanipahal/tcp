import { css } from 'styled-components';
import { rem } from 'polished';
import theme from './theme';

const { fonts, colors, padding, mediaQuery } = theme;
export default css`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${fonts.primaryFontFamily};
    overflow-x: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 320px;
    width: 100%;

    @media ${mediaQuery.medium} {
      &.modal-open {
        position: fixed;
      }
    }

    &.-scrollLocked {
      overflow: hidden;
      position: fixed;
    }
  }

  main {
    position: relative;
  }

  .main-wrapper {
    flex: 1;
    padding-top: ${padding.paddingExtraLarge};

    @media ${mediaQuery.medium} {
      padding-top: 95px;
    }
  }

  .non-supporting-nav-view {
    padding-top: ${padding.paddingExtraLarge};
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

  button,
  input,
  optgroup,
  select,
  textarea {
    border-radius: 0;
    font-family: ${fonts.primaryFontFamily};
    letter-spacing: inherit;
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

  .container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .main-layout {
    &:focus {
      outline: none;
    }

    &.focus-visible {
      outline: 1px dashed ${colors.BRAND.PRIMARY};
    }
  }

  button {
    &.add-cart {
      background-color: ${colors.PRIMARY.GRAY};
      color: ${colors.WHITE};
      text-align: center;
      cursor: pointer;
      padding: 10px 35px;
    }
  }

  a,
  button {
    &.-cta {
      padding: 12px 20px;
      border: 0;
      cursor: pointer;

      &.-primary {
        background-color: ${colors.TEXT.RED};
        color: ${colors.WHITE};

        &:disabled,
        &.disabled {
          border: none;
          background-color: ${colors.PRIMARY.LIGHTGRAY} !important;
        }

        &:active,
        &:focus {
          background-color: ${colors.PROMO.RED};
        }
      }

      &.-secondary {
        background-color: ${colors.WHITE};
        color: ${colors.BLACK};
        border: 1px solid ${colors.BLACK};
        line-height: 1;

        &:focus,
        &:hover,
        &:active {
          background-color: ${colors.BLACK};
          color: ${colors.WHITE};
          border: 0;
        }
      }

      &.-tertiary {
        background-color: ${colors.BLACK};
        color: ${colors.WHITE};
        border: 1px solid ${colors.BLACK};
        font-weight: ${fonts.fontWeight.medium};

        &:focus,
        &:active,
        &:hover {
          background-color: ${colors.TEXT.LIGHTGRAY};
          color: ${colors.WHITE};
          border: 1px solid ${colors.PRIMARY.DARK};
        }

        &:disabled,
        &.disabled {
          border: none;
          background-color: ${colors.PRIMARY.LIGHTGRAY} !important;
        }
      }
    }
  }

  button,
  a,
  input {
    border: none;

    &:focus {
      outline: 1px dashed ${colors.BLACK};
    }

    &:focus:not(.focus-visible) {
      outline: none;
    }
  }

  ul {
    &.-noBullets:not(.row) {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    &.-noBullets.row {
      list-style-type: none;
      margin-top: 0;
      margin-bottom: 0;
      padding: 0;
    }

    &.-inline {
      li {
        display: inline-block;
      }
    }
  }

  .collapsible-section {
    margin-bottom: 20px;
    max-height: 250px;
    overflow-y: hidden;
    transition: max-height 1.5s linear;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

    &.is-expanded {
      overflow-y: auto;
      max-height: 2000px;
    }
  }

  .pac-container {
    max-height: 240px;
    font-family: ${fonts.primaryFontFamily};
    background-color: ${colors.PRIMARY.GRAY};
    overflow: scroll;
    overflow-x: hidden;
    box-shadow: none;
    border: 1px solid ${colors.TEXT.LIGHTGRAY};
    border-top: none;

    &::after {
      display: none;
    }

    .pac-item {
      padding: ${rem(padding.paddingNormal)} ${rem(padding.paddingSemiLarge)}
        ${rem(padding.paddingNormal)} ${rem(padding.paddingExtraSmall)};
      color: ${colors.BLACK};
      font-size: ${rem(fonts.fontSize.body.small.primary)};
      line-height: 1.15;
      letter-spacing: normal;
      min-height: 60px;
      border-top: 1px solid ${colors.TEXT.LIGHTGRAY}; /* @TODO: Non-standard color */
      border-right: 1px solid ${colors.TEXT.LIGHTGRAY}; /* @TODO: Non-standard color */
      border-right: none;

      .pac-item-query {
        font-size: ${rem(fonts.fontSize.body.small.primary)};

        .pac-matched {
          font-weight: ${fonts.fontWeight.normal};
        }
      }

      &.pac-item-selected,
      &:hover {
        background-color: ${colors.PRIMARY.GRAY};
      }
    }

    .pac-icon-marker {
      display: none;
    }
  }

  .collapsible-container {
    font-family: ${fonts.primaryFontFamily};
    padding: ${rem(padding.paddingNormal)} ${rem(padding.paddingNormal)}
      ${rem(padding.paddingLarge)};
    border-top: 2px solid ${colors.BLACK};
    background-color: ${colors.WHITE};
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    overflow-x: hidden;

    @media ${mediaQuery.medium} {
      padding: ${rem(padding.paddingMedium)} ${rem(padding.paddingMedium)}
        ${rem(padding.paddingLarge)};
    }

    .section-title {
      font-size: ${rem(fonts.fontSize.body.small.quaternary)};
      font-weight: ${fonts.fontWeight.medium};
      line-height: 1.5;
      letter-spacing: 1.4px;
      margin-bottom: 40px;
    }

    .user-message {
      padding-bottom: ${rem(padding.paddingMedium)};
    }

    .valid-icon {
      float: right;
      color: ${colors.TEXT.GREEN};
      font-size: ${rem(fonts.fontSize.icon.tertiary)};
    }

    @media ${mediaQuery.medium} {
      .section-title {
        font-size: ${rem(fonts.fontSize.body.small.tertiary)};
        line-height: 1.29;
        letter-spacing: 1.6px;
        margin-bottom: 30px;
      }
    }
  }

  .overflow-hidden-x {
    overflow-x: hidden;
  }
`;
