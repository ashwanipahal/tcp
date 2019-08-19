import { css } from 'styled-components';

// need to handle for direction props.

const transformX100 = 'translateX(-100%)';
const transformX50 = 'translateX(-50%)';

const tooltipStyle = css`
  position: relative;
  cursor: default;

  .tooltip-bubble {
    width: fit-content;
    display: table;
    position: absolute;
    z-index: 99;
    bottom: 100%;
    padding-bottom: 10px;
    left: ${props => (props.aligned === 'right' ? '26px' : '50%')};
    transform: ${props => (props.aligned === 'right' ? transformX100 : transformX50)};
    min-width: ${props => (props.minWidth ? `${props.minWidth}` : '320px')};

    ::after {
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid ${props => props.theme.colors.WHITE};
      bottom: 0;
      transform: ${props => (props.aligned === 'right' ? transformX100 : transformX50)};
      content: '';
      position: absolute;
      right: 0;
    }

    ::before {
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-top: 11px solid rgba(163, 162, 162, 0.31);
      transform: ${props => (props.aligned === 'right' ? transformX100 : transformX50)};
      content: '';
      position: absolute;
      right: -8px;
      bottom: -2px;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      left: 36px;
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
