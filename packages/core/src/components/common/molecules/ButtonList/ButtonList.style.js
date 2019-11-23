import { css } from 'styled-components';

export default css`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: ${props => (props.buttonListVariation === 'stackedCTAList' ? '0' : '20px')};

  .stacked-button {
    flex-grow: 1;
    width: 50%;

    .cta-button-text,
    button {
      width: 100%;
    }
  }

  .stacked-button:nth-of-type(even) {
    .cta-button-text,
    button {
      border-left-width: 0;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      .cta-button-text,
      button {
        border-left-width: 1px;
      }
    }
  }

  .stacked-button:nth-of-type(n + 3) {
    .cta-button-text,
    button {
      border-top-width: 0;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      .cta-button-text,
      button {
        border-top-width: 1px;
      }
    }
  }

  .stacked-cta-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  &.link-button-list-wrapper {
    justify-content: center;
    flex-wrap: nowrap;
  }
  .link-button-wrapper-class {
    white-space: nowrap;
    letter-spacing: 0.3px;
    margin: 0 8px;
    &:hover {
      border-bottom-color: ${props => props.theme.colorPalette.primary.main};
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 21px;
    }
  }

  .scroll-cta-wrapper {
    display: flex;
    flex-wrap: nowrap;
    padding-top: 6px;
  }
  .scroll-button {
    margin-left: 9px;
    white-space: nowrap;
  }

  .scroll-button:nth-child(1) {
    margin-left: 16px;
  }

  .scroll-button:nth-last-child(1) {
    padding-right: 16px;
  }

  &.no-scrollable-cta .scroll-button:nth-last-child(1),
  &.no-scrollable-cta .scroll-button:nth-child(1) {
    margin-left: 0;
    padding-right: 0;
  }

  .img-wrapper {
    display: inline-block;
    margin: 0 19px;
    min-width: 62px;
    text-align: center;
  }

  .img-wrapper:nth-child(1) {
    margin-left: 38px;
  }

  &.no-scrollable-cta .img-wrapper:nth-child(1) {
    margin-left: 19px;
  }

  .image-cta {
    border-radius: 35px;
    width: 60px;
    height: 60px;
  }

  .image-comp {
    color: white;
    text-align: center;
    width: 64px;
  }

  &.scroll-button-list-wrapper {
    overflow-x: scroll;
    flex-wrap: nowrap;
    scrollbar-width: none;
    padding-top: 6px;

    &::-webkit-scrollbar {
      display: none;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
      scrollbar-width: auto;
      padding-top: 8px;
    }
  }

  &.scroll-button-list-wrapper.no-scrollable-cta {
    justify-content: center;
  }

  .stacked-cta-wrapper-class {
    font-size: 13px;
  }
  &.additional-button-list {
    display: none;
  }
  &.is-mobile-visible {
    display: block;
  }
  .is-mobile-hidden {
    display: none;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    padding-bottom: 16px;
    .stacked-button {
      width: 100%;
      margin-left: 9px;
      :first-child {
        margin-left: 0;
      }
    }

    .stacked-button .cta-button-text,
    .stacked-button button {
      width: 140px;
      white-space: nowrap;
    }

    .scroll-button {
      margin-left: 9px;
      flex-grow: 0;
      width: 50%;
      white-space: normal;
    }

    .scroll-button button,
    .scroll-button .cta-button-text {
      width: 140px;
      white-space: nowrap;
    }

    .scroll-button:nth-child(1) {
      margin-left: 0;
    }

    .scroll-button:nth-last-child(1) {
      padding-right: 0;
    }

    .stacked-cta-wrapper {
      display: flex;
      flex-wrap: nowrap;
      padding-right: 15px;
    }

    .img-wrapper {
      margin: 0 26px;
    }

    .img-wrapper:nth-child(1) {
      margin-left: 26px;
    }

    &.scroll-button-list-wrapper {
      flex-wrap: nowrap;
    }

    .scroll-cta-wrapper {
      padding-right: 0;
      padding-top: 8px;
    }
    .scroll-cta-wrapper-class {
      width: 100%;
      height: 100%;
    }

    .stacked-cta-wrapper-class {
      width: 100%;
      height: 100%;
    }

    &.scroll-button-list-wrapper,
    &.stacked-button-list-wrapper {
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;

      .scroll-button,
      .stacked-button {
        width: auto;
        flex-grow: initial;
      }
    }

    &.wrapped-button-text .stacked-button,
    &.wrapped-button-text .scroll-button {
      margin: 0 8px;
      .cta-button-text,
      button {
        white-space: normal;
        width: 110px;
      }
    }

    &.scroll-button-list-wrapper.wrapped-button-text .image-comp {
      white-space: normal;
      width: 62px;
    }

    &.is-tablet-visible {
      display: block;
    }

    &.is-tablet-hidden {
      display: none;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    padding-bottom: 24px;

    .stacked-button,
    .scroll-button {
      min-width: 210px;
      margin: 0 15px;
    }

    .stacked-button {
      flex-grow: 0;
      width: auto;
      .cta-button-text,
      button {
        width: 210px;
      }
    }
    .scroll-button {
      width: auto;
    }

    .stacked-button:last-child,
    .scroll-button:last-child {
      margin-right: 0;
    }

    &.stacked-button-list-wrapper,
    &.scroll-button-list-wrapper {
      justify-content: center;
      display: flex;
      flex-wrap: nowrap;
      padding-top: 0;
    }
    .stacked-cta-wrapper-class {
      font-size: 14px;
      color: ${props => props.theme.colorPalette.BUTTON[props.fill || 'WHITE'].TEXT};
    }

    &.stacked-button-list-wrapper .stacked-button,
    &.scroll-button-list-wrapper .scroll-button {
      .cta-button-text,
      button {
        width: 210px;
      }
    }

    &.wrapped-button-text .stacked-button,
    &.wrapped-button-text .scroll-button {
      margin: 0 15px;
    }
    &.is-desktop-visible {
      display: block;
    }

    &.is-desktop-hidden {
      display: none;
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
