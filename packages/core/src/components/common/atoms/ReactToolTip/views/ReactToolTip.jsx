import * as React from 'react';
import BodyCopy from '../../BodyCopy';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/ReactToolTip.style';

// @flow
type Props = {
  id: string,
  children: string,
  direction: string,
  message: string,
  className: string,
};

class ReactTooltip extends React.Component<Props> {
  state = {
    displayTooltip: false,
  };

  /**
   * @function showTooltip - Shows the tooltip on the "onMouseOver" mouse event.
   */
  showHideTooltip = () => {
    this.setState(prevState => ({
      displayTooltip: !prevState.displayTooltip,
    }));
  };

  /**
   * @function render - Function that renders and retunrs the tooltip component.
   */
  render() {
    const { id, children, direction, message, className } = this.props;
    const { displayTooltip } = this.state;
    return (
      <span className={className}>
        {displayTooltip && (
          <div className="tooltip-bubble" id={id} direction={direction} message={message}>
            <div className="tooltip-message">
              <BodyCopy fontSize="fs12">{message}</BodyCopy>
            </div>
          </div>
        )}
        {/* eslint-disable-next-line */}
        <span onClick={this.showHideTooltip}>{children}</span>
      </span>
    );
  }
}

/**
 * @exports Tooltip - Default export of the Tooltip component.
 */
export default withStyles(ReactTooltip, styles);
export { ReactTooltip as ReactTooltipVanilla };
