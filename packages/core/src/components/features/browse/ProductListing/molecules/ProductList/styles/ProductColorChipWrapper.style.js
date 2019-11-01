import { css } from 'styled-components';
import { arrowWrapper } from './CommonStyle';

const styles = css`
  vertical-align: top;
  position: relative;
  opacity: 1;
  width: 100%;
  .color-swatches-mobile-view {
    display: flex;
  }
  .color-swatches-desktop-view {
    display: none;
  }

  .arrowRightWrapper {
    ${arrowWrapper}
    transform: rotate(180deg);
    right: 0;
    &:hover {
      cursor: pointer;
    }
  }

  .arrowImg {
    transform: rotate(180deg);
    height: 15px;
    width: 6px;
  }

  .content-colors {
    display: flex;
    padding: 0;
    margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0px
      ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .color-swatches-container {
    margin-left: 19px;
  }

  .product-color-chip-image {
    height: 100%;
    width: 100%;
  }

  .content-colors-button {
    margin-right: 6px;
    font-size: 0;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: inline;
    overflow: hidden;
    background: transparent;
    padding: 0;
    border: 0;

    &.active {
      border: 1px solid ${props => props.theme.colors.DARK};
      padding: 1px;
      .product-color-chip-image {
        border-radius: 50%;
      }
    }
    &:focus {
      outline: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .content-colors-button {
      margin-right: 14px;
      width: 20px;
      height: 20px;
    }
    .color-swatches-mobile-view {
      display: none;
    }
    .color-swatches-desktop-view {
      display: flex;
    }
  }
`;

export default styles;
