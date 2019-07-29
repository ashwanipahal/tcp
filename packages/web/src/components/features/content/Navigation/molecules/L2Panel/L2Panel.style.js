import { css } from 'styled-components';

export default css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
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
    left: 14px;
    background: url('/static/images/carrot-medium-left-gray.svg');
    width: 10px;
    height: 18px;
  }
  .l1-label {
    padding: 18px 0;
  }
  .sizes-rage-background {
    background: #f3f3f3;
    width: 100%;
    min-height: 40px;
    text-align: center;
    position: relative;
  }

  .l2-nav-link {
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
    top: 71px;
    .s-display-none {
      display: block;
    }
    .icon-back,
    .l1-label,
    .nav-bar-item-sizes-range {
      display: none;
    }
    .l2-nav-category {
      border-right: 1px solid #c3c3c3;
      margin: 36px 30px 36px 0;
    }
    .l2-nav-category-header {
      margin-bottom: 24px;
    }
    .l2-nav-category-heading {
      padding: 0 0 15px 0;
      background: none;
    }
    .l2-nav-category-divider {
      display: inline-block;
      position: absolute;
      width: 80px;
      height: 1px;
      border-radius: 0.5px;
      background-color: #439ad4;
    }
    .l2-nav-category-links {
      display: flex;
      ul {
        flex-grow: 1;
      }
    }
    .l2-nav-link {
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
      width: 210px;
      height: 330px;
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
