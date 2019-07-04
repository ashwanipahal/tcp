import { css } from 'styled-components';
import theme from '../themes/TCP';

const { fonts, breakpoints } = theme;
export default css`
  body {
    font-family: ${fonts.primaryFontFamily};
    overflow-x: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    max-width: ${breakpoints.xlarge};
    margin: 0 auto;
  }

  input[type='text']::-ms-clear {
    display: none;
  }

  .right {
    float: right;
  }

  .left {
    float: left;
  }

  .clearfix {
    clear: both;
  }

  .textRight {
    text-align: right;
  }

  &.focus-styling {
    &:focus {
      outline: 1px dashed black;
    }

    &:focus:not(.focus-visible) {
      outline: none;
    }
  }

  .is-hidden {
    display: none !important;
  }

  .is-visible {
    display: block;
  }

  .visually-hidden {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    padding: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
  }

  figure {
    margin: 0;
    padding: 0;
  }

  img {
    max-width: 100%;
  }

  .full-bleed {
    width: 100%;
  }

  .margin-none {
    margin: 0;
  }

  ul {
    padding: 0px;
    margin: 0px;
  }

  li {
    list-style-type: none;
  }

  p {
    margin: 0;
  }

  ${props => {
    return Object.keys(props.theme.spacing.ELEM_SPACING).map(key => {
      return `.elem--mr__${key} {
        margin-right: ${props.theme.spacing.ELEM_SPACING[key]}
      }
      .elem--mb__${key} {
        margin-bottom: ${props.theme.spacing.ELEM_SPACING[key]}
      }
      .elem--ml__${key} {
        margin-left: ${props.theme.spacing.ELEM_SPACING[key]}
      }
      .elem--mt__${key} {
        margin-top: ${props.theme.spacing.ELEM_SPACING[key]}
      }
      .elem--pr__${key} {
        padding-right: ${props.theme.spacing.ELEM_SPACING[key]}
      }
      .elem--pb__${key} {
        padding-bottom: ${props.theme.spacing.ELEM_SPACING[key]}
      }
      .elem--pl__${key} {
        padding-left: ${props.theme.spacing.ELEM_SPACING[key]}
      }
      .elem--pt__${key} {
        padding-top: ${props.theme.spacing.ELEM_SPACING[key]}
      }`;
    });
  }}

  ${props => {
    return Object.keys(props.theme.spacing.LAYOUT_SPACING).map(key => {
      return `
      .layout--pr__${key} {
        padding-right: ${props.theme.spacing.LAYOUT_SPACING[key]}
      }
      .layout--pb__${key} {
        padding-bottom: ${props.theme.spacing.LAYOUT_SPACING[key]}
      }
      .layout--pl__${key} {
        padding-left: ${props.theme.spacing.LAYOUT_SPACING[key]}
      }
      .layout--pt__${key} {
        padding-top: ${props.theme.spacing.LAYOUT_SPACING[key]}
      }`;
    });
  }}
`;
