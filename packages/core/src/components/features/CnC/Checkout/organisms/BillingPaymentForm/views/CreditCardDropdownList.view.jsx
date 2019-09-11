import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../../../../common/molecules/DropdownList/styles/DropdownList.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const itemLists = (item, activeValue, clickHandler) => {
  return (
    <li
      key={item.value}
      tabIndex={-1}
      className={`dropdownliBottomBorder ${
        activeValue === item.value ? 'dropdownActiveClass' : ''
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
          className={`${activeValue === item.value ? 'dropdownActiveIcon' : ''}`}
        />
        {item.content}
      </BodyCopy>
    </li>
  );
};

const CreditCardDropdownList = ({ className, optionsMap, clickHandler, activeValue }) => {
  const nthChild = optionsMap.find(itemValue => itemValue.value === '');
  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy component="div" className={`${nthChild ? 'dropDownListwrapper' : ''}`}>
        <BodyCopy component="div" className="dropdownDivOverFlow">
          <span className="dropDownTop" />
          <span className="dropDownBottom" />
          <ul className={`${nthChild ? 'ulBorderWithLastRow' : 'dropdownUlBorder'}`}>
            {optionsMap.map(item => itemLists(item, activeValue, clickHandler))}
          </ul>
        </BodyCopy>
      </BodyCopy>
    </BodyCopy>
  );
};

CreditCardDropdownList.propTypes = {
  className: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  optionsMap: PropTypes.shape({}).isRequired,
  activeValue: PropTypes.string,
};

CreditCardDropdownList.defaultProps = {
  activeValue: '',
  className: '',
};

export default withStyles(CreditCardDropdownList, styles);
export { CreditCardDropdownList as CreditCardDropdownListVanilla };
