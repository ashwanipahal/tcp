import { css } from 'styled-components';

const getColorCode = props => {
  return props.color.code
    ? props.theme.colorPalette[props.color.tint][props.color.code]
    : props.theme.colorPalette[props.color.tint];
};

const StyledModal = css`
  position: fixed;
  margin: auto;
  min-width: 375px;
  width: auto;
  height: auto;
  right: ${props => (props.variation === 'primary' ? '0' : '')};
  left: ${props => (props.variation === 'secondary' ? '0' : '')};
  z-index: 1;
  .dialog__content {
    position: fixed;
    background-color: ${props => props.theme.colorPalette.white};
  }
  .modal__bar {
    height: 8px;
    width: 100%;
    background-color: ${props =>
      props.color ? getColorCode(props) : props.theme.colorPalette.gray[600]};
  }
  .modal__triangle {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid
      ${props => (props.color ? getColorCode(props) : props.theme.colorPalette.gray[600])};
    position: absolute;
    top: -10px;
  }
  .modal__content {
    overflow-y: auto;
  }
`;

export default StyledModal;
