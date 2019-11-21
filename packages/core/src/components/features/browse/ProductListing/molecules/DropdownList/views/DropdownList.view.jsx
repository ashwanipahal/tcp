/** @module DropdownList
 * Note: this component is not meant to be directly used in forms!
 * It is a helper component for rendering the dropdown portion of other components such as  CustomSelect or Combobox
 *
 * @summary A React component rendering a dropdown list of options to select from.
 *
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import invariant from 'invariant';
import withStyles from '../../../../../../common/hoc/withStyles';
import DropdownListStyle from '../DropdownList.style';
import Button from '../../../../../../common/atoms/Button';
import { getLocator } from '../../../../../../../utils';
import config from '../DropDownList.config';

// TODO Fix this import invariant from './node_modules/invariant';
import cssClassName from '../../utils/cssClassName';
import SelectItem from '../../SelectItem/views';

const PROP_TYPES = {
  /**
   * The CSS class name prefix to use for this element.
   *
   * The class names for parts of this element are derived by appendig the following strings:
   * <code>'-item'</code>: the CSS class to use for an unselected option
   * <code>'-selected'</code>: the CSS class to use for a selected option
   * <code>'-highlighted'</code>: the CSS class to use for a highlighted
   * <code>'-disabledOption'</code>: the CSS class to use for a disabled option
   *
   * Please note that the classes for selected, highlighted and disabled elements will be added (instead of replace), as needed, to the item class
   */
  classNamePrefix: PropTypes.string.isRequired,

  /**
   * The list of items to show in this dropdown.
   * Note that this map must be immutable. I.e., any change to the list of items in this component's dropdown whould be performed
   * by changing the array passed as this prop.
   *
   * This is an array of plain objects, each representing one item in the dropdown. Each object has three fields, as follows:
   *  value: the internal value representing this item. This is not shown to the user, and is essentially the id used in javascript
   *         code to identify this item. This is similar to the <code>value</code> attribnute of an HTML <code>option</code> element.
   *  content: what the user sees for this item when the dropdown is expanded. This is a react element (not simply a string) since
   *          the main purpose of this component is to allow one to render complex contents for each item, which the HTML
   *          <code>option</code> cannot do.
   *  disabled: Flags if this option cannot be selected.
   */
  optionsMap: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      content: PropTypes.element.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,

  /** event handler for mouse clicks on items of this list */
  handleItemClick: PropTypes.func.isRequired,

  /** the selected item's index, or -1 if no item is highlighted */
  highlightedIndex: PropTypes.number.isRequired,

  /** if a number, then it is the selected item's index, or -1 if no item is selected
   * if an array, then it is of the same length as optionsMap, and each entry is a flag indicating whether
   * the corresponding entry in optionsMap is selected or not (used when multiple selections are needed)
   */
  selectedIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.bool)]),

  facetName: PropTypes.string.isRequired,
  autosuggestAnalytics: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  type: PropTypes.string,
  allowMultipleSelections: PropTypes.bool,
};

class DropdownList extends React.Component {
  // --------------- static methods --------------- //
  /**
   * @return the first index in optionsMap starting at index start, and incrementing by increment while scanning;
   * returns -1 if start is out of bounds, or if all items scanned are disabled
   */

  static getFirstEnabledIndex(optionsMap, start, increment) {
    let result = start;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (result < 0 || result >= optionsMap.length) {
        return -1;
      }
      if (optionsMap[result].disabled) {
        result += increment;
      } else {
        return result;
      }
    }
  }

  /**
   * @return a new highlighted index into optionsMap, given the current one and the specified direction;
   * returns -1 if all items in the direction specified are disabled
   */
  static getNewHighlightIndex(optionsMap, index, direction) {
    switch (direction) {
      case 'up':
        // look for first enabled item above the currently highlighted item
        return DropdownList.getFirstEnabledIndex(optionsMap, index - 1, -1);
      case 'down':
        // look for first enabled item below the currently highlighted item
        return DropdownList.getFirstEnabledIndex(optionsMap, index + 1, +1);
      case 'start':
        // look for first enabled item in optionsMap
        return DropdownList.getFirstEnabledIndex(optionsMap, 0, +1);
      case 'end':
        // look for last enabled item in optionsMap
        return DropdownList.getFirstEnabledIndex(optionsMap, optionsMap.length - 1, -1);
      default:
        invariant(
          true,
          `${this.displayName}: unknown destination of highlighted option ${direction}`
        );
        return true;
    }
  }
  // --------------- end of static methods --------------- //

  constructor(props) {
    super(props);
    this.highlightedRef = null; // the HTML DOM element of the currently highlighted item
    this.itemsListRef = null; // the HTML DOM element of the ul element rendering the dropdown list of items of this component
    this.scrollToHighlightedOnUpdate = true; // true if itemsListRef should be scrolled to show highlightedRef after this component renders

    // bind methods that are passed as callbacks
    this.captureItemsListRef = this.captureItemsListRef.bind(this);
    this.captureHighlightedRef = this.captureHighlightedRef.bind(this);
  }

  componentDidMount() {
    if (this.scrollToHighlightedOnUpdate) {
      // if needs to scroll to put the highlighted item into view
      this.scrollToHighlighted();
      this.scrollToHighlightedOnUpdate = false;
    }
  }

  /* eslint-disable-next-line */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { optionsMap, highlightedIndex } = this.props;
    if (optionsMap !== nextProps.optionsMap || highlightedIndex !== nextProps.highlightedIndex) {
      // flag that after this component renders the highlighted element should be scrolled into view
      this.scrollToHighlightedOnUpdate = true;
    }
  }
  // --------------- private methods --------------- //

  captureItemsListRef(ref) {
    this.itemsListRef = ref;
  }

  captureHighlightedRef(ref) {
    this.highlightedRef = ref;
  }

  // called to scroll this.itemsListRef to bring this.itemsListRef into view (i.e. to show the highlighted item)
  scrollToHighlighted() {
    if (this.highlightedRef) {
      const itemsListRect = this.itemsListRef.getBoundingClientRect();
      const highlightedItemRect = this.highlightedRef.getBoundingClientRect();
      if (
        highlightedItemRect.bottom > itemsListRect.bottom ||
        highlightedItemRect.top < itemsListRect.top
      ) {
        this.itemsListRef.scrollTop =
          this.highlightedRef.offsetTop +
          this.highlightedRef.clientHeight -
          this.itemsListRef.offsetHeight;
      }
    }
  }

  render() {
    const {
      classNamePrefix,
      optionsMap,
      selectedIndex,
      handleItemClick,
      facetName,
      autosuggestAnalytics,
      className,
      query,
      highlightedIndex,
      dataLocator,
      labels,
      type,
      allowMultipleSelections,
    } = this.props;
    if (optionsMap.length < 0) return null;

    const selectedClassStr = ` item-select ${classNamePrefix}-selected`;
    const highlightedClassStr = ` item-highlighted ${classNamePrefix}-highlighted sort-item-highlighted`;
    const disabledClassStr = ` item-disabledOption ${classNamePrefix}-disabledOption`;
    const isMultipleSElections = Array.isArray(selectedIndex) && selectedIndex.length > 0;
    const MAX_FILTER_OPTION_FOR_COLUMN = 27;
    const { sortType } = config;
    let columnClass = '';
    const optionLength = optionsMap.length;

    columnClass =
      optionsMap.length <= MAX_FILTER_OPTION_FOR_COLUMN ? ' item-list-column ' : ' item-list-row ';

    if (optionLength === 9) {
      columnClass = ' item-column ';
    }

    return (
      <div className={`${className} common-dropdown sort-dropdown-wrapper`}>
        <div className={cssClassName('item-list-wrapper sort-list-wrapper')}>
          <ul
            ref={this.captureItemsListRef}
            className={cssClassName(
              'item-list-common ',
              classNamePrefix,
              '-items-list',
              columnClass
            )}
          >
            {optionsMap.map((item, index) => (
              // observe that we make sure that all event handlers are constants (i.e., not calculated here).
              // this ensures that props of items change only if what they need to render changes
              <SelectItem
                key={item.value}
                title={item.value}
                query={query}
                index={index}
                docType={item.doctype}
                content={item.content}
                highlighted={index === highlightedIndex}
                highlightedRefCapturer={this.captureHighlightedRef}
                clickHandler={handleItemClick}
                facetName={facetName}
                value={item.title}
                isAutosuggestAnalytics={autosuggestAnalytics}
                dataLocator={
                  index === selectedIndex || (isMultipleSElections && selectedIndex[index])
                    ? `${getLocator(
                        `plp_filter_${dataLocator
                          .toLowerCase()
                          .split(' ')
                          .join('_')}_option_`
                      )}${item.value}_selected`
                    : `${getLocator(
                        `plp_filter_${dataLocator
                          .toLowerCase()
                          .split(' ')
                          .join('_')}_option_`
                      )}${item.value}_unselected`
                }
                className={cssClassName(
                  'item-common sort-item-list ',
                  classNamePrefix,
                  '-item',
                  {
                    [selectedClassStr]:
                      index === selectedIndex || (isMultipleSElections && selectedIndex[index]),
                  },
                  { [highlightedClassStr]: index === highlightedIndex },
                  { [disabledClassStr]: item.disabled }
                )}
              >
                {item.content}
              </SelectItem>
            ))}
          </ul>
          {type !== sortType && allowMultipleSelections && (
            <Button
              buttonVariation="fixed-width"
              type="submit"
              fill="BLACK"
              color="WHITE"
              className={cssClassName('apply-button')}
              data-locator={getLocator(`plp_filter_${dataLocator}_apply`)}
            >
              {`${labels.lbl_apply}`}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // --------------- end of private methods --------------- //
}
DropdownList.propTypes = PROP_TYPES;
DropdownList.defaultProps = {
  selectedIndex: '',
  labels: {},
  type: '',
  allowMultipleSelections: false,
};

export default withStyles(DropdownList, DropdownListStyle);
