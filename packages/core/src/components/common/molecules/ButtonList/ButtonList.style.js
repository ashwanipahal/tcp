import { css } from 'styled-components';

export default css`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;

  > div:first-child {
    margin: 0 auto;
  }

  .stacked-button {
    border-collapse: collapse;
    flex-grow: 1;
    width: 50%;
  }
  .stacked-cta-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .link-button {
    border-bottom: 2px solid white;
    padding-bottom: 2px;
    margin-right: 16px;
  }
  .scroll-cta-wrapper {
    display: flex;
    flex-wrap: nowrap;
  }
  .scroll-button {
    margin-left: 20px;
    min-width: auto;
  }
  .img-wrapper {
    display: inline-block;
    margin-right: 36px;
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
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .stacked-button {
      margin-right: 15px;
    }
    .stacked-cta-wrapper {
      display: flex;
      flex-wrap: nowrap;
    }

    .img-wrapper {
      max-width: 70px;
      margin-right: 33px;
    }

    .scroll-button {
      flex-grow: 0;
      margin-left: 0;
      margin-right: 15px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .stacked-button,
    .scroll-button {
      min-width: 210px;
    }

    .link-button {
      font-size: ${props => props.theme.typography.fontSizes.fs20};
      font-weight: ${props => props.theme.typography.fontWeights.black};
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
