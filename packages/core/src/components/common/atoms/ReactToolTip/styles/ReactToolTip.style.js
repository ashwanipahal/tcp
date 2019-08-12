import { css } from 'styled-components';

// need to handle for direction props.

const tooltipStyle = css`
  position: relative;
  cursor: default;

  .tooltip-bubble {
    width: fit-content;
    display: table;
    position: absolute;
    z-index: 99;
    bottom: 100%;
    padding-bottom: 4px;
    left: ${props => (props.aligned === 'right' ? '100%' : '50%')};
    transform: ${props => (props.aligned === 'right' ? 'translateX(-100%)' : 'translateX(-50%)')};
    min-width: ${props => (props.minWidth ? `min-width: ${props.minWidth}` : '100px')};

    ::after {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid ${props => props.theme.colors.WHITE};
      bottom: 0;
      left: ${props => (props.aligned === 'right' ? '100%' : '50%')};
      transform: ${props => (props.aligned === 'right' ? 'translateX(-100%)' : 'translateX(-50%)')};
      content: '';
      position: absolute;
    }
  }

  .tooltip-message {
    background: ${props => props.theme.colors.WHITE};
    border-radius: 3px;
    line-height: normal;
    padding: 20px;
    text-align: left;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    box-shadow: 0 0 4px 3px rgba(163, 162, 162, 0.31);
  }
`;

export default tooltipStyle;
