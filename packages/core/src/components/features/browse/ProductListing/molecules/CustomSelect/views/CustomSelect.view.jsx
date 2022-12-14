/* eslint-disable max-lines */
// aria support ?
// searchable support ?
// do we want a "clearable" property, and a clear button? (currently escape clears)
// see if we need more events emitted (like open/close)
// do we need otherProps to spread into the containing div?
// deselect-values that are not in the optionsMap whe receiving new props?

/** @module CustomSelect
 * @summary A React component rendering a custom select component that can open a dropdown list of options to select from.
 *
 * Supports either single or multiple selections.
 * For single seletions, the value of this component is picked from the <code>value</code> of the selected item in
 * the prop <code>optionsMap</code>, and the empty string if nothing is selected; for multiple selections, the value is
 * an array of such values, and the empty array indicates that nothing is selected.
 *
 * Elements of this type present a more flexible alternative to the <code>select,option</code> native HTML dropdowns.
 * Each item in the dropdown can be any element that can be inside an <code>li</code> element.
 *
 * Note that this component is meant to be used with Redux-Forms, and will almost always be wrapped by a {@linkcode module:redux-form.Field}.
 * Also note that this is a `controlled` React component. Thus, it does not store the selected value. It only renders the selected value
 * as given by the <code>this.props.input.value</code> prop. In particular, when the user selects a new item, this component simply calls the
 * <code>this.props.input.onChange</code> event handler. In order for the user to see the new selected value rendered, this handler must
 * cause a re-render of this component, passing it an <code>input.value</code> with the new value (this is done automatically if this component
 * is wrapped by a Redux-Forms <code>Field</code>).
 *
 * Supports <code>input</code> and <code>meta</code> props passed down by a wrappping {@linkcode module:redux-form.Field} HOC.
 * Any extra props (i.e., other than <code>disabled, placeholder, buttonIconClosed, buttonIconExpanded, optionsMap, className, tabIndex
 * input, meta</code>),
 * e.g., <code>aria-label</code>, passed to this component will be passed along to the containing <code>div</code> element.
 *
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import cssClassName from '../../utils/cssClassName';
import DropdownList from '../../DropdownList/views';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import CustomSelectStyle from '../CustomSelect.style';
import { getLocator } from '../../../../../../../utils';
import { keyboard } from '../../../../../../../../../web/src/constants/constants';

// TODO Fix This import {ErrorMessage, ERROR_FORM_NAME_DATA_ATTRIBUTE} from '../ErrorMessage.jsx';
// TODO Fix This import warning from 'warning';

const UNSELECTED_VALUE = '';
const UNSELECTED_ARRAY_VALUE = [];
const { KEY_ENTER, KEY_SPACE, KEY_ESCAPE, KEY_UP, KEY_DOWN, KEY_HOME_KEY, KEY_END_KEY } = keyboard;

// returns the index (or indices) of the item(s) with the given value(s) in the given optionsMap
function getIndexOrIndicesOfValue(optionsMap, valueOrValues) {
  return Array.isArray(valueOrValues)
    ? optionsMap.map(
        item => valueOrValues.findIndex(selectedValue => item.value === selectedValue) >= 0
      )
    : optionsMap.findIndex(item => item.value === valueOrValues);
}

// returns the data-locator from option value if ButtonText is not a valid string.
function getButtonTextLocator(title, option) {
  let locator = title || '';
  if (typeof title !== 'string') {
    locator = option.value;
    return locator;
  }
  return locator
    .toLowerCase()
    .split(' ')
    .join('_');
}

function getButtonText(selectedIndex, { selectTextOverride, optionsMap, placeholder }) {
  return selectedIndex >= 0 ? selectTextOverride || optionsMap[selectedIndex].title : placeholder;
}

class CustomSelect extends React.Component {
  static propTypes = {
    /** an optional text to display in the label for this component. */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    /** <code>true</code> if this element is disabled  */
    disabled: PropTypes.bool,

    /** flags if multiple seletion are allowed */
    allowMultipleSelections: PropTypes.bool,

    /**
     * This text is shown when the selected value (see <code>propTypes.input.value</code> below) is the empty string.
     * If defined, the user can select the empty string by pressing the `escape` key when the dropdown is closed.
     * Note: this prop is required if the prop <code>allowMultipleSelections</code> is <code>true</code> in which case
     * it is always displayed as the text of the button at the top (the one that expands and contracts the dropdown).
     */
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    /** The icon of the button (that expands the dropdown) in the un-expanded state */
    buttonIconClosed: PropTypes.string,

    /** The icon of the button (that expands the dropdown) in the expanded state */
    buttonIconExpanded: PropTypes.string,

    /**
     * The CSS class to use for this element when the dropdown is expanded.
     *
     * The class names for other parts/states of this element are derived by appendig the following strings:
     * <code>'-closed'</code>: the CSS class for this element when the dropdown is closed
     * <code>'-button'</code>: the CSS class to use for the drop button when the dropdown is expanded
     * <code>'-button-closed'</code>: the CSS class to use for the drop button when the dropdown is closed
     * <code>'-items-list'</code>: the CSS class to use for the container element of all the items when the dropdown is expanded
     * <code>'-item'</code>: the CSS class to use for an unselected option when the dropdown is expanded
     *
     * <code>'-disabled'</code>: the CSS class to use for this element if the whole CustomSelect is disabled
     * <code>'-selected'</code>: the CSS class to use for a selected option when the dropdown is expanded
     * <code>'-highlighted'</code>: the CSS class to use for a highlighted option when the dropdown is expanded
     * <code>'-disabledOption'</code>: the CSS class to use for a disabled option when the dropdown is expanded
     *
     * Note that the -selected, -highlited, disabled and disabledOption will be added (instead of replace), as needed.
     */
    className: PropTypes.string.isRequired,

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
     *  title: This is what the user sees if the item is the selected item, and the dropdown is closed (i.e., not expanded).
     *         Note that this must be either a string or an inline element (i.e., one that can be rendered inside a <code>span</code>).
     *  disabled: Flags if this option cannot be selected.
     *
     * @example <caption>Simple two gift wrapping options</caption>
     *  let DIYContent = <div>
     *    <h3>Do It Yourself (DIY)</h3>
     *    <p>We provide you with gift wrapping paper, ribbon and bow</p>
     *  </div>;
     *
     *  let WeWrapContent = <div>
     *    <h3>We???ll Wrap It For You</h3>
     *    <p>Short on time? We???ll take care of the wrapping for you</p>
     *  </div>;
     *
     *  let MessageContent = <div>
     *    <h3>Gift Receipt &amp; Gift Message</h3>
     *    <p>Short and sweet, but it will send the right message</p>
     *  </div>;
     * let optionsMap = [
     *    {value: 'diy', content: DIYContent, title: 'Do It Yourself (DIY)'},
     *    {value: 'wrap', content: WeWrapContent, title: 'We???ll Wrap It For You', disabled: true}
     *    {value: 'message', content: MessageContent, title: 'Gift Receipt and Message'}
     * ];
     */
    optionsMap: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        content: PropTypes.element.isRequired,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
        disabled: PropTypes.bool,
      })
    ).isRequired,

    /**
     * If using Redux-forms, this is passed down to this object automatically by the enclosing <code>Field</code> component.
     */
    input: PropTypes.shape({
      /**
       * The value of the selected item. Note that this value may be different than all the values in the <code>optionsMap</code> prop.
       */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
        .isRequired,
      /** Called when the selected item of this component is changed by the user. Passed in by an enclosing Redux-Form <code>Field</code> */
      onChange: PropTypes.func.isRequired,
      /** Called when this component loses focus. Passed in by an enclosing Redux-Form <code>Field</code> */
      onBlur: PropTypes.func,
      /** Called when this component receives focus. Passed in by an enclosing Redux-Form <code>Field</code> */
      onFocus: PropTypes.func,
    }).isRequired,

    /** Called when this component switches from the expanded to the closed state
     * Note that this is not a regular React event. This callback receives no parameters
     */
    onCloseCallback: PropTypes.func,

    /** Called when this component switches from the closed to the expanded state
     * Note that this is not a regular React event. This callback receives no parameters
     */
    onExpandCallback: PropTypes.func,

    /** the HTML tabing index of the containing div of this componet, if not defined, this component uses <code>tabindex=0</code> */
    tabIndex: PropTypes.number,

    /**
     * Flags if the dropdown should be rendered initially expanded.
     * Note that the user can close (and open) the dropdown regardless of the value of this prop.
     * To disable the user's ability to do that, use the prop <code>disableExpandStateChanges</code>
     */
    expanded: PropTypes.bool,

    /**
     *  Flags that this component should always remain in it's initially set expanded or closed state (see <code>expanded</code> prop).
     *  Note that if this prop is true than the button used to expand/collapse the dropdown is not rendered.
     */
    disableExpandStateChanges: PropTypes.bool,

    /** If <code>true</code>, when the dropdown is expanded the selected value will change as the user
     * moves the highlight using the keyboard arrow key; note that the dropdown will remain open as usual during arrow navigation.
     * This prop is ignored if <code>allowMultipleSelections</code> is true.
     */
    selectOnHighlight: PropTypes.bool,

    /**
     * If <code>true</code>, and there is a validation error associated with the input value (i.e, </code>this.props.meta.error</code> is not empty)
     * then the error message will be displayed even if </code>this.props.meta.touched</code> is <code>false</code>.
     */
    showErrorIfUntouched: PropTypes.bool,

    /**
     * If <code>true</code>, and there is a validation error associated with the input value (i.e, </code>this.props.meta.error</code> is not empty)
     * then the error message will be displayed even if </code>this.props.meta.touched</code> is <code>false</code>.
     */
    showWarningIfUntouched: PropTypes.bool,

    /**
     * If a value exisits then when an option is selected you will see this value as opposed to the selected value.
     */
    selectTextOverride: PropTypes.string,
    facetName: PropTypes.string.isRequired,
    appliedFilterVal: PropTypes.number,
    labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
    type: PropTypes.string,
    isSortOpenModal: PropTypes.bool,
    onSortSelection: PropTypes.func,
    onFilterSelection: PropTypes.func,
    onOptionSelected: PropTypes.func,
    isLoadingMore: PropTypes.bool,
    isFavoriteView: PropTypes.bool,
  };

  static customSelectCounter = 0;

  constructor(props) {
    super(props);
    this.containerDivRef = null; // the HTML DOM element of the containing div element of this component
    this.state = {
      expanded: !!props.expanded, // true if this component is expanded, false if closed;
      highlightedIndex: -1, // index into this.props.optionsMap of the highlighted item in the dropdown
    };

    // bind methods that are passed as callbacks
    this.captureContainerDivRef = this.captureContainerDivRef.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.customSelectCounter = CustomSelect.customSelectCounter + 1;
  }

  /* eslint-disable-next-line */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { expanded, optionsMap } = this.props;
    const { highlightedIndex } = this.state;
    if (nextProps.expanded !== expanded || nextProps.disableExpandStateChanges) {
      this.setState({ expanded: nextProps.expanded });
    }
    if (optionsMap !== nextProps.optionsMap && highlightedIndex > 0) {
      // sync. this.state.highlightedIndex with the new optionsMap
      // (to point to the same highlighted item as now if possible)
      this.setState({
        highlightedIndex: getIndexOrIndicesOfValue(
          nextProps.optionsMap,
          optionsMap[highlightedIndex].value
        ),
      });
    }
  }

  setHighlightedIndex(index) {
    this.setState({ highlightedIndex: index });
  }

  getTabIndex() {
    const { disabled, tabIndex } = this.props;
    return disabled ? -1 : tabIndex || 0;
  }

  // select the item with the given value
  setValue(selectedValue, noClose) {
    const {
      allowMultipleSelections,
      input: { value, onChange },
    } = this.props;

    if (allowMultipleSelections) {
      const newValue = [...value];
      newValue.push(selectedValue);
      // notify our listeners that the user wants the value of this component to change
      onChange(newValue);
    } else {
      // only single selection allowed
      if (value !== selectedValue) {
        // if the value to select is not the current value of this component
        // notify our listeners that the user wants the value of this component to change
        onChange(selectedValue);
      }
      if (!noClose) this.closeMenu(); // close the dropdown
    }
  }

  /** opens the dropdown */
  expandMenu() {
    const { expanded } = this.state;
    const { disableExpandStateChanges, optionsMap, input } = this.props;
    if (expanded || disableExpandStateChanges) return;
    let highlightedIndex = getIndexOrIndicesOfValue(optionsMap, input.value);
    if (Array.isArray(highlightedIndex)) {
      highlightedIndex = highlightedIndex.findIndex(isSelected => isSelected);
    }
    this.setHighlightedIndex(highlightedIndex);
    this.setState({ expanded: true });
  }

  captureContainerDivRef(ref) {
    this.containerDivRef = ref;
  }

  // assign focus to this component
  focus() {
    this.containerDivRef.focus();
  }

  // handles clicks on the button that opens the dropdown
  handleButtonClick(event) {
    const { disabled } = this.props;
    const { expanded } = this.state;
    if (disabled || event.button !== 0) return; // ignore clicks not on main button, or if disabled
    if (expanded) {
      this.closeMenu();
    } else {
      this.expandMenu();
    }
  }

  setItemValue(onFilterSelection, clickedItemValue, onOptionSelected, onSortSelection) {
    const { isFavoriteView } = this.props;
    if (onFilterSelection) {
      onFilterSelection(clickedItemValue);
    }
    if (!isFavoriteView && onOptionSelected) {
      onOptionSelected(true);
    } else if (onSortSelection) {
      onSortSelection(clickedItemValue);
    }
    this.setValue(clickedItemValue);
  }

  // handles mouse clicks on items in the dropdown
  handleItemClick(event, clickedItemIndex) {
    const {
      optionsMap,
      allowMultipleSelections,
      input: { value },
      onFilterSelection,
      onOptionSelected,
      onSortSelection,
    } = this.props;

    if (event.button !== 0 && event.keyCode !== KEY_ENTER) return; // ignore clicks not on the main (left) mouse button
    if (!optionsMap[clickedItemIndex].disabled) {
      // ignore clicks on disabled items
      this.setHighlightedIndex(clickedItemIndex); // make the clicked item highlighted
      const clickedItemValue = optionsMap[clickedItemIndex].value; // value of clicked on item
      const selectedIndex = getIndexOrIndicesOfValue(optionsMap, value);
      if (allowMultipleSelections && selectedIndex[clickedItemIndex] && !onFilterSelection) {
        this.unsetValue(clickedItemValue); // remove clickedItemValue from this component's selcted values list
        if (onOptionSelected) {
          onOptionSelected(true);
        }
      } else {
        // set the value (or add to the value if multiple selections is on) of this component to clickedItemValue
        this.setItemValue(onFilterSelection, clickedItemValue, onOptionSelected, onSortSelection);
      }
    }
  }

  // handles blur events of the containing div of this component
  handleBlur(event) {
    // if the user moved focus outside this component

    // IE9-11 does not provide relatedTarget for React (focusing vs focus, etc)
    // so we'll use document.activeElement (if available)
    const target = event.relatedTarget || document.activeElement;
    const { input } = this.props;
    if (
      target !== null &&
      target !== this.containerDivRef &&
      !this.containerDivRef.contains(target)
    ) {
      // notify our listeners that this component is blured
      // note that we do not pass the event along to our listeners, but opt for the option of sending them the value
      // the reason is that Redux-form sometimes tries to pick up the value from the event, and this value will be wrong
      // when multiple selections are allowed (as it may be the value retrieved from the single input DOM element that renders a single item).
      if (input && input.onBlur) input.onBlur(input.value);

      this.closeMenu(); // close the dropdown
    }
  }

  // handles focus events of the containing div of this component
  handleFocus(event) {
    const { input, disabled } = this.props;
    if (disabled) {
      // if disabled prevent this component and any of its child elements from receiving focus
      if (event.target === this.containerDivRef || this.containerDivRef.contains(event.target)) {
        event.target.blur();
      }
    } else {
      // not disabled
      // notify our listeners that this component was focused
      // eslint-disable-next-line no-lonely-if
      if (input && input.onFocus) {
        input.onFocus(event);
      }
    }
  }

  handleEscapeKeyEvent({ expanded }, { placeholder, allowMultipleSelections }) {
    if (expanded) {
      this.closeMenu(); // close the dropdown if it is open
    } else if (typeof placeholder !== 'undefined' && !allowMultipleSelections) {
      // if dropdown is closed and placeholder is defined then select the empty value
      this.setValue(allowMultipleSelections ? UNSELECTED_ARRAY_VALUE : UNSELECTED_VALUE);
    }
  }

  handleSpaceKeyEvent({ expanded }) {
    if (expanded) {
      this.selectHighlightedItem(); // the user selected the currently highlighted item
    } else {
      this.expandMenu(); // show dropdown
    }
  }

  // handles key presses for this component
  // eslint-disable-next-line complexity
  handleKeyDown(event) {
    const { disabled, isSortOpenModal } = this.props;
    const { expanded } = this.state;

    if (disabled) return; // ignore everything if this component is disabled
    switch (event.keyCode) {
      case KEY_ENTER: // enter
        if (!expanded) return;
        if (!isSortOpenModal) return;
        this.selectHighlightedItem(); // the user selected the currently highlighted item
        break;

      case KEY_ESCAPE: // escape
        this.handleEscapeKeyEvent(this.state, this.props);

        break;
      case KEY_SPACE: // space
        this.handleSpaceKeyEvent(this.state);

        break;
      case KEY_UP: // up
        this.moveHighlightOrExpand('up');
        break;
      case KEY_DOWN: // down
        this.moveHighlightOrExpand('down');
        break;
      case KEY_END_KEY: // end key
        this.moveHighlightOrExpand('end');
        break;
      case KEY_HOME_KEY: // home key
        this.moveHighlightOrExpand('start');
        break;
      default:
        return; // ignore any other key events (this skips the event.preventDefault() below)
    }
    event.preventDefault();
  }

  // select the currently highlighted item
  selectHighlightedItem() {
    const { optionsMap } = this.props;
    const { highlightedIndex } = this.state;

    const highlightedItem = optionsMap[highlightedIndex];
    if (highlightedItem) this.setValue(highlightedItem.value);
  }

  unsetValue(value) {
    const { input } = this.props;
    const newValues = input.value.filter(val => val !== value);
    // notify our listeners that the user wants the value of this component to change
    input.onChange(newValues);
  }

  // if dropdown is expanded then move highlight to the item in the specified direction
  // if dropdown is closed then simply expand it
  moveHighlightOrExpand(direction) {
    const { optionsMap, selectOnHighlight, allowMultipleSelections } = this.props;
    const { highlightedIndex, expanded } = this.state;
    if (!expanded) {
      this.expandMenu();
    } else {
      const newHighlightedIndex = DropdownList.getNewHighlightIndex(
        optionsMap,
        highlightedIndex,
        direction
      );
      if (newHighlightedIndex >= 0) {
        this.setHighlightedIndex(newHighlightedIndex);
        if (newHighlightedIndex >= 0 && selectOnHighlight && !allowMultipleSelections) {
          this.setValue(optionsMap[newHighlightedIndex].value, true); // the user selected the currently highlighted item
        }
      }
    }
  }

  /** closes the dropdown */
  closeMenu() {
    const { expanded } = this.state;
    const { disableExpandStateChanges, isSortOpenModal } = this.props;
    if (!isSortOpenModal) {
      if (!expanded || disableExpandStateChanges) return;
      this.setState({ expanded: false });
    }
  }

  render() {
    const {
      title,
      buttonIconExpanded,
      buttonIconClosed,
      tabIndex,
      showErrorIfUntouched,
      showWarningIfUntouched,
      disabled,
      className,
      optionsMap,
      allowMultipleSelections,
      disableExpandStateChanges,
      facetName,
      appliedFilterVal,
      input: { value },
      selectOnHighlight,
      onCloseCallback,
      onExpandCallback,
      labels,
      type,
      isSortOpenModal,
      isLoadingMore,
      ...otherProps
    } = this.props;

    const { expanded, highlightedIndex } = this.state;

    const dataAttributes = {};

    const selectedIndex = getIndexOrIndicesOfValue(optionsMap, value);
    const buttonText = getButtonText(selectedIndex, this.props);
    const buttonIconText = expanded ? buttonIconExpanded : buttonIconClosed;
    const dataLocatorSuffix = getButtonTextLocator(buttonText, optionsMap[selectedIndex]);

    const buttonClassName = cssClassName(
      'custom-select-button custom-sort-dropdown ',
      className,
      '-button',
      { '-closed': !expanded },
      { ' custom-select-button-placeholder': selectedIndex < 0 }
    );
    const appliedTabIndex = this.getTabIndex();
    const containingClassName = cssClassName(
      `custom-select-common ${className} `,
      className,
      { '-closed': !expanded },
      { '-disabled': disabled }
    );
    const uniqueId = `custom-select_${this.customSelectCounter}`;
    const errorUniqueId = `error_${uniqueId}`; // Unique Id to connect the error input with its error message. Both needs to be the same. Accessibility requirement. DT-30852
    return (
      <div
        role="button"
        {...otherProps}
        ref={this.captureContainerDivRef}
        tabIndex={appliedTabIndex}
        className={containingClassName}
        {...dataAttributes}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >
        {title && (
          <BodyCopy
            component="span"
            className="custom-select-title sort-select-title"
            fontSize="fs14"
            fontFamily="secondary"
          >
            {title}
          </BodyCopy>
        )}
        {!disableExpandStateChanges && (
          <div
            role="button"
            tabIndex="-1"
            className={buttonClassName}
            onClick={this.handleButtonClick}
            aria-describedby={errorUniqueId}
            onKeyPress={this.handleButtonClick}
          >
            <BodyCopy
              component="span"
              textAlign="center"
              tabIndex={-1}
              fontSize="fs14"
              fontFamily="secondary"
              color="gray.900"
              fontWeight={expanded ? 'extrabold' : 'regular'}
              className={[
                'filter-label sort-filter-label',
                expanded ? 'filter-label-expanded' : '',
              ].join(' ')}
              outline="none"
              data-locator={getLocator(`plp_filter_${dataLocatorSuffix}`)}
            >
              {buttonText}
            </BodyCopy>
            <span aria-hidden>{buttonIconText}</span>
          </div>
        )}
        {expanded && optionsMap.length > 0 && (
          <DropdownList
            classNamePrefix={className}
            optionsMap={optionsMap}
            selectedIndex={selectedIndex}
            highlightedIndex={highlightedIndex}
            handleItemClick={this.handleItemClick}
            facetName={facetName}
            dataLocator={dataLocatorSuffix}
            allowMultipleSelections={allowMultipleSelections}
            labels={labels}
            type={type}
            isLoadingMore={isLoadingMore}
          />
        )}

        {/* TODO Fix This <ErrorMessage error={errorMessage} errorId={errorUniqueId} className={messageClassName} withoutErrorDataAttribute /> */}
      </div>
    );
  }
}

CustomSelect.defaultProps = {
  title: '',
  disabled: false,
  allowMultipleSelections: false,
  placeholder: '',
  buttonIconClosed: '',
  buttonIconExpanded: '',
  onExpandCallback: () => null,
  tabIndex: 0,
  expanded: false,
  onCloseCallback: () => null,
  disableExpandStateChanges: false,
  selectOnHighlight: false,
  showErrorIfUntouched: false,
  showWarningIfUntouched: false,
  selectTextOverride: '',
  appliedFilterVal: 0,
  labels: {},
  type: '',
  isSortOpenModal: false,
  onSortSelection: null,
  onFilterSelection: null,
  onOptionSelected: () => {},
  isLoadingMore: false,
  isFavoriteView: false,
};
export default withStyles(CustomSelect, CustomSelectStyle);
