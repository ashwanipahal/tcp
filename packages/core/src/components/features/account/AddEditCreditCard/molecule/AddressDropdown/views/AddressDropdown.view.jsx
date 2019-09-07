import React from 'react';
import PropTypes from 'prop-types';
import CustomSelect from '../../../../../../common/molecules/CustomSelect';

const getActiveTitle = (options, value) => {
  const selectedOption = options.find(o => o.value === value);
  return selectedOption && selectedOption.title;
};

export const AddressDropdown = ({ options, input, selectListTitle, showModal, modalHeading }) => {
  return (
    <CustomSelect
      options={options}
      activeValue={input.value}
      activeTitle={getActiveTitle(options, input.value)}
      clickHandler={(e, value) => input.onChange(value)}
      selectListTitle={selectListTitle}
      showModal={showModal}
      modalHeading={modalHeading}
    />
  );
};

AddressDropdown.propTypes = {
  options: PropTypes.shape([]).isRequired,
  input: PropTypes.shape({}).isRequired,
  selectListTitle: PropTypes.string.isRequired,
  showModal: PropTypes.bool,
  modalHeading: PropTypes.string,
};

AddressDropdown.defaultProps = {
  showModal: false,
  modalHeading: '',
};

export default AddressDropdown;
