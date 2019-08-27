import { css } from 'styled-components';

export default css`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: ${props => (props.buttonListVariation === 'stackedCTAList' ? '0' : '20px')};

  .stacked-button {
    flex-grow: 1;
    width: 50%;

    button {
      width: 100%;
    }
  }

  .stacked-button:nth-of-type(even) {
    button {
      border-left-width: 0;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      button {
        border-left-width: 1px;
      }
    }
  }

  .stacked-button:nth-of-type(n + 3) {
    button {
      border-top-width: 0;
    }
    @media ${props => props.theme.mediaQuery.medium} {
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
    border-bottom-color: ${props => props.theme.colorPalette.white};
    white-space: nowrap;
    letter-spacing: 0.3px;
    margin: 0 8px;
    &:hover {
      border-bottom-color: ${props => props.theme.colorPalette.white};
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 16px;
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

  &.no-scrollable-cta .scroll-button:nth-child(1) {
    margin-left: 0;
  }

  .img-wrapper {
    display: inline-block;
    margin: 0 19px;
    min-width: 62px;
    text-align: center;
  }

  .image-cta {
    border-radius: 35px;
    width: 60px;
    height: 60px;
  }

  .image-comp {
    color: white;
    text-align: center;
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

      .image-comp {
        white-space: nowrap;
      }
    }
  }

  &.scroll-button-list-wrapper.no-scrollable-cta {
    justify-content: center;
  }

  .stacked-cta-wrapper-class {
    font-size: 13px;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    padding-bottom: 16px;
    > div:first-child {
      margin: 0 auto;
    }

    .stacked-button {
      width: 100%;
      margin-left: 9px;
      :first-child {
        margin-left: 0;
      }
    }

    .stacked-button button {
      width: 140px;
      white-space: nowrap;
      padding: 12px;
    }

    .scroll-button {
      margin-left: 9px;
      flex-grow: 0;
      width: 50%;
      white-space: normal;
    }

    .scroll-button button {
      width: 140px;
      white-space: nowrap;
      padding: 12px;
    }

    .scroll-button:nth-child(1) {
      margin-left: 0;
    }

    .stacked-cta-wrapper {
      display: flex;
      flex-wrap: nowrap;
      padding-right: 15px;
    }

    .img-wrapper {
      margin: 0 26px;
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
      button {
        white-space: normal;
        width: 110px;
      }
    }

    &.scroll-button-list-wrapper.wrapped-button-text .image-comp {
      white-space: normal;
      width: 62px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    padding-bottom: 24px;

    .stacked-button,
    .scroll-button {
      min-width: 210px;
      margin: 0 8px;
    }

    .stacked-button {
      flex-grow: 0;
      width: auto;
      button {
        width: 210px;
      }
    }
    .scroll-button {
      width: auto;
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
    }

    &.stacked-button-list-wrapper .stacked-button,
    &.scroll-button-list-wrapper .scroll-button {
      button {
        width: 210px;
      }
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
