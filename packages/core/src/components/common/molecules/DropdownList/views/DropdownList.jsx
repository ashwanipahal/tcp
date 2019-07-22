import React from 'react';
import styles from '../styles/DropdownList.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';

// @flow
type Props = {
  optionsMap: object,
  className: string,
  clickHandler: Function,
  activeClassValue: string,
};

const itemLists = (item, activeClassValue, clickHandler) => {
  return (
    <li
      key={item.value}
      tabIndex={-1}
      className={`dropdownliBottomBorder ${
        activeClassValue === item.value ? 'dropdownActiveClass' : ''
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
          className={`${activeClassValue === item.value ? 'dropdownActiveIcon' : ''}`}
        />
        {item.content}
      </BodyCopy>
    </li>
  );
};

const DropdownList = ({ className, optionsMap, clickHandler, activeClassValue }: Props) => {
  const nthClild = optionsMap.find(itemValue => itemValue.value === '');
  const nthClildWithClass = nthClild ? nthClild.value : 'undefined';
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
            {optionsMap.map(item => itemLists(item, activeClassValue, clickHandler))}
          </ul>
        </BodyCopy>
      </BodyCopy>
    </BodyCopy>
  );
};

export default withStyles(DropdownList, styles);
export { DropdownList as CustomSelectVanilla };
