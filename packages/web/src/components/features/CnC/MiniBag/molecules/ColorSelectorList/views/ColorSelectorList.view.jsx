import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import styles from '../styles/ColorSelectorList.style';

const itemLists = (item, activeValue, clickHandler, index, lastElement) => {
  return (
    <li
      key={item.value}
      tabIndex={-1}
      className={[
        'dropdownliBottomBorder',
        activeValue === item.value ? 'dropdownActiveClass' : '',
        lastElement === index + 1 ? 'lastElementClass' : '',
      ].join(' ')}
    >
      <BodyCopy
        component="div"
        key={item.value}
        fontSize="fs12"
        fontFamily="secondary"
        onClick={e => clickHandler(e, item.value, item.title)}
        onKeyPress={e => clickHandler(e, item.value, item.title)}
      >
        {item.content}
      </BodyCopy>
    </li>
  );
};

const ColorSelectorList = ({ className, optionsMap, clickHandler, activeValue }) => {
  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy component="div" className="dropdownDivOverFlow">
        <ul className="dropdownUlBorder">
          {optionsMap.map((item, index) =>
            itemLists(item, activeValue, clickHandler, index, optionsMap.length)
          )}
        </ul>
      </BodyCopy>
    </BodyCopy>
  );
};

ColorSelectorList.propTypes = {
  className: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  optionsMap: PropTypes.shape({}).isRequired,
  activeValue: PropTypes.string,
};

ColorSelectorList.defaultProps = {
  activeValue: '',
  className: '',
};

export default withStyles(ColorSelectorList, styles);
export { ColorSelectorList as ColorSelectorListVanilla };
