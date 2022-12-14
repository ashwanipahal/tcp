import { css } from 'styled-components';

const ModalStyle = css`
  &.TCPModal__Overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: ${props => props.theme.colors.MODAL_OVERLAY};
    z-index: ${props => props.theme.zindex.zModal};
  }
  .TCPModal__hidden_header_label {
    display: none;
  }
  div.TCPModal__InnerContent {
    background: ${props => props.theme.colors.WHITE};
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: ${props => (props.noPadding ? '0' : props.theme.spacing.ELEM_SPACING.LRG)};
    transform: translate(-50%, -50%);
    overflow-y: auto;
    height: 100%;
    width: ${props => (props.fixedWidth ? '100%' : '')};
    @media ${props => props.theme.mediaQuery.medium} {
      height: ${props => (props.heightConfig ? props.heightConfig.height : 'auto')};
      max-width: ${props => (props.fixedWidth ? props.maxWidth : '')};
      min-height: ${props => (props.fixedWidth ? props.minHeight : '')};
      width: ${props => (props.widthConfig ? props.widthConfig.medium : '')};
      max-height: ${props => (props.heightConfig ? props.heightConfig.maxHeight : '')};
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: ${props => (props.widthConfig ? props.widthConfig.large : '')};
      min-height: ${props => (props.heightConfig ? props.heightConfig.minHeight : '')};
      height: ${props => (props.heightConfig ? props.heightConfig.height : 'auto')};
      max-height: ${props => (props.heightConfig ? props.heightConfig.maxHeight : '')};
    }

    ${props =>
      props.standardHeight
        ? `@media ${props.theme.mediaQuery.medium} {
      max-height:90%
    } `
        : ''}
  }
  .Modal_Heading {
    font-family: ${props => props.theme.typography.fonts.secondary};
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-top: 0;
    height: 20px;
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .Modal-Header {
    ${props =>
      props.stickyHeader
        ? `
    top:0px;
    position:sticky;
    background:#ffffff;
    `
        : ''};
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
export default ModalStyle;
