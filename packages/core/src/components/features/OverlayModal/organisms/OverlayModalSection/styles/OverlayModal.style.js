import { css } from 'styled-components';

const iconSpacing = '15px';

const mprplcce = props =>
  props.plccUser ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const StyledModal = css`
  position: absolute;
  margin: auto;
  width: 374px;
  height: auto;
  right: ${props => (props.variation === 'primary' ? '0' : '')};
  left: ${props => (props.variation === 'secondary' ? '0' : '')};
  z-index: 999;
  @media ${props => props.theme.mediaQuery.smallOnly} {
    position: fixed;
    top: 0 !important;
    height: 100%;
    width: 100%;
  }
  .dialog__content {
    background-color: ${props => props.theme.colorPalette.white};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
    width: 100%;
    overflow-y: auto;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      max-height: none !important;
      height: 100%;
    }
  }
  .modal__bar {
    position: absolute;
    height: 8px;
    width: 100%;
    background-color: ${mprplcce};
    z-index: 99;
  }
  .modal__triangle {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid ${mprplcce};
    position: absolute;
    top: -10px;
    z-index: 99;
  }
  .modal__closeIcon {
    background: transparent url('/static/images/modal-close.svg') no-repeat 0 0;
    border: none;
    cursor: pointer;
    position: absolute;
    right: ${iconSpacing};
    top: ${iconSpacing};
    height: ${iconSpacing};
    width: ${iconSpacing};
  }
`;

export default StyledModal;
