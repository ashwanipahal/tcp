import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CustomSelect from '@tcp/core/src/components/common/molecules/CustomSelect';
import styles, { customSelectTile } from '../styles/ColorSelect.style';

const getActiveTitle = (options, value) => {
  const selectedOption = options.find(o => o.value === value);
  return (selectedOption && selectedOption.title) || 'color';
};

const ColorSelectorDropDown = ({ options, input, className }) => {
  return (
    <CustomSelect
      inheritedStyles={customSelectTile}
      className={className}
      options={options}
      list="colorSelector"
      activeValue={input.value}
      activeTitle={getActiveTitle(options, input.value)}
      clickHandler={(e, value) => input.onChange(value)}
      selectListTitle="Color"
    />
  );
};
ColorSelectorDropDown.propTypes = {
  options: PropTypes.shape([]).isRequired,
  input: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  // selectListTitle: PropTypes.string.isRequired,
};

export default withStyles(ColorSelectorDropDown, styles);
export { ColorSelectorDropDown as ColorSelectorDropDownVanilla };
