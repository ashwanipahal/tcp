import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CustomSelect from '@tcp/core/src/components/common/molecules/CustomSelect';
import ColorSelectorList from '../../ColorSelectorList/views/ColorSelectorList.view';
import styles, { customSelectTile } from '../styles/ColorSelect.style';

// const getActiveTitle = (options, value) => {
//   const selectedOption = options.find(o => o.value === value);
//   return (selectedOption && selectedOption.value) || 'color';
// };

const ColorSelectorDropDown = ({
  options,
  input,
  className,
  selectListTitle,
  selectedColorOption,
}) => {
  let activeTitle = '';
  let activeValue = '';
  if (selectedColorOption) {
    activeTitle = selectedColorOption.title;
    activeValue = selectedColorOption.value;
  }
  return (
    <CustomSelect
      inheritedStyles={customSelectTile}
      className={className}
      options={options}
      activeValue={activeValue}
      activeTitle={activeTitle}
      clickHandler={(e, value) => input.onChange(value)}
      selectListTitle={selectListTitle}
      renderList={ColorSelectorList}
    />
  );
};

ColorSelectorDropDown.propTypes = {
  options: PropTypes.shape([]).isRequired,
  input: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  selectListTitle: PropTypes.string.isRequired,
  selectedColorOption: PropTypes.shape({}).isRequired,
};

export default withStyles(ColorSelectorDropDown, styles);
export { ColorSelectorDropDown as ColorSelectorDropDownVanilla };
