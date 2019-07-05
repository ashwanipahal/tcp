import { css } from 'styled-components';

const ModalStyle = css`
  .TCPModal__Overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: ${props => props.theme.colors.MODAL_OVERLAY};
    z-index: ${props => props.theme.zindex.zOverlay};
  }
  div.TCPModal__InnerContent {
    background: ${props => props.theme.colors.WHITE};
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    transform: translate(-50%, -50%);
    ${props => props.theme.zindex.zModal};
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    @media ${props => props.theme.mediaQuery.medium} {
      height: auto;
      max-width: ${props => (props.fixedWidth ? props.maxWidth : '')};
      min-height: ${props => (props.fixedWidth ? props.minHeight : '')};
    }
  }
  .Modal_Heading {
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-top: 0;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
`;
export default ModalStyle;
