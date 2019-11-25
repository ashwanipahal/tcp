import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import styles from '../styles/DropdownList.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import Badge from '../../../atoms/Badge';

const itemLists = (lastElementButton, count, index, item, activeValue, clickHandler, labels) => {
  const isDisabledClass = item.disabled ? ' dropdown--disabled' : '';
  return (
    <li
      key={item.value}
      tabIndex={-1}
      className={`${activeValue === item.value ? 'dropdownActiveClass' : ''}${isDisabledClass} ${
        lastElementButton && index === count - 2 ? 'dropDownItems' : ''
      }`}
    >
      <BodyCopy
        component="div"
        className="dropdownliBottomBorder"
        role="link"
        key={item.value}
        onClick={e => clickHandler(e, item.value, item.title)}
        onKeyPress={e => clickHandler(e, item.value, item.title)}
      >
        {item.content}
        {activeValue === item.value && (
          <Badge className="dropdownActiveIcon" showCheckmark dataLocator="addressbook-default">
            {getLabelValue(labels, 'lbl_payment_default', 'paymentGC')}
          </Badge>
        )}
      </BodyCopy>
    </li>
  );
};

const DropdownList = ({
  className,
  optionsMap,
  clickHandler,
  activeValue,
  dataLocatorObj,
  labels,
}) => {
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
              itemLists(nthChild, optionsMap.size, index, item, activeValue, clickHandler, labels)
            )}
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
