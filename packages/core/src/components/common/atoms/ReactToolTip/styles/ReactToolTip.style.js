import styled from 'styled-components';

// const defaultStyle = {
//   background: 'white',
//   color: 'black',
// };

export const tooltipCSS = {
  bottom: `top: 100%;
  left: 50%;
  padding-top: 4px;
  transform: translateX(-50%);
  ::after {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid white;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }`,
  left: `top: 50%;
  right: 100%;
  padding-right: 4px;
  transform: translateY(-50%);
  ::after {
    border-left: 4px solid white;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }`,
  right: `top: 50%;
    left: 100%;
    padding-left: 4px;
    transform: translateY(-50%);
    ::after {
      border-right: 4px solid white;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }`,
  top: `bottom: 100%;
      left: 50%;
      padding-bottom: 4px;
      transform: translateX(-50%);
      ::after {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid white;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
  }`,
};

export const StyledTooltipBubble = styled.div`
  width: fit-content;
  display: table;
  position: absolute;
  z-index: 99;
  ::after {
    content: '';
    position: absolute;
  }
  ${props => tooltipCSS[props.direction.toLowerCase()]}
`;

export const StyledTooltip = styled.span`
  position: relative;
  cursor: default;
`;

/**
 * @description - Tooltip text renders inside this "div" element.
 */
export const StyledTooltipMessage = styled.div`
  background: white;
  border-radius: 3px;
  line-height: normal;
  padding: 20px;
  text-align: left;
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  box-shadow: 0 0 4px 3px rgba(163, 162, 162, 0.31);
`;
