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

  .stacked-cta-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  &.link-comp-wrapper {
    justify-content: center;
  }
  .link-button-wrapper-class {
    border-color: white;
    &:hover {
      border-color: white;
    }
  }

  .scroll-cta-wrapper {
    display: flex;
    flex-wrap: nowrap;
    padding-right: 15px;
  }
  .scroll-button {
    margin-left: 15px;
    white-space: nowrap;
  }
  .img-wrapper {
    display: inline-block;
    margin: 0 18px;
    min-width: 70px;
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
  }

  @media ${props => props.theme.mediaQuery.medium} {
    > div:first-child {
      margin: 0 auto;
    }
    .stacked-button {
      width: 100%;
      margin-left: 15px;
    }
    .stacked-cta-wrapper {
      display: flex;
      flex-wrap: nowrap;
      padding-right: 15px;
    }

    .img-wrapper {
      max-width: 70px;
      margin: 0 17px;
    }

    .scroll-button {
      flex-grow: 0;
      width: 50%;
      white-space: normal;
    }

    &.scroll-comp-wrapper {
      flex-wrap: nowrap;
      padding-right: 15px;
    }

    .scroll-cta-wrapper {
      padding-right: 0;
    }
    .scroll-cta-wrapper-class {
      width: 100%;
      height: 100%;
    }

    .stacked-cta-wrapper-class {
      width: 100%;
      height: 100%;
    }

    &.stack-comp-wrapper {
      flex-wrap: nowrap;
      padding-right: 15px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .stacked-button,
    .scroll-button {
      min-width: 210px;
    }

    .stacked-button {
      flex-grow: 0;
      width: auto;
    }
    .scroll-button {
      width: auto;
    }

    &.stack-comp-wrapper,
    &.scroll-comp-wrapper {
      justify-content: center;
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
