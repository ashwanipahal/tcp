import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/DropdownList.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';

class DropdownList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.selectedCard = React.createRef();
  }

  componentDidMount() {
    if (this.selectedCard && this.selectedCard.current) {
      this.selectedCard.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }

  itemLists = (lastElementButton, count, index, item, activeValue, clickHandler) => {
    const isDisabledClass = item.disabled ? ' dropdown--disabled' : '';
    return (
      <li
        ref={activeValue === item.value.toString() ? this.selectedCard : null}
        key={item.value}
        tabIndex={-1}
        className={` ${activeValue === item.value ? 'dropdownActiveClass' : ''}${isDisabledClass} `}
      >
        <BodyCopy
          component="div"
          className={`dropdownliBottomBorder ${
            lastElementButton && index === count - 2 ? 'no-border' : ''
          }`}
          role="link"
          key={item.value}
          onClick={e => clickHandler(e, item.value, item.title)}
          onKeyPress={e => clickHandler(e, item.value, item.title)}
        >
          {item.content}
        </BodyCopy>
      </li>
    );
  };

  render() {
    const { className, optionsMap, clickHandler, activeValue, dataLocatorObj } = this.props;
    const { dropDownList } = dataLocatorObj;
    const nthChild = optionsMap.find(itemValue => itemValue.value === '');
    return (
      <BodyCopy component="div" className={className}>
        <BodyCopy component="div" className={`${nthChild ? 'dropDownListwrapper' : ''}`}>
          <BodyCopy component="div" className="dropdownDivOverFlow">
            <ul
              className={`${nthChild ? 'ulBorderWithLastRow' : 'dropdownUlBorder'}`}
              data-locator={dropDownList}
            >
              {optionsMap.map((item, index) =>
                this.itemLists(nthChild, optionsMap.size, index, item, activeValue, clickHandler)
              )}
            </ul>
          </BodyCopy>
        </BodyCopy>
      </BodyCopy>
    );
  }
}

DropdownList.propTypes = {
  className: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  optionsMap: PropTypes.shape({}).isRequired,
  activeValue: PropTypes.string,
  dataLocatorObj: PropTypes.shape({}),
};

DropdownList.defaultProps = {
  activeValue: '',
  className: '',
  dataLocatorObj: {
    dropDownList: 'drop-down-list',
  },
};

export default withStyles(DropdownList, styles);
export { DropdownList as DropdownListVanilla };
