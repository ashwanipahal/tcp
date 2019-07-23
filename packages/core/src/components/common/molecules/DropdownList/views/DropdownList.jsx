import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/DropdownList.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';



const itemLists = (item, activeClass, clickHandler) => {
  return (
    <li
      key={item.value}
      tabIndex={-1}
      className={`dropdownliBottomBorder ${
        activeClass === item.value ? 'dropdownActiveClass' : ''
      }`}
    >
      <BodyCopy
        component="div"
        role="button"
        key={item.value}
        onClick={e => clickHandler(e, item.value, item.title)}
        onKeyPress={e => clickHandler(e, item.value, item.title)}
      >
        <BodyCopy
          component="div"
          className={`${activeClass === item.value ? 'dropdownActiveIcon' : ''}`}
        />
        {item.content}
      </BodyCopy>
    </li>
  );
};

const DropdownList = ({ className, optionsMap, clickHandler, activeClass }) => {
  const nthClild = optionsMap.find(itemValue => itemValue.value === '');
  const nthClildWithClass = nthClild ? nthClild.value : undefined;
  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy
        component="div"
        className={`${nthClildWithClass === '' ? 'dropDownListwrapper' : ''}`}
      >
        <BodyCopy component="div" className="dropdownDivOverFlow">
          <ul
            className={`${nthClildWithClass === '' ? 'ulBorderWithLastRow' : 'dropdownUlBorder'}`}
          >
            {optionsMap.map(item => itemLists(item, activeClass, clickHandler))}
          </ul>
        </BodyCopy>
      </BodyCopy>
    </BodyCopy>
  );
};

DropdownList.propTypes = {
  className: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  optionsMap: PropTypes.shape({}).isRequired,
  activeClass: PropTypes.string.isRequired
};


export default withStyles(DropdownList, styles);
export { DropdownList as CustomSelectVanilla };
