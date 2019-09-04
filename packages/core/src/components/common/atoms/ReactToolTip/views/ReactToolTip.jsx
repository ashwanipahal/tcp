import * as React from 'react';
import BodyCopy from '../../BodyCopy';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/ReactToolTip.style';
import { isClient } from '../../../../../utils/index';

// @flow
type Props = {
  id: string,
  children: string,
  direction: string,
  message: string,
  className: string,
  showOn: string,
};

class ReactTooltip extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  state = {
    displayTooltip: false,
  };

  componentWillMount() {
    if (isClient()) {
      document.body.addEventListener('click', this.handleClick);
    }
  }

  componentWillUnmount() {
    if (isClient()) {
      // remember to remove all events to avoid memory leaks
      document.body.removeEventListener('click', this.handleClick);
    }
  }

  onClickOutside = () => {
    this.setState({
      displayTooltip: false,
    });
  };

  handleClick = event => {
    const { current } = this.node; // get container that we'll wait to be clicked outside
    const { target } = event; // get direct click event target
    // if there is no proper callback - no point of checking
    // if (typeof onClickOutside !== 'function') {
    //   return;
    // }

    // if target is container - container was not clicked outside
    // if container contains clicked target - click was not outside of it
    if (target !== current && !current.contains(target)) {
      this.onClickOutside(event); // clicked outside - fire callback
    }
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
    const { id, children, direction, message, className, showOn } = this.props;
    const { displayTooltip } = this.state;
    return (
      <span className={className} ref={this.node}>
        {displayTooltip && (
          <div className="tooltip-bubble" id={id} direction={direction} message={message}>
            <div className="tooltip-message">
              <BodyCopy fontSize="fs12">{message}</BodyCopy>
            </div>
          </div>
        )}
        {/* eslint-disable-next-line */}
        {showOn === 'hover' ? (
          <span
            onMouseOver={this.showHideTooltip}
            onFocus={this.showHideTooltip}
            onMouseLeave={this.showHideTooltip}
          >
            {children}
          </span>
        ) : (
          <button
            className="tool-tip-button"
            onClick={this.showHideTooltip}
            onKeyDown={this.handleClick}
          >
            {children}
          </button>
        )}
      </span>
    );
  }
}

/**
 * @exports Tooltip - Default export of the Tooltip component.
 */
export default withStyles(ReactTooltip, styles);
export { ReactTooltip as ReactTooltipVanilla };
