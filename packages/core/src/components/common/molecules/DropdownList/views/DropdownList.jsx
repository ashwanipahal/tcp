import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/DropdownList.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';

const itemLists = (item, activeValue, clickHandler) => {
  const isDisabledClass = item.disabled ? ' dropdown--disabled' : '';
  return (
    <li
      key={item.value}
      tabIndex={-1}
      className={`dropdownliBottomBorder ${
        activeValue === item.value ? 'dropdownActiveClass' : ''
      }${isDisabledClass}`}
    >
      <BodyCopy
        component="div"
        role="link"
        key={item.value}
        onClick={e => clickHandler(e, item.value, item.title)}
        onKeyPress={e => clickHandler(e, item.value, item.title)}
      >
        <BodyCopy
          component="div"
          className={`${activeValue === item.value ? 'dropdownActiveIcon' : ''}`}
        />
        {item.content}
      </BodyCopy>
    </li>
  );
};

const DropdownList = ({ className, optionsMap, clickHandler, activeValue, dataLocatorObj }) => {
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
            {optionsMap.map(item => itemLists(item, activeValue, clickHandler))}
          </ul>
        </BodyCopy>
      </BodyCopy>
    </BodyCopy>
  );
};

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
