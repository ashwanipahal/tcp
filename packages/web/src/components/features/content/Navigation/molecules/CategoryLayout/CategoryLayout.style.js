import { css } from 'styled-components';

export default css`
  .shop-by-size-links {
    padding: 10px 14px 10px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      @media ${props => props.theme.mediaQuery.large} {
        flex-wrap: unset;
        justify-content: space-between;
      }
    }
  }
  .shop-by-size-links li {
    cursor: pointer;
    border: 1px solid ${props => props.theme.colorPalette.gray[800]};
    width: 40px;
    height: 40px;
    border-radius: 20px 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-bottom: 16px;
    margin-right: 18px;
    &:nth-child(n + 5) {
      margin-right: 0;
    }
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 38px;
      height: 38px;
    }
  }
  .shop-by-size-links li:hover {
    border: solid 1px
      ${props =>
        props.theme.isGymboree
          ? props.theme.colorPalette.orange[800]
          : props.theme.colorPalette.blue[800]};
    background-color: ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.orange[100]
        : props.theme.colorPalette.blue[100]};
  }
  .l2-image-banner {
    display: none;
  }
  .l2-nav-link {
    display: flex;
    align-items: center;
    padding: 18px 14px 17px 28px;
    line-height: 1.15;
    &.highlighted {
      color: ${props => props.theme.colorPalette.secondary.main};
    }
  }

  .l2-nav-category-heading {
    margin: 0;
    padding: 18px 14px 17px 14px;
    background-color: ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.orange[50]
        : props.theme.colorPalette.blue[50]};
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .l2-nav-category {
      margin: 0;
    }
  }
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .l2-nav-category {
      margin: 0;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .l2-nav-category {
      box-sizing: border-box;
      border-right: 1px solid ${props => props.theme.colorPalette.gray[500]};
      margin-top: 36px;
      margin-bottom: 36px;
    }
    .l2-nav-category.shop-by-size-category {
      border-right: 0;
    }
    .l2-nav-category-header {
      margin-bottom: 24px;
    }
    .l2-nav-category-empty-header {
      margin-bottom: 61px;
    }
    .l2-nav-category-heading {
      padding: 0 0 15px 0;
      background: none;
    }
    .l2-nav-category-divider {
      display: inline-block;
      position: absolute;
      width: 88px;
      height: 1px;
      border-radius: 0.5px;
      background-color: ${props => props.theme.colorPalette.primary.main};
    }
    .l2-nav-category-links {
      display: flex;
      ul {
        width: 100%;
        flex-grow: 1;
      }
      ul.half-width {
        width: 50%;
      }

      .nav-bar-item-label {
        border-bottom: 2px solid ${props => props.theme.colorPalette.white};
        padding-bottom: 4px;
      }
      .nav-bar-item-label:hover {
        width: auto;
        border-color: ${props =>
          props.theme.isGymboree
            ? props.theme.colorPalette.primary.main
            : props.theme.colors.ANCHOR.SECONDARY};
      }
    }
    .l2-nav-link {
      display: block;
      padding: 11px 0 5px 0;
      line-height: 1.11;
    }
    .shop-by-size-links {
      display: flex;
      padding: 0;
      ul {
        display: block;
      }
      li {
        margin-right: 30px;
      }
    }
    .l2-image-banner {
      display: block;
      margin-top: 36px;
    }
    .l2-image-banner-image {
      width: 100%;
      max-width: 210px;
      height: 100%;
      max-height: 330px;
    }
    .l2-image-banner-image-half {
      width: 100%;
      max-width: 210px;
      height: 100%;
      max-height: 138px;
    }
    .l2-image-banner-link {
      .nav-bar-l1-item-label {
        width: auto;
      }
      .icon-arrow {
        margin-left: 10px;
        width: 10px;
      }
      span {
        display: inline-block;
      }
    }
  }
`;
