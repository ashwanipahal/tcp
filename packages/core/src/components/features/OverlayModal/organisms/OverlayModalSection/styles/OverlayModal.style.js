import { css } from 'styled-components';

const getColorCode = props => {
  return props.color.code
    ? props.theme.colorPalette[props.color.tint][props.color.code]
    : props.theme.colorPalette[props.color.tint];
};

const StyledModal = css`
  position: absolute;
  margin: auto;
  width: 374px;
  height: auto;
  right: ${props => (props.variation === 'primary' ? '0' : '')};
  left: ${props => (props.variation === 'secondary' ? '0' : '')};
  z-index: 999;
  .dialog__content {
    background-color: ${props => props.theme.colorPalette.white};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    overflow-y: auto;
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
`;

export default StyledModal;
