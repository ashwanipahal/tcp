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
  &.link-comp-wrapper {
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

  .scroll-button:first-of-type {
    margin-left: 16px;
  }

  .img-wrapper {
    display: inline-block;
    margin: 0 19px;
    min-width: 70px;
  }

  .img-wrapper > div {
    text-align: center;
  }

  .image-cta {
    border-radius: 35px;
    width: 70px;
    height: 70px;
  }

  .image-comp {
    color: white;
    text-align: center;
  }

  &.scroll-comp-wrapper {
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

  &.scroll-comp-wrapper.no-scrollable-image-cta {
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

      button {
        width: 140px;
        white-space: nowrap;
      }
    }

    .scroll-button {
      margin-left: 9px;
      flex-grow: 0;
      width: 50%;
      white-space: normal;

      button {
        width: 140px;
        white-space: nowrap;
      }
    }

    .scroll-button:first-of-type {
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

    &.scroll-comp-wrapper {
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

    &.scroll-comp-wrapper,
    &.stack-comp-wrapper {
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;

      .scroll-button,
      .stacked-button {
        width: auto;
        flex-grow: initial;
      }
    }

    &.stack-comp-wrapper.wrapped-button-text .stacked-button,
    &.scroll-comp-wrapper.wrapped-button-text .scroll-button {
      margin: 0 8px;
      button {
        white-space: normal;
        width: 110px;
      }
    }

    &.scroll-comp-wrapper.wrapped-button-text .img-wrapper .image-comp {
      white-space: normal;
      width: 70px;
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

    &.stack-comp-wrapper,
    &.scroll-comp-wrapper {
      justify-content: center;
      display: flex;
      flex-wrap: nowrap;
      padding-top: 0;
    }
    .stacked-cta-wrapper-class {
      font-size: 14px;
    }

    &.stack-comp-wrapper .stacked-button,
    &.scroll-comp-wrapper .scroll-button {
      button {
        width: 210px;
      }
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
