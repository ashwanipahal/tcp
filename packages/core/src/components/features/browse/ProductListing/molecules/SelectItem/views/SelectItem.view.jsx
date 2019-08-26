/** @module SelectItem
 * @summary A React component rendering one item inside a {@linkcode module:CustomSelect} dropdown
 *
 * Note that components of this class are pure. I.e., they render only if their props change.
 * The main reason this component exists is <strong>not</strong> to offload the rendering from <code>CustomSelect</code>;
 * rather, it is to prevent unnecessary re-rendering of items in the dropdown is performed.
 * In particular, it allows us to use the exact same event handlers for all the items in the list, thus avoiding the mistake of
 * calculating the event handler of each element inside the <code>render()</code> method of <code>CustomSelect</code>
 * (e.g., <code>onClick={() => handleOnClick(index)}</code>) as this would cause all items to re-render on any change
 * (such as moving the highlight).
 *
 * @author Ben
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import SelectItemStyle from '../SelectItem.style';

// TODO Fix this import shallowEqual from 'util/shallowEqual';

class SelectItem extends React.PureComponent {
  static propTypes = {
    /** the className attribute to use when rendering this component */
    className: PropTypes.string.isRequired,

    /** the index of this element in the array (itemsMap) of the items in the dropdown (used for the callback {@linkcode clickHandler}) */
    index: PropTypes.number.isRequired,

    /** the element that renders this item */
    content: PropTypes.element.isRequired,
    /** flags if this element is highlighted (note that this is <strong>not</strong> used for rendering, only as a parameter to <code>highlightedRefCapturer</code>) */
    highlighted: PropTypes.bool.isRequired,

    /**
     * Called when this item is clicked.
     * @callback
     * @param {SyntheticEvent} the event
     * @param {number} the index of the clicked item
     */
    clickHandler: PropTypes.func.isRequired,

    /**
     * Called when this item renders a highlighted item.
     * @callback
     * @param {SyntheticEvent} the event
     * @param {DOMElement} the dom element rendering this item
     */
    highlightedRefCapturer: PropTypes.func.isRequired,
    docType: PropTypes.string,
    facetName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isAutosuggestAnalytics: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.ref = null; // the DOM element corresponding to this element
    this.handleRef = this.handleRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //  TODO Fix this shouldComponentUpdate (nextProps) {
  //    do not render if props did not change
  //
  //   return !shallowEqual(this.props, nextProps);
  // }

  // We hook into this life-cycle method so we can invoke our callback when this item becomes highlighted.
  // Note that when this item was first mounted it may have been highlighted, and thus the current value of this.ref
  // may point to an old DOM element that has now been replaced by React.
  componentDidUpdate() {
    const { highlighted, highlightedRefCapturer } = this.props;
    if (highlighted) {
      highlightedRefCapturer(this.ref);
    }
  }

  // captures the initial (i.e. on mount) DOM element used to render this item
  handleRef(ref) {
    const { highlighted, highlightedRefCapturer } = this.props;
    this.ref = ref;
    if (highlighted) {
      highlightedRefCapturer(this.ref);
    }
  }

  // handles onClick events for this item
  handleClick(event) {
    const { clickHandler, index } = this.props;
    clickHandler(event, index);
  }

  // IMPORTANT: 3/28 - WORK AROUND - IE11 isn't working with an onClick on the component below
  // We moved to: onMouseDown, which was supported by ALL major browsers.
  render() {
    const {
      className,
      facetName,
      value,
      isAutosuggestAnalytics,
      docType,
      title,
      content,
      query,
    } = this.props;
    return (
      <li
        className={className}
        unbxdparam_facetname={facetName}
        unbxdParam_facetValue={value}
        unbxdAttr={isAutosuggestAnalytics ? 'autosuggest' : null}
        unbxdParam_autosuggestType={docType}
        unbxdParam_autosuggestSuggestion={title}
      >
        <div
          data-doctype={docType}
          data-title={title}
          data-query={query}
          ref={this.handleRef}
          className="item-select"
          onMouseDown={this.handleClick}
          onKeyPress={this.handleClick}
          role="option"
          tabIndex="0"
          aria-selected="false"
        >
          {content}
        </div>
      </li>
    );
  }
}
SelectItem.defaultProps = {
  docType: '',
};

export default withStyles(SelectItem, SelectItemStyle);
