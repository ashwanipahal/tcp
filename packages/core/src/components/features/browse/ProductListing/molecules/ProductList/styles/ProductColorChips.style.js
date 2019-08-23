import { css } from 'styled-components';
import { buttonPrev, buttonNext } from './CommonStyle';

const commonButtonCss = css`
  top: 50%;
  width: 25px;
  height: 34px;

  ::before {
    border-left: 2px solid ${props => props.theme.colors.DARK};
    border-top: 2px solid ${props => props.theme.colors.DARK};
    height: 7px;
    width: 7px;
  }
`;

const styles = css`
  vertical-align: top;
  position: relative;
  opacity: 1;
  width: 100%;

  .button-next {
    ${buttonNext}
    ${commonButtonCss}
  }

  .button-prev {
    ${buttonPrev}
    ${commonButtonCss}
  }

  .content-colors {
    display: flex;
    width: 100%;
    padding: 0;
    margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0px
      ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .color-swatches-container {
    margin-left: 15px;
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
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .content-colors-button {
      margin-right: 14px;
      width: 20px;
      height: 20px;
    }
    .color-swatches-container {
      margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    }
  }
`;

export default styles;
