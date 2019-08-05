import * as React from 'react';
import BodyCopy from '../../BodyCopy';
import {
  StyledTooltip,
  StyledTooltipMessage,
  StyledTooltipBubble,
} from '../styles/ReactToolTip.style';

// @flow
type Props = {
  id: string,
  children: string,
  direction: string,
  message: string,
};

class ReactTooltip extends React.Component<Props> {
  state = {
    displayTooltip: false,
  };

  /**
   * @function hideTooltip - Hides the tooltip on the "onMouseLeave" mouse event.
   */
  hideTooltip = () => {
    this.setState({ displayTooltip: false });
  };

  /**
   * @function showTooltip - Shows the tooltip on the "onMouseOver" mouse event.
   */
  showTooltip = () => {
    this.setState({ displayTooltip: true });
  };

  /**
   * @function render - Function that renders and retunrs the tooltip component.
   */
  render() {
    const { id, children, direction, message } = this.props;
    const { displayTooltip } = this.state;
    return (
      <StyledTooltip onMouseLeave={this.hideTooltip}>
        {displayTooltip && (
          <StyledTooltipBubble id={id} direction={direction} message={message}>
            <StyledTooltipMessage>
              <BodyCopy fontSize="fs12">{message}</BodyCopy>
            </StyledTooltipMessage>
          </StyledTooltipBubble>
        )}
        <span onMouseEnter={this.showTooltip}>{children}</span>
      </StyledTooltip>
    );
  }
}

/**
 * @exports Tooltip - Default export of the Tooltip component.
 */
export default ReactTooltip;
