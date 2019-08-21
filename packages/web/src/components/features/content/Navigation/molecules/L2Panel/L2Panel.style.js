import { css } from 'styled-components';

export default css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 10;

  .shop-by-size-links {
    padding: 10px 14px 10px;
    ul {
      display: flex;
    }
  }
  .shop-by-size-links li {
    cursor: pointer;
    border: 1px solid #6b6b6b;
    width: 40px;
    height: 40px;
    border-radius: 20px 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-right: 19px;
    margin-bottom: 16px;
  }
  .shop-by-size-links li:hover {
    border: solid 1px #2e6a91;
    background-color: #e2ecf3;
  }
  .l2-image-banner {
    display: none;
  }
  .icon-back {
    position: absolute;
    top: 17px;
    left: 0;
    background: url('/static/images/carrot-medium-left-gray.svg');
    width: 10px;
    height: 18px;
  }
  .l1-label {
    padding: 18px 0;
  }
  .sizes-range-background {
    min-height: 40px;
    text-align: center;
    position: relative;
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
    margin: 0 14px;
  }

  .l2-nav-link {
    display: flex;
    align-items: center;
    padding: 18px 14px 17px 14px;
    line-height: 1.15;
    &.highlighted {
      color: ${props => props.theme.colorPalette.secondary.main};
    }
  }

  .l2-nav-category-heading {
    margin: 0;
    padding: 18px 14px 17px 14px;
    background-color: #ebf7ff;
  }

  .s-display-none {
    display: none;
  }

  .dark-overlay {
    display: none;
    background-color: #1a1a1a;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100vh;
    opacity: 0.6;
    width: 100%;
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
    display: none;
    top: 76px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);

    .s-display-none {
      display: block;
    }
    .icon-back,
    .l1-label,
    .nav-bar-item-sizes-range {
      display: none;
    }
    .l2-nav-category {
      box-sizing: border-box;
      border-right: 1px solid #c3c3c3;
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
      background-color: #439ad4;
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
    }
    .l2-nav-link {
      display: block;
      padding: 13px 0 12px 0;
      line-height: 1.07;
    }
    .shop-by-size-links {
      display: flex;
      padding: 0;
      ul {
        display: block;
      }
      li {
        margin-right: 32px;
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
    .sizes-range-background {
      background: ${props => props.theme.colorPalette.gray[300]};
      width: 100%;
      border-bottom: none;
      margin: 0;
    }
  }
`;
