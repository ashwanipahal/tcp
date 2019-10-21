import React from 'react';
import PropTypes from 'prop-types';
import CustomSelect from '../../../../../../common/molecules/CustomSelect';

const getActiveTitle = (options, value) => {
  const selectedOption = options.find(o => o.value === value);
  return selectedOption && selectedOption.title;
};

export const AddressDropdown = ({
  options,
  input,
  selectListTitle,
  customSelectClassName,
  dataLocatorObj,
}) => {
  return (
    <CustomSelect
      options={options}
      activeValue={input.value}
      activeTitle={getActiveTitle(options, input.value)}
      clickHandler={(e, value) => input.onChange(value)}
      selectListTitle={selectListTitle}
      customSelectClassName={customSelectClassName}
      dataLocatorObj={dataLocatorObj}
    />
  );
};

AddressDropdown.propTypes = {
  options: PropTypes.shape([]).isRequired,
  input: PropTypes.shape({}).isRequired,
  selectListTitle: PropTypes.string.isRequired,
  customSelectClassName: PropTypes.string,
  dataLocatorObj: PropTypes.shape({}),
};
AddressDropdown.defaultProps = {
  customSelectClassName: '',
  dataLocatorObj: {
    heading: 'drop-down-heading',
    dropDownList: 'drop-down-list',
  },
};

export default AddressDropdown;
